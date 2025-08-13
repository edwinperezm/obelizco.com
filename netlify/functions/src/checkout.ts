import { Handler, HandlerEvent } from '@netlify/functions';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

const handler: Handler = async (event: HandlerEvent) => {
  console.log('Received request:', {
    httpMethod: event.httpMethod,
    path: event.path,
    headers: event.headers,
    body: event.body,
  });

  // Define CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': 'http://localhost:3001',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Credentials': 'true',
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      } as Record<string, string>,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    };
  }

  try {
    if (!event.body) {
      throw new Error('No request body provided');
    }

    // Parse the request body
    const { productName, amount, currency = 'usd' } = JSON.parse(event.body);
    console.log('Parsed request body:', { productName, amount, currency });

    // Validate the request
    if (!productName || !amount) {
      const error = new Error('Missing required fields');
      console.error('Validation error:', error);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: error.message }),
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      };
    }

    // Create a checkout session
    console.log('Creating Stripe checkout session...');
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: productName,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:3001/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3001/canceled`,
    });

    console.log('Stripe session created:', { sessionId: session.id });

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        sessionId: session.id, 
        url: session.url,
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY ? 'publishable key is set' : 'publishable key is NOT set',
      }),
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in checkout handler:', errorMessage, error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to create checkout session',
        details: errorMessage,
        stack: process.env.NODE_ENV === 'development' && error instanceof Error ? error.stack : undefined,
      }),
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    };
  }
};

export { handler };
