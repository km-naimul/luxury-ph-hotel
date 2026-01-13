import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DiningSection = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <section id="dining" className="py-24 bg-neutral-900 text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Fine dining restaurant"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 tracking-tight">
              Culinary
              <span className="block text-primary-400">Excellence</span>
            </h2>
            <p className="text-xl text-neutral-300 leading-relaxed mb-8 font-light">
              Experience gastronomic artistry at our award-winning restaurants, where world-renowned chefs craft exceptional dishes using the finest ingredients.
            </p>
            <p className="text-lg text-neutral-400 leading-relaxed mb-8 font-light">
              From intimate fine dining to casual elegance, our culinary venues offer diverse experiences that celebrate global flavors with local sophistication.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-1 h-12 bg-primary-600"></div>
                <div>
                  <h3 className="text-xl font-display font-bold mb-1">The Signature Restaurant</h3>
                  <p className="text-neutral-400 font-light">Michelin-starred fine dining experience</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-1 h-12 bg-primary-600"></div>
                <div>
                  <h3 className="text-xl font-display font-bold mb-1">Sky Lounge</h3>
                  <p className="text-neutral-400 font-light">Rooftop bar with craft cocktails and small plates</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-1 h-12 bg-primary-600"></div>
                <div>
                  <h3 className="text-xl font-display font-bold mb-1">Lobby Café</h3>
                  <p className="text-neutral-400 font-light">Artisan coffee and light fare</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-sm overflow-hidden shadow-2xl card-hover">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Fine dining experience"
                className="image-zoom w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Login/Logout Section */}
        <div className="mt-20 text-center bg-white/10 backdrop-blur-md p-12 rounded-sm border border-white/20">
          <h3 className="text-3xl font-display font-bold text-white mb-4">
            {isAuthenticated ? `Welcome, ${user?.firstName}!` : 'Reserve Your Table'}
          </h3>
          <p className="text-white/80 mb-6 font-light text-lg">
            {isAuthenticated
              ? 'Access your dashboard to manage reservations and explore more dining options.'
              : 'Login to make reservations and access exclusive dining experiences.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="btn-hover-lift inline-flex items-center justify-center px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium uppercase tracking-wide rounded-sm shadow-lg hover:shadow-xl"
                >
                  Go to Dashboard
                </Link>
                {user?.role === 'admin' && (
                  <Link
                    to="/admin/dashboard"
                    className="btn-hover-lift inline-flex items-center justify-center px-8 py-3 bg-neutral-800 hover:bg-neutral-900 text-white font-medium uppercase tracking-wide rounded-sm shadow-lg hover:shadow-xl"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="btn-hover-lift inline-flex items-center justify-center px-8 py-3 bg-red-600/80 hover:bg-red-700 text-white font-medium uppercase tracking-wide rounded-sm shadow-lg hover:shadow-xl"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn-hover-lift inline-flex items-center justify-center px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium uppercase tracking-wide rounded-sm shadow-lg hover:shadow-xl"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-hover-lift inline-flex items-center justify-center px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 hover:border-white/50 font-medium uppercase tracking-wide rounded-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiningSection;
