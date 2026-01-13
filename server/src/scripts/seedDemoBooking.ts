import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Room from '../models/Room';
import Booking from '../models/Booking';
import Guest from '../models/Guest';
import { connectDatabase } from '../config/database';

dotenv.config();

const seedDemoBooking = async (): Promise<void> => {
  try {
    await connectDatabase();
    
    // Get a room (use the first room)
    const room = await Room.findOne({ slug: 'deluxe-room' });
    if (!room) {
      console.error('❌ No rooms found. Please seed rooms first.');
      process.exit(1);
    }

    // Create or get demo guest
    let guest = await Guest.findOne({ email: 'demo@skhotel.com' });
    if (!guest) {
      guest = await Guest.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'demo@skhotel.com',
        phone: '+1 (555) 123-4567',
        address: '123 Demo Street',
        city: 'Demo City',
        country: 'USA',
      });
      console.log('✅ Created demo guest');
    } else {
      console.log('✅ Demo guest already exists');
    }

    // Create demo booking
    const checkInDate = new Date();
    checkInDate.setDate(checkInDate.getDate() + 7); // 7 days from now
    
    const checkOutDate = new Date(checkInDate);
    checkOutDate.setDate(checkOutDate.getDate() + 3); // 3 nights stay
    
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    const roomRate = room.price * nights;
    const tax = roomRate * 0.15;
    const serviceCharge = roomRate * 0.10;
    const totalAmount = roomRate + tax + serviceCharge;

    // Check if demo booking already exists
    const existingBooking = await Booking.findOne({
      guest: guest._id,
      room: room._id,
      checkIn: checkInDate,
    });

    if (!existingBooking) {
      // Generate booking number
      const timestamp = Date.now();
      const random = Math.floor(Math.random() * 1000);
      const bookingNumber = `SK-${timestamp}-${random}`;

      const booking = await Booking.create({
        bookingNumber,
        room: room._id,
        guest: guest._id,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests: 2,
        status: 'confirmed',
        roomRate,
        tax,
        serviceCharge,
        totalAmount,
        specialRequests: 'Demo booking - Please handle with care. Early check-in preferred.',
      });

      console.log('✅ Created demo booking');
      console.log(`   Booking Number: ${booking.bookingNumber}`);
      console.log(`   Room: ${room.name}`);
      console.log(`   Guest: ${guest.firstName} ${guest.lastName}`);
      console.log(`   Check-in: ${checkInDate.toLocaleDateString()}`);
      console.log(`   Check-out: ${checkOutDate.toLocaleDateString()}`);
      console.log(`   Total: $${totalAmount.toFixed(2)}`);
    } else {
      console.log('✅ Demo booking already exists');
      console.log(`   Booking Number: ${existingBooking.bookingNumber}`);
    }

    // Show collection counts
    const bookingCount = await Booking.countDocuments();
    const guestCount = await Guest.countDocuments();
    
    console.log('\n📊 Collection Status:');
    console.log(`   Bookings: ${bookingCount}`);
    console.log(`   Guests: ${guestCount}`);
    console.log('\n✅ Demo data created successfully!');
    console.log('   Check MongoDB Atlas - you should now see "bookings" and "guests" collections!');
    
    process.exit(0);
  } catch (error: any) {
    console.error('❌ Error creating demo booking:', error.message);
    process.exit(1);
  }
};

seedDemoBooking();
