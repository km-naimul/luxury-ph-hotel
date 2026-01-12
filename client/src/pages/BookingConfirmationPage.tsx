import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BookingConfirmationPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // In a real implementation, this would come from the backend/API
  // For now, we'll use mock data or URL parameters
  const bookingId = searchParams.get('bookingId') || 'CONF-2024-001234';
  const roomName = searchParams.get('roomName') || 'Deluxe Room';
  const checkIn = searchParams.get('checkIn') || new Date().toLocaleDateString();
  const checkOut = searchParams.get('checkOut') || new Date(Date.now() + 86400000).toLocaleDateString();
  const guests = searchParams.get('guests') || '2';
  const totalAmount = searchParams.get('total') || '0';

  // Mock booking data structure (ready for backend integration)
  const bookingDetails = {
    bookingId,
    roomName,
    checkIn,
    checkOut,
    guests: parseInt(guests),
    totalAmount: parseFloat(totalAmount),
    status: 'confirmed',
    guestName: 'Guest Name', // Would come from backend
    email: 'guest@example.com', // Would come from backend
  };

  return (
    <div className="pt-24 min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-neutral-900 mb-4 tracking-tight">
            Booking Confirmed!
          </h1>
          <p className="text-xl text-neutral-600 font-light">
            Your reservation has been successfully confirmed
          </p>
        </div>

        {/* Confirmation Card */}
        <div className="bg-white rounded-sm shadow-xl p-8 mb-8">
          <div className="border-b border-neutral-200 pb-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-display font-bold text-neutral-900 mb-2">
                  Reservation Details
                </h2>
                <p className="text-neutral-600 font-light">
                  Confirmation Number: <span className="font-semibold text-neutral-900">{bookingDetails.bookingId}</span>
                </p>
              </div>
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-sm text-sm font-semibold uppercase tracking-wide">
                {bookingDetails.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Room Information */}
            <div>
              <h3 className="text-lg font-display font-bold text-neutral-900 mb-4">
                Accommodation
              </h3>
              <div className="space-y-3 text-neutral-700">
                <div>
                  <span className="font-medium text-neutral-900">Room Type:</span>
                  <p className="font-light">{bookingDetails.roomName}</p>
                </div>
                <div>
                  <span className="font-medium text-neutral-900">Guests:</span>
                  <p className="font-light">{bookingDetails.guests} {bookingDetails.guests === 1 ? 'Guest' : 'Guests'}</p>
                </div>
              </div>
            </div>

            {/* Dates */}
            <div>
              <h3 className="text-lg font-display font-bold text-neutral-900 mb-4">
                Stay Details
              </h3>
              <div className="space-y-3 text-neutral-700">
                <div>
                  <span className="font-medium text-neutral-900">Check-in:</span>
                  <p className="font-light">{bookingDetails.checkIn}</p>
                </div>
                <div>
                  <span className="font-medium text-neutral-900">Check-out:</span>
                  <p className="font-light">{bookingDetails.checkOut}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Total Amount */}
          <div className="border-t border-neutral-200 pt-6">
            <div className="flex justify-between items-center">
              <span className="text-xl font-display font-bold text-neutral-900">Total Amount:</span>
              <span className="text-3xl font-display font-bold text-primary-700">
                ${bookingDetails.totalAmount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-neutral-100 rounded-sm p-6 mb-8">
          <h3 className="text-lg font-display font-bold text-neutral-900 mb-4">
            Important Information
          </h3>
          <ul className="space-y-2 text-neutral-700 font-light">
            <li className="flex items-start">
              <svg
                className="w-5 h-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>A confirmation email has been sent to your email address.</span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-5 h-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Check-in time: 3:00 PM | Check-out time: 12:00 PM</span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-5 h-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Free cancellation up to 24 hours before check-in.</span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-5 h-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Please present a valid ID and credit card upon arrival.</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white text-base font-semibold tracking-wider uppercase rounded-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Back to Home
          </Link>
          <Link
            to="/rooms"
            className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-neutral-50 text-neutral-900 border-2 border-neutral-300 text-base font-semibold tracking-wider uppercase rounded-sm transition-all duration-300 shadow-md hover:shadow-lg"
          >
            View More Rooms
          </Link>
        </div>

        {/* Help Section */}
        <div className="mt-12 text-center text-neutral-600 font-light">
          <p className="mb-2">Need assistance with your booking?</p>
          <p>
            Contact us at{' '}
            <a
              href="mailto:reservations@skhotel.com"
              className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
            >
              reservations@skhotel.com
            </a>{' '}
            or call{' '}
            <a
              href="tel:+1234567890"
              className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
            >
              +1 (234) 567-890
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;
