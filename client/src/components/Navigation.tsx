import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavigationLink {
  label: string;
  path: string;
}

const navigationLinks: NavigationLink[] = [
  { label: 'Home', path: '/' },
  { label: 'Rooms', path: '/rooms' },
  { label: 'Dining', path: '/dining' },
  { label: 'Spa', path: '/spa' },
  { label: 'Events', path: '/events' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
];

const Navigation = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const isHomePage = location.pathname === '/';
  const logoSrc = isScrolled || !isHomePage ? '/logo-dark.svg' : '/logo-white.svg';
  const navTextColor = isScrolled || !isHomePage ? 'text-neutral-700' : 'text-white';
  const mobileMenuTextColor = 'text-neutral-700';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHomePage
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center group">
              <img
                src={logoSrc}
                alt="SK+ Hotel Logo"
                className="h-8 w-auto transition-opacity duration-300 hover:opacity-80"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : `${navTextColor} hover:text-primary-600`
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/book"
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md transition-colors duration-200 ${
                isScrolled || !isHomePage
                  ? 'text-neutral-700 hover:bg-neutral-100'
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? 'max-h-96 opacity-100'
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-1 bg-white/95 backdrop-blur-md border-t border-neutral-200">
          {navigationLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => handleLinkClick(link.path)}
              className={`block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                isActive(link.path)
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/book"
            onClick={() => handleLinkClick('/book')}
            className="block w-full text-center bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full text-base font-semibold mt-4 transition-colors duration-200"
          >
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
