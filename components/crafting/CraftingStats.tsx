
import React from 'react';
import { Blueprint, Rarity } from '../../types';
import { Sword, Shield, Sparkles, Flame, AlertTriangle } from 'lucide-react';
import { RARITY_MULTIPLIER, RARITY_COLOR } from '../../constants';

interface CraftingStatsProps {
  blueprint: Blueprint;
  useOverheat: boolean;
  onToggleOverheat: () => void;
}

export const CraftingStats: React.FC<CraftingStatsProps> = ({ blueprint, useOverheat, onToggleOverheat }) => {
  const calculateStat = (min: number, max: number, rarity: Rarity) => {
      // Đồng bộ hệ số đốt nhiệt x2.0
      const mult = RARITY_MULTIPLIER[rarity] * (useOverheat ? 2.0 : 1.0);
      return { min: Math.floor(min * mult), max: Math.floor(max * mult) };
  };

  const getProb = (rarity: Rarity, isOverheat: boolean) => {
    if (isOverheat) {
        // Tỉ lệ thành công khi đốt nhiệt chỉ là 30% tổng (Rủi ro mất đồ 70%)
        if (rarity === Rarity.Cosmic) return 2;
        if (rarity === Rarity.Mythic) return 5;
        if (rarity === Rarity.Legendary) return 10;
        if (rarity === Rarity.Epic) return 13;
        return 0;
    }
    const probs = { [Rarity.Common]: 60, [Rarity.Rare]: 25, [Rarity.Epic]: 10, [Rarity.Legendary]: 4, [Rarity.Mythic]: 0.9, [Rarity.Cosmic]: 0.1 };
    return probs[rarity];
  };

  return (
    <div className="flex flex-col gap-2">
      <button 
        onClick={onToggleOverheat}
        className={`p-2 rounded-lg border transition-all duration-200 flex items-center justify-between
            ${useOverheat ? 'bg-red-600/10 border-red-500/50 shadow-md' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'}`}
      >
        <div className="flex items-center gap-2">
            <div className={`p-1 rounded ${useOverheat ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-800 text-slate-500'}`}>
                <Flame size={12} />
            </div>
            <div className="text-left">
                <span className={`font-black text-[9px] uppercase tracking-tighter block ${useOverheat ? 'text-red-400' : 'text-slate-400'}`}>Chế Độ Đốt Nhiệt</span>
            </div>
        </div>
        <div className={`font-mono text-[9px] font-black px-1.5 py-0.5 rounded ${useOverheat ? 'bg-red-500 text-white' : 'bg-slate-800 text-slate-500'}`}>
            {useOverheat ? 'Chỉ số x2.0' : 'Tiêu chuẩn'}
        </div>
      </button>

      {useOverheat && (
          <div className="p-2 bg-red-950/20 border border-red-900/30 rounded-lg flex items-center gap-2 border-dashed">
              <AlertTriangle size={14} className="text-red-500 shrink-0" />
              <div className="text-[8px] font-black text-red-400 uppercase leading-tight">
                  CẢNH BÁO: 70% THẤT BẠI SẼ LÀM MẤT TRẮNG VẬT PHẨM VÀ NGUYÊN LIỆU!
              </div>
          </div>
      )}

      <div className="bg-slate-900/40 rounded-lg border border-slate-800 divide-y divide-slate-800/30">
        {useOverheat && (
            <div className="p-2 flex items-center justify-between bg-red-900/20">
                <span className="font-black text-[9px] uppercase tracking-wider text-red-500 animate-pulse">THẤT BẠI (MẤT ĐỒ)</span>
                <span className="text-[9px] font-mono font-black text-red-500">70%</span>
            </div>
        )}
        {(Object.values(Rarity) as Rarity[]).reverse().map(rarity => {
            const prob = getProb(rarity, useOverheat);
            if (prob === 0) return null;
            const stats = calculateStat(blueprint.baseStats.minAtk, blueprint.baseStats.maxAtk, rarity);
            const defs = calculateStat(blueprint.baseStats.minDef, blueprint.baseStats.maxDef, rarity);

            return (
                <div key={rarity} className={`p-2 flex items-center justify-between group hover:bg-slate-800/20 transition-colors ${useOverheat ? 'bg-slate-900/20' : ''}`}>
                    <div className="flex flex-col">
                        <span className={`font-black text-[9px] uppercase tracking-wider ${RARITY_COLOR[rarity]}`}>{rarity}</span>
                        <div className="flex gap-2 mt-0.5 opacity-60">
                            {blueprint.baseStats.maxAtk > 0 && (
                                <div className="flex items-center gap-1">
                                    <Sword size={8} className="text-red-500" />
                                    <span className="text-[8px] text-slate-400 font-mono font-bold">{stats.min}-{stats.max}</span>
                                </div>
                            )}
                            {blueprint.baseStats.maxDef > 0 && (
                                <div className="flex items-center gap-1">
                                    <Shield size={8} className="text-blue-500" />
                                    <span className="text-[8px] text-slate-400 font-mono font-bold">{defs.min}-{defs.max}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="text-[9px] font-mono font-black text-slate-600">{prob}%</div>
                </div>
            );
        })}
      </div>
    </div>
  );
};
