
import React, { useState } from 'react';
import { Equipment, EquipmentType, SetId, Player, EnchantmentType, Material } from '../types';
import { RARITY_COLOR, SETS } from '../constants';
import { Shield, Sword, HardHat, Hand, Footprints, CircuitBoard, Package, Gem, FlaskConical } from 'lucide-react';
import { Card } from './Card';
import { EquipmentList } from './inventory/EquipmentList';
import { MaterialList } from './inventory/MaterialList'; // Sử dụng lại MaterialList cũ nhưng tích hợp vào Tab

interface InventoryViewProps {
  equipments: Equipment[];
  equipped: Record<EquipmentType, Equipment | null>;
  onEquip: (item: Equipment) => void;
  onSell: (item: Equipment) => void;
  player: Player;
  onSocketGem: (gemKey: string, item: Equipment) => void;
  onAddSocket: (item: Equipment) => void;
  onEnchant: (type: EnchantmentType, item: Equipment) => void;
  // Cần materials từ App
  materials?: Material[]; 
}

const EQUIPMENT_ICONS: Record<EquipmentType, React.ElementType> = {
  [EquipmentType.Weapon]: Sword,
  [EquipmentType.Helmet]: HardHat,
  [EquipmentType.Armor]: Shield,
  [EquipmentType.Gloves]: Hand,
  [EquipmentType.Boots]: Footprints,
  [EquipmentType.Accessory]: CircuitBoard,
};

export const InventoryView: React.FC<InventoryViewProps> = ({
  equipments,
  equipped,
  onEquip,
  onSell,
  player, onSocketGem, onAddSocket, onEnchant,
  materials = []
}) => {
  const [activeTab, setActiveTab] = useState<'equip' | 'material'>('equip');

  const activeSets: Record<SetId, number> = {} as any;
  Object.values(equipped).forEach(item => {
    if (item && item.setId) {
      activeSets[item.setId] = (activeSets[item.setId] || 0) + 1;
    }
  });

  return (
    <div className="h-full w-full flex flex-col bg-slate-950 overflow-hidden">
      {/* --- EQUIPPED SECTION (ALWAYS VISIBLE) --- */}
      <div className="p-4 bg-slate-900 border-b border-slate-800 shrink-0">
          <div className="max-w-6xl mx-auto">
            <h3 className="font-bold text-xs text-slate-500 uppercase mb-3 flex items-center gap-2">
                <Shield size={14} /> Trang Bị Đang Mặc
            </h3>
            
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {(Object.values(EquipmentType) as EquipmentType[]).map((type) => {
                const item = equipped[type];
                const Icon = EQUIPMENT_ICONS[type];
                return (
                    <div key={type} className="flex-shrink-0 w-20 flex flex-col items-center gap-2">
                        <div className={`
                            w-14 h-14 rounded-xl border flex items-center justify-center relative overflow-hidden transition-all
                            ${item ? `bg-slate-800 border-${RARITY_COLOR[item.rarity].split('-')[1]}-500 shadow-lg` : 'bg-slate-900 border-slate-800 border-dashed'}
                        `}>
                            {item ? (
                                <>
                                    <Icon size={24} className={RARITY_COLOR[item.rarity]} />
                                    {(item.socketedGems?.length || 0) > 0 && (
                                        <div className="absolute bottom-1 flex gap-0.5">
                                            {item.socketedGems.map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-400 border border-black"></div>)}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <Icon size={20} className="text-slate-600 opacity-50" />
                            )}
                        </div>
                        <div className="text-[9px] font-bold text-center text-slate-400 truncate w-full">
                            {item ? item.name : type}
                        </div>
                    </div>
                );
                })}
            </div>

            {Object.keys(activeSets).length > 0 && (
                <div className="mt-2 flex gap-2">
                    {(Object.keys(activeSets) as SetId[]).map(setId => (
                        <div key={setId} className="text-[10px] font-bold bg-yellow-900/20 text-yellow-500 px-2 py-1 rounded border border-yellow-700/50">
                            {SETS[setId].name} ({activeSets[setId]}/6)
                        </div>
                    ))}
                </div>
            )}
          </div>
      </div>

      {/* --- INVENTORY TABS --- */}
      <div className="flex border-b border-slate-800 bg-slate-900/50 px-4">
          <div className="max-w-6xl mx-auto w-full flex gap-6">
              <button 
                  onClick={() => setActiveTab('equip')}
                  className={`py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'equip' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
              >
                  <Package size={16} /> Trang Bị ({equipments.length})
              </button>
              <button 
                  onClick={() => setActiveTab('material')}
                  className={`py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'material' ? 'border-green-500 text-green-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
              >
                  <Gem size={16} /> Nguyên Liệu & Tiêu Hao ({materials.length})
              </button>
          </div>
      </div>

      {/* --- TAB CONTENT --- */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin bg-slate-950">
          <div className="max-w-6xl mx-auto">
              {activeTab === 'equip' && (
                  <EquipmentList 
                    equipments={equipments} 
                    onEquip={onEquip} 
                    onSell={onSell}
                    player={player}
                    onSocketGem={onSocketGem}
                    onAddSocket={onAddSocket}
                    onEnchant={onEnchant}
                  />
              )}

              {activeTab === 'material' && (
                  <MaterialList materials={materials} />
              )}
          </div>
      </div>
    </div>
  );
};
