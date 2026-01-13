import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
}

const HeroSection = ({
  title = 'Experience Unparalleled Luxury',
  subtitle = 'Where elegance meets comfort in the heart of exceptional hospitality',
  primaryCTA = { text: 'Book Now', href: '#book' },
  secondaryCTA = { text: 'Explore', href: '#rooms' },
}: HeroSectionProps) => {
  const { isAuthenticated, user, logout } = useAuth();
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
          }}
        >
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/70 via-neutral-900/60 to-neutral-900/80"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto animate-fade-in">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-8 leading-[1.1] tracking-tight text-balance animate-fade-in delay-100">
          <span className="block">{title}</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-neutral-100 mb-12 max-w-4xl mx-auto leading-relaxed px-4 font-light tracking-wide animate-fade-in delay-200">
          {subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center animate-fade-in delay-300">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="btn-hover-lift inline-flex items-center justify-center px-10 py-4 bg-primary-600 hover:bg-primary-700 text-white text-base font-medium tracking-wider uppercase rounded-sm shadow-2xl hover:shadow-primary-600/50 min-w-[200px] border border-primary-500/30"
              >
                Go to Dashboard
              </Link>
              {user?.role === 'admin' && (
                <Link
                  to="/admin/dashboard"
                  className="btn-hover-lift inline-flex items-center justify-center px-10 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white text-base font-medium tracking-wider uppercase rounded-sm border border-white/20 hover:border-white/40 min-w-[200px]"
                >
                  Admin Dashboard
                </Link>
              )}
              <button
                onClick={logout}
                className="btn-hover-lift inline-flex items-center justify-center px-10 py-4 bg-red-600/80 hover:bg-red-700 backdrop-blur-md text-white text-base font-medium tracking-wider uppercase rounded-sm border border-red-500/30 hover:border-red-400/50 min-w-[200px]"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/book"
                className="btn-hover-lift inline-flex items-center justify-center px-10 py-4 bg-primary-600 hover:bg-primary-700 text-white text-base font-medium tracking-wider uppercase rounded-sm shadow-2xl hover:shadow-primary-600/50 min-w-[200px] border border-primary-500/30"
              >
                {primaryCTA.text}
              </Link>
              <Link
                to="/login"
                className="btn-hover-lift inline-flex items-center justify-center px-10 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white text-base font-medium tracking-wider uppercase rounded-sm border border-white/20 hover:border-white/40 min-w-[200px]"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <a
          href="#rooms"
          onClick={(e) => handleClick(e, '#rooms')}
          className="flex flex-col items-center text-white/80 hover:text-white transition-colors duration-200"
          aria-label="Scroll to explore"
        >
          <span className="text-sm mb-2 font-medium">Explore</span>
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
