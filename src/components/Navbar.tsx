import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/content-hub') {
      return location.pathname.startsWith('/content-hub');
    }
    return location.pathname === path;
  };

  const isContentHubPage = location.pathname.startsWith('/content-hub');

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${isContentHubPage ? 'bg-white/95 backdrop-blur-sm border-b border-gray-200' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="relative">
              <svg 
                width="120" 
                height="40" 
                viewBox="0 0 120 40" 
                className="h-8 w-auto md:h-10 drop-shadow-lg"
              >
                <text 
                  x="10" 
                  y="28" 
                  className={`text-2xl md:text-3xl font-black ${isContentHubPage ? 'fill-[#C8102E]' : 'fill-white'} transition-colors duration-300`}
                  style={{ 
                    letterSpacing: '2px',
                    fontFamily: "'Tomorrow', sans-serif"
                  }}
                >
                  GRAINZ
                </text>
              </svg>
            </div>
          </Link>

          {/* Navigation Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link
              to="/"
              className={`px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2.5 text-xs sm:text-sm md:text-base font-bold rounded-lg border-2 transition-all duration-300 ${
                isActive('/') 
                  ? isContentHubPage 
                    ? 'bg-[#C8102E] text-white border-[#C8102E] shadow-lg'
                    : 'bg-white text-[#C8102E] border-white shadow-lg'
                  : isContentHubPage
                    ? 'bg-transparent text-gray-700 border-gray-300 hover:border-[#C8102E] hover:text-[#C8102E]'
                    : 'bg-transparent text-white border-white/40 hover:border-white hover:bg-white/10'
              }`}
              style={{ 
                letterSpacing: '1px',
                fontFamily: "'Tomorrow', sans-serif"
              }}
            >
              HOME
            </Link>

            <Link
              to="/content-hub"
              className={`px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2.5 text-xs sm:text-sm md:text-base font-bold rounded-lg border-2 transition-all duration-300 ${
                isActive('/content-hub') 
                  ? isContentHubPage 
                    ? 'bg-[#C8102E] text-white border-[#C8102E] shadow-lg'
                    : 'bg-white text-[#C8102E] border-white shadow-lg'
                  : isContentHubPage
                    ? 'bg-transparent text-gray-700 border-gray-300 hover:border-[#C8102E] hover:text-[#C8102E]'
                    : 'bg-transparent text-white border-white/40 hover:border-white hover:bg-white/10'
              }`}
              style={{ 
                letterSpacing: '1px',
                fontFamily: "'Tomorrow', sans-serif"
              }}
            >
              CONTENT HUB
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
