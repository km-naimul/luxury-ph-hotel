import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <img
                src="/logo-white.svg"
                alt="SK+ Hotel Logo"
                className="h-8 w-auto"
              />
            </div>
            <p className="text-neutral-400 font-light leading-relaxed">
              Experience unparalleled luxury and exceptional service in the heart of hospitality excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4 uppercase tracking-wide">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-neutral-400 hover:text-white transition-colors duration-200 font-light">
                  Home
                </a>
              </li>
              <li>
                <a href="#rooms" className="text-neutral-400 hover:text-white transition-colors duration-200 font-light">
                  Rooms & Suites
                </a>
              </li>
              <li>
                <a href="#dining" className="text-neutral-400 hover:text-white transition-colors duration-200 font-light">
                  Dining
                </a>
              </li>
              <li>
                <a href="#amenities" className="text-neutral-400 hover:text-white transition-colors duration-200 font-light">
                  Amenities
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4 uppercase tracking-wide">Contact</h3>
            <ul className="space-y-2 text-neutral-400 font-light">
              <li>123 Luxury Avenue</li>
              <li>Premium District, City 12345</li>
              <li className="pt-2">
                <a href="tel:+1234567890" className="hover:text-white transition-colors duration-200">
                  +1 (234) 567-890
                </a>
              </li>
              <li>
                <a href="mailto:info@skhotel.com" className="hover:text-white transition-colors duration-200">
                  info@skhotel.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4 uppercase tracking-wide">Newsletter</h3>
            <p className="text-neutral-400 mb-4 font-light">
              Subscribe to receive exclusive offers and updates
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-sm text-white placeholder-neutral-500 focus:outline-none focus:border-primary-600 transition-colors duration-200"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium uppercase tracking-wide rounded-sm transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm font-light">
            © {new Date().getFullYear()} SK+ Hotel. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200 font-light text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-200 font-light text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
