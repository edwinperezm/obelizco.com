import type { HandlerEvent, HandlerContext, HandlerResponse } from '@netlify/functions';
import Stripe from 'stripe';
import { createRequestLogger } from '../utils/logger';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16', // Using the correct Stripe API version
});

const createResponse = (
  statusCode: number, 
  body: unknown = '', 
  extraHeaders: Record<string, string> = {}
): HandlerResponse => ({
  statusCode,
  headers: {
    'content-type': 'application/json',
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET,POST,OPTIONS',
    'access-control-allow-headers': 'Content-Type,Authorization',
    ...extraHeaders,
  },
  body: typeof body === 'string' ? body : JSON.stringify(body)
});

const createCheckoutSession = async (
  event: HandlerEvent,
  context: HandlerContext
): Promise<HandlerResponse> => {
  const logger = createRequestLogger(context);
  
  logger.info('Checkout request received', {
    httpMethod: event.httpMethod,
    path: event.path,
    headers: event.headers,
    body: event.body,
    env: {
      NODE_ENV: process.env.NODE_ENV,
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ? '***' : 'MISSING',
      FRONTEND_URL: process.env.FRONTEND_URL,
    }
  });
  
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    logger.warn('Method not allowed', { method: event.httpMethod });
    return createResponse(405, { error: 'Method Not Allowed' });
  }

  try {
    // Parse the request body
    const body = JSON.parse(event.body || '{}');
    logger.info('Parsed request body', { body });
    
    const { productName, amount, currency = 'usd' } = body;

    // Validate the request
    if (!productName || !amount) {
      logger.error('Missing required fields', { productName, amount });
      return createResponse(400, { 
        error: 'Missing required fields',
        received: { productName, amount }
      });
    }

    // Create a checkout session
    logger.info('Creating Stripe checkout session', {
      productName,
      amount,
      currency,
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/canceled`
    });

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: currency.toLowerCase(),
              product_data: {
                name: productName,
              },
              unit_amount: amount, // amount in smallest currency unit (e.g., cents)
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/canceled`,
      });

      logger.info('Stripe session created successfully', { 
        sessionId: session.id,
        url: session.url 
      });

      return createResponse(200, { 
        sessionId: session.id,
        url: session.url 
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      
      logger.error('Stripe checkout session creation failed', { 
        error: errorMessage,
        stack: errorStack,
        request: {
          productName,
          amount,
          currency,
          success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${process.env.FRONTEND_URL}/canceled`
        }
      });
      
      return createResponse(500, { 
        error: 'Failed to create checkout session',
        ...(process.env.NODE_ENV !== 'production' && { 
          message: errorMessage,
          stack: errorStack
        })
      });
    }
  } catch (error) {
    logger.error('Error creating checkout session:', { error });
    
    return createResponse(500, { 
      error: 'Failed to create checkout session',
      ...(process.env.NODE_ENV !== 'production' && { 
        message: error instanceof Error ? error.message : 'Unknown error'
      })
    });
  }
};

// Export as default handler
export const handler = async (event: HandlerEvent, context: HandlerContext) => {
  return createCheckoutSession(event, context);
};
