// server/api/index.ts
import { Router } from 'express';
import { handleCheckout } from './stripe/checkout';

const router = Router();

// Stripe checkout endpoint
router.post('/stripe/checkout', handleCheckout);

export default router;