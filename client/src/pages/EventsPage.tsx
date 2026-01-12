import React from 'react';

const EventsPage = () => {
  return (
    <div className="pt-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-neutral-900 mb-4 tracking-tight">
            Events & Celebrations
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto font-light">
            Create unforgettable moments in our elegant event spaces
          </p>
        </div>

        {/* Main Image */}
        <div className="mb-16">
          <div className="aspect-[16/9] rounded-sm overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="Luxury Event Space"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Event Types */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-neutral-50 p-8 rounded-sm">
            <h3 className="text-2xl font-display font-bold text-neutral-900 mb-4">
              Weddings
            </h3>
            <p className="text-neutral-600 mb-6 font-light leading-relaxed">
              Celebrate your special day in our magnificent ballroom with personalized service and exquisite catering.
            </p>
            <ul className="space-y-2 text-neutral-600 font-light">
              <li>• Up to 300 guests</li>
              <li>• Wedding planning services</li>
              <li>• Custom menus</li>
              <li>• Bridal suite included</li>
            </ul>
          </div>
          <div className="bg-neutral-50 p-8 rounded-sm">
            <h3 className="text-2xl font-display font-bold text-neutral-900 mb-4">
              Corporate Events
            </h3>
            <p className="text-neutral-600 mb-6 font-light leading-relaxed">
              Host conferences, meetings, and corporate gatherings in our state-of-the-art facilities.
            </p>
            <ul className="space-y-2 text-neutral-600 font-light">
              <li>• Conference rooms available</li>
              <li>• Audio-visual equipment</li>
              <li>• Catering services</li>
              <li>• Business center access</li>
            </ul>
          </div>
          <div className="bg-neutral-50 p-8 rounded-sm">
            <h3 className="text-2xl font-display font-bold text-neutral-900 mb-4">
              Social Celebrations
            </h3>
            <p className="text-neutral-600 mb-6 font-light leading-relaxed">
              From intimate gatherings to grand celebrations, we create memorable experiences.
            </p>
            <ul className="space-y-2 text-neutral-600 font-light">
              <li>• Custom event planning</li>
              <li>• Flexible layouts</li>
              <li>• Premium bar service</li>
              <li>• Entertainment options</li>
            </ul>
          </div>
        </div>

        {/* Facilities */}
        <div className="mb-16">
          <h2 className="text-4xl font-display font-bold text-neutral-900 mb-8 text-center">
            Event Facilities
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Grand Ballroom"
                className="w-full h-full object-cover"
              />
              <div className="p-6 bg-white">
                <h3 className="text-2xl font-display font-bold text-neutral-900 mb-2">Grand Ballroom</h3>
                <p className="text-neutral-600 font-light">Capacity: 300 guests</p>
              </div>
            </div>
            <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Conference Center"
                className="w-full h-full object-cover"
              />
              <div className="p-6 bg-white">
                <h3 className="text-2xl font-display font-bold text-neutral-900 mb-2">Conference Center</h3>
                <p className="text-neutral-600 font-light">Multiple rooms, up to 200 guests</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-neutral-900 text-white p-12 rounded-sm">
          <h3 className="text-3xl font-display font-bold mb-4">
            Plan Your Perfect Event
          </h3>
          <p className="text-lg text-neutral-300 mb-8 font-light max-w-2xl mx-auto">
            Our event specialists are here to help bring your vision to life
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-10 py-4 bg-primary-600 hover:bg-primary-700 text-white font-medium uppercase tracking-wide rounded-sm transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Request a Quote
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
