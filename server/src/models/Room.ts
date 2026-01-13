import mongoose, { Schema, Document } from 'mongoose';

export interface IRoom extends Document {
  slug: string;
  name: string;
  category: string;
  description: string;
  images: string[];
  price: number;
  size: string;
  capacity: string;
  bedType: string;
  features: string[];
  amenities: string[];
  highlights: string[];
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const RoomSchema: Schema = new Schema(
  {
    slug: {
      type: String,
      required: [true, 'Room slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: [true, 'Room name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Room category is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Room description is required'],
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
    price: {
      type: Number,
      required: [true, 'Room price is required'],
      min: [0, 'Price must be positive'],
    },
    size: {
      type: String,
      required: true,
    },
    capacity: {
      type: String,
      required: true,
    },
    bedType: {
      type: String,
      required: true,
    },
    features: {
      type: [String],
      default: [],
    },
    amenities: {
      type: [String],
      default: [],
    },
    highlights: {
      type: [String],
      default: [],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries (slug already indexed by unique: true)
RoomSchema.index({ category: 1 });
RoomSchema.index({ isAvailable: 1 });
RoomSchema.index({ price: 1 });

export default mongoose.model<IRoom>('Room', RoomSchema);
