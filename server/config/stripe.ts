import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
}

if (!process.env.STRIPE_PUBLISHABLE_KEY) {
  throw new Error('STRIPE_PUBLISHABLE_KEY is not defined in environment variables');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-07-30.basil',
  typescript: true,
});

// We can safely use non-null assertion here because we've already checked it exists
export const getStripePublishableKey = (): string => {
  return process.env.STRIPE_PUBLISHABLE_KEY!;
};
