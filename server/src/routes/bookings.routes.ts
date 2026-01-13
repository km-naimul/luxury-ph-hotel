import express from 'express';
import { createBooking, getBookings, getBookingById, updateBooking, cancelBooking } from '../controllers/bookings.controller';
import { validateBooking } from '../middleware/validation.middleware';
import { authenticate } from '../middleware/auth.middleware';
import { bookingLimiter } from '../middleware/rateLimiter.middleware';

const router = express.Router();

// POST /api/bookings - Create new booking (public, rate-limited, validated)
router.post('/', bookingLimiter, validateBooking, createBooking);

// GET /api/bookings - Get all bookings (protected - admin/staff can see all, guests see their own)
router.get('/', authenticate, getBookings);

// GET /api/bookings/:id - Get single booking (protected)
router.get('/:id', authenticate, getBookingById);

// PUT /api/bookings/:id - Update booking (protected)
router.put('/:id', authenticate, updateBooking);

// DELETE /api/bookings/:id - Cancel booking (protected)
router.delete('/:id', authenticate, cancelBooking);

export default router;
