import mongoose, { Schema, Document } from 'mongoose';

export interface IGuest extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  country?: string;
  dateOfBirth?: Date;
  preferences?: {
    roomType?: string;
    specialRequests?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const GuestSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
    },
    preferences: {
      roomType: String,
      specialRequests: String,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
GuestSchema.index({ email: 1 });
GuestSchema.index({ phone: 1 });

export default mongoose.model<IGuest>('Guest', GuestSchema);
