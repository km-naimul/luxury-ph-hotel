// API client for backend calls

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API Error: ${response.statusText}`);
      }

      const data = await response.json();
      // Backend returns { success: true, data: {...}, message: "..." }
      // Return the full response object so we can access data, message, etc.
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Rooms API
  async getRooms() {
    return this.request<any[]>('/rooms');
  }

  async getRoomById(id: string) {
    return this.request<any>(`/rooms/${id}`);
  }

  // Bookings API
  async createBooking(bookingData: {
    roomId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    specialRequests?: string;
  }) {
    return this.request<any>('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }

  async getBookings(email?: string, status?: string) {
    const params = new URLSearchParams();
    if (email) params.append('email', email);
    if (status) params.append('status', status);
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request<any[]>(`/bookings${query}`);
  }

  async getBookingById(id: string) {
    return this.request<any>(`/bookings/${id}`);
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
