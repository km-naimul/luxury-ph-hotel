import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { rooms } from '../data/rooms';
import { apiClient } from '../services/api';

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const roomId = searchParams.get('room');

  const [selectedRoom, setSelectedRoom] = useState<string>(roomId || '');
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');
  const [guests, setGuests] = useState<number>(2);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const room = rooms.find(r => r.id === selectedRoom);

  useEffect(() => {
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    if (!checkIn) {
      setCheckIn(today);
    }
    if (!checkOut) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setCheckOut(tomorrow.toISOString().split('T')[0]);
    }
  }, []);

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const calculateTotal = () => {
    if (!room) return 0;
    const nights = calculateNights();
    const roomTotal = room.price * nights;
    const tax = roomTotal * 0.15; // 15% tax
    const serviceCharge = roomTotal * 0.10; // 10% service charge
    return roomTotal + tax + serviceCharge;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!selectedRoom) {
      newErrors.room = 'Please select a room';
    }
    if (!checkIn) {
      newErrors.checkIn = 'Check-in date is required';
    }
    if (!checkOut) {
      newErrors.checkOut = 'Check-out date is required';
    }
    if (checkIn && checkOut && new Date(checkOut) <= new Date(checkIn)) {
      newErrors.checkOut = 'Check-out must be after check-in';
    }
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted!'); // Debug log
    
    if (!validateForm()) {
      console.log('Validation failed');
      return;
    }

    if (!room || !selectedRoom) {
      setErrors({ room: 'Please select a room' });
      return;
    }

    setIsSubmitting(true);
    setErrors({}); // Clear previous errors

    try {
      // Create booking via API
      const bookingData = {
        roomId: selectedRoom, // Using slug, backend will resolve to MongoDB _id
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        checkIn,
        checkOut,
        guests,
        specialRequests: formData.specialRequests || undefined,
      };

      console.log('Sending booking data:', bookingData);
      const response: any = await apiClient.createBooking(bookingData);
      console.log('Booking response:', response);
      
      // Backend returns { success: true, data: booking, message: "..." }
      const booking = response.data || response;

      // Navigate to confirmation page with booking details
      navigate(
        `/booking-confirmation?bookingId=${booking.bookingNumber}&roomName=${encodeURIComponent(
          booking.room?.name || room.name
        )}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}&total=${(booking.totalAmount || calculateTotal()).toFixed(2)}`
      );
    } catch (error: any) {
      console.error('Booking error:', error);
      setErrors({ submit: error.message || 'Failed to create booking. Please try again.' });
      setIsSubmitting(false);
    }
  };

  const nights = calculateNights();
  const total = calculateTotal();
  const roomTotal = room ? room.price * nights : 0;
  const tax = roomTotal * 0.15;
  const serviceCharge = roomTotal * 0.10;

  return (
    <div className="pt-24 min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-2">
            Book Your Stay
          </h1>
          <p className="text-lg text-neutral-600 font-light">
            Complete your reservation at SK+ Hotel
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Room Selection */}
            <div className="bg-white p-8 rounded-sm shadow-sm">
              <h2 className="text-2xl font-display font-bold text-neutral-900 mb-6">
                Select Your Room
              </h2>
              <select
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
                className={`w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary-600 transition-colors ${
                  errors.room ? 'border-red-500' : 'border-neutral-300'
                }`}
              >
                <option value="">-- Select a Room --</option>
                {rooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.name} - ${room.price}/night
                  </option>
                ))}
              </select>
              {errors.room && <p className="text-red-500 text-sm mt-1">{errors.room}</p>}
              {room && (
                <div className="mt-4 p-4 bg-neutral-50 rounded-sm">
                  <div className="flex items-center gap-4">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-24 h-24 object-cover rounded-sm"
                    />
                    <div>
                      <h3 className="font-display font-bold text-neutral-900">{room.name}</h3>
                      <p className="text-sm text-neutral-600 font-light">{room.category}</p>
                      <p className="text-sm text-neutral-600 font-light">{room.size} • {room.capacity}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Dates & Guests */}
            <div className="bg-white p-8 rounded-sm shadow-sm">
              <h2 className="text-2xl font-display font-bold text-neutral-900 mb-6">
                Dates & Guests
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary-600 transition-colors ${
                      errors.checkIn ? 'border-red-500' : 'border-neutral-300'
                    }`}
                  />
                  {errors.checkIn && <p className="text-red-500 text-sm mt-1">{errors.checkIn}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={checkIn || new Date().toISOString().split('T')[0]}
                    className={`w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary-600 transition-colors ${
                      errors.checkOut ? 'border-red-500' : 'border-neutral-300'
                    }`}
                  />
                  {errors.checkOut && <p className="text-red-500 text-sm mt-1">{errors.checkOut}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Number of Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary-600 transition-colors"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <div className="w-full p-4 bg-neutral-50 rounded-sm">
                    <div className="text-sm text-neutral-600 font-light">Duration</div>
                    <div className="text-lg font-medium text-neutral-900">
                      {nights} {nights === 1 ? 'Night' : 'Nights'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Guest Information */}
            <div className="bg-white p-8 rounded-sm shadow-sm">
              <h2 className="text-2xl font-display font-bold text-neutral-900 mb-6">
                Guest Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary-600 transition-colors ${
                      errors.firstName ? 'border-red-500' : 'border-neutral-300'
                    }`}
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary-600 transition-colors ${
                      errors.lastName ? 'border-red-500' : 'border-neutral-300'
                    }`}
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary-600 transition-colors ${
                      errors.email ? 'border-red-500' : 'border-neutral-300'
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary-600 transition-colors ${
                      errors.phone ? 'border-red-500' : 'border-neutral-300'
                    }`}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Special Requests
                </label>
                <textarea
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary-600 transition-colors"
                  placeholder="Any special requests or preferences..."
                />
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white p-8 rounded-sm shadow-lg">
              <h2 className="text-2xl font-display font-bold text-neutral-900 mb-6">
                Booking Summary
              </h2>

              {room ? (
                <>
                  <div className="mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={room.image}
                        alt={room.name}
                        className="w-20 h-20 object-cover rounded-sm"
                      />
                      <div>
                        <h3 className="font-display font-bold text-neutral-900">{room.name}</h3>
                        <p className="text-sm text-neutral-600 font-light">{room.category}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6 pb-6 border-b border-neutral-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600 font-light">Check-in</span>
                      <span className="font-medium text-neutral-900">
                        {checkIn ? new Date(checkIn).toLocaleDateString() : '-'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600 font-light">Check-out</span>
                      <span className="font-medium text-neutral-900">
                        {checkOut ? new Date(checkOut).toLocaleDateString() : '-'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600 font-light">Guests</span>
                      <span className="font-medium text-neutral-900">{guests}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600 font-light">Nights</span>
                      <span className="font-medium text-neutral-900">{nights}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6 pb-6 border-b border-neutral-200">
                    <div className="flex justify-between">
                      <span className="text-neutral-600 font-light">
                        ${room.price} × {nights} {nights === 1 ? 'night' : 'nights'}
                      </span>
                      <span className="font-medium text-neutral-900">${roomTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600 font-light">Tax (15%)</span>
                      <span className="text-neutral-600">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600 font-light">Service Charge (10%)</span>
                      <span className="text-neutral-600">${serviceCharge.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-display font-bold text-neutral-900">Total</span>
                    <span className="text-2xl font-display font-bold text-primary-600">
                      ${total.toFixed(2)}
                    </span>
                  </div>

                  {errors.submit && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-sm text-red-800 text-sm">
                      {errors.submit}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-hover-lift w-full px-8 py-4 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-400 disabled:cursor-not-allowed disabled:hover:transform-none text-white font-medium uppercase tracking-wide rounded-sm shadow-lg hover:shadow-xl mb-4 relative overflow-hidden"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="spinner h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      'Confirm Booking'
                    )}
                  </button>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-neutral-600 font-light mb-4">Please select a room to see pricing</p>
                  <Link
                    to="/rooms"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    View Rooms →
                  </Link>
                </div>
              )}

              <p className="text-xs text-neutral-500 text-center font-light">
                By confirming, you agree to our terms and conditions
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
