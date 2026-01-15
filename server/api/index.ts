// Vercel serverless function entry point
import app from '../src/app';
import { connectDatabase } from '../src/config/database';

// Connect to MongoDB (cached connection for serverless)
let isConnected = false;

const connectDB = async () => {
  if (!isConnected) {
    try {
      await connectDatabase();
      isConnected = true;
    } catch (error) {
      console.error('Database connection error:', error);
    }
  }
};

// Connect on first invocation
connectDB();

export default app;
