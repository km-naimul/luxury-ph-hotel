import express, { Express } from 'express';
import cors from 'cors';
import { env } from './config/env';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';

const app: Express = express();

// Middleware
app.use(cors({
  origin: env.clientUrl,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'SK+ Hotel API is running',
    timestamp: new Date().toISOString(),
  });
});

// API routes will be added here in future phases
// Example:
// app.use('/api/auth', authRoutes);
// app.use('/api/rooms', roomsRoutes);
// app.use('/api/bookings', bookingsRoutes);

// Error handling middleware (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
