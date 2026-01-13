import mongoose from 'mongoose';
import User from '../models/User';
import Booking from '../models/Booking';
import Guest from '../models/Guest';
import Room from '../models/Room';
import { connectDatabase } from '../config/database';
import dotenv from 'dotenv';

dotenv.config();

// Dummy credentials - USE THESE TO LOGIN
const DUMMY_USERS = [
  {
    email: 'admin@skhotel.com',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin' as const,
  },
  {
    email: 'john.doe@email.com',
    password: 'customer123',
    firstName: 'John',
    lastName: 'Doe',
    role: 'guest' as const,
  },
  {
    email: 'jane.smith@email.com',
    password: 'customer123',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'guest' as const,
  },
];

const seedUsers = async () => {
  try {
    await connectDatabase();
    console.log('✅ Connected to database');

    // Clear existing users (optional - comment out if you want to keep existing users)
    // await User.deleteMany({});
    // console.log('🗑️  Cleared existing users');

    // Create users
    const createdUsers = [];
    for (const userData of DUMMY_USERS) {
      // Check if user already exists
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        console.log(`⚠️  User ${userData.email} already exists, skipping...`);
        createdUsers.push(existingUser);
        continue;
      }

      const user = await User.create(userData);
      console.log(`✅ Created user: ${user.email} (${user.role})`);
      createdUsers.push(user);
    }

    // Create some bookings for the customer users
    const rooms = await Room.find().limit(2);
    if (rooms.length === 0) {
      console.log('⚠️  No rooms found. Please run seedRooms first: npm run seed');
      return;
    }

    const customers = createdUsers.filter(u => u.role === 'guest');
    
    for (let i = 0; i < customers.length && i < rooms.length; i++) {
      const customer = customers[i];
      const room = rooms[i];

      // Check if guest exists
      let guest = await Guest.findOne({ email: customer.email });
      if (!guest) {
        guest = await Guest.create({
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          phone: `+1-555-000-${1000 + i}`,
        });
        console.log(`✅ Created guest: ${guest.email}`);
      }

      // Check if booking already exists for this guest
      const existingBooking = await Booking.findOne({ guest: guest._id });
      if (existingBooking) {
        console.log(`⚠️  Booking already exists for ${customer.email}, skipping...`);
        continue;
      }

      // Create booking
      const checkIn = new Date();
      checkIn.setDate(checkIn.getDate() + 7); // 7 days from now
      const checkOut = new Date(checkIn);
      checkOut.setDate(checkOut.getDate() + 3); // 3 nights stay
      
      const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
      const roomRate = room.price * nights;
      const tax = roomRate * 0.15;
      const serviceCharge = roomRate * 0.10;
      const totalAmount = roomRate + tax + serviceCharge;

      const timestamp = Date.now();
      const random = Math.floor(Math.random() * 1000);
      const bookingNumber = `SK-${timestamp}-${random}`;

      const booking = await Booking.create({
        bookingNumber,
        room: room._id,
        guest: guest._id,
        checkIn,
        checkOut,
        guests: 2,
        status: i === 0 ? 'confirmed' : 'pending', // First customer has confirmed booking
        roomRate,
        tax,
        serviceCharge,
        totalAmount,
        paymentStatus: i === 0 ? 'paid' : 'pending',
        specialRequests: `Test booking for ${customer.firstName} ${customer.lastName}`,
      });

      console.log(`✅ Created booking ${booking.bookingNumber} for ${customer.email}`);
    }

    console.log('\n🎉 User seeding completed!\n');
    console.log('📋 LOGIN CREDENTIALS:');
    console.log('═══════════════════════════════════════');
    console.log('\n🔑 ADMIN ACCOUNT:');
    console.log('   Email: admin@skhotel.com');
    console.log('   Password: admin123');
    console.log('   Access: Admin Dashboard');
    console.log('\n👤 CUSTOMER ACCOUNTS:');
    console.log('\n   Customer 1:');
    console.log('   Email: john.doe@email.com');
    console.log('   Password: customer123');
    console.log('\n   Customer 2:');
    console.log('   Email: jane.smith@email.com');
    console.log('   Password: customer123');
    console.log('\n═══════════════════════════════════════\n');

  } catch (error: any) {
    console.error('❌ Error seeding users:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('📴 Database connection closed');
    process.exit(0);
  }
};

seedUsers();
