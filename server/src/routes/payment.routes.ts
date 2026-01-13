import express from 'express';
import { createPaymentIntent, verifyPayment, handleWebhook } from '../controllers/payment.controller';
import { authenticate } from '../middleware/auth.middleware';
import { apiLimiter } from '../middleware/rateLimiter.middleware';

const router = express.Router();

// POST /api/payments/create-intent - Create payment intent (protected)
router.post('/create-intent', apiLimiter, authenticate, createPaymentIntent);

// GET /api/payments/verify/:bookingId - Verify payment status (protected)
router.get('/verify/:bookingId', apiLimiter, authenticate, verifyPayment);

// POST /api/payments/webhook - Stripe webhook (public, but verified by Stripe signature)
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

export default router;
