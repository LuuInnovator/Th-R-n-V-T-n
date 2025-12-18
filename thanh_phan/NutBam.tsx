
import React from 'react';

interface ThuocTinhNut extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  kieu?: 'chinh' | 'nguy_hiem' | 'thanh_cong' | 'vien' | 'ma' | 'canh_bao';
  kich_co?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  rong_het_co?: boolean;
}

export const NutBam: React.FC<ThuocTinhNut> = ({ 
  children, 
  kieu = 'chinh', 
  kich_co = 'md', 
  rong_het_co = false,
  className = '', 
  ...props 
}) => {
  const phong_cach_co_ban = "relative overflow-hidden font-bold rounded-2xl focus:outline-none transition-all duration-300 disabled:opacity-40 disabled:grayscale disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-95 select-none";
  
  const cac_kieu = {
    chinh: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-900/30 border border-white/10",
    nguy_hiem: "bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-lg shadow-rose-900/30 border border-white/10",
    thanh_cong: "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-900/30 border border-white/10",
    canh_bao: "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-lg shadow-amber-900/30 border border-white/10",
    vien: "border border-slate-700 hover:border-slate-500 text-slate-300 bg-slate-900/50 hover:bg-slate-800 shadow-sm",
    ma: "text-slate-400 hover:text-white hover:bg-white/5"
  };

  const cac_co = {
    xs: "px-2.5 py-1.5 text-[10px] uppercase tracking-tighter",
    sm: "px-4 py-2 text-[11px] uppercase tracking-widest",
    md: "px-6 py-3 text-sm uppercase tracking-wider",
    lg: "px-8 py-4 text-base uppercase tracking-widest font-black",
    xl: "px-10 py-5 text-lg uppercase tracking-[0.2em] font-black"
  };

  return (
    <button 
      className={`
        ${phong_cach_co_ban} 
        ${cac_kieu[kieu]} 
        ${cac_co[kich_co]} 
        ${rong_het_co ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity"></div>
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
};
