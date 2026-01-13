import React, { useState, useEffect } from 'react';
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
    phone: string;
  };
  checkIn: string;
  checkOut: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  totalAmount: number;
  createdAt: string;
}

const AdminDashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [stats, setStats] = useState({
    total: 0,
    confirmed: 0,
    pending: 0,
    cancelled: 0,
    revenue: 0,
  });

  useEffect(() => {
    fetchBookings();
  }, [filter]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      // Note: In production, get token from auth context/storage
      const response = await apiClient.getBookings(filter !== 'all' ? undefined : undefined, filter !== 'all' ? filter : undefined);
      
      if (response.success) {
        const bookingsData = response.data || [];
        setBookings(bookingsData);
        
        // Calculate stats
        const totalRevenue = bookingsData.reduce((sum: number, b: Booking) => 
          b.status === 'confirmed' || b.status === 'completed' ? sum + b.totalAmount : sum, 0
        );
        
        setStats({
          total: bookingsData.length,
          confirmed: bookingsData.filter((b: Booking) => b.status === 'confirmed').length,
          pending: bookingsData.filter((b: Booking) => b.status === 'pending').length,
          cancelled: bookingsData.filter((b: Booking) => b.status === 'cancelled').length,
          revenue: totalRevenue,
        });
      } else {
        setError('Failed to fetch bookings');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load bookings. Admin access required.');
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
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
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="pt-24 min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-lg text-neutral-600 font-light">
            Manage all reservations and bookings
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white p-6 rounded-sm shadow-sm">
            <p className="text-sm text-neutral-500 mb-2">Total Bookings</p>
            <p className="text-3xl font-display font-bold text-neutral-900">{stats.total}</p>
          </div>
          <div className="bg-white p-6 rounded-sm shadow-sm">
            <p className="text-sm text-neutral-500 mb-2">Confirmed</p>
            <p className="text-3xl font-display font-bold text-green-600">{stats.confirmed}</p>
          </div>
          <div className="bg-white p-6 rounded-sm shadow-sm">
            <p className="text-sm text-neutral-500 mb-2">Pending</p>
            <p className="text-3xl font-display font-bold text-yellow-600">{stats.pending}</p>
          </div>
          <div className="bg-white p-6 rounded-sm shadow-sm">
            <p className="text-sm text-neutral-500 mb-2">Cancelled</p>
            <p className="text-3xl font-display font-bold text-red-600">{stats.cancelled}</p>
          </div>
          <div className="bg-white p-6 rounded-sm shadow-sm">
            <p className="text-sm text-neutral-500 mb-2">Total Revenue</p>
            <p className="text-3xl font-display font-bold text-primary-600">${stats.revenue.toFixed(2)}</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-4 mb-8 border-b border-neutral-200 bg-white p-4 rounded-sm shadow-sm">
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
              {status} ({status === 'all' ? stats.total : stats[status as keyof typeof stats] || 0})
            </button>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-sm text-red-800">
            <p>{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-neutral-600">Loading reservations...</p>
          </div>
        )}

        {/* Bookings Table */}
        {!loading && !error && bookings.length === 0 && (
          <div className="text-center py-12 bg-white rounded-sm shadow-sm">
            <p className="text-xl text-neutral-600">No reservations found</p>
          </div>
        )}

        {!loading && !error && bookings.length > 0 && (
          <div className="bg-white rounded-sm shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Booking
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Guest
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Room
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Dates
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {bookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-neutral-900">
                            #{booking.bookingNumber}
                          </div>
                          <div className="text-sm text-neutral-500">
                            {formatDate(booking.createdAt)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-neutral-900">
                            {booking.guest?.firstName} {booking.guest?.lastName}
                          </div>
                          <div className="text-sm text-neutral-500">{booking.guest?.email}</div>
                          <div className="text-sm text-neutral-500">{booking.guest?.phone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-neutral-900">
                          {booking.room?.name}
                        </div>
                        <div className="text-sm text-neutral-500">{booking.guests} Guest{booking.guests > 1 ? 's' : ''}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-neutral-900">
                          <div>{formatDate(booking.checkIn)}</div>
                          <div className="text-neutral-500">to</div>
                          <div>{formatDate(booking.checkOut)}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-primary-600">
                          ${booking.totalAmount.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          className="text-primary-600 hover:text-primary-700 mr-4"
                          onClick={() => {
                            // TODO: Implement view/edit
                            alert('View/Edit feature coming soon');
                          }}
                        >
                          View
                        </button>
                        {booking.status === 'confirmed' && (
                          <button
                            className="text-red-600 hover:text-red-700"
                            onClick={() => {
                              // TODO: Implement cancellation
                              alert('Cancel feature coming soon');
                            }}
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
