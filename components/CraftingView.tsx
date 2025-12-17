
import React, { useState, useMemo } from 'react';
import { Blueprint, Material, EquipmentType } from '../types';
import { BlueprintList } from './crafting/BlueprintList';
import { CraftingDetail } from './crafting/CraftingDetail';
import { Sword, Shield, CircuitBoard, Beaker } from 'lucide-react';

interface CraftingViewProps {
  blueprints: Blueprint[];
  materials: Material[];
  onCraft: (blueprint: Blueprint, useOverheat: boolean) => void;
  craftingSkill: number;
}

type CraftCategory = 'weapon' | 'armor' | 'accessory' | 'consumable';

export const CraftingView: React.FC<CraftingViewProps> = ({
  blueprints,
  materials,
  onCraft,
  craftingSkill
}) => {
  const [activeCategory, setActiveCategory] = useState<CraftCategory>('weapon');
  const [selectedBp, setSelectedBp] = useState<Blueprint | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const filteredBlueprints = useMemo(() => {
      return blueprints.filter(bp => {
          if (activeCategory === 'weapon') return bp.resultType === EquipmentType.Weapon;
          if (activeCategory === 'armor') return [EquipmentType.Armor, EquipmentType.Helmet, EquipmentType.Gloves, EquipmentType.Boots].includes(bp.resultType as EquipmentType);
          if (activeCategory === 'accessory') return bp.resultType === EquipmentType.Accessory;
          if (activeCategory === 'consumable') return bp.resultType === 'MATERIAL';
          return false;
      });
  }, [blueprints, activeCategory]);

  const categories = [
      { id: 'weapon', label: 'Vũ Khí', icon: Sword },
      { id: 'armor', label: 'Giáp Trụ', icon: Shield },
      { id: 'accessory', label: 'Trang Sức', icon: CircuitBoard },
      { id: 'consumable', label: 'Tiêu Hao', icon: Beaker },
  ];

  const handleSelectBlueprint = (bp: Blueprint) => {
      setSelectedBp(bp);
      setIsDetailOpen(true);
  };

  return (
    <div className="flex flex-col md:flex-row h-full max-w-full overflow-hidden bg-slate-950 md:p-2 md:gap-4">
      
      {/* LEFT COLUMN: NAVIGATION & LIST */}
      <div className="w-full md:w-[400px] flex flex-col h-full bg-slate-900/30 md:rounded-xl md:border border-slate-800 overflow-hidden shrink-0">
          
          {/* Categories Tab */}
          <div className="bg-slate-900 border-b border-slate-800 flex overflow-x-auto md:overflow-visible shrink-0 scrollbar-hide">
              {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => { setActiveCategory(cat.id as CraftCategory); setSelectedBp(null); setIsDetailOpen(false); }}
                    className={`
                        flex-1 p-3 md:p-4 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 transition-all duration-200 min-w-[80px]
                        ${activeCategory === cat.id 
                            ? 'bg-amber-600/10 text-amber-500 border-b-2 border-amber-500' 
                            : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200 border-b-2 border-transparent'}
                    `}
                  >
                      <cat.icon size={20} />
                      <span className="font-bold text-[10px] md:text-xs uppercase">{cat.label}</span>
                  </button>
              ))}
          </div>

          {/* Blueprint List */}
          <div className="flex-1 overflow-y-auto p-2 scrollbar-thin bg-slate-900/20">
             <div className="mb-2 px-2 pt-2 text-xs font-bold text-slate-500 uppercase flex justify-between">
                 <span>Danh Sách Bản Vẽ</span>
                 <span>{filteredBlueprints.length}</span>
             </div>
             <BlueprintList 
                blueprints={filteredBlueprints} 
                selectedId={selectedBp?.id} 
                onSelect={handleSelectBlueprint} 
             />
          </div>
      </div>

      {/* RIGHT COLUMN: DETAIL PAGE */}
      <div className={`
          fixed inset-0 z-50 bg-slate-950 flex flex-col
          md:static md:z-0 md:flex md:flex-1 md:min-w-0 md:bg-transparent md:h-full
          ${isDetailOpen ? 'flex animate-slide-up' : 'hidden md:flex'}
      `}>
         <div className="flex-1 h-full w-full">
            <CraftingDetail 
                blueprint={selectedBp} 
                materials={materials} 
                onCraft={onCraft} 
                onClose={() => setIsDetailOpen(false)}
            />
         </div>
      </div>

    </div>
  );
};
