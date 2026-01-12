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
  const isHomePage = location.pathname === '/';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="relative flex items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center z-10">
            <img
              src="/grainz-logo.png"
              alt="GRAINZ Logo"
              className="h-11 w-auto md:h-16 drop-shadow-lg select-none object-contain"
              style={
                isContentHubPage
                  ? {
                      filter:
                        "brightness(0) saturate(100%) invert(12%) sepia(87%) saturate(5718%) hue-rotate(356deg) brightness(87%) contrast(109%)",
                    }
                  : undefined
              }
              draggable={false}
            />
          </Link>

          {/* Center Toggle Nav (like the original Home/Content Hub buttons) */}
          <div className="absolute left-1/2 -translate-x-1/2 z-10">
            <div
              className={`flex items-center border-2 overflow-hidden ${
                isContentHubPage ? "border-[#C8102E]" : "border-white"
              }`}
              style={{ fontFamily: "'Tomorrow', sans-serif" }}
            >
              <Link
                to="/"
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out border-r ${
                  isContentHubPage ? "border-[#C8102E]/30" : "border-white/30"
                } ${
                  isHomePage
                    ? isContentHubPage
                      ? "bg-[#C8102E] text-white"
                      : "bg-white text-[#C8102E]"
                    : isContentHubPage
                      ? "bg-transparent text-[#C8102E] hover:bg-[#C8102E]/10"
                      : "bg-transparent text-white hover:bg-white/10"
                }`}
              >
                Home
              </Link>
              <Link
                to="/content-hub"
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out ${
                  isActive("/content-hub")
                    ? isContentHubPage
                      ? "bg-[#C8102E] text-white"
                      : "bg-transparent text-white"
                    : isContentHubPage
                      ? "bg-transparent text-[#C8102E] hover:bg-[#C8102E]/10"
                      : "bg-transparent text-white hover:bg-white/10"
                }`}
              >
                Content Hub
              </Link>
            </div>
          </div>

          {/* Right spacer to keep center aligned on small screens */}
          <div className="ml-auto w-10 md:w-12" aria-hidden />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
