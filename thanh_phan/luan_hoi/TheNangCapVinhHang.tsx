
import React from 'react';
import { EternalUpgrade } from '../../kieu_du_lieu';
import { Sparkles, Shield, Zap, Coins, ChevronRight } from 'lucide-react';
import { dinh_dang_so } from '../../tien_ich/tinh_toan';

interface Props {
  upgrade: EternalUpgrade;
  currentLevel: number;
  eternalPoints: number;
  onBuy: (upgrade: EternalUpgrade) => void;
}

export const TheNangCapVinhHang: React.FC<Props> = ({ 
  upgrade, currentLevel, eternalPoints, onBuy 
}) => {
  const daMax = currentLevel >= upgrade.maxLevel;
  const gia = Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, currentLevel));
  const coTheMua = !daMax && eternalPoints >= gia;
  const tienDo = (currentLevel / upgrade.maxLevel) * 100;

  const layIcon = () => {
      const id = upgrade.id.toString();
      if (id.includes('blood') || id.includes('vinh_hang')) return <Shield size={28} />;
      if (id.includes('latent') || id.includes('tiem_an')) return <Zap size={28} />;
      if (id.includes('gold') || id.includes('vang')) return <Coins size={28} />;
      return <Sparkles size={28} />;
  };

  return (
    <div className={`p-6 rounded-3xl border transition-all duration-500 flex flex-col gap-5 relative overflow-hidden group ${daMax ? 'bg-amber-600/5 border-amber-500/20 shadow-lg' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'}`}>
      <div className="absolute top-5 right-5 text-[11px] font-mono font-black text-amber-500 bg-amber-950/20 px-3 py-1 rounded-full border border-amber-500/20 backdrop-blur-md z-10">
        Cấp {currentLevel} / {upgrade.maxLevel}
      </div>

      <div className="flex items-center gap-5 relative z-10">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-300 ${daMax ? 'bg-amber-600 text-slate-950 border-amber-400' : 'bg-slate-800 text-amber-500 border-slate-700 group-hover:bg-slate-700/50'}`}>
            {layIcon()}
        </div>
        <div className="flex-1 min-w-0 pr-12">
            <h4 className={`text-base font-black uppercase tracking-tight truncate ${daMax ? 'text-amber-500' : 'text-slate-100'}`}>
                {upgrade.name}
            </h4>
            <div className="text-[10px] text-amber-400 font-bold uppercase mt-1">
                +{currentLevel * upgrade.effectValue}% Sức Mạnh
            </div>
        </div>
      </div>

      <p className="text-[11px] text-slate-500 leading-relaxed italic h-12 line-clamp-3 opacity-80 group-hover:opacity-100 transition-opacity relative z-10">
        {upgrade.description}
      </p>

      <div className="space-y-1.5 mt-2 relative z-10">
          <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800/50 shadow-inner p-0.5">
            <div className={`h-full rounded-full transition-all duration-700 ease-out ${daMax ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'bg-amber-600'}`} style={{ width: `${tienDo}%` }}></div>
          </div>
          <div className="flex justify-between items-center text-[9px] font-black uppercase text-slate-600">
              <span>Định mức vĩnh hằng</span>
              <span>{Math.floor(tienDo)}%</span>
          </div>
      </div>
      
      <div className="flex items-center justify-between gap-5 mt-4 relative z-10">
        <div className="flex flex-col">
          <span className="text-[9px] text-slate-600 uppercase font-black mb-0.5">Chi phí</span>
          <div className={`text-sm font-black transition-colors ${coTheMua ? 'text-amber-400' : 'text-slate-700'}`}>
            {daMax ? '---' : dinh_dang_so(gia)} <span className="text-[10px] text-slate-600 font-bold">EP</span>
          </div>
        </div>
        
        <button 
          disabled={!coTheMua}
          onClick={() => onBuy(upgrade)}
          className={`flex-1 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2 border-none ${daMax ? 'bg-slate-800 text-slate-600' : (coTheMua ? 'bg-amber-600 text-slate-950 hover:bg-amber-500 shadow-xl shadow-amber-900/40 active:scale-95' : 'bg-slate-900 text-slate-700 cursor-not-allowed')}`}
        >
          {daMax ? 'ĐÃ ĐẠT CỰC HẠN' : <><span className="mr-1">THĂNG CẤP</span> <ChevronRight size={16} /></>}
        </button>
      </div>
    </div>
  );
};
