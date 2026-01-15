import express, { Express } from 'express';
import cors from 'cors';
import { env } from './config/env';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';

const app: Express = express();

// Middleware
// Allow multiple origins for development and production
const allowedOrigins = env.clientUrl.includes(',') 
  ? env.clientUrl.split(',').map(url => url.trim())
  : [
      env.clientUrl,
      'http://localhost:5173',
      'https://luxury-ph-hotel.web.app',
      'https://luxury-ph-hotel.firebaseapp.com'
    ];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin) || allowedOrigins.some(allowed => origin?.startsWith(allowed))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
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

// API routes
import roomsRoutes from './routes/rooms.routes';
import bookingsRoutes from './routes/bookings.routes';
import authRoutes from './routes/auth.routes';
import contactRoutes from './routes/contact.routes';
import paymentRoutes from './routes/payment.routes';
import { apiLimiter } from './middleware/rateLimiter.middleware';

// Apply rate limiting to all API routes (except webhooks)
app.use('/api', (req, res, next) => {
  if (req.path.startsWith('/payments/webhook')) {
    return next(); // Skip rate limiting for webhooks
  }
  return apiLimiter(req, res, next);
});

app.use('/api/rooms', roomsRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/payments', paymentRoutes);

// Error handling middleware (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
