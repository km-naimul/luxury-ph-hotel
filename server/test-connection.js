// Simple MongoDB connection test
require('dotenv').config();
const mongoose = require('mongoose');

const testConnection = async () => {
  try {
    console.log('🔄 Attempting to connect to MongoDB...');
    console.log('Connection string:', process.env.MONGODB_URI.replace(/:[^:@]+@/, ':****@'));
    
    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('✅ MongoDB connected successfully!');
    console.log('📊 Database name:', mongoose.connection.name);
    console.log('🔗 Host:', mongoose.connection.host);
    
    // Test: Create a simple collection to verify database creation
    const testCollection = mongoose.connection.db.collection('test');
    await testCollection.insertOne({ test: 'connection', timestamp: new Date() });
    console.log('✅ Test document created - database is ready!');
    
    // Clean up test document
    await testCollection.deleteOne({ test: 'connection' });
    console.log('🧹 Test document cleaned up');
    
    await mongoose.connection.close();
    console.log('✅ Connection test completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    process.exit(1);
  }
};

testConnection();
