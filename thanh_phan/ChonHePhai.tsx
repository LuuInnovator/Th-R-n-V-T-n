
import React from 'react';
import { CharacterClass } from '../kieu_du_lieu';
import { THONG_TIN_HE_PHAI } from '../hang_so';
import { Shield, Sword, Beaker, ChevronRight } from 'lucide-react';

interface Props {
  onSelect: (cls: CharacterClass) => void;
}

export const ChonHePhai: React.FC<Props> = ({ onSelect }) => {
  const phai = [
    { 
        id: CharacterClass.HeavySentinel, 
        icon: Shield, 
        color: 'text-blue-400', 
        glow: 'shadow-blue-500/20',
        bonus: '+100% Phòng Thủ, +200% HP'
    },
    { 
        id: CharacterClass.ShadowBlade, 
        icon: Sword, 
        color: 'text-indigo-400', 
        glow: 'shadow-indigo-500/20',
        bonus: '+150% Tấn Công, +60% Chí Mạng'
    },
    { 
        id: CharacterClass.AlchemistMage, 
        icon: Beaker, 
        color: 'text-emerald-400', 
        glow: 'shadow-emerald-500/20',
        bonus: '+100% Hiệu quả thuốc, +200% Rơi đồ'
    }
  ];

  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/95 backdrop-blur-3xl p-6 md:p-12 overflow-y-auto">
      <div className="max-w-7xl w-full flex flex-col items-center">
        <h1 className="text-4xl md:text-7xl font-black text-white text-center mb-4 uppercase italic tracking-tighter">
            CHỌN HỆ PHÁI CỦA BẠN
        </h1>
        <p className="text-slate-500 text-sm font-black uppercase tracking-[0.4em] mb-16">Định mệnh thợ rèn bắt đầu từ đây</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {phai.map(p => {
                const info = (THONG_TIN_HE_PHAI as any)[p.id];
                return (
                    <div 
                        key={p.id} 
                        className={`bg-slate-900/50 border border-white/5 rounded-[2.5rem] p-8 flex flex-col items-center text-center transition-all duration-500 hover:border-white/20 hover:bg-slate-900 group relative overflow-hidden shadow-2xl ${p.glow}`}
                    >
                        <div className="w-24 h-24 bg-slate-950 rounded-full flex items-center justify-center border border-white/5 mb-8 group-hover:scale-110 transition-transform duration-500">
                            <p.icon size={40} className={p.color} />
                        </div>

                        <h3 className="text-2xl font-black text-white uppercase mb-4 tracking-tight">{info.name}</h3>
                        <p className="text-xs text-slate-500 leading-relaxed italic mb-8 h-12 line-clamp-2">
                            {info.desc}
                        </p>

                        <div className="bg-black/40 w-full py-4 rounded-2xl border border-white/5 mb-8">
                            <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest leading-none">
                                {p.bonus}
                            </span>
                        </div>

                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                onSelect(p.id);
                            }}
                            className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all active:scale-95 shadow-xl flex items-center justify-center gap-2 group-hover:shadow-blue-500/20"
                        >
                            CHỌN CON ĐƯỜNG NÀY <ChevronRight size={16} />
                        </button>
                    </div>
                );
            })}
        </div>
      </div>
    </div>
  );
};
