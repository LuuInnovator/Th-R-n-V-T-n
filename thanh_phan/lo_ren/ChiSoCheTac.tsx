
import React from 'react';
import { Blueprint, Rarity, Player } from '../../kieu_du_lieu';
import { Sword, Shield, Flame, AlertTriangle, Target } from 'lucide-react';
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
      <div className="bg-slate-900/60 p-5 rounded-3xl border border-slate-800 space-y-4">
        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2 mb-2">
            <Target size={14} /> DỰ ĐOÁN PHẨM CHẤT
        </h4>

        {dotNhiet && (
            <div className="p-3 bg-red-950/20 border border-red-900/30 rounded-2xl flex items-center gap-3 border-dashed animate-pulse">
                <AlertTriangle size={18} className="text-red-500 shrink-0" />
                <div className="text-[9px] font-black text-red-400 uppercase leading-tight tracking-wider">
                    70% RỦI RO THẤT BẠI MẤT TRẮNG NGUYÊN LIỆU!
                </div>
            </div>
        )}

        <div className="divide-y divide-slate-800/40">
          {(Object.values(Rarity) as Rarity[]).reverse().map(rarity => {
              const tyLe = layTyLe(rarity);
              if (tyLe === 0) return null;
              const chiSo = tinhChiSoRarity(rarity);

              return (
                  <div key={rarity} className="py-3 flex items-center justify-between group">
                      <div className="flex flex-col">
                          <span className={`font-black text-[11px] uppercase tracking-widest ${MAU_DO_HIEM[rarity]}`}>{rarity}</span>
                          <div className="flex gap-3 mt-1 opacity-60">
                              {chiSo.maxAtk > 0 && <div className="flex items-center gap-1"><Sword size={10} className="text-red-500" /><span className="text-[10px] font-mono text-slate-400">{chiSo.minAtk}-{chiSo.maxAtk}</span></div>}
                              {chiSo.maxDef > 0 && <div className="flex items-center gap-1"><Shield size={10} className="text-blue-500" /><span className="text-[10px] font-mono text-slate-400">{chiSo.minDef}-{chiSo.maxDef}</span></div>}
                          </div>
                      </div>
                      <div className="text-xs font-mono font-black text-slate-600 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">{tyLe}%</div>
                  </div>
              );
          })}
        </div>
      </div>

      <div className="p-4 bg-indigo-900/10 border border-indigo-500/20 rounded-2xl">
          <div className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-1">Cấp Tiến Hóa Hiện Tại: {capTienHoa}</div>
          <p className="text-[10px] text-slate-500 italic font-medium leading-relaxed">Mọi trang bị từ bản vẽ này sẽ được tăng cường <span className="text-indigo-400 font-black">+{capTienHoa * 25}%</span> sức mạnh gốc.</p>
      </div>
    </div>
  );
};
