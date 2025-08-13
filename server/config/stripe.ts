import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
}

// Only require publishable key if we're not in a server environment
if (!process.env.STRIPE_PUBLISHABLE_KEY && typeof window !== 'undefined') {
  console.warn('STRIPE_PUBLISHABLE_KEY is not defined in environment variables');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  typescript: true,
});

export { stripe };

export const getStripePublishableKey = (): string | undefined => {
  return process.env.STRIPE_PUBLISHABLE_KEY;
};