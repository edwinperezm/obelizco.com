import rateLimit from 'express-rate-limit';

// Configure rate limiting for payment endpoints
export const paymentLimiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW_MS 
    ? parseInt(process.env.RATE_LIMIT_WINDOW_MS as string, 10) 
    : 15 * 60 * 1000, // Default: 15 minutes
  max: process.env.RATE_LIMIT_MAX_REQUESTS 
    ? parseInt(process.env.RATE_LIMIT_MAX_REQUESTS as string, 10) 
    : 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many payment attempts, please try again later.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Export other rate limiters as needed
export default {
  paymentLimiter,
};
