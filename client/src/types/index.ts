// Shared types for the client application

export interface NavigationLink {
  label: string;
  href: string;
}

export interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
}

// Future types for API responses
export interface Room {
  id: string;
  name: string;
  type: string;
  price: number;
  description: string;
  images: string[];
}

export interface Booking {
  id: string;
  roomId: string;
  guestId: string;
  checkIn: Date;
  checkOut: Date;
  status: 'pending' | 'confirmed' | 'cancelled';
}
