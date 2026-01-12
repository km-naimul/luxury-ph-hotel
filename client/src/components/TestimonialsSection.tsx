import React from 'react';

interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Mitchell',
    role: 'Business Executive',
    text: 'An absolutely flawless experience. The attention to detail and level of service exceeded all expectations. Truly exceptional.',
    rating: 5,
  },
  {
    name: 'James Chen',
    role: 'Travel Blogger',
    text: 'Every moment was perfect. From the stunning accommodations to the world-class dining, SK+ Hotel redefines luxury hospitality.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Honeymoon Guest',
    text: 'Our stay was magical. The staff anticipated our every need, and the rooms were absolutely breathtaking. A truly unforgettable experience.',
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-display font-bold text-neutral-900 mb-4 tracking-tight">
            Guest Experiences
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto font-light">
            Discover what our guests say about their stay with us
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-neutral-50 p-8 rounded-sm border border-neutral-200 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-primary-600 text-xl">★</span>
                ))}
              </div>
              <p className="text-neutral-700 mb-6 leading-relaxed font-light italic">
                "{testimonial.text}"
              </p>
              <div>
                <div className="font-display font-bold text-neutral-900">
                  {testimonial.name}
                </div>
                <div className="text-sm text-neutral-600 font-light">
                  {testimonial.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
