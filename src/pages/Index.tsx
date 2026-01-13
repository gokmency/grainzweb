import React, { useState } from 'react';
import TeamPhotos from '../components/TeamPhotos';
import OutlineButton from '@/components/OutlineButton';
import { Waves } from '@/components/ui/waves-background';
import { WorksWith } from '../components/WorksWith';

// Tomorrow font import from Google Fonts
if (typeof window !== "undefined") {
  // Only once
  if (!document.getElementById("tomorrow-font-link")) {
    const link = document.createElement("link");
    link.id = "tomorrow-font-link";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Tomorrow:wght@400;700;800&display=swap";
    document.head.appendChild(link);
  }
}

const Index = () => {
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleFollowUsClick = () => {
    window.open('https://x.com/grainzeth', '_blank');
  };

  const handleContactUsClick = () => {
    setShowContactPopup(true);
  };

  const handleCloseContact = () => {
    setShowContactPopup(false);
    setContactForm({ name: '', email: '', message: '' });
    setIsSubmitting(false);
    setSubmitSuccess(false);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // İki farklı email adresine gönder
          const emailAddresses = ['byuzguc@gmail.com', 'bgokmence@gmail.com', 'grainzguild@gmail.com'];
      
      // Her email adresi için ayrı ayrı gönder
      const promises = emailAddresses.map(async (email) => {
        const formData = new FormData();
        formData.append('name', contactForm.name);
        formData.append('email', contactForm.email);
        formData.append('message', contactForm.message);
        formData.append('_subject', `Contact from ${contactForm.name} - GRAINZ Website`);
        formData.append('_captcha', 'false');
        formData.append('_template', 'table');

        return fetch(`https://formsubmit.co/${email}`, {
          method: 'POST',
          body: formData
        });
      });

      const responses = await Promise.all(promises);
      const allSuccessful = responses.every(response => response.ok);

      if (allSuccessful) {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        
        // 10 saniye sonra popup'ı kapat
        setTimeout(() => {
          handleCloseContact();
        }, 10000);
      } else {
        throw new Error('Some form submissions failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setIsSubmitting(false);
      alert('Mesaj gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  };

  const handleDesignClick = () => {
    // Temporarily disabled - new design page coming soon
    console.log('Design page - coming soon!');
  };

  const handleDevelopmentClick = () => {
    // Temporarily disabled - new development page coming soon
    console.log('Development page - coming soon!');
  };

  const handleCommunityClick = () => {
    window.open('https://grainzlegacy.vercel.app/', '_blank');
  };

  const handleJoinTeamClick = () => {
    window.open('https://form.typeform.com/to/wWliUJsu', '_blank');
  };

  const handleGrainzClick = () => {
    window.open('https://x.com/grainzeth', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C8102E] to-[#E53E3E] relative flex flex-col" style={{ fontFamily: "'Tomorrow', sans-serif" }} role="main">
      {/* Waves Animation Background */}
      <div className="absolute inset-0 z-0">
        <Waves
          strokeColor="rgba(255, 255, 255, 0.3)"
          backgroundColor="transparent"
          pointerSize={0.3}
        />
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        {/* Central Hexagon */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none select-none">
          <div 
            className="relative w-[600px] h-[600px]"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)'
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <h1
                className="text-5xl font-black text-white text-center"
                style={{
                  letterSpacing: '8px',
                  fontFamily: "'Tomorrow', sans-serif"
                }}
              >
                WE BUILD THINGS
              </h1>
            </div>
          </div>
        </div>

        {/* Top-Left Section - WHAT WE DO */}
        <div className="absolute top-52 left-20 max-w-sm z-10">
          <h2 
            className="text-lg font-bold text-white mb-4"
            style={{ letterSpacing: '2px', fontFamily: "'Tomorrow', sans-serif" }}
          >
            WHAT WE DO
          </h2>
          <p className="text-white mb-6 leading-relaxed" style={{ fontFamily: "'Tomorrow', sans-serif" }}>
            We design, develop, and build innovative solutions while nurturing and managing vibrant communities that drive meaningful engagement and growth.
          </p>
          <OutlineButton onClick={handleFollowUsClick} aria-label="Follow Grainz on X">
            <div className="flex items-center justify-between w-full text-sm font-medium" style={{ fontFamily: "'Tomorrow', sans-serif" }}>
              <span>FOLLOW US</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="ml-2">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </div>
          </OutlineButton>
          <div className="mt-4">
            <OutlineButton onClick={handleContactUsClick} aria-label="Contact Grainz">
              <div className="flex items-center justify-between w-full text-sm font-medium" style={{ fontFamily: "'Tomorrow', sans-serif" }}>
                <span>CONTACT WITH US</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
            </OutlineButton>
          </div>
        </div>

        {/* Bottom-Left Section - WORK WITH US */}
        <div className="absolute bottom-20 left-20 max-w-sm z-10">
          <h2 
            className="text-lg font-bold text-white mb-4"
            style={{ letterSpacing: '2px', fontFamily: "'Tomorrow', sans-serif" }}
          >
            WORK WITH US
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <OutlineButton onClick={handleDesignClick}>Design</OutlineButton>
            <OutlineButton onClick={handleDevelopmentClick}>Development</OutlineButton>
            <OutlineButton onClick={handleCommunityClick}>Community</OutlineButton>
            <OutlineButton onClick={handleJoinTeamClick}>Join our team</OutlineButton>
          </div>
        </div>

        {/* Right Section - WHO WE ARE & WORKED WITH */}
        <div className="absolute top-44 right-20 max-w-sm z-10">
          <h2 
            className="text-lg font-bold text-white mb-4"
            style={{ letterSpacing: '2px', fontFamily: "'Tomorrow', sans-serif" }}
          >
            WHO WE ARE
          </h2>
          <TeamPhotos />
          
          {/* WORKED WITH - Below team photos */}
          <div className="mt-8">
            <WorksWith />
          </div>
        </div>

        {/* Copyright notice - Desktop */}
        <div className="absolute bottom-2 left-0 w-full z-50 pointer-events-auto">
          <p className="text-center text-xs text-white/70 tracking-wide px-4" style={{
            textShadow: "0 2px 8px rgba(44,0,0,0.18)",
            fontFamily: "'Tomorrow', sans-serif"
          }}>
            © 2026{' '}
            <button 
              onClick={handleGrainzClick}
              className="underline hover:text-white transition-colors cursor-pointer"
              aria-label="Visit Grainz X (Twitter) profile"
            >
              GRAINZ
            </button>
            {' '}All rights reserved.
          </p>
        </div>
      </div>

      {/* Mobile Layout - Fit to Screen */}
      <div className="block md:hidden h-screen flex flex-col">
        <div className="flex-1 px-4 pt-24 pb-4 space-y-4 z-10 relative">
          {/* Mobile Main Title */}
          <div className="text-center mb-4">
            <h1
              className="text-xl sm:text-2xl font-black text-white text-center"
              style={{
                letterSpacing: '3px',
                fontFamily: "'Tomorrow', sans-serif",
                lineHeight: '1.1'
              }}
            >
              WE BUILD THINGS
            </h1>
          </div>

          {/* WHAT WE DO Section */}
          <div className="bg-black/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <h2 
              className="text-sm font-bold text-white mb-2 text-center"
              style={{ letterSpacing: '1px', fontFamily: "'Tomorrow', sans-serif" }}
            >
              WHAT WE DO
            </h2>
            <p className="text-white mb-3 leading-tight text-center text-xs" style={{ fontFamily: "'Tomorrow', sans-serif" }}>
              We design, develop, and build innovative solutions while nurturing communities.
            </p>
            <div className="flex justify-center">
              <OutlineButton onClick={handleFollowUsClick} aria-label="Follow Grainz on X">
                <span className="text-xs">FOLLOW US</span>
              </OutlineButton>
            </div>
            <div className="flex justify-center mt-3">
              <OutlineButton onClick={handleContactUsClick} aria-label="Contact Grainz">
                <span className="text-xs">CONTACT WITH US</span>
              </OutlineButton>
            </div>
          </div>

          {/* WORK WITH US Section - Moved Up */}
          <div className="bg-black/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <h2 
              className="text-sm font-bold text-white mb-2 text-center"
              style={{ letterSpacing: '1px', fontFamily: "'Tomorrow', sans-serif" }}
            >
              WORK WITH US
            </h2>
            <div className="grid grid-cols-2 gap-2 max-w-xs mx-auto">
              <OutlineButton onClick={handleDesignClick} className="w-full">
                <span className="block text-xs">Design</span>
              </OutlineButton>
              <OutlineButton onClick={handleDevelopmentClick} className="w-full">
                <span className="block text-xs">Development</span>
              </OutlineButton>
              <OutlineButton onClick={handleCommunityClick} className="w-full">
                <span className="block text-xs">Community</span>
              </OutlineButton>
              <OutlineButton onClick={handleJoinTeamClick} className="w-full">
                <span className="block text-xs">Join Team</span>
              </OutlineButton>
            </div>
          </div>

          {/* WHO WE ARE & WORKED WITH Section - Mobile */}
          <div className="bg-black/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <h2 
              className="text-sm font-bold text-white mb-2 text-center"
              style={{ letterSpacing: '1px', fontFamily: "'Tomorrow', sans-serif" }}
            >
              WHO WE ARE
            </h2>
            <div className="flex justify-center mb-4">
              <TeamPhotos />
            </div>
            
            {/* WORKED WITH - Below team photos */}
            <div className="mt-4">
              <WorksWith />
            </div>
          </div>
        </div>

        {/* Copyright notice - Mobile */}
        <div className="py-2 z-50 pointer-events-auto">
          <p className="text-center text-xs text-white/70 tracking-wide px-4" style={{
            textShadow: "0 2px 8px rgba(44,0,0,0.18)",
            fontFamily: "'Tomorrow', sans-serif"
          }}>
            © 2026{' '}
            <button 
              onClick={handleGrainzClick}
              className="underline hover:text-white transition-colors cursor-pointer"
              aria-label="Visit Grainz X (Twitter) profile"
            >
              GRAINZ
            </button>
            {' '}All rights reserved.
          </p>
        </div>
      </div>

      {/* Contact Popup */}
      {showContactPopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Background overlay */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleCloseContact}
          />
          
          {/* Popup content */}
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md p-6 transform transition-all duration-300 ease-out scale-100 opacity-100 border border-gray-200">
            {/* Close button */}
            <button
              onClick={handleCloseContact}
              className="absolute right-3 top-3 w-6 h-6 text-gray-400 hover:text-gray-600 transition-colors z-10 flex items-center justify-center rounded-full hover:bg-gray-100"
              aria-label="Close popup"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Tomorrow', sans-serif" }}>
                {submitSuccess ? 'Message Sent!' : 'Contact With Us'}
              </h2>
              <p className="text-gray-600 text-sm" style={{ fontFamily: "'Tomorrow', sans-serif" }}>
                {submitSuccess 
                  ? 'Your message has been sent successfully! We\'ll get back to you soon.'
                  : 'Send us a message and we\'ll get back to you soon.'
                }
              </p>
            </div>

            {/* Success Icon */}
            {submitSuccess && (
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-600">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
              </div>
            )}

            {/* Contact Form */}
            {!submitSuccess && (
              <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "'Tomorrow', sans-serif" }}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-colors"
                  style={{ fontFamily: "'Tomorrow', sans-serif" }}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "'Tomorrow', sans-serif" }}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-colors"
                  style={{ fontFamily: "'Tomorrow', sans-serif" }}
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "'Tomorrow', sans-serif" }}>
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-colors resize-none"
                  style={{ fontFamily: "'Tomorrow', sans-serif" }}
                  placeholder="Your message..."
                />
              </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseContact}
                    disabled={isSubmitting}
                    className={`flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md transition-colors font-medium ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                    }`}
                    style={{ fontFamily: "'Tomorrow', sans-serif" }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 px-4 py-2 bg-[#C8102E] text-white rounded-md transition-colors font-medium ${
                      isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-[#A00E26]'
                    }`}
                    style={{ fontFamily: "'Tomorrow', sans-serif" }}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </div>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Success state - Show close button */}
            {submitSuccess && (
              <div className="flex justify-center pt-4">
                <button
                  onClick={handleCloseContact}
                  className="px-6 py-2 bg-[#C8102E] text-white rounded-md hover:bg-[#A00E26] transition-colors font-medium"
                  style={{ fontFamily: "'Tomorrow', sans-serif" }}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
