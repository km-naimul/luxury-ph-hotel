import express from 'express';
import { getRooms, getRoomById, checkAvailability } from '../controllers/rooms.controller';

const router = express.Router();

// GET /api/rooms/availability - Check room availability
router.get('/availability', checkAvailability);

// GET /api/rooms - Get all rooms
router.get('/', getRooms);

// GET /api/rooms/:id - Get single room (by ID or slug)
router.get('/:id', getRoomById);

export default router;
