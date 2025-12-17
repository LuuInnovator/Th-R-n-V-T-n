
import React from 'react';
import { EternalUpgrade } from '../../types';
import { Sparkles, ArrowUpCircle, Lock, ChevronRight, Gem, Shield, Zap, Coins } from 'lucide-react';
import { formatNumber } from '../../utils';

interface EternalUpgradeCardProps {
  upgrade: EternalUpgrade;
  currentLevel: number;
  eternalPoints: number;
  onBuy: (upgrade: EternalUpgrade) => void;
}

export const EternalUpgradeCard: React.FC<EternalUpgradeCardProps> = ({ 
  upgrade, currentLevel, eternalPoints, onBuy 
}) => {
  const isMax = currentLevel >= upgrade.maxLevel;
  const cost = Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, currentLevel));
  const canBuy = !isMax && eternalPoints >= cost;
  const progress = (currentLevel / upgrade.maxLevel) * 100;

  // Lấy Icon dựa trên ID để tăng tính thẩm mỹ
  const getIcon = () => {
      const id = upgrade.id.toString();
      if (id.includes('blood')) return <Shield size={28} />;
      if (id.includes('latent')) return <Zap size={28} />;
      if (id.includes('gold')) return <Coins size={28} />;
      if (id.includes('ep') || id.includes('resource')) return <Gem size={28} />;
      return <Sparkles size={28} />;
  };

  return (
    <div className={`p-6 rounded-3xl border transition-all duration-500 flex flex-col gap-5 relative overflow-hidden group ${
      isMax ? 'bg-amber-600/5 border-amber-500/20 shadow-[0_0_20px_rgba(217,119,6,0.05)]' : 
      'bg-slate-900/60 border-slate-800 hover:border-slate-700'
    }`}>
      {/* Cấp độ Badge */}
      <div className="absolute top-5 right-5 text-[11px] font-mono font-black text-amber-500 bg-amber-950/20 px-3 py-1 rounded-full border border-amber-500/20 backdrop-blur-md z-10">
        Cấp {currentLevel} / {upgrade.maxLevel}
      </div>

      <div className="flex items-center gap-5 relative z-10">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-300 ${
          isMax ? 'bg-amber-600 text-slate-950 shadow-[0_0_20px_rgba(217,119,6,0.4)] border-amber-400' : 
          'bg-slate-800 text-amber-500 border-slate-700 group-hover:bg-slate-700/50'
        }`}>
            {getIcon()}
        </div>
        <div className="flex-1 min-w-0 pr-12">
            <h4 className={`text-base font-black uppercase tracking-tight truncate ${isMax ? 'text-amber-500' : 'text-slate-100'}`}>
                {upgrade.name}
            </h4>
            <div className="text-[10px] text-amber-400 font-bold uppercase tracking-widest mt-1">
                +{currentLevel * upgrade.effectValue}% <span className="opacity-60 text-slate-500">Tiềm Năng</span>
            </div>
        </div>
      </div>

      <p className="text-[11px] text-slate-500 leading-relaxed italic h-12 line-clamp-3 opacity-80 group-hover:opacity-100 transition-opacity relative z-10">
        {upgrade.description}
      </p>

      {/* Progress Bar */}
      <div className="space-y-1.5 mt-2 relative z-10">
          <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800/50 shadow-inner p-0.5">
            <div 
                className={`h-full rounded-full transition-all duration-700 ease-out ${isMax ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'bg-amber-600'}`} 
                style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-slate-600">
              <span>Định mức vĩnh hằng</span>
              <span>{Math.floor(progress)}%</span>
          </div>
      </div>
      
      <div className="flex items-center justify-between gap-5 mt-4 relative z-10">
        <div className="flex flex-col">
          <span className="text-[9px] text-slate-600 uppercase font-black tracking-[0.2em] mb-0.5">Tiêu tốn</span>
          <div className={`text-sm font-black transition-colors ${canBuy ? 'text-amber-400' : 'text-slate-700'}`}>
            {isMax ? '---' : formatNumber(cost)} <span className="text-[10px] text-slate-600 font-bold">EP</span>
          </div>
        </div>
        
        <button 
          disabled={!canBuy}
          onClick={() => onBuy(upgrade)}
          className={`flex-1 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2 border-none ${
            isMax 
              ? 'bg-slate-800 text-slate-600 cursor-default' 
              : (canBuy 
                  ? 'bg-amber-600 text-slate-950 hover:bg-amber-500 shadow-xl shadow-amber-900/40 active:scale-95' 
                  : 'bg-slate-900 text-slate-700 cursor-not-allowed')
          }`}
        >
          {isMax ? 'ĐÃ ĐẠT CỰC HẠN' : (
            <>THĂNG CẤP <ChevronRight size={16} /></>
          )}
        </button>
      </div>
    </div>
  );
};
