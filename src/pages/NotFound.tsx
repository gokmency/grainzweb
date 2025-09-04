import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C8102E] to-[#E53E3E] flex items-center justify-center px-6">
      <div className="text-center max-w-2xl mx-auto">
        {/* Large 404 */}
        <div className="mb-8">
          <h1 
            className="text-[150px] md:text-[200px] lg:text-[250px] font-black text-white/20 leading-none select-none"
            style={{ 
              letterSpacing: '20px',
              fontFamily: "'Tomorrow', sans-serif"
            }}
          >
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20 mb-8">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6"
            style={{ 
              letterSpacing: '4px',
              fontFamily: "'Tomorrow', sans-serif"
            }}
          >
            PAGE NOT FOUND
          </h2>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/">
              <Button 
                className="bg-white text-[#C8102E] hover:bg-white/90 font-bold px-8 py-3 text-lg w-full sm:w-auto"
                style={{ 
                  letterSpacing: '1px',
                  fontFamily: "'Tomorrow', sans-serif"
                }}
              >
                <Home className="mr-2 w-5 h-5" />
                GO HOME
              </Button>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="border-2 border-white text-white px-8 py-3 text-lg font-bold transition-all duration-300 ease-in-out hover:bg-white hover:text-[#C8102E] w-full sm:w-auto"
              style={{ 
                letterSpacing: '1px',
                fontFamily: "'Tomorrow', sans-serif"
              }}
            >
              <ArrowLeft className="mr-2 w-5 h-5 inline" />
              GO BACK
            </button>
          </div>
        </div>

        {/* Additional Help */}
        <div className="text-white/70 text-sm">
          <p>
            Need help? Contact us at{' '}
            <a 
              href="https://x.com/grainzeth" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-white/80 underline transition-colors"
            >
              @grainzeth
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
