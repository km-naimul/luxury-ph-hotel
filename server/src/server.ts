import app from './app';
import { env } from './config/env';
import { connectDatabase } from './config/database';

const startServer = async (): Promise<void> => {
  try {
    // Connect to MongoDB (commented out for now, uncomment when ready to use)
    // await connectDatabase();

    // Start Express server
    app.listen(env.port, () => {
      console.log(`🚀 Server is running on http://localhost:${env.port}`);
      console.log(`📊 Environment: ${env.nodeEnv}`);
      console.log(`🔗 Health check: http://localhost:${env.port}/health`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
