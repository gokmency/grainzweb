import React, { useState } from 'react';
import { CONFIG } from '@/config/constants';

interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactPopup: React.FC<ContactPopupProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleClose = () => {
    setContactForm({ name: '', email: '', message: '' });
    setIsSubmitting(false);
    setSubmitSuccess(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const emailAddresses = CONFIG.emails.contact;

      const promises = emailAddresses.map(async (email) => {
        const formData = new FormData();
        formData.append('name', contactForm.name);
        formData.append('email', contactForm.email);
        formData.append('message', contactForm.message);
        formData.append('_subject', `Contact from ${contactForm.name} - GRAINZ Website`);
        formData.append('_captcha', 'false');
        formData.append('_template', 'table');

        return fetch(`${CONFIG.emails.formSubmitEndpoint}${email}`, {
          method: 'POST',
          body: formData
        });
      });

      const responses = await Promise.all(promises);
      const allSuccessful = responses.every(response => response.ok);

      if (allSuccessful) {
        setIsSubmitting(false);
        setSubmitSuccess(true);

        setTimeout(() => {
          handleClose();
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Popup content */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md p-6 transform transition-all duration-300 ease-out scale-100 opacity-100 border border-gray-200">
        {/* Close button */}
        <button
          onClick={handleClose}
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
          <form onSubmit={handleSubmit} className="space-y-4">
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
                onClick={handleClose}
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
              onClick={handleClose}
              className="px-6 py-2 bg-[#C8102E] text-white rounded-md hover:bg-[#A00E26] transition-colors font-medium"
              style={{ fontFamily: "'Tomorrow', sans-serif" }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
