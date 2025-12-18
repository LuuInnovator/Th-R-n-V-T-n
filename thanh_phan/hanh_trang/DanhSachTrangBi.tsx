
import React, { useState } from 'react';
import { Equipment, EquipmentType, Player, Rarity } from '../../kieu_du_lieu';
import { Ghost, ShieldAlert, VolumeX, Zap, HeartPulse, Droplets, Sword, Shield, HardHat, Hand, Footprints, CircuitBoard, Box } from 'lucide-react';
import { MAU_DO_HIEM } from '../../hang_so/do_hiem';
import { dinh_dang_so } from '../../tien_ich/tinh_toan';

interface Props {
    equipments: Equipment[];
    onEquip: (item: Equipment) => void;
    onSell: (item: Equipment) => void;
    player: Player;
    onSocketGem: (key: string, item: Equipment) => void;
    onAddSocket: (item: Equipment) => void;
    onEnchant: (type: any, item: Equipment) => void;
    selectionMode: boolean;
    selectedIds?: string[];
    onToggleSelect?: (id: string) => void;
}

const MINI_ICONS: Record<string, any> = {
  dodge: Ghost, reflect: ShieldAlert, silence: VolumeX, stun: Zap, regen: HeartPulse, lifesteal: Droplets
};

const ICON_THEO_LOAI: Record<string, any> = {
  [EquipmentType.Weapon]: Sword,
  [EquipmentType.Armor]: Shield,
  [EquipmentType.Helmet]: HardHat,
  [EquipmentType.Ring]: Hand,
  [EquipmentType.Boots]: Footprints,
  [EquipmentType.Necklace]: CircuitBoard
};

const LAY_LOP_GLOW = (rarity: Rarity) => {
    switch(rarity) {
        case Rarity.Legendary: return 'shadow-amber-500/10';
        case Rarity.Mythic: return 'shadow-red-500/20';
        case Rarity.Cosmic: return 'shadow-cyan-400/30';
        default: return '';
    }
};

export const DanhSachTrangBi: React.FC<Props> = ({ 
    equipments, onEquip, onSell, player, onSocketGem, onAddSocket, onEnchant, 
    selectionMode, selectedIds = [], onToggleSelect 
}) => {
  const [monDoChon, datMonDoChon] = useState<Equipment | null>(null);

  return (
    <div className="space-y-6">
      {equipments.length === 0 ? (
          <div className="text-center py-20 text-slate-700 uppercase font-black tracking-widest text-sm italic">Túi đồ trống rỗng...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-2">
            {equipments.map((item) => {
              const Icon = ICON_THEO_LOAI[item.type] || Sword;
              const rarityColor = MAU_DO_HIEM[item.rarity];
              const glowClass = LAY_LOP_GLOW(item.rarity);
              const mainStat = item.stats.attack || item.stats.defense || item.stats.hpBonus;
              const isSelected = selectedIds.includes(item.id);

              // Tìm các chỉ số đặc biệt
              const specialStats = Object.entries(item.stats).filter(([k]) => ['dodge', 'reflect', 'silence', 'stun', 'regen', 'lifesteal'].includes(k));

              return (
                <div 
                    key={item.id} 
                    onClick={() => selectionMode && onToggleSelect?.(item.id)}
                    className={`relative flex flex-col p-6 rounded-[2.5rem] border-2 transition-all duration-500 group animate-fade-in cursor-pointer ${isSelected ? 'bg-amber-500/10 border-amber-500' : 'bg-slate-950 border-slate-800 hover:border-slate-600'} ${glowClass}`}
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex flex-col">
                             <h4 className={`font-black text-xs uppercase tracking-tight leading-tight mb-1 ${rarityColor}`}>{item.name}</h4>
                             <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">{item.rarity}</span>
                        </div>
                        <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-white/5 flex flex-col items-center">
                            <span className="text-[7px] text-slate-600 font-black uppercase">Stat</span>
                            <span className="text-xs font-black text-blue-400 tabular-nums">{dinh_dang_so(mainStat || 0)}</span>
                        </div>
                    </div>

                    {/* HIỂN THỊ DÒNG OPTION */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {specialStats.map(([key, val]) => {
                            const MIcon = MINI_ICONS[key];
                            return (
                                <div key={key} className="flex items-center gap-1 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-lg">
                                    <MIcon size={8} className="text-red-500" />
                                    <span className="text-[8px] font-black text-red-400">+{val}{key === 'regen' ? '' : '%'}</span>
                                </div>
                            );
                        })}
                    </div>
                    
                    {!selectionMode && (
                        <div className="mt-auto pt-4 flex gap-2">
                             <button onClick={(e) => { e.stopPropagation(); onEquip(item); }} className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[8px] font-black uppercase tracking-widest shadow-lg shadow-blue-900/40">Trang bị</button>
                             <button onClick={(e) => { e.stopPropagation(); onSell(item); }} className="px-4 py-2 bg-slate-900 hover:bg-rose-600 text-slate-500 hover:text-white rounded-xl text-[8px] font-black uppercase transition-colors border border-white/5">Bán</button>
                        </div>
                    )}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};
