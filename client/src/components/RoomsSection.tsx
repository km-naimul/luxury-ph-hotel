import React from 'react';
import { Link } from 'react-router-dom';
import { rooms } from '../data/rooms';

const RoomsSection = () => {
  return (
    <section id="rooms" className="py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-display font-bold text-neutral-900 mb-4 tracking-tight">
            Exquisite Accommodations
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto font-light">
            Each room and suite has been thoughtfully designed to provide the ultimate in comfort and sophistication
          </p>
        </div>

        <div className="space-y-16">
          {rooms.map((room, index) => (
            <div
              key={room.id}
              className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Image */}
              <div className={`relative ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-2xl group card-hover">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="image-zoom w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 bg-white/95 backdrop-blur-sm text-primary-700 text-sm font-medium uppercase tracking-wide rounded-sm">
                      {room.category}
                    </span>
                  </div>
                </div>
                {/* Price Badge */}
                <div className="absolute -bottom-6 -right-6 bg-primary-600 text-white px-8 py-4 rounded-sm shadow-2xl">
                  <div className="text-sm font-light uppercase tracking-wider mb-1">From</div>
                  <div className="text-3xl font-display font-bold">
                    ${room.price}
                    <span className="text-lg font-normal">/night</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-4xl font-display font-bold text-neutral-900">
                    {room.name}
                  </h3>
                </div>
                
                <p className="text-lg text-neutral-600 mb-6 font-light leading-relaxed">
                  {room.description}
                </p>

                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-sm flex items-center justify-center">
                      <span className="text-xl">📏</span>
                    </div>
                    <div>
                      <div className="text-sm text-neutral-500 font-light">Size</div>
                      <div className="font-medium text-neutral-900">{room.size}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-sm flex items-center justify-center">
                      <span className="text-xl">👥</span>
                    </div>
                    <div>
                      <div className="text-sm text-neutral-500 font-light">Capacity</div>
                      <div className="font-medium text-neutral-900">{room.capacity}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-sm flex items-center justify-center">
                      <span className="text-xl">🛏️</span>
                    </div>
                    <div>
                      <div className="text-sm text-neutral-500 font-light">Bed Type</div>
                      <div className="font-medium text-neutral-900">{room.bedType}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-sm flex items-center justify-center">
                      <span className="text-xl">⭐</span>
                    </div>
                    <div>
                      <div className="text-sm text-neutral-500 font-light">Highlights</div>
                      <div className="font-medium text-neutral-900 text-sm">{room.highlights[0]}</div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-display font-bold text-neutral-900 mb-3 uppercase tracking-wide text-sm">
                    Key Features
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {room.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-white border border-neutral-200 text-neutral-700 text-sm rounded-sm font-light"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-8">
                  <h4 className="font-display font-bold text-neutral-900 mb-3 uppercase tracking-wide text-sm">
                    Amenities Included
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {room.amenities.slice(0, 6).map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-neutral-600 text-sm font-light">
                        <span className="text-primary-600">✓</span>
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-4">
                  <Link
                    to={`/book?room=${room.id}`}
                    className="btn-hover-lift inline-flex items-center justify-center px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium uppercase tracking-wide rounded-sm shadow-lg hover:shadow-xl"
                  >
                    Book Now
                  </Link>
                  <Link
                    to={`/rooms/${room.id}`}
                    className="btn-hover-lift inline-flex items-center justify-center px-8 py-3 bg-white border-2 border-neutral-300 hover:border-primary-600 text-neutral-700 hover:text-primary-700 font-medium uppercase tracking-wide rounded-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison CTA */}
        <div className="mt-20 text-center bg-white p-12 rounded-sm shadow-lg card-hover">
          <h3 className="text-3xl font-display font-bold text-neutral-900 mb-4">
            Need Help Choosing?
          </h3>
          <p className="text-lg text-neutral-600 mb-8 font-light max-w-2xl mx-auto">
            Our concierge team is here to help you find the perfect accommodation for your stay
          </p>
          <a
            href="#contact"
            className="btn-hover-lift inline-flex items-center justify-center px-10 py-4 bg-neutral-900 hover:bg-neutral-800 text-white font-medium uppercase tracking-wide rounded-sm shadow-lg hover:shadow-xl"
          >
            Contact Concierge
          </a>
        </div>
      </div>
    </section>
  );
};

export default RoomsSection;
