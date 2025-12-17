
import React from 'react';
import { Blueprint, Rarity } from '../../types';
import { Info, Flame, Shield, Sword, AlertTriangle } from 'lucide-react';
import { RARITY_MULTIPLIER, RARITY_COLOR } from '../../constants';

interface CraftingStatsProps {
  blueprint: Blueprint;
  useOverheat: boolean;
  onToggleOverheat: () => void;
}

export const CraftingStats: React.FC<CraftingStatsProps> = ({ blueprint, useOverheat, onToggleOverheat }) => {
  const overheatMult = useOverheat ? 2.5 : 1.0;

  const calculateStat = (min: number, max: number, rarity: Rarity) => {
      const mult = RARITY_MULTIPLIER[rarity] * overheatMult;
      return {
          min: Math.floor(min * mult),
          max: Math.floor(max * mult)
      };
  };

  const hasAtk = blueprint.baseStats.maxAtk > 0;
  const hasDef = blueprint.baseStats.maxDef > 0;

  // Hàm xác định tỷ lệ % dựa trên chế độ
  const getProbability = (rarity: Rarity, isOverheat: boolean) => {
      if (isOverheat) {
          switch (rarity) {
              case Rarity.Common: return 0;
              case Rarity.Rare: return 0;
              case Rarity.Epic: return 10;
              case Rarity.Legendary: return 10;
              case Rarity.Mythic: return 5;
              default: return 0;
          }
      } else {
          switch (rarity) {
              case Rarity.Common: return 60;
              case Rarity.Rare: return 25;
              case Rarity.Epic: return 10;
              case Rarity.Legendary: return 4;
              case Rarity.Mythic: return 1;
              default: return 0;
          }
      }
  };

  return (
    <div className="flex flex-col gap-3 h-full overflow-hidden">
       {/* Nút Tăng Nhiệt */}
      <button 
        onClick={onToggleOverheat}
        className={`
          w-full p-3 rounded-xl border transition-all duration-300 relative overflow-hidden group select-none active:scale-95 text-left shrink-0
          ${useOverheat 
            ? 'bg-red-900/20 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]' 
            : 'bg-slate-800 border-slate-600 hover:border-slate-500'}
        `}
      >
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${useOverheat ? 'bg-red-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
              <Flame size={20} className={useOverheat ? 'animate-pulse' : ''} />
            </div>
            <div>
              <div className={`font-bold text-sm ${useOverheat ? 'text-red-400' : 'text-slate-300'}`}>Tăng Nhiệt Lò Rèn</div>
              <div className="text-[10px] text-slate-500">
                  {useOverheat ? 'Chỉ số x2.5 • Nguy hiểm cao' : 'Chế tạo an toàn'}
              </div>
            </div>
          </div>
          <div className={`w-5 h-5 rounded border flex items-center justify-center ${useOverheat ? 'bg-red-500 border-red-400' : 'border-slate-500'}`}>
            {useOverheat && <div className="w-2 h-2 bg-white rounded-full" />}
          </div>
        </div>
      </button>

      {/* Danh sách Chỉ số & Tỷ lệ (Gộp chung) */}
      <div className="bg-slate-900/50 rounded-xl border border-slate-700 flex-1 overflow-y-auto scrollbar-thin p-2">
        <h4 className="font-bold text-xs text-slate-400 uppercase tracking-widest mb-2 px-2 flex items-center gap-2 sticky top-0 bg-slate-900/95 py-2 z-10 border-b border-slate-800">
            <Info size={14} /> Tỷ Lệ & Chỉ Số {useOverheat && <span className="text-red-400 ml-auto text-[10px] border border-red-500/30 px-1 rounded bg-red-900/20">x2.5 STATS</span>}
        </h4>
        
        <div className="space-y-2 pb-2">
            {/* Cảnh báo nổ lò khi Overheat */}
            {useOverheat && (
                <div className="flex items-center justify-between text-xs p-3 rounded bg-red-900/20 border border-red-500/50 mb-4 animate-pulse">
                    <div className="flex items-center gap-2 text-red-400 font-bold">
                        <AlertTriangle size={16} />
                        <span>NỔ LÒ (Mất đồ)</span>
                    </div>
                    <span className="font-black text-red-500 text-sm">75%</span>
                </div>
            )}

            {Object.values(Rarity).map(rarity => {
                const atk = calculateStat(blueprint.baseStats.minAtk, blueprint.baseStats.maxAtk, rarity);
                const def = calculateStat(blueprint.baseStats.minDef, blueprint.baseStats.maxDef, rarity);
                const chance = getProbability(rarity, useOverheat);
                const isZeroChance = chance === 0;

                return (
                    <div 
                        key={rarity} 
                        className={`
                            flex flex-col gap-1 text-xs p-2 rounded border transition-colors
                            ${isZeroChance ? 'bg-slate-900/20 border-slate-800 opacity-40 order-last' : 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/80'}
                            ${rarity === Rarity.Mythic && !isZeroChance ? 'border-red-900/30 bg-red-900/5' : ''}
                        `}
                    >
                        {/* Tên độ hiếm + Tỷ lệ % */}
                        <div className="flex justify-between items-center">
                            <span className={`font-bold ${RARITY_COLOR[rarity]}`}>{rarity}</span>
                            <span className={`font-mono font-bold ${isZeroChance ? 'text-slate-600' : 'text-slate-200'} ${rarity === Rarity.Mythic && !isZeroChance ? 'text-red-400 text-sm' : ''}`}>
                                {chance}%
                            </span>
                        </div>

                        {/* Chỉ số dự đoán (Chỉ hiện nếu có tỷ lệ) */}
                        {!isZeroChance && (hasAtk || hasDef) && (
                            <div className="flex gap-2 font-mono text-slate-300 justify-end mt-1 border-t border-slate-700/30 pt-1">
                                {hasAtk && (
                                     <span className="flex items-center gap-1 text-[10px] text-red-300">
                                        <Sword size={10} /> {atk.min}-{atk.max}
                                     </span>
                                )}
                                {hasDef && (
                                     <span className="flex items-center gap-1 text-[10px] text-blue-300">
                                        <Shield size={10} /> {def.min}-{def.max}
                                     </span>
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
      </div>
    </div>
  );
};
