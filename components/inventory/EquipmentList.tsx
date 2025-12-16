
import React, { useState } from 'react';
import { Equipment, EquipmentType, Player, GemType, EnchantmentType, GemTier } from '../../types';
import { RARITY_COLOR, GEM_STATS } from '../../constants';
import { Sword, Shield, HardHat, Hand, Footprints, CircuitBoard, DollarSign, Hammer, Gem, Sparkles } from 'lucide-react';
import { Card } from '../Card';
import { ItemUpgradeModal } from '../ItemUpgradeModal'; // Import Modal mới
import { useInventory } from '../../hooks/useInventory'; // Cần hook update

interface EquipmentListProps {
  equipments: Equipment[];
  onEquip: (item: Equipment) => void;
  onSell: (item: Equipment) => void;
  // Truyền thêm prop update
  onUpdateItem?: (item: Equipment) => void;
  player?: Player; // Cần player để check gem inventory
  onSocketGem?: (gemKey: string, item: Equipment) => void;
  onAddSocket?: (item: Equipment) => void;
  onEnchant?: (type: EnchantmentType, item: Equipment) => void;
}

const TYPE_ICONS: Record<EquipmentType, React.ElementType> = {
  [EquipmentType.Weapon]: Sword,
  [EquipmentType.Helmet]: HardHat,
  [EquipmentType.Armor]: Shield,
  [EquipmentType.Gloves]: Hand,
  [EquipmentType.Boots]: Footprints,
  [EquipmentType.Accessory]: CircuitBoard,
};

export const EquipmentList: React.FC<EquipmentListProps> = ({ 
    equipments, onEquip, onSell, onUpdateItem, player, onSocketGem, onAddSocket, onEnchant 
}) => {
  const [selectedItem, setSelectedItem] = useState<Equipment | null>(null);

  const handleSocket = (gemKey: string) => {
      if (selectedItem && onSocketGem) {
          onSocketGem(gemKey, selectedItem);
          // Đóng modal sau khi thao tác hoặc để mở để socket tiếp (tùy UX, tạm để mở)
      }
  };

  const handleEnchant = (type: EnchantmentType) => {
      if (selectedItem && onEnchant) {
          onEnchant(type, selectedItem);
      }
  };

  const handleAddSocket = () => {
      if (selectedItem && onAddSocket) {
          onAddSocket(selectedItem);
      }
  };

  return (
    <>
    <Card className="border-slate-700 bg-slate-900/40 shadow-2xl min-h-[300px]">
      <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-2">
        <div className="flex items-center gap-2">
            <Sword className="text-blue-500" size={20} />
            <h3 className="font-bold text-lg text-slate-200">Kho Trang Bị ({equipments.length})</h3>
        </div>
        <div className="text-xs text-slate-500 italic">Mới nhất xếp trên cùng</div>
      </div>

      {equipments.length === 0 ? (
          <div className="text-center text-slate-500 py-12 italic border-2 border-dashed border-slate-800 rounded-xl m-2">
            Chưa có trang bị nào. Hãy đi đánh quái và chế tạo thêm!
          </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3">
            {equipments.map((item) => {
              const Icon = TYPE_ICONS[item.type] || Sword;
              const isAtk = !!item.stats.attack;
              const statValue = isAtk ? item.stats.attack : item.stats.defense;
              
              // Calculate visuals for gems
              const hasSockets = (item.sockets || 0) > 0;
              const filledSockets = item.socketedGems?.length || 0;

              return (
                <div 
                    key={item.id} 
                    className={`
                        aspect-[3/4] relative flex flex-col justify-between p-2 rounded-xl border transition-all duration-200 group
                        ${item.isEquipped 
                            ? 'bg-blue-900/20 border-blue-500/50' 
                            : 'bg-slate-800/60 border-slate-700 hover:border-slate-500 hover:bg-slate-800'}
                    `}
                >
                    {/* Top Info */}
                    <div className="flex justify-between items-start z-10">
                         {/* Enchant Badge */}
                        {item.enchantment ? (
                             <div className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-purple-900/50 text-purple-300 border border-purple-700 animate-pulse-slow">
                                <Sparkles size={8} className="inline mr-0.5"/> Phù Phép
                             </div>
                        ) : <div></div>}
                        
                        {/* Stat Badge */}
                        <div className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${isAtk ? 'bg-red-900/30 text-red-400' : 'bg-blue-900/30 text-blue-400'}`}>
                            {isAtk ? 'ATK' : 'DEF'} {statValue}
                        </div>
                    </div>

                    {/* Center Icon & Name */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-20 group-hover:opacity-10 transition-opacity">
                         <Icon size={40} />
                    </div>
                    
                    <div className="text-center z-10 mt-4 mb-1">
                        <div className={`font-bold text-xs leading-tight line-clamp-2 ${RARITY_COLOR[item.rarity]}`}>
                            {item.name}
                        </div>
                        {/* Sockets Visual */}
                        {hasSockets && (
                             <div className="flex justify-center gap-1 mt-1">
                                 {Array.from({length: item.sockets}).map((_, i) => (
                                     <div key={i} className={`w-2 h-2 rounded-full border border-slate-500 ${i < filledSockets ? 'bg-amber-400' : 'bg-slate-900'}`}></div>
                                 ))}
                             </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-1 z-10 mt-auto">
                        <button 
                            onClick={() => onEquip(item)} 
                            disabled={item.isEquipped}
                            className={`
                                flex items-center justify-center py-1.5 rounded text-[10px] font-bold uppercase transition-colors col-span-2
                                ${item.isEquipped 
                                    ? 'bg-blue-600/20 text-blue-400 cursor-default' 
                                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/40'}
                            `}
                        >
                            {item.isEquipped ? 'Đang dùng' : 'Dùng'}
                        </button>

                        <button 
                            onClick={() => setSelectedItem(item)}
                            className="flex items-center justify-center py-1.5 rounded text-[10px] font-bold bg-slate-700 hover:bg-amber-600 text-slate-300 hover:text-white transition-colors gap-0.5"
                            title="Nâng cấp (Khảm/Phù phép)"
                        >
                            <Hammer size={10} />
                        </button>
                        
                        <button 
                            onClick={() => onSell(item)}
                            disabled={item.isEquipped}
                            className={`flex items-center justify-center py-1.5 rounded text-[10px] font-bold transition-colors gap-0.5 ${item.isEquipped ? 'opacity-0' : 'bg-slate-700 hover:bg-red-600 text-slate-300 hover:text-white'}`}
                        >
                            <DollarSign size={10} />
                        </button>
                    </div>
                </div>
              );
            })}
        </div>
      )}
    </Card>

    {/* Upgrade Modal */}
    {selectedItem && player && (
        <ItemUpgradeModal 
            item={selectedItem}
            player={player}
            onClose={() => setSelectedItem(null)}
            onSocketGem={handleSocket}
            onEnchant={handleEnchant}
            onAddSocket={handleAddSocket}
        />
    )}
    </>
  );
};
