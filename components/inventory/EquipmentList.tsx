
import React from 'react';
import { Equipment, EquipmentType } from '../../types';
import { RARITY_COLOR } from '../../constants';
import { Sword, Shield, HardHat, Hand, Footprints, CircuitBoard, DollarSign } from 'lucide-react';
import { Card } from '../Card';

interface EquipmentListProps {
  equipments: Equipment[];
  onEquip: (item: Equipment) => void;
  onSell: (item: Equipment) => void;
}

const TYPE_ICONS: Record<EquipmentType, React.ElementType> = {
  [EquipmentType.Weapon]: Sword,
  [EquipmentType.Helmet]: HardHat,
  [EquipmentType.Armor]: Shield,
  [EquipmentType.Gloves]: Hand,
  [EquipmentType.Boots]: Footprints,
  [EquipmentType.Accessory]: CircuitBoard,
};

export const EquipmentList: React.FC<EquipmentListProps> = ({ equipments, onEquip, onSell }) => {
  return (
    /* 
      FIX LỖI CUỘN:
      - Loại bỏ h-full, overflow-hidden.
      - Để Card tự giãn chiều cao (height: auto) theo số lượng item.
    */
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
        /* Grid thuần túy, không có scroll nội bộ, scroll theo trang chính */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3">
            {equipments.map((item) => {
              const Icon = TYPE_ICONS[item.type] || Sword;
              const isAtk = !!item.stats.attack;
              const statValue = isAtk ? item.stats.attack : item.stats.defense;

              return (
                <div 
                    key={item.id} 
                    className={`
                        aspect-square relative flex flex-col justify-between p-2 rounded-xl border transition-all duration-200
                        ${item.isEquipped 
                            ? 'bg-blue-900/20 border-blue-500/50' 
                            : 'bg-slate-800/60 border-slate-700 hover:border-slate-500 hover:bg-slate-800'}
                    `}
                >
                    {/* Top Info */}
                    <div className="flex justify-between items-start z-10">
                         {/* Element Badge */}
                        {item.element ? (
                            <div className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                                {item.element}
                            </div>
                        ) : <div></div>}
                        
                        {/* Stat Badge */}
                        <div className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${isAtk ? 'bg-red-900/30 text-red-400' : 'bg-blue-900/30 text-blue-400'}`}>
                            {isAtk ? 'ATK' : 'DEF'} {statValue}
                        </div>
                    </div>

                    {/* Center Icon & Name */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-20">
                         <Icon size={40} />
                    </div>
                    
                    <div className="text-center z-10 mt-1 mb-1">
                        <div className={`font-bold text-xs leading-tight line-clamp-2 ${RARITY_COLOR[item.rarity]}`}>
                            {item.name}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-1 z-10 mt-auto">
                        <button 
                            onClick={() => onEquip(item)} 
                            disabled={item.isEquipped}
                            className={`
                                flex items-center justify-center py-1.5 rounded text-[10px] font-bold uppercase transition-colors
                                ${item.isEquipped 
                                    ? 'bg-blue-600/20 text-blue-400 col-span-2 cursor-default' 
                                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/40'}
                            `}
                        >
                            {item.isEquipped ? 'Đang dùng' : 'Dùng'}
                        </button>

                        {!item.isEquipped && (
                            <button 
                                onClick={() => onSell(item)}
                                className="flex items-center justify-center py-1.5 rounded text-[10px] font-bold bg-slate-700 hover:bg-red-600 text-slate-300 hover:text-white transition-colors gap-0.5"
                            >
                                <DollarSign size={10} /> {item.value}
                            </button>
                        )}
                    </div>
                </div>
              );
            })}
        </div>
      )}
    </Card>
  );
};
