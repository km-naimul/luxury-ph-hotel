// Quick test to check database collections
require('dotenv').config();
const mongoose = require('mongoose');

const testDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    
    console.log('\n📊 Collections in database:');
    if (collections.length === 0) {
      console.log('  (No collections yet - they will be created when data is inserted)');
    } else {
      collections.forEach(col => {
        console.log(`  - ${col.name}`);
      });
    }
    
    // Check room count
    const Room = mongoose.model('Room', new mongoose.Schema({}, { strict: false }));
    const roomCount = await Room.countDocuments();
    console.log(`\n🛏️  Rooms in database: ${roomCount}`);
    
    if (roomCount > 0) {
      const sampleRoom = await Room.findOne();
      console.log(`\n📝 Sample room:`, {
        name: sampleRoom.name,
        slug: sampleRoom.slug,
        price: sampleRoom.price
      });
    }
    
    // Check booking count
    const Booking = mongoose.model('Booking', new mongoose.Schema({}, { strict: false }));
    const bookingCount = await Booking.countDocuments();
    console.log(`\n📅 Bookings in database: ${bookingCount}`);
    
    // Check guest count
    const Guest = mongoose.model('Guest', new mongoose.Schema({}, { strict: false }));
    const guestCount = await Guest.countDocuments();
    console.log(`\n👤 Guests in database: ${guestCount}`);
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

testDB();
