
import React, { useState } from 'react';
import { Equipment, EquipmentType, Player, EnchantmentType, Rarity } from '../../kieu_du_lieu';
import { MAU_DO_HIEM } from '../../hang_so/do_hiem';
import { Sword, Shield, HardHat, Hand, Footprints, CircuitBoard, DollarSign, Hammer, Sparkles, Gem, Plus, Box, AlertCircle } from 'lucide-react';
import { NutBam } from '../NutBam';
import { CuaSoNangCap } from './CuaSoNangCap';
import { DongNhatKy } from '../../logic_game/nhat_ky';

interface Props {
  equipments: Equipment[];
  onEquip: (item: Equipment) => void;
  onSell: (item: Equipment) => void;
  player: Player;
  onSocketGem?: (gemKey: string, item: Equipment) => void;
  onAddSocket?: (item: Equipment) => void;
  onEnchant?: (type: EnchantmentType, item: Equipment) => void;
}

const ICON_THEO_LOAI: Record<string, React.ElementType> = {
  [EquipmentType.Weapon]: Sword,
  [EquipmentType.Helmet]: HardHat,
  [EquipmentType.Armor]: Shield,
  [EquipmentType.Gloves]: Hand,
  [EquipmentType.Boots]: Footprints,
  [EquipmentType.Accessory]: CircuitBoard,
};

const LAY_LOP_GLOW = (rarity: Rarity) => {
    switch(rarity) {
        case Rarity.Rare: return 'glow-rare border-blue-500/30';
        case Rarity.Epic: return 'glow-epic border-purple-500/30';
        case Rarity.Legendary: return 'glow-legendary border-amber-500/30';
        case Rarity.Mythic: return 'glow-mythic border-red-500/30';
        case Rarity.Cosmic: return 'glow-cosmic border-cyan-500/30';
        default: return 'border-slate-800';
    }
};

export const DanhSachTrangBi: React.FC<Props> = ({ 
    equipments, onEquip, onSell, player, onSocketGem, onAddSocket, onEnchant 
}) => {
  const [monDoChon, datMonDoChon] = useState<Equipment | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-4">
            <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
            <h3 className="font-black text-xl text-white uppercase tracking-tighter italic">Kho Trang Bị</h3>
            <span className="text-[10px] font-black px-3 py-1 bg-slate-900 border border-white/5 rounded-full text-slate-500">{equipments.length} / 50</span>
        </div>
      </div>

      {equipments.length === 0 ? (
          <div className="text-center text-slate-600 py-24 flex flex-col items-center gap-4 border-2 border-dashed border-slate-900 rounded-[2.5rem] m-4">
            <Box size={48} className="text-slate-800" />
            <p className="font-black uppercase tracking-widest text-[11px] italic">Túi đồ trống rỗng. Hãy đi săn quái và rèn thêm đồ!</p>
          </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-2">
            {equipments.map((item) => {
              const Icon = ICON_THEO_LOAI[item.type] || Sword;
              const rarityColor = MAU_DO_HIEM[item.rarity];
              const glowClass = LAY_LOP_GLOW(item.rarity);
              const mainStat = item.stats.attack || item.stats.defense || item.stats.hpBonus;
              const duCap = player.level >= item.reqLevel;

              return (
                <div 
                    key={item.id} 
                    className={`relative flex flex-col p-6 rounded-[2rem] border-2 transition-all duration-500 group animate-fade-in ${item.isEquipped ? 'bg-blue-900/10 border-blue-500/50 scale-[1.02]' : 'bg-slate-900/40 border-slate-800 hover:border-slate-600'} ${glowClass}`}
                >
                    <div className="absolute -top-3 left-6 px-3 py-1 bg-slate-950 border border-white/10 rounded-full z-10">
                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{item.type}</span>
                    </div>

                    <div className="flex justify-between items-start mb-4">
                        <div className="flex flex-col">
                             <h4 className={`font-black text-sm uppercase tracking-tight leading-none mb-1 ${rarityColor}`}>{item.name}</h4>
                             <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{item.rarity}</span>
                        </div>
                        <div className="bg-slate-950 px-3 py-1.5 rounded-2xl border border-white/5 flex flex-col items-center">
                            <span className="text-[7px] text-slate-600 font-black uppercase">Chỉ số</span>
                            <span className="text-xs font-black text-blue-400 tabular-nums">{mainStat?.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className={`flex items-center gap-2 text-[10px] font-black uppercase ${duCap ? 'text-slate-500' : 'text-red-500 animate-pulse'}`}>
                            <AlertCircle size={12} />
                            Yêu cầu cấp {item.reqLevel}
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center py-4 relative">
                         <div className={`absolute inset-0 blur-[40px] opacity-10 rounded-full ${rarityColor.replace('text-', 'bg-')}`}></div>
                         <Icon size={48} className={`relative z-10 transition-transform duration-700 group-hover:scale-125 ${rarityColor}`} />
                    </div>

                    <div className="grid grid-cols-4 gap-2 mt-auto">
                        <NutBam 
                            kieu={item.isEquipped ? 'vien' : (duCap ? 'chinh' : 'ma')} 
                            kich_co="xs" 
                            className="col-span-2 py-3 rounded-xl"
                            onClick={() => onEquip(item)}
                            disabled={!duCap && !item.isEquipped}
                        >
                            {item.isEquipped ? 'Đang mặc' : 'Trang Bị'}
                        </NutBam>
                        <button 
                            onClick={() => datMonDoChon(item)} 
                            className="p-3 rounded-xl bg-slate-800 hover:bg-orange-600 text-white transition-all border border-white/5 flex items-center justify-center group/btn"
                        >
                            <Hammer size={16} className="group-hover/btn:rotate-12 transition-transform" />
                        </button>
                        <button 
                            onClick={() => onSell(item)} 
                            className="p-3 rounded-xl bg-slate-800 hover:bg-rose-600 text-white transition-all border border-white/5 flex items-center justify-center"
                        >
                            <DollarSign size={16} />
                        </button>
                    </div>
                </div>
              );
            })}
        </div>
      )}

      {monDoChon && player && (
          <CuaSoNangCap 
              item={monDoChon}
              player={player}
              onClose={() => datMonDoChon(null)}
              onSocketGem={(key) => onSocketGem?.(key, monDoChon)}
              onEnchant={(type) => onEnchant?.(type, monDoChon)}
              onAddSocket={() => onAddSocket?.(monDoChon)}
          />
      )}
    </div>
  );
};
