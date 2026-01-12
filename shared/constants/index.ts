// Shared constants between client and server

export const API_ENDPOINTS = {
  AUTH: '/api/auth',
  USERS: '/api/users',
  ROOMS: '/api/rooms',
  BOOKINGS: '/api/bookings',
  GUESTS: '/api/guests',
  ADMIN: '/api/admin',
  MAINTENANCE: '/api/maintenance',
  STAFF: '/api/staff',
  INVENTORY: '/api/inventory',
  EVENTS: '/api/events',
  DINING: '/api/dining',
  SPA: '/api/spa',
} as const;

export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
} as const;
