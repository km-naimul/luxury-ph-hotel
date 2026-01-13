import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Room from '../models/Room';
import { connectDatabase } from '../config/database';

dotenv.config();

const roomsData = [
  {
    slug: 'deluxe-room',
    name: 'Deluxe Room',
    category: 'Standard',
    description: 'Sophisticated comfort with modern amenities and elegant design. A perfect blend of style and functionality for the discerning traveler.',
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    ],
    price: 320,
    size: '35 m²',
    capacity: '2 Guests',
    bedType: 'Queen/King Bed',
    features: ['Garden/City View', 'Balcony', 'Smart TV', 'Work Space'],
    amenities: ['Free WiFi', 'Espresso Machine', 'Premium Toiletries', 'Room Service', 'Daily Housekeeping', 'Air Conditioning', 'Safe', 'Mini Refrigerator'],
    highlights: ['Modern Design', 'Great Value', 'Prime Location'],
  },
  {
    slug: 'executive-suite',
    name: 'Executive Suite',
    category: 'Suite',
    description: 'Spacious elegance with panoramic city views and premium amenities. Perfect for business travelers and couples seeking comfort and sophistication.',
    images: [
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    ],
    price: 450,
    size: '55 m²',
    capacity: '2 Guests',
    bedType: 'King Bed',
    features: ['City View', 'Living Area', 'Work Desk', 'Minibar'],
    amenities: ['Free WiFi', 'Smart TV', 'Nespresso Machine', 'Marble Bathroom', 'Premium Toiletries', 'Separate Living Room', 'Work Desk', 'Mini Bar', 'Room Service', 'Concierge Service'],
    highlights: ['Panoramic Views', 'Spacious Layout', 'Business Amenities'],
  },
  {
    slug: 'junior-suite',
    name: 'Junior Suite',
    category: 'Suite',
    description: 'Elevated comfort with separate seating area and enhanced amenities. Ideal for extended stays and families.',
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    ],
    price: 550,
    size: '65 m²',
    capacity: '3 Guests',
    bedType: 'King Bed + Sofa',
    features: ['Seating Area', 'City View', 'Balcony', 'Dining Table'],
    amenities: ['Free WiFi', 'Smart TV', 'Mini Bar', 'Premium Toiletries', 'Espresso Machine', 'Separate Seating', 'Dining Area', 'Room Service', 'Concierge'],
    highlights: ['Spacious', 'Family Friendly', 'Extended Stay'],
  },
  {
    slug: 'grand-suite',
    name: 'Grand Suite',
    category: 'Luxury Suite',
    description: 'Majestic elegance with grand proportions, sophisticated furnishings, and exceptional views. A statement of refined luxury.',
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    ],
    price: 850,
    size: '95 m²',
    capacity: '4 Guests',
    bedType: 'King Bed + Pull-out Sofa',
    features: ['Grand Living Room', 'Dining Area', 'Master Bathroom', 'Study'],
    amenities: ['Premium Bar Setup', 'Smart Home System', 'Premium Linen', 'Luxury Toiletries', 'Concierge Service', 'Private Check-in', 'Butler Service Available', 'Premium Minibar', 'Entertainment System'],
    highlights: ['Grand Proportions', 'Elegant Design', 'Premium Amenities'],
  },
  {
    slug: 'presidential-suite',
    name: 'Presidential Suite',
    category: 'Luxury Suite',
    description: 'Ultimate luxury with separate living areas, private terrace, and exclusive butler service. The pinnacle of sophisticated accommodation.',
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    ],
    price: 1200,
    size: '120 m²',
    capacity: '4 Guests',
    bedType: 'King Bed + Sofa Bed',
    features: ['Private Terrace', 'Separate Living Room', 'Dining Area', 'Jacuzzi'],
    amenities: ['Butler Service', 'Premium Bar', 'Wine Cellar Access', 'Spa Bath', 'Premium Linen', '24/7 Concierge', 'Private Elevator Access', 'Grand Piano', 'Entertainment System', 'Personalized Service'],
    highlights: ['Butler Service', 'Private Terrace', 'Luxury Experience'],
  },
  {
    slug: 'penthouse-suite',
    name: 'Penthouse Suite',
    category: 'Luxury Suite',
    description: 'Exclusive rooftop sanctuary with 360-degree views, private elevator access, and the highest level of personalized service.',
    images: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    ],
    price: 2500,
    size: '180 m²',
    capacity: '6 Guests',
    bedType: 'King Bed + 2 Guest Rooms',
    features: ['360° Views', 'Private Elevator', 'Rooftop Terrace', 'Private Pool'],
    amenities: ['Dedicated Butler', 'Private Chef Available', 'Wine Collection', 'Spa Services', 'Luxury Car Service', 'Private Gym Access', 'Private Pool', 'Rooftop Terrace', 'Entertainment System', 'Personalized Everything'],
    highlights: ['Rooftop Location', 'Ultimate Privacy', 'Premium Service'],
  },
];

const seedRooms = async (): Promise<void> => {
  try {
    await connectDatabase();
    
    // Clear existing rooms
    await Room.deleteMany({});
    console.log('🗑️  Cleared existing rooms');

    // Insert rooms
    const rooms = await Room.insertMany(roomsData);
    console.log(`✅ Seeded ${rooms.length} rooms successfully`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding rooms:', error);
    process.exit(1);
  }
};

seedRooms();
