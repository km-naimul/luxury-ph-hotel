import express from 'express';
import { submitContact, getContacts } from '../controllers/contact.controller';
import { validateContact } from '../middleware/validation.middleware';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { apiLimiter } from '../middleware/rateLimiter.middleware';

const router = express.Router();

// POST /api/contact - Submit contact form (public, rate-limited, validated)
router.post('/', apiLimiter, validateContact, submitContact);

// GET /api/contact - Get all contact submissions (protected - admin/staff only)
router.get('/', authenticate, authorize('admin', 'staff'), getContacts);

export default router;
