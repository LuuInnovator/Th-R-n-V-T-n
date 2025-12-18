
import React from 'react';
import { dinh_dang_so } from '../../tien_ich/tinh_toan';
import { Ghost, ShieldAlert, VolumeX, Zap, HeartPulse, Droplets } from 'lucide-react';

interface Props {
  label: string;
  value: number;
  isPercent?: boolean;
}

const ICONS: Record<string, any> = {
  "NÉ TRÁNH": Ghost,
  "PHẢN ĐÒN": ShieldAlert,
  "CÂM LẶNG": VolumeX,
  "CHOÁNG": Zap,
  "HỒI PHỤC": HeartPulse,
  "HÚT MÁU": Droplets
};

export const TheTrangThaiChienDau: React.FC<Props> = ({ label, value, isPercent = true }) => {
  const Icon = ICONS[label] || Zap;
  
  return (
    <div className="group relative">
      {/* Glow Layer */}
      <div className="absolute -inset-0.5 bg-red-600 rounded-full opacity-0 group-hover:opacity-40 blur-md transition duration-500"></div>
      
      <div className="relative bg-gradient-to-r from-red-600 to-rose-700 px-5 py-3 rounded-full flex items-center justify-between shadow-xl border border-white/20 transition-all duration-300 transform group-hover:-translate-y-1">
        <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                <Icon size={12} className="text-white" />
            </div>
            <span className="text-[9px] font-black text-white uppercase tracking-tighter italic">
              {label}
            </span>
        </div>
        <span className="text-sm font-black text-white italic tabular-nums ml-4">
          {isPercent ? value.toFixed(1) : dinh_dang_so(value)}
          {isPercent && <span className="text-[9px] ml-0.5 opacity-70">%</span>}
        </span>
      </div>
    </div>
  );
};
