
import React, { useState, useMemo } from 'react';
import { Blueprint, Material, EquipmentType, MaterialType } from '../types';
import { BlueprintList } from './crafting/BlueprintList';
import { CraftingDetail } from './crafting/CraftingDetail';
import { Sword, Shield, HardHat, Footprints, CircuitBoard, Beaker, Scroll } from 'lucide-react';

interface CraftingViewProps {
  blueprints: Blueprint[];
  materials: Material[];
  onCraft: (blueprint: Blueprint, useOverheat: boolean) => void;
  craftingSkill: number;
}

// Định nghĩa các Tabs danh mục
type CraftCategory = 'weapon' | 'armor' | 'accessory' | 'consumable';

export const CraftingView: React.FC<CraftingViewProps> = ({
  blueprints,
  materials,
  onCraft,
  craftingSkill
}) => {
  const [activeCategory, setActiveCategory] = useState<CraftCategory>('weapon');
  const [selectedBp, setSelectedBp] = useState<Blueprint | null>(null);

  // Lọc bản vẽ theo danh mục
  const filteredBlueprints = useMemo(() => {
      return blueprints.filter(bp => {
          if (activeCategory === 'weapon') return bp.resultType === EquipmentType.Weapon;
          if (activeCategory === 'armor') return [EquipmentType.Armor, EquipmentType.Helmet, EquipmentType.Gloves, EquipmentType.Boots].includes(bp.resultType as EquipmentType);
          if (activeCategory === 'accessory') return bp.resultType === EquipmentType.Accessory;
          if (activeCategory === 'consumable') return bp.resultType === 'MATERIAL'; // Giả sử consumable là material đặc biệt
          return false;
      });
  }, [blueprints, activeCategory]);

  const categories = [
      { id: 'weapon', label: 'Vũ Khí', icon: Sword },
      { id: 'armor', label: 'Giáp Trụ', icon: Shield },
      { id: 'accessory', label: 'Trang Sức', icon: CircuitBoard },
      { id: 'consumable', label: 'Tiêu Hao', icon: Beaker },
  ];

  return (
    <div className="flex h-full max-w-full overflow-hidden p-2 gap-2 bg-slate-950">
      
      {/* CỘT 1: DANH MỤC (Thanh bên trái) */}
      <div className="w-16 md:w-48 bg-slate-900 border-r border-slate-800 flex flex-col items-center md:items-stretch py-4 gap-2 shrink-0">
          <div className="text-xs font-bold text-slate-500 uppercase px-2 mb-2 hidden md:block">Danh Mục</div>
          {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id as CraftCategory); setSelectedBp(null); }}
                className={`
                    p-3 flex items-center gap-3 transition-all duration-200
                    ${activeCategory === cat.id 
                        ? 'bg-amber-600/20 text-amber-500 border-r-2 border-amber-500' 
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}
                `}
                title={cat.label}
              >
                  <cat.icon size={20} />
                  <span className="hidden md:inline font-bold text-sm">{cat.label}</span>
              </button>
          ))}
      </div>

      {/* CỘT 2: DANH SÁCH BẢN VẼ */}
      <div className="w-72 bg-slate-900/50 border-r border-slate-800 flex flex-col shrink-0 min-w-0">
         <div className="p-3 border-b border-slate-800 bg-slate-900">
             <h3 className="font-bold text-slate-200">Bản Thiết Kế</h3>
             <div className="text-xs text-slate-500">{filteredBlueprints.length} khả dụng</div>
         </div>
         <div className="flex-1 overflow-y-auto p-2 scrollbar-thin">
             <BlueprintList 
                blueprints={filteredBlueprints} 
                selectedId={selectedBp?.id} 
                onSelect={setSelectedBp} 
             />
         </div>
      </div>

      {/* CỘT 3: CHI TIẾT & THAO TÁC */}
      <div className="flex-1 min-w-0 bg-slate-950 flex flex-col overflow-hidden rounded-xl border border-slate-800/50 m-1 shadow-2xl">
         <CraftingDetail 
            blueprint={selectedBp} 
            materials={materials} 
            onCraft={onCraft} 
         />
      </div>

    </div>
  );
};
