import React from 'react';
import { Equipment, Material, EquipmentType } from '../types';
import { RARITY_COLOR } from '../constants';
import { Shield } from 'lucide-react';
import { Card } from './Card';
import { MaterialList } from './inventory/MaterialList';
import { EquipmentList } from './inventory/EquipmentList';

interface InventoryViewProps {
  materials: Material[];
  equipments: Equipment[];
  equipped: Record<EquipmentType, Equipment | null>;
  onEquip: (item: Equipment) => void;
  onSell: (item: Equipment) => void;
}

export const InventoryView: React.FC<InventoryViewProps> = ({
  materials,
  equipments,
  equipped,
  onEquip,
  onSell
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full p-4 max-w-7xl mx-auto w-full">
      <div className="flex flex-col gap-6 h-full overflow-hidden">
        {/* Equipped Section */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Shield className="text-yellow-500" size={20} />
            <h3 className="font-bold text-lg text-slate-200">Trang Bị Hiện Tại</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {(Object.keys(equipped) as EquipmentType[]).map((type) => {
              const item = equipped[type];
              return (
                <div key={type} className="bg-slate-900/50 p-3 rounded-lg border border-slate-700 flex flex-col justify-between min-h-[100px]">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">{type}</span>
                  {item ? (
                    <div className="animate-fade-in">
                      <div className={`font-bold text-sm ${RARITY_COLOR[item.rarity]} line-clamp-2`}>
                        {item.name}
                      </div>
                      <div className="text-xs text-slate-300 mt-1 font-mono">
                        {item.stats.attack ? <div className="text-red-400">+ATK {item.stats.attack}</div> : ''}
                        {item.stats.defense ? <div className="text-blue-400">+DEF {item.stats.defense}</div> : ''}
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex items-center justify-center">
                      <span className="text-slate-700 text-xs italic">Trống</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Equipment List */}
        <div className="flex-1 min-h-0">
          <EquipmentList equipments={equipments} onEquip={onEquip} onSell={onSell} />
        </div>
      </div>

      {/* Material List */}
      <div className="h-full min-h-0">
        <MaterialList materials={materials} />
      </div>
    </div>
  );
};