import React from 'react';

interface OutlineButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const OutlineButton: React.FC<OutlineButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`border border-white text-white px-4 py-3 text-xs font-medium tracking-wider transition-all duration-300 ease-in-out hover:bg-white hover:text-[#C8102E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#C8102E] uppercase ${className}`}
      style={{ fontFamily: "'Tomorrow', sans-serif" }}
      {...props}
    >
      {children}
    </button>
  );
};

export default OutlineButton;
