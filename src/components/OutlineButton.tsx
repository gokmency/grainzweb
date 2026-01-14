import React from 'react';

interface OutlineButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const OutlineButton: React.FC<OutlineButtonProps> = ({ onClick, children, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`border border-white text-white px-4 py-3 text-xs font-medium tracking-wider transition-all duration-300 ease-in-out hover:bg-white hover:text-[#C8102E] uppercase ${className}`}
      style={{ fontFamily: "'Tomorrow', sans-serif" }}
    >
      {children}
    </button>
  );
};

export default OutlineButton;
