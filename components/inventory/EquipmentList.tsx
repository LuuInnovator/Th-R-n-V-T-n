import React from 'react';
import { Equipment } from '../../types';
import { Button } from '../Button';
import { RARITY_COLOR } from '../../constants';
import { Sword } from 'lucide-react';
import { Card } from '../Card';

interface EquipmentListProps {
  equipments: Equipment[];
  onEquip: (item: Equipment) => void;
  onSell: (item: Equipment) => void;
}

export const EquipmentList: React.FC<EquipmentListProps> = ({ equipments, onEquip, onSell }) => {
  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4 border-b border-slate-700 pb-2">
        <Sword className="text-blue-500" size={20} />
        <h3 className="font-bold text-lg text-slate-200">Kho Trang Bị ({equipments.length})</h3>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-3 scrollbar-thin">
        {equipments.length === 0 && (
          <div className="text-center text-slate-500 py-8 italic">
            Chưa có trang bị nào
          </div>
        )}
        {equipments.map((item) => (
          <div 
            key={item.id} 
            className="group flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900/50 p-3 rounded-lg border border-slate-700 hover:border-slate-500 transition-all"
          >
            <div className="mb-2 sm:mb-0">
              <div className={`font-bold text-sm ${RARITY_COLOR[item.rarity]}`}>
                {item.name}
              </div>
              <div className="flex gap-2 text-xs text-slate-400 mt-1 font-mono">
                <span className="bg-slate-800 px-1.5 py-0.5 rounded">{item.type}</span>
                {item.stats.attack ? <span className="text-red-300">ATK: {item.stats.attack}</span> : null}
                {item.stats.defense ? <span className="text-blue-300">DEF: {item.stats.defense}</span> : null}
              </div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
              <Button size="xs" variant="primary" onClick={() => onEquip(item)} disabled={item.isEquipped}>
                {item.isEquipped ? 'Đang dùng' : 'Trang bị'}
              </Button>
              <Button size="xs" variant="danger" onClick={() => onSell(item)} disabled={item.isEquipped}>
                Bán ({item.value})
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};