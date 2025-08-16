// server/api/index.ts
import { Router } from 'express';
import { handleCheckout } from './stripe/checkout';

const router = Router();

// Stripe checkout endpoint
router.post('/stripe', handleCheckout);

export default router;