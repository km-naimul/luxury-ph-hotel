// Server-side TypeScript types and interfaces

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Future types for models
export interface IUser {
  _id?: string;
  email: string;
  password: string;
  role: 'admin' | 'staff' | 'guest';
  // Add more fields as needed
}

export interface IRoom {
  _id?: string;
  name: string;
  type: string;
  price: number;
  description: string;
  images: string[];
  available: boolean;
  // Add more fields as needed
}

export interface IBooking {
  _id?: string;
  roomId: string;
  guestId: string;
  checkIn: Date;
  checkOut: Date;
  status: 'pending' | 'confirmed' | 'cancelled';
  // Add more fields as needed
}
