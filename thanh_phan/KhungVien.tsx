
import React from 'react';

interface ThuocTinhKhung {
  children: React.ReactNode;
  className?: string;
  khongPadding?: boolean;
}

export const KhungVien: React.FC<ThuocTinhKhung> = ({ children, className = '', khongPadding = false }) => {
  return (
    <div className={`glass-panel rounded-xl shadow-xl overflow-hidden flex flex-col ${className}`}>
      <div className={khongPadding ? '' : 'p-4'}>
        {children}
      </div>
    </div>
  );
};
