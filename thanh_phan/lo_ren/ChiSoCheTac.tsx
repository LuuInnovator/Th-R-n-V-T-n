
import React from 'react';
import { Blueprint, Rarity, Player } from '../../kieu_du_lieu';
import { Sword, Shield, Target } from 'lucide-react';
import { HE_SO_DO_HIEM, MAU_DO_HIEM } from '../../hang_so/do_hiem';

interface Props {
  blueprint: Blueprint;
  dotNhiet: boolean;
  player: Player;
}

export const ChiSoCheTac: React.FC<Props> = ({ blueprint, dotNhiet, player }) => {
  const capTienHoa = player.blueprintLevels[blueprint.id] || 0;
  const thuongTienHoa = capTienHoa * 0.25;

  const tinhChiSoRarity = (rarity: Rarity) => {
      const heSo = HE_SO_DO_HIEM[rarity] * (dotNhiet ? 2.0 : 1.0);
      const bonus = (1 + thuongTienHoa);
      
      return {
        minAtk: Math.floor(blueprint.baseStats.minAtk * heSo * bonus),
        maxAtk: Math.floor(blueprint.baseStats.maxAtk * heSo * bonus),
        minDef: Math.floor(blueprint.baseStats.minDef * heSo * bonus),
        maxDef: Math.floor(blueprint.baseStats.maxDef * heSo * bonus)
      };
  };

  const layTyLe = (rarity: Rarity) => {
    if (dotNhiet) {
        if (rarity === Rarity.Cosmic) return 2;
        if (rarity === Rarity.Mythic) return 5;
        if (rarity === Rarity.Legendary) return 10;
        if (rarity === Rarity.Epic) return 13;
        return 0;
    }
    const tyLeChuan = { [Rarity.Common]: 60, [Rarity.Rare]: 25, [Rarity.Epic]: 10, [Rarity.Legendary]: 4, [Rarity.Mythic]: 0.9, [Rarity.Cosmic]: 0.1 };
    return tyLeChuan[rarity];
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-slate-900/40 p-4 rounded-3xl border border-white/5 space-y-4">
        <div className="flex items-center justify-between px-1">
            <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Target size={12} /> DỰ ĐOÁN PHẨM CHẤT
            </h4>
            <div className="text-[8px] font-black text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20 uppercase tracking-widest">
                Lv.{capTienHoa} (+{Math.floor(thuongTienHoa * 100)}%)
            </div>
        </div>

        <div className="grid gap-2">
          {(Object.values(Rarity) as Rarity[]).reverse().map(rarity => {
              const tyLe = layTyLe(rarity);
              if (tyLe === 0) return null;
              const chiSo = tinhChiSoRarity(rarity);

              return (
                  <div key={rarity} className="bg-slate-950/60 p-2.5 px-4 rounded-xl border border-white/5 flex items-center justify-between group transition-all">
                      <div className="flex flex-col">
                          <span className={`font-black text-[10px] uppercase tracking-widest ${MAU_DO_HIEM[rarity]}`}>{rarity}</span>
                          <div className="flex gap-3 mt-1">
                              {chiSo.maxAtk > 0 && (
                                <div className="flex items-center gap-1 opacity-80">
                                    <Sword size={8} className="text-red-500" />
                                    <span className="text-[9px] font-black text-slate-400 tabular-nums">{chiSo.minAtk}-{chiSo.maxAtk}</span>
                                </div>
                              )}
                              {chiSo.maxDef > 0 && (
                                <div className="flex items-center gap-1 opacity-80">
                                    <Shield size={8} className="text-blue-500" />
                                    <span className="text-[9px] font-black text-slate-400 tabular-nums">{chiSo.minDef}-{chiSo.maxDef}</span>
                                </div>
                              )}
                          </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[7px] font-black text-slate-600 uppercase mb-0.5">Tỷ lệ</span>
                        <div className="text-[10px] font-black text-white bg-slate-900 px-2 py-0.5 rounded-lg border border-white/5 tabular-nums">{tyLe}%</div>
                      </div>
                  </div>
              );
          })}
        </div>
      </div>
    </div>
  );
};
