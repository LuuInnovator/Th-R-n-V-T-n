
import React from 'react';
import { Equipment, Material, EquipmentType, SetId } from '../types';
import { RARITY_COLOR, SETS } from '../constants';
import { Shield, Layers } from 'lucide-react';
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
  // Calculate Active Sets
  const activeSets: Record<SetId, number> = {} as any;
  Object.values(equipped).forEach(item => {
    if (item && item.setId) {
      activeSets[item.setId] = (activeSets[item.setId] || 0) + 1;
    }
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full p-4 max-w-7xl mx-auto w-full">
      <div className="flex flex-col gap-6 h-full overflow-hidden">
        {/* Equipped Section */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
               <Shield className="text-yellow-500" size={20} />
               <h3 className="font-bold text-lg text-slate-200">Trang Bị</h3>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
            {(Object.values(EquipmentType) as EquipmentType[]).map((type) => {
              const item = equipped[type];
              return (
                <div key={type} className="bg-slate-900/50 p-2 rounded-lg border border-slate-700 flex flex-col justify-between min-h-[80px]">
                  <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest text-center mb-1">{type}</span>
                  {item ? (
                    <div className="animate-fade-in text-center">
                      <div className={`font-bold text-[10px] sm:text-xs ${RARITY_COLOR[item.rarity]} line-clamp-2 leading-tight`}>
                        {item.name}
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex items-center justify-center">
                      <span className="text-slate-700 text-[10px] italic">Trống</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Active Set Bonuses */}
          {Object.keys(activeSets).length > 0 && (
            <div className="bg-slate-900/40 rounded-lg p-3 border border-slate-700/50">
              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                <Layers size={12} /> Kích Hoạt Bộ (Set)
              </div>
              <div className="space-y-2">
                {(Object.keys(activeSets) as SetId[]).map(setId => {
                  const count = activeSets[setId];
                  const setInfo = SETS[setId];
                  return (
                    <div key={setId}>
                       <div className="text-sm font-bold text-yellow-500 mb-1">{setInfo.name} ({count}/6)</div>
                       <div className="space-y-1">
                          {[2, 4, 6].map(threshold => (
                            <div key={threshold} className={`text-xs ${count >= threshold ? 'text-green-400' : 'text-slate-600'}`}>
                              • ({threshold}) {setInfo.bonuses[threshold]}
                            </div>
                          ))}
                       </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
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
