import React from 'react';

const SpaPage = () => {
  return (
    <div className="pt-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-neutral-900 mb-4 tracking-tight">
            Luxury Spa & Wellness
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto font-light">
            Indulge in a sanctuary of tranquility and rejuvenation
          </p>
        </div>

        {/* Main Image */}
        <div className="mb-16">
          <div className="aspect-[16/9] rounded-sm overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="Luxury Spa"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
              Treatment Experiences
            </h2>
            <p className="text-lg text-neutral-600 mb-6 font-light leading-relaxed">
              Our world-class spa offers an extensive range of treatments designed to rejuvenate your mind, body, and spirit. Experience the ultimate in relaxation and wellness.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-1 h-12 bg-primary-600 mt-2"></div>
                <div>
                  <h3 className="text-xl font-display font-bold text-neutral-900 mb-1">Signature Massages</h3>
                  <p className="text-neutral-600 font-light">Traditional and modern techniques for deep relaxation</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-1 h-12 bg-primary-600 mt-2"></div>
                <div>
                  <h3 className="text-xl font-display font-bold text-neutral-900 mb-1">Facial Treatments</h3>
                  <p className="text-neutral-600 font-light">Luxury skincare using premium products</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-1 h-12 bg-primary-600 mt-2"></div>
                <div>
                  <h3 className="text-xl font-display font-bold text-neutral-900 mb-1">Body Rituals</h3>
                  <p className="text-neutral-600 font-light">Detoxifying and nourishing body treatments</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
              Facilities
            </h2>
            <p className="text-lg text-neutral-600 mb-6 font-light leading-relaxed">
              Our spa facilities are designed to provide a complete wellness experience in an atmosphere of pure luxury and tranquility.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-1 h-12 bg-primary-600 mt-2"></div>
                <div>
                  <h3 className="text-xl font-display font-bold text-neutral-900 mb-1">Sauna & Steam Room</h3>
                  <p className="text-neutral-600 font-light">Relax and detoxify in our premium thermal facilities</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-1 h-12 bg-primary-600 mt-2"></div>
                <div>
                  <h3 className="text-xl font-display font-bold text-neutral-900 mb-1">Relaxation Lounge</h3>
                  <p className="text-neutral-600 font-light">Unwind before or after your treatment</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-1 h-12 bg-primary-600 mt-2"></div>
                <div>
                  <h3 className="text-xl font-display font-bold text-neutral-900 mb-1">Private Treatment Rooms</h3>
                  <p className="text-neutral-600 font-light">Intimate spaces for personalized experiences</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-neutral-50 p-12 rounded-sm">
          <h3 className="text-3xl font-display font-bold text-neutral-900 mb-4">
            Book Your Spa Experience
          </h3>
          <p className="text-lg text-neutral-600 mb-8 font-light max-w-2xl mx-auto">
            Contact our spa concierge to reserve your preferred treatment and time
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-10 py-4 bg-primary-600 hover:bg-primary-700 text-white font-medium uppercase tracking-wide rounded-sm transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Book Appointment
          </a>
        </div>
      </div>
    </div>
  );
};

export default SpaPage;
