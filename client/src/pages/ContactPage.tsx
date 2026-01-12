import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) newErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid.';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required.';
    if (!formData.message.trim()) newErrors.message = 'Message is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // TODO: Connect to backend API when available
    // For now, simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 1000);
  };

  const contactInfo = {
    address: '123 Luxury Avenue, Premium District',
    city: 'City 12345',
    phone: '+1 (234) 567-890',
    email: 'info@skhotel.com',
    hours: {
      frontDesk: '24/7',
      concierge: '6:00 AM - 11:00 PM',
      reservations: 'Monday - Sunday: 8:00 AM - 8:00 PM',
    },
  };

  return (
    <div className="pt-24 min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-neutral-900 mb-4 tracking-tight">
            Contact Us
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto font-light">
            We're here to assist you. Reach out to us for reservations, inquiries, or any special requests
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-3xl font-display font-bold text-neutral-900 mb-6">
                Get in Touch
              </h2>
              <p className="text-neutral-600 mb-8 font-light leading-relaxed">
                Our dedicated team is available around the clock to ensure your stay is nothing short of
                exceptional.
              </p>
            </div>

            {/* Address */}
            <div className="bg-white p-6 rounded-sm shadow-md">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-primary-600"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-display font-bold text-neutral-900 mb-2">Address</h3>
                  <p className="text-neutral-600 font-light">{contactInfo.address}</p>
                  <p className="text-neutral-600 font-light">{contactInfo.city}</p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-white p-6 rounded-sm shadow-md">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-primary-600"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-display font-bold text-neutral-900 mb-2">Phone</h3>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="text-neutral-600 hover:text-primary-600 transition-colors duration-200 font-light"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white p-6 rounded-sm shadow-md">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-primary-600"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-display font-bold text-neutral-900 mb-2">Email</h3>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-neutral-600 hover:text-primary-600 transition-colors duration-200 font-light"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white p-6 rounded-sm shadow-md">
              <h3 className="text-lg font-display font-bold text-neutral-900 mb-4">Hours</h3>
              <div className="space-y-2 text-neutral-600 font-light">
                <div>
                  <span className="font-medium">Front Desk:</span> {contactInfo.hours.frontDesk}
                </div>
                <div>
                  <span className="font-medium">Concierge:</span> {contactInfo.hours.concierge}
                </div>
                <div>
                  <span className="font-medium">Reservations:</span>{' '}
                  {contactInfo.hours.reservations}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-sm shadow-lg">
              <h2 className="text-3xl font-display font-bold text-neutral-900 mb-6">
                Send us a Message
              </h2>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-sm text-green-800">
                  Thank you for your message! We'll get back to you as soon as possible.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-sm text-red-800">
                  There was an error submitting your message. Please try again.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-800 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full p-3 border ${
                        errors.name ? 'border-red-500' : 'border-neutral-300'
                      } rounded-sm focus:ring-primary-500 focus:border-primary-500 bg-neutral-50 text-neutral-800`}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-800 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full p-3 border ${
                        errors.email ? 'border-red-500' : 'border-neutral-300'
                      } rounded-sm focus:ring-primary-500 focus:border-primary-500 bg-neutral-50 text-neutral-800`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-neutral-800 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-3 border border-neutral-300 rounded-sm focus:ring-primary-500 focus:border-primary-500 bg-neutral-50 text-neutral-800"
                      placeholder="+1 (234) 567-890"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-neutral-800 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full p-3 border ${
                        errors.subject ? 'border-red-500' : 'border-neutral-300'
                      } rounded-sm focus:ring-primary-500 focus:border-primary-500 bg-neutral-50 text-neutral-800`}
                    >
                      <option value="">Select a subject</option>
                      <option value="reservation">Reservation Inquiry</option>
                      <option value="event">Event Planning</option>
                      <option value="spa">Spa & Wellness</option>
                      <option value="dining">Dining Reservation</option>
                      <option value="general">General Inquiry</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-800 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full p-3 border ${
                      errors.message ? 'border-red-500' : 'border-neutral-300'
                    } rounded-sm focus:ring-primary-500 focus:border-primary-500 bg-neutral-50 text-neutral-800`}
                    placeholder="Please tell us how we can assist you..."
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white text-base font-semibold tracking-wider uppercase rounded-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Map Placeholder */}
            <div className="mt-8 bg-white rounded-sm shadow-lg overflow-hidden">
              <div className="h-96 bg-neutral-200 flex items-center justify-center">
                <div className="text-center text-neutral-500">
                  <svg
                    className="w-16 h-16 mx-auto mb-4 text-neutral-400"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="font-medium">Map Integration</p>
                  <p className="text-sm">Google Maps or similar service can be integrated here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
