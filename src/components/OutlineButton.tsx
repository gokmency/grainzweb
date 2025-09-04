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
      className={`border-2 border-white text-white px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out hover:bg-white hover:text-[#C8102E] ${className}`}
      style={{ fontFamily: "'Tomorrow', sans-serif" }}
    >
      {children}
    </button>
  );
};

export default OutlineButton;
