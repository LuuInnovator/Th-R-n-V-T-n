
import React from 'react';
import { Blueprint, Rarity, Player } from '../../types';
import { Sword, Shield, Flame, AlertTriangle, Heart } from 'lucide-react';
import { RARITY_MULTIPLIER, RARITY_COLOR } from '../../constants';

interface CraftingStatsProps {
  blueprint: Blueprint;
  useOverheat: boolean;
  onToggleOverheat: () => void;
  player: Player;
}

export const CraftingStats: React.FC<CraftingStatsProps> = ({ blueprint, useOverheat, onToggleOverheat, player }) => {
  const evolLevel = player.blueprintLevels[blueprint.id] || 0;
  const evolBonus = evolLevel * 0.25;
  const memoryBonus = blueprint.id === 'bp_legacy' ? player.memoryGemPotential : 0;

  const calculateRarityStats = (rarity: Rarity) => {
      const mult = RARITY_MULTIPLIER[rarity] * (useOverheat ? 2.0 : 1.0);
      
      const minAtk = blueprint.baseStats.minAtk > 0 ? Math.floor((blueprint.baseStats.minAtk * mult) * (1 + evolBonus) + memoryBonus) : 0;
      const maxAtk = blueprint.baseStats.maxAtk > 0 ? Math.floor((blueprint.baseStats.maxAtk * mult) * (1 + evolBonus) + memoryBonus) : 0;
      
      const minDef = blueprint.baseStats.minDef > 0 ? Math.floor((blueprint.baseStats.minDef * mult) * (1 + evolBonus)) : 0;
      const maxDef = blueprint.baseStats.maxDef > 0 ? Math.floor((blueprint.baseStats.maxDef * mult) * (1 + evolBonus)) : 0;

      const minHp = (blueprint.baseStats.minHp || 0) > 0 ? Math.floor(((blueprint.baseStats.minHp || 0) * mult) * (1 + evolBonus)) : 0;
      const maxHp = (blueprint.baseStats.maxHp || 0) > 0 ? Math.floor(((blueprint.baseStats.maxHp || 0) * mult) * (1 + evolBonus)) : 0;

      return { minAtk, maxAtk, minDef, maxDef, minHp, maxHp };
  };

  const getProb = (rarity: Rarity, isOverheat: boolean) => {
    if (isOverheat) {
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

      {(evolLevel > 0 || memoryBonus > 0) && (
          <div className="p-2 bg-blue-900/10 border border-blue-800/30 rounded-lg text-[8px] font-bold text-blue-400 flex flex-col gap-1">
              {evolLevel > 0 && <div>+ Thưởng Tiến Hóa (+{evolLevel}): {Math.floor(evolBonus * 100)}%</div>}
              {memoryBonus > 0 && <div>+ Sát thương Ký ức: +{memoryBonus}</div>}
          </div>
      )}

      {useOverheat && (
          <div className="p-2 bg-red-950/20 border border-red-900/30 rounded-lg flex items-center gap-2 border-dashed">
              <AlertTriangle size={14} className="text-red-500 shrink-0" />
              <div className="text-[8px] font-black text-red-400 uppercase leading-tight">
                  CẢNH BÁO: 70% THẤT BẠI SẼ LÀM MẤT TRẮNG VẬT PHẨM!
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
            const stats = calculateRarityStats(rarity);

            return (
                <div key={rarity} className={`p-2 flex items-center justify-between group hover:bg-slate-800/20 transition-colors ${useOverheat ? 'bg-slate-900/20' : ''}`}>
                    <div className="flex flex-col">
                        <span className={`font-black text-[9px] uppercase tracking-wider ${RARITY_COLOR[rarity]}`}>{rarity}</span>
                        <div className="flex gap-2 mt-0.5 opacity-60">
                            {stats.maxAtk > 0 && (
                                <div className="flex items-center gap-1">
                                    <Sword size={8} className="text-red-500" />
                                    <span className="text-[8px] text-slate-400 font-mono font-bold">{stats.minAtk}-{stats.maxAtk}</span>
                                </div>
                            )}
                            {stats.maxDef > 0 && (
                                <div className="flex items-center gap-1">
                                    <Shield size={8} className="text-blue-500" />
                                    <span className="text-[8px] text-slate-400 font-mono font-bold">{stats.minDef}-{stats.maxDef}</span>
                                </div>
                            )}
                            {stats.maxHp > 0 && (
                                <div className="flex items-center gap-1">
                                    <Heart size={8} className="text-green-500" />
                                    <span className="text-[8px] text-slate-400 font-mono font-bold">{stats.minHp}-{stats.maxHp}</span>
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
