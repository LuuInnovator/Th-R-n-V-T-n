
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
  const [isDetailOpen, setIsDetailOpen] = useState(false); // State quản lý việc mở chi tiết trên mobile

  // Lọc bản vẽ theo danh mục
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
    <div className="flex flex-col md:flex-row h-full max-w-full overflow-hidden bg-slate-950 md:p-2 md:gap-2">
      
      {/* CỘT 1: DANH MỤC (Thanh bên trái trên Desktop / Thanh trượt ngang trên Mobile) */}
      <div className="w-full md:w-48 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 flex flex-row md:flex-col items-center md:items-stretch overflow-x-auto md:overflow-visible shrink-0 p-2 md:py-4 gap-2 scrollbar-hide">
          <div className="text-xs font-bold text-slate-500 uppercase px-2 mb-2 hidden md:block">Danh Mục</div>
          {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id as CraftCategory); setSelectedBp(null); setIsDetailOpen(false); }}
                className={`
                    flex-shrink-0 p-2 md:p-3 flex items-center gap-2 md:gap-3 transition-all duration-200 rounded-lg md:rounded-none
                    ${activeCategory === cat.id 
                        ? 'bg-amber-600/20 text-amber-500 md:border-r-2 md:border-amber-500 border border-amber-500/30 md:border-t-0 md:border-b-0 md:border-l-0' 
                        : 'bg-slate-800 md:bg-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent'}
                `}
                title={cat.label}
              >
                  <cat.icon size={18} />
                  <span className="font-bold text-xs md:text-sm whitespace-nowrap">{cat.label}</span>
              </button>
          ))}
      </div>

      {/* CỘT 2: DANH SÁCH BẢN VẼ */}
      <div className="flex-1 bg-slate-900/50 md:border-r border-slate-800 flex flex-col min-w-0">
         <div className="p-3 border-b border-slate-800 bg-slate-900">
             <h3 className="font-bold text-slate-200">Bản Thiết Kế</h3>
             <div className="text-xs text-slate-500">{filteredBlueprints.length} khả dụng</div>
         </div>
         <div className="flex-1 overflow-y-auto p-2 scrollbar-thin">
             <BlueprintList 
                blueprints={filteredBlueprints} 
                selectedId={selectedBp?.id} 
                onSelect={handleSelectBlueprint} 
             />
         </div>
      </div>

      {/* CỘT 3: CHI TIẾT & THAO TÁC */}
      {/* Trên Mobile: Là một lớp phủ (Overlay) full màn hình khi isDetailOpen = true */}
      {/* Trên Desktop: Luôn hiển thị ở cột bên phải */}
      <div className={`
          fixed inset-0 z-50 bg-slate-950 flex flex-col
          md:static md:z-0 md:flex md:flex-1 md:min-w-0 md:bg-slate-950 md:rounded-xl md:border md:border-slate-800/50 md:m-1 md:shadow-2xl
          ${isDetailOpen ? 'flex animate-slide-up' : 'hidden md:flex'}
      `}>
         <div className="flex-1 h-full p-4 md:p-0">
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
