// Shared types between client and server
// These types should match on both frontend and backend

export interface Room {
  id: string;
  name: string;
  type: string;
  price: number;
  description: string;
  images: string[];
  available: boolean;
}

export interface Booking {
  id: string;
  roomId: string;
  guestId: string;
  checkIn: Date;
  checkOut: Date;
  status: 'pending' | 'confirmed' | 'cancelled';
}
