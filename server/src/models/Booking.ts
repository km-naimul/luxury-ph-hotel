import mongoose, { Schema, Document, Types } from 'mongoose';

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface IBooking extends Document {
  bookingNumber: string;
  room: Types.ObjectId;
  guest: Types.ObjectId;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  status: BookingStatus;
  totalAmount: number;
  roomRate: number;
  tax: number;
  serviceCharge: number;
  specialRequests?: string;
  confirmationEmailSent: boolean;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentIntentId?: string;
  stripePaymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema: Schema = new Schema(
  {
    bookingNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
      required: [true, 'Room is required'],
    },
    guest: {
      type: Schema.Types.ObjectId,
      ref: 'Guest',
      required: [true, 'Guest is required'],
    },
    checkIn: {
      type: Date,
      required: [true, 'Check-in date is required'],
    },
    checkOut: {
      type: Date,
      required: [true, 'Check-out date is required'],
      validate: {
        validator: function (this: IBooking, value: Date) {
          return value > this.checkIn;
        },
        message: 'Check-out date must be after check-in date',
      },
    },
    guests: {
      type: Number,
      required: [true, 'Number of guests is required'],
      min: [1, 'At least one guest is required'],
      max: [10, 'Maximum 10 guests per room'],
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'confirmed',
    },
    totalAmount: {
      type: Number,
      required: true,
      min: [0, 'Total amount must be positive'],
    },
    roomRate: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
      default: 0,
    },
    serviceCharge: {
      type: Number,
      required: true,
      default: 0,
    },
    specialRequests: {
      type: String,
      trim: true,
    },
    confirmationEmailSent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries (bookingNumber already indexed by unique: true)
BookingSchema.index({ room: 1 });
BookingSchema.index({ guest: 1 });
BookingSchema.index({ checkIn: 1, checkOut: 1 });
BookingSchema.index({ status: 1 });
BookingSchema.index({ createdAt: -1 });

export default mongoose.model<IBooking>('Booking', BookingSchema);
