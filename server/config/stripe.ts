import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
}

if (!process.env.STRIPE_PUBLISHABLE_KEY) {
  throw new Error('STRIPE_PUBLISHABLE_KEY is not defined in environment variables');
}

// Use the latest stable API version that matches your Stripe package
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16', // Use the latest stable version compatible with your Stripe package
  typescript: true,
});

export { stripe };

// We can safely use non-null assertion here because we've already checked it exists
export const getStripePublishableKey = (): string => {
  return process.env.STRIPE_PUBLISHABLE_KEY!;
};
