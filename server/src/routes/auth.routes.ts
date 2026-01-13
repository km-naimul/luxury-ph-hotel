import express from 'express';
import { register, login, getMe } from '../controllers/auth.controller';
import { validateRegister, validateLogin } from '../middleware/validation.middleware';
import { authenticate } from '../middleware/auth.middleware';
import { authLimiter, apiLimiter } from '../middleware/rateLimiter.middleware';

const router = express.Router();

// POST /api/auth/register - Register new user
router.post('/register', authLimiter, validateRegister, register);

// POST /api/auth/login - Login user
router.post('/login', authLimiter, validateLogin, login);

// GET /api/auth/me - Get current user (protected)
router.get('/me', apiLimiter, authenticate, getMe);

export default router;
