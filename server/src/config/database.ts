import mongoose from 'mongoose';
import { env } from './env';

export const connectDatabase = async (): Promise<void> => {
  try {
    let connectionString = env.mongodbUri;

    // If MongoDB credentials are provided, construct connection string
    if (env.mongodbUser && env.mongodbPassword) {
      // For MongoDB Atlas or authenticated local MongoDB
      connectionString = env.mongodbUri.replace(
        'mongodb://',
        `mongodb://${env.mongodbUser}:${env.mongodbPassword}@`
      );
    }

    await mongoose.connect(connectionString);

    console.log('✅ MongoDB connected successfully');

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected');
    });
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
    // In production, you might want to exit the process
    // process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed through app termination');
  process.exit(0);
});
