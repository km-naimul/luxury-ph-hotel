import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Room from '../models/Room';
import Booking from '../models/Booking';

// Get all rooms (public endpoint)
export const getRooms = async (req: Request, res: Response): Promise<void> => {
  try {
    const rooms = await Room.find({ isAvailable: true }).sort({ price: 1 });
    res.status(200).json({
      success: true,
      count: rooms.length,
      data: rooms,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error fetching rooms',
      error: error.message,
    });
  }
};

// Get single room by ID or slug (public endpoint)
export const getRoomById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    let room;
    if (mongoose.Types.ObjectId.isValid(id)) {
      room = await Room.findById(id);
    } else {
      room = await Room.findOne({ slug: id });
    }

    if (!room) {
      res.status(404).json({
        success: false,
        message: 'Room not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: room,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error fetching room',
      error: error.message,
    });
  }
};

// Check room availability (public endpoint)
export const checkAvailability = async (req: Request, res: Response): Promise<void> => {
  try {
    const { roomId, checkIn, checkOut } = req.query;

    if (!roomId || !checkIn || !checkOut) {
      res.status(400).json({
        success: false,
        message: 'Room ID, check-in date, and check-out date are required',
      });
      return;
    }

    const checkInDate = new Date(checkIn as string);
    const checkOutDate = new Date(checkOut as string);

    // Find room
    let room;
    if (mongoose.Types.ObjectId.isValid(roomId as string)) {
      room = await Room.findById(roomId);
    } else {
      room = await Room.findOne({ slug: roomId });
    }

    if (!room) {
      res.status(404).json({
        success: false,
        message: 'Room not found',
      });
      return;
    }

    // Check for conflicting bookings
    const conflictingBookings = await Booking.find({
      room: room._id,
      status: { $in: ['confirmed', 'pending'] },
      $or: [
        {
          checkIn: { $lt: checkOutDate },
          checkOut: { $gt: checkInDate },
        },
      ],
    });

    const isAvailable = conflictingBookings.length === 0;

    res.status(200).json({
      success: true,
      data: {
        roomId: room._id,
        roomName: room.name,
        isAvailable,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        conflictingBookings: conflictingBookings.length,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error checking availability',
      error: error.message,
    });
  }
};
