import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', noPadding = false }) => {
  return (
    <div className={`glass-panel rounded-xl shadow-xl overflow-hidden flex flex-col ${className}`}>
      <div className={noPadding ? '' : 'p-4'}>
        {children}
      </div>
    </div>
  );
};