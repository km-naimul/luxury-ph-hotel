import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Booking, { IBooking } from '../models/Booking';
import Room from '../models/Room';
import Guest from '../models/Guest';
import { AuthRequest } from '../middleware/auth.middleware';

// Create a new booking (public endpoint but rate-limited)
export const createBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      roomId,
      firstName,
      lastName,
      email,
      phone,
      checkIn,
      checkOut,
      guests,
      specialRequests,
    } = req.body;

    // Validation is handled by middleware, but keep basic checks for safety

    // Find or create guest
    let guest = await Guest.findOne({ email });
    if (!guest) {
      guest = await Guest.create({
        firstName,
        lastName,
        email,
        phone,
      });
    } else {
      // Update guest info if exists
      guest.firstName = firstName;
      guest.lastName = lastName;
      guest.phone = phone;
      await guest.save();
    }

    // Get room (support both MongoDB _id and slug)
    let room;
    if (mongoose.Types.ObjectId.isValid(roomId)) {
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

    // Calculate pricing
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    
    const roomRate = room.price * nights;
    const tax = roomRate * 0.15; // 15% tax
    const serviceCharge = roomRate * 0.10; // 10% service charge
    const totalAmount = roomRate + tax + serviceCharge;

    // Generate booking number
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    const bookingNumber = `SK-${timestamp}-${random}`;

    // Create booking (status will be confirmed after payment)
    const booking = await Booking.create({
      bookingNumber,
      room: room._id,
      guest: guest._id,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: parseInt(guests),
      status: 'pending', // Will be confirmed after payment
      roomRate,
      tax,
      serviceCharge,
      totalAmount,
      specialRequests: specialRequests || '',
      paymentStatus: 'pending',
    });

    // Populate room and guest details
    await booking.populate('room');
    await booking.populate('guest');

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error creating booking',
      error: error.message,
    });
  }
};

// Get all bookings (with filters) - protected
export const getBookings = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status } = req.query;
    
    const filter: any = {};
    
    // Admin/staff can see all bookings, guests can only see their own
    const isAdminOrStaff = req.user?.role === 'admin' || req.user?.role === 'staff';
    if (!isAdminOrStaff) {
      // For guests, filter by their email
      const guest = await Guest.findOne({ email: req.user?.email });
      if (guest) {
        filter.guest = guest._id;
      } else {
        res.status(200).json({
          success: true,
          count: 0,
          data: [],
        });
        return;
      }
    }
    
    if (status) {
      filter.status = status;
    }

    const bookings = await Booking.find(filter)
      .populate('room')
      .populate('guest')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: error.message,
    });
  }
};

// Get single booking by ID - protected
export const getBookingById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('room')
      .populate('guest');

    if (!booking) {
      res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
      return;
    }

    // Check authorization: admin/staff can see any booking, guests can only see their own
    const isAdminOrStaff = req.user?.role === 'admin' || req.user?.role === 'staff';
    const isOwner = (booking.guest as any).email === req.user?.email;

    if (!isAdminOrStaff && !isOwner) {
      res.status(403).json({
        success: false,
        message: 'Access denied. You can only view your own bookings.',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error fetching booking',
      error: error.message,
    });
  }
};

// Update a booking - protected
export const updateBooking = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status, checkIn, checkOut, guests, specialRequests } = req.body;

    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      res.status(404).json({ success: false, message: 'Booking not found' });
      return;
    }

    // Authorization: Only admin/staff can update bookings
    const isAdminOrStaff = req.user?.role === 'admin' || req.user?.role === 'staff';
    if (!isAdminOrStaff) {
      res.status(403).json({ 
        success: false, 
        message: 'Access denied. Only admin/staff can update bookings.' 
      });
      return;
    }

    // Update fields
    if (status) booking.status = status;
    if (checkIn) booking.checkIn = new Date(checkIn);
    if (checkOut) booking.checkOut = new Date(checkOut);
    if (guests) booking.guests = parseInt(guests);
    if (specialRequests !== undefined) booking.specialRequests = specialRequests;

    // Recalculate total if dates change
    if (checkIn || checkOut) {
      await booking.populate('room');
      const room = booking.room as any;
      const newCheckInDate = booking.checkIn;
      const newCheckOutDate = booking.checkOut;
      const newNights = Math.ceil((newCheckOutDate.getTime() - newCheckInDate.getTime()) / (1000 * 60 * 60 * 24));
      
      const newRoomRate = room.price * newNights;
      const newTax = newRoomRate * 0.15;
      const newServiceCharge = newRoomRate * 0.10;
      booking.roomRate = newRoomRate;
      booking.tax = newTax;
      booking.serviceCharge = newServiceCharge;
      booking.totalAmount = newRoomRate + newTax + newServiceCharge;
    }

    await booking.save();
    await booking.populate('room');
    await booking.populate('guest');

    res.status(200).json({
      success: true,
      message: 'Booking updated successfully',
      data: booking,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error updating booking',
      error: error.message,
    });
  }
};

// Cancel a booking - protected
export const cancelBooking = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      res.status(404).json({ success: false, message: 'Booking not found' });
      return;
    }

    // Authorization: Admin/staff can cancel any booking. Guests can cancel their own if not completed.
    const isAdminOrStaff = req.user?.role === 'admin' || req.user?.role === 'staff';
    await booking.populate('guest');
    const isOwner = (booking.guest as any).email === req.user?.email;

    if (!isAdminOrStaff && (!isOwner || booking.status === 'completed')) {
      res.status(403).json({ 
        success: false, 
        message: 'Access denied. You cannot cancel this booking.' 
      });
      return;
    }

    booking.status = 'cancelled';
    await booking.save();
    await booking.populate('room');
    await booking.populate('guest');

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      data: booking,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error cancelling booking',
      error: error.message,
    });
  }
};
