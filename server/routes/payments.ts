import { Router } from 'express';
import { stripe } from '../config/stripe';
import Stripe from 'stripe';
import { paymentLimiter } from '../middleware/rateLimiter';
import helmet from 'helmet';

export const paymentsRouter = Router();

// Add security headers
paymentsRouter.use(helmet());

// Apply rate limiting to all payment routes
paymentsRouter.use(paymentLimiter);

// Create a checkout session
paymentsRouter.post('/create-checkout-session', async (req, res) => {
  try {
    const { priceId, productName, amount, currency } = req.body;
    
    if (!priceId) {
      // If no priceId is provided, create a one-time payment
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: currency || 'usd',
            product_data: {
              name: productName || 'Product',
            },
            unit_amount: amount || 1500, // $15.00 in cents by default
          },
          quantity: 1,
        }],
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/canceled`,
      });

      return res.json({ id: session.id, url: session.url });
    }

    // If priceId is provided, use it directly
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/canceled`,
    });

    res.json({ id: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ 
      error: 'Failed to create checkout session',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Create a payment intent
paymentsRouter.post('/create-payment-intent', async (req, res) => {
  try {
    // In a real app, you'd typically get this from your database
    const { amount, currency = 'usd' } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).send({ error: 'Failed to create payment intent' });
  }
});

// Webhook handler for Stripe events
paymentsRouter.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'] as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    if (!endpointSecret) throw new Error('Webhook secret not configured');
    
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      endpointSecret
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error(`Webhook Error: ${errorMessage}`);
    return res.status(400).send(`Webhook Error: ${errorMessage}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent was successful!', paymentIntent.id);
      // Update your database here
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      console.log('PaymentMethod was attached!', paymentMethod);
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.json({ received: true });
});
