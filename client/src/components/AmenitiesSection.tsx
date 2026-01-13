import React from 'react';

interface Amenity {
  icon: string;
  title: string;
  description: string;
}

const amenities: Amenity[] = [
  {
    icon: '🏊',
    title: 'Infinity Pool',
    description: 'Stunning rooftop pool with panoramic views',
  },
  {
    icon: '💆',
    title: 'Luxury Spa',
    description: 'World-class wellness and relaxation treatments',
  },
  {
    icon: '🏋️',
    title: 'Fitness Center',
    description: 'State-of-the-art equipment and personal training',
  },
  {
    icon: '🍽️',
    title: 'Fine Dining',
    description: 'Award-winning restaurants and bars',
  },
  {
    icon: '🚗',
    title: 'Concierge',
    description: '24/7 personalized service and assistance',
  },
  {
    icon: '📱',
    title: 'Smart Rooms',
    description: 'Advanced technology and automation',
  },
];

const AmenitiesSection = () => {
  return (
    <section id="amenities" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-display font-bold text-neutral-900 mb-4 tracking-tight">
            World-Class Amenities
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto font-light">
            Indulge in an array of exceptional facilities designed for your comfort and enjoyment
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenities.map((amenity, index) => (
            <div
              key={index}
              className="card-hover text-center p-8 bg-neutral-50 rounded-sm hover:bg-primary-50/30 group"
            >
              <div className="text-5xl mb-4 transition-smooth group-hover:scale-110">
                {amenity.icon}
              </div>
              <h3 className="text-xl font-display font-bold text-neutral-900 mb-2">
                {amenity.title}
              </h3>
              <p className="text-neutral-600 font-light">
                {amenity.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;
