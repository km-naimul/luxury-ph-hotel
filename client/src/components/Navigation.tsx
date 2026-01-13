import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();
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

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate('/');
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
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive('/dashboard')
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : `${navTextColor} hover:text-primary-600`
                  }`}
                >
                  Dashboard
                </Link>
                {user?.role === 'admin' && (
                  <Link
                    to="/admin/dashboard"
                    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive('/admin/dashboard')
                        ? 'text-primary-600 border-b-2 border-primary-600'
                        : `${navTextColor} hover:text-primary-600`
                    }`}
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive('/login')
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : `${navTextColor} hover:text-primary-600`
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/book"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Book Now
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {isAuthenticated && (
              <span className={`${navTextColor} text-sm mr-2`}>Hi, {user?.firstName}</span>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                isScrolled || !isHomePage ? 'text-neutral-700' : 'text-white'
              } hover:text-primary-600 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500`}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      <div
        className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} ${
          isScrolled || !isHomePage ? 'bg-white shadow-lg' : 'bg-neutral-800'
        } pb-3 space-y-1 sm:px-3`}
      >
        {navigationLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={() => handleLinkClick()}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive(link.path)
                ? 'text-primary-600 bg-primary-50'
                : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-50'
            }`}
          >
            {link.label}
          </Link>
        ))}
        {isAuthenticated ? (
          <>
            <Link
              to="/dashboard"
              onClick={() => handleLinkClick()}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/dashboard')
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-50'
              }`}
            >
              Dashboard
            </Link>
            {user?.role === 'admin' && (
              <Link
                to="/admin/dashboard"
                onClick={() => handleLinkClick()}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/admin/dashboard')
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-50'
                }`}
              >
                Admin Dashboard
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="block w-full text-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full text-base font-semibold mt-4 transition-colors duration-200"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              onClick={() => handleLinkClick()}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/login')
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-50'
              }`}
            >
              Login
            </Link>
            <Link
              to="/book"
              onClick={() => handleLinkClick()}
              className="block w-full text-center bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full text-base font-semibold mt-4 transition-colors duration-200"
            >
              Book Now
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
