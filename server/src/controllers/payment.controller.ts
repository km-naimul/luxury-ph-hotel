import { Request, Response } from 'express';
import Stripe from 'stripe';
import { env } from '../config/env';
import Booking from '../models/Booking';
import { AuthRequest } from '../middleware/auth.middleware';

// Initialize Stripe only if secret key is provided and not empty
let stripe: Stripe | null = null;
if (env.stripeSecretKey && env.stripeSecretKey.trim() !== '' && env.stripeSecretKey !== 'your_stripe_secret_key_here') {
  try {
    stripe = new Stripe(env.stripeSecretKey, {
      apiVersion: '2024-11-20.acacia' as any,
    });
  } catch (error) {
    console.warn('⚠️ Stripe initialization failed. Payment features will be disabled.');
    stripe = null;
  }
}

// Create payment intent for booking
export const createPaymentIntent = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!stripe) {
      res.status(503).json({
        success: false,
        message: 'Payment service is not configured. Please contact support.',
      });
      return;
    }

    const { bookingId } = req.body;

    if (!bookingId) {
      res.status(400).json({
        success: false,
        message: 'Booking ID is required',
      });
      return;
    }

    const booking = await Booking.findById(bookingId).populate('guest room');
    if (!booking) {
      res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
      return;
    }

    // Verify booking belongs to user (unless admin/staff)
    const isAdminOrStaff = req.user?.role === 'admin' || req.user?.role === 'staff';
    const isOwner = (booking.guest as any).email === req.user?.email;

    if (!isAdminOrStaff && !isOwner) {
      res.status(403).json({
        success: false,
        message: 'Access denied',
      });
      return;
    }

    // Check if payment already completed
    if (booking.paymentStatus === 'paid') {
      res.status(400).json({
        success: false,
        message: 'Booking is already paid',
      });
      return;
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(booking.totalAmount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        bookingId: booking._id.toString(),
        bookingNumber: booking.bookingNumber,
      },
      description: `Payment for booking ${booking.bookingNumber}`,
    });

    // Update booking with payment intent ID
    booking.paymentIntentId = paymentIntent.id;
    await booking.save();

    res.status(200).json({
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error creating payment intent',
      error: error.message,
    });
  }
};

// Handle Stripe webhook
export const handleWebhook = async (req: Request, res: Response): Promise<void> => {
  const sig = req.headers['stripe-signature'] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, env.stripeWebhookSecret);
  } catch (err: any) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      await handlePaymentSuccess(paymentIntent);
      break;
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object as Stripe.PaymentIntent;
      await handlePaymentFailure(failedPayment);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};

const handlePaymentSuccess = async (paymentIntent: Stripe.PaymentIntent) => {
  try {
    const booking = await Booking.findOne({ paymentIntentId: paymentIntent.id });
    if (booking) {
      booking.paymentStatus = 'paid';
      booking.status = 'confirmed';
      booking.stripePaymentId = paymentIntent.id;
      await booking.save();
    }
  } catch (error) {
    console.error('Error handling payment success:', error);
  }
};

const handlePaymentFailure = async (paymentIntent: Stripe.PaymentIntent) => {
  try {
    const booking = await Booking.findOne({ paymentIntentId: paymentIntent.id });
    if (booking) {
      booking.paymentStatus = 'failed';
      await booking.save();
    }
  } catch (error) {
    console.error('Error handling payment failure:', error);
  }
};

// Verify payment status
export const verifyPayment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
      return;
    }

    // Verify booking belongs to user
    const isAdminOrStaff = req.user?.role === 'admin' || req.user?.role === 'staff';
    const isOwner = (booking.guest as any).email === req.user?.email;

    if (!isAdminOrStaff && !isOwner) {
      res.status(403).json({
        success: false,
        message: 'Access denied',
      });
      return;
    }

    // If payment intent exists, check with Stripe
    if (booking.paymentIntentId) {
      try {
        const paymentIntent = await stripe.paymentIntents.retrieve(booking.paymentIntentId);
        
        // Update booking status based on Stripe status
        if (paymentIntent.status === 'succeeded' && booking.paymentStatus !== 'paid') {
          booking.paymentStatus = 'paid';
          booking.status = 'confirmed';
          booking.stripePaymentId = paymentIntent.id;
          await booking.save();
        }
      } catch (error) {
        console.error('Error verifying payment with Stripe:', error);
      }
    }

    res.status(200).json({
      success: true,
      data: {
        paymentStatus: booking.paymentStatus,
        bookingStatus: booking.status,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error verifying payment',
      error: error.message,
    });
  }
};
