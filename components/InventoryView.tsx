
import React from 'react';
import { Equipment, EquipmentType, SetId } from '../types';
import { RARITY_COLOR, SETS } from '../constants';
import { Shield, Sword, HardHat, Hand, Footprints, CircuitBoard } from 'lucide-react';
import { Card } from './Card';
import { EquipmentList } from './inventory/EquipmentList';

interface InventoryViewProps {
  equipments: Equipment[];
  equipped: Record<EquipmentType, Equipment | null>;
  onEquip: (item: Equipment) => void;
  onSell: (item: Equipment) => void;
}

// Map EquipmentType to Lucide Icons
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
  onSell
}) => {
  // Calculate Active Sets
  const activeSets: Record<SetId, number> = {} as any;
  Object.values(equipped).forEach(item => {
    if (item && item.setId) {
      activeSets[item.setId] = (activeSets[item.setId] || 0) + 1;
    }
  });

  return (
    /* 
      FIX LỖI CUỘN:
      - Sử dụng h-full và overflow-y-auto ở ngay container cha.
      - pb-32: Padding đáy cực lớn để đảm bảo món đồ cuối cùng không bị thanh menu dưới che mất.
    */
    <div className="h-full w-full overflow-y-auto scrollbar-thin p-4 pb-32">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        
        {/* Phần 1: Trang bị đang mặc */}
        <Card>
          <div className="flex items-center justify-between mb-2 border-b border-slate-700/50 pb-2">
            <div className="flex items-center gap-2">
               <Shield className="text-yellow-500" size={18} />
               <h3 className="font-bold text-base text-slate-200">Trang Bị Đang Mặc</h3>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-2">
            {(Object.values(EquipmentType) as EquipmentType[]).map((type) => {
              const item = equipped[type];
              const Icon = EQUIPMENT_ICONS[type];
              
              return (
                <div key={type} className={`aspect-square bg-slate-900/50 p-1 rounded-lg border ${item ? 'border-blue-500/50 bg-blue-900/10' : 'border-slate-700'} flex flex-col items-center justify-center relative overflow-hidden group transition-all`}>
                  <div className="absolute top-1 right-1 opacity-20"><Icon size={12}/></div>
                  {item ? (
                    <div className="animate-fade-in text-center z-10 w-full flex flex-col items-center justify-center h-full">
                       <Icon size={24} className={`mb-1 ${RARITY_COLOR[item.rarity]}`} />
                       <span className={`text-[10px] font-bold line-clamp-1 px-1 ${RARITY_COLOR[item.rarity]}`}>{item.name}</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center opacity-30 h-full">
                      <Icon size={24} className="text-slate-400" />
                      <span className="text-[9px] mt-1">Trống</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
           {/* Active Set Bonuses Compact */}
           {Object.keys(activeSets).length > 0 && (
            <div className="bg-slate-900/40 rounded px-3 py-2 border border-slate-700/50 flex flex-wrap gap-x-4 gap-y-1 mt-2">
                {(Object.keys(activeSets) as SetId[]).map(setId => (
                    <div key={setId} className="text-[10px] font-bold text-yellow-500">
                        {SETS[setId].name} ({activeSets[setId]}/6)
                    </div>
                ))}
            </div>
          )}
        </Card>

        {/* Phần 2: Kho Trang Bị - Render trực tiếp, không wrap cứng height nữa */}
        <EquipmentList equipments={equipments} onEquip={onEquip} onSell={onSell} />
      </div>
    </div>
  );
};
