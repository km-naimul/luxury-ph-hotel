import React, { useEffect, useRef, useState } from 'react';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`grid md:grid-cols-2 gap-16 items-center scroll-fade-in ${isVisible ? 'visible' : ''}`}>
          <div>
            <h2 className="text-5xl md:text-6xl font-display font-bold text-neutral-900 mb-6 tracking-tight">
              Where Luxury Meets
              <span className="block text-primary-600">Unforgettable</span>
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed mb-6 font-light">
              Nestled in the heart of exceptional hospitality, SK+ Hotel stands as a testament to refined elegance and unparalleled service. Every detail has been meticulously crafted to create an experience that transcends the ordinary.
            </p>
            <p className="text-lg text-neutral-600 leading-relaxed mb-8 font-light">
              Our commitment to excellence is reflected in every aspect of your stay, from our world-class accommodations to our award-winning dining experiences. Discover a sanctuary where luxury is not just a promise, but a way of life.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="transition-smooth hover:scale-105">
                <div className="text-4xl font-display font-bold text-primary-600 mb-2">50+</div>
                <div className="text-neutral-600 font-light">Luxury Suites</div>
              </div>
              <div className="transition-smooth hover:scale-105">
                <div className="text-4xl font-display font-bold text-primary-600 mb-2">5★</div>
                <div className="text-neutral-600 font-light">Rated Excellence</div>
              </div>
              <div className="transition-smooth hover:scale-105">
                <div className="text-4xl font-display font-bold text-primary-600 mb-2">24/7</div>
                <div className="text-neutral-600 font-light">Concierge Service</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-sm overflow-hidden shadow-2xl card-hover">
              <img
                src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Luxury hotel interior"
                className="image-zoom w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-primary-600/10 rounded-sm -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
