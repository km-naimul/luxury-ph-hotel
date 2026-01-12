import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { rooms } from '../data/rooms';

const RoomDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);

  const room = rooms.find(r => r.id === id);

  if (!room) {
    return (
      <div className="pt-24 min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-neutral-900 mb-4">Room Not Found</h1>
          <Link to="/rooms" className="text-primary-600 hover:text-primary-700 font-medium">
            ← Back to Rooms
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-neutral-500 hover:text-primary-600">Home</Link>
            <span className="text-neutral-400">/</span>
            <Link to="/rooms" className="text-neutral-500 hover:text-primary-600">Rooms</Link>
            <span className="text-neutral-400">/</span>
            <span className="text-neutral-900 font-medium">{room.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={room.images[selectedImage]}
          alt={room.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-2">
              <span className="px-4 py-2 bg-primary-600 text-white text-sm font-medium uppercase tracking-wide rounded-sm">
                {room.category}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-2">
              {room.name}
            </h1>
            <div className="flex items-center gap-4 text-white/90">
              <span className="text-3xl font-display font-bold">
                ${room.price}
                <span className="text-xl font-normal">/night</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Image Gallery */}
        <div className="mb-16">
          <div className="grid grid-cols-4 gap-4 mb-4">
            {room.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square overflow-hidden rounded-sm transition-all duration-300 ${
                  selectedImage === index
                    ? 'ring-4 ring-primary-600 scale-105'
                    : 'opacity-70 hover:opacity-100 hover:scale-105'
                }`}
              >
                <img
                  src={img}
                  alt={`${room.name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Description */}
            <div className="mb-12">
              <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
                About This Room
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed font-light">
                {room.longDescription}
              </p>
            </div>

            {/* Features */}
            <div className="mb-12">
              <h2 className="text-3xl font-display font-bold text-neutral-900 mb-6">
                Key Features
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {room.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-neutral-50 rounded-sm">
                    <span className="text-primary-600 text-xl">✓</span>
                    <span className="text-neutral-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-12">
              <h2 className="text-3xl font-display font-bold text-neutral-900 mb-6">
                Amenities & Services
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {room.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="text-primary-600">•</span>
                    <span className="text-neutral-600 font-light">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Policies */}
            <div>
              <h2 className="text-3xl font-display font-bold text-neutral-900 mb-6">
                Policies & Information
              </h2>
              <div className="space-y-4">
                {room.policies.map((policy, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-neutral-50 rounded-sm">
                    <span className="text-primary-600 mt-1">ℹ</span>
                    <span className="text-neutral-600 font-light">{policy}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-neutral-50 p-8 rounded-sm">
              <h3 className="text-2xl font-display font-bold text-neutral-900 mb-6">
                Room Details
              </h3>

              <div className="space-y-6 mb-8">
                <div>
                  <div className="text-sm text-neutral-500 font-light mb-1">Size</div>
                  <div className="text-lg font-medium text-neutral-900">{room.size}</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500 font-light mb-1">Capacity</div>
                  <div className="text-lg font-medium text-neutral-900">{room.capacity}</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500 font-light mb-1">Bed Type</div>
                  <div className="text-lg font-medium text-neutral-900">{room.bedType}</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500 font-light mb-1">View</div>
                  <div className="text-lg font-medium text-neutral-900">{room.view}</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500 font-light mb-1">Floor</div>
                  <div className="text-lg font-medium text-neutral-900">{room.floor}</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500 font-light mb-1">Check-in</div>
                  <div className="text-lg font-medium text-neutral-900">{room.checkIn}</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500 font-light mb-1">Check-out</div>
                  <div className="text-lg font-medium text-neutral-900">{room.checkOut}</div>
                </div>
              </div>

              <div className="border-t border-neutral-300 pt-6 mb-6">
                <div className="text-4xl font-display font-bold text-primary-600 mb-2">
                  ${room.price}
                  <span className="text-xl font-normal text-neutral-600">/night</span>
                </div>
                <div className="text-sm text-neutral-500 font-light">Taxes and fees included</div>
              </div>

              <Link
                to={`/book?room=${room.id}`}
                className="block w-full text-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-medium uppercase tracking-wide rounded-sm transition-all duration-300 shadow-lg hover:shadow-xl mb-4"
              >
                Book Now
              </Link>

              <Link
                to="/rooms"
                className="block w-full text-center px-8 py-4 bg-white border-2 border-neutral-300 hover:border-primary-600 text-neutral-700 hover:text-primary-700 font-medium uppercase tracking-wide rounded-sm transition-all duration-300"
              >
                View All Rooms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailPage;
