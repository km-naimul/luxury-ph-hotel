import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { apiClient } from '../services/api';

interface Booking {
  _id: string;
  bookingNumber: string;
  room: {
    _id: string;
    name: string;
    images: string[];
    price: number;
  };
  guest: {
    firstName: string;
    lastName: string;
    email: string;
  };
  checkIn: string;
  checkOut: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  totalAmount: number;
  createdAt: string;
}

const CustomerDashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchBookings();
  }, [filter]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.getBookings();
      
      if (response.success) {
        let filteredBookings = response.data || [];
        
        if (filter !== 'all') {
          filteredBookings = filteredBookings.filter(
            (booking: Booking) => booking.status === filter
          );
        }
        
        setBookings(filteredBookings);
      } else {
        setError('Failed to fetch bookings');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load bookings. Please login.');
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (booking: Booking) => {
    const result = await Swal.fire({
      title: 'Cancel Booking?',
      html: `
        <p>Are you sure you want to cancel this booking?</p>
        <div class="text-left mt-4">
          <p><strong>Booking #:</strong> ${booking.bookingNumber}</p>
          <p><strong>Room:</strong> ${booking.room?.name}</p>
          <p><strong>Check-in:</strong> ${formatDate(booking.checkIn)}</p>
          <p><strong>Check-out:</strong> ${formatDate(booking.checkOut)}</p>
        </div>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it',
      customClass: {
        popup: 'rounded-lg',
        confirmButton: 'px-6 py-2 rounded-md',
        cancelButton: 'px-6 py-2 rounded-md',
      },
    });

    if (result.isConfirmed) {
      try {
        const response = await apiClient.cancelBooking(booking._id);
        
        if (response.success) {
          await Swal.fire({
            title: 'Cancelled!',
            text: 'Your booking has been cancelled successfully.',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            customClass: {
              popup: 'rounded-lg',
              confirmButton: 'px-6 py-2 rounded-md',
            },
          });
          fetchBookings(); // Refresh bookings
        } else {
          throw new Error(response.message || 'Failed to cancel booking');
        }
      } catch (err: any) {
        await Swal.fire({
          title: 'Error!',
          text: err.message || 'Failed to cancel booking. Please try again.',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          customClass: {
            popup: 'rounded-lg',
            confirmButton: 'px-6 py-2 rounded-md',
          },
        });
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="pt-24 min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-2">
            My Reservations
          </h1>
          <p className="text-lg text-neutral-600 font-light">
            View and manage your bookings
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-4 mb-8 border-b border-neutral-200">
          {['all', 'confirmed', 'pending', 'cancelled', 'completed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 font-medium transition-colors duration-200 capitalize ${
                filter === status
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-neutral-600 hover:text-primary-600'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-sm text-red-800">
            <p>{error}</p>
            <p className="text-sm mt-2">
              {error.includes('login') && (
                <Link to="/login" className="underline">
                  Click here to login
                </Link>
              )}
            </p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-neutral-600">Loading your reservations...</p>
          </div>
        )}

        {/* Bookings List */}
        {!loading && !error && bookings.length === 0 && (
          <div className="text-center py-12 bg-white rounded-sm shadow-sm">
            <p className="text-xl text-neutral-600 mb-4">No reservations found</p>
            <Link
              to="/rooms"
              className="inline-block px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-sm transition-colors"
            >
              Book a Room
            </Link>
          </div>
        )}

        {!loading && !error && bookings.length > 0 && (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-sm shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                <div className="grid md:grid-cols-4 gap-6 p-6">
                  {/* Room Image */}
                  <div className="md:col-span-1">
                    <img
                      src={booking.room?.images?.[0] || 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'}
                      alt={booking.room?.name || 'Room'}
                      className="w-full h-48 object-cover rounded-sm"
                    />
                  </div>

                  {/* Booking Details */}
                  <div className="md:col-span-3">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-display font-bold text-neutral-900 mb-2">
                          {booking.room?.name || 'Room'}
                        </h3>
                        <p className="text-neutral-600 font-light">
                          Booking #{booking.bookingNumber}
                        </p>
                      </div>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-neutral-500 mb-1">Check-in</p>
                        <p className="font-medium text-neutral-900">{formatDate(booking.checkIn)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500 mb-1">Check-out</p>
                        <p className="font-medium text-neutral-900">{formatDate(booking.checkOut)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500 mb-1">Guests</p>
                        <p className="font-medium text-neutral-900">{booking.guests} Guest{booking.guests > 1 ? 's' : ''}</p>
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500 mb-1">Total Amount</p>
                        <p className="font-medium text-primary-600 text-xl">${booking.totalAmount.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="flex gap-4 mt-4">
                      <Link
                        to={`/rooms/${booking.room?._id || booking.room?.slug}`}
                        className="px-4 py-2 border border-neutral-300 hover:border-primary-600 text-neutral-700 hover:text-primary-700 font-medium rounded-sm transition-colors"
                      >
                        View Room Details
                      </Link>
                      {(booking.status === 'confirmed' || booking.status === 'pending') && (
                        <button
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-sm transition-colors"
                          onClick={() => handleCancelBooking(booking)}
                        >
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
