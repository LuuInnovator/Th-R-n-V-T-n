
import React, { useState, useMemo } from 'react';
import { Blueprint, Material, EquipmentType } from '../types';
import { BlueprintList } from './crafting/BlueprintList';
import { CraftingDetail } from './crafting/CraftingDetail';
import { Sword, Shield, CircuitBoard, Beaker, ArrowUpCircle } from 'lucide-react';
import { Button } from './Button';

interface CraftingViewProps {
  blueprints: Blueprint[];
  materials: Material[];
  onCraft: (blueprint: Blueprint, useOverheat: boolean) => void;
  craftingSkill: number;
  onUpgradeBlueprint: (id: string, cost: number) => void;
  eternalPoints: number;
}

type CraftCategory = 'weapon' | 'armor' | 'accessory' | 'consumable';

export const CraftingView: React.FC<CraftingViewProps> = ({
  blueprints,
  materials,
  onCraft,
  craftingSkill,
  onUpgradeBlueprint,
  eternalPoints
}) => {
  const [activeCategory, setActiveCategory] = useState<CraftCategory>('weapon');
  const [selectedBp, setSelectedBp] = useState<Blueprint | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const filteredBlueprints = useMemo(() => {
      return blueprints.filter(bp => {
          if (activeCategory === 'weapon') return bp.resultType === EquipmentType.Weapon;
          if (activeCategory === 'armor') return [EquipmentType.Armor, EquipmentType.Helmet, EquipmentType.Gloves, EquipmentType.Boots].includes(bp.resultType as EquipmentType);
          if (activeCategory === 'accessory') return bp.resultType === EquipmentType.Accessory;
          if (activeCategory === 'consumable') return bp.resultType === 'VẬT PHẨM';
          return false;
      });
  }, [blueprints, activeCategory]);

  const categories = [
      { id: 'weapon', label: 'Vũ Khí', icon: Sword },
      { id: 'armor', label: 'Giáp', icon: Shield },
      { id: 'accessory', label: 'Sức', icon: CircuitBoard },
      { id: 'consumable', label: 'Dùng', icon: Beaker },
  ];

  const handleSelectBlueprint = (bp: Blueprint) => {
      setSelectedBp(bp);
      setIsDetailOpen(true);
  };

  const upgradeCost = selectedBp ? Math.floor(100 * Math.pow(2, selectedBp.evolutionLevel)) : 0;
  const canUpgrade = selectedBp && eternalPoints >= upgradeCost;

  return (
    <div className="flex flex-col md:flex-row h-full max-w-full overflow-hidden bg-slate-950">
      
      <div className="w-full md:w-[320px] flex flex-col h-full bg-slate-900/20 md:border-r border-slate-800 shrink-0">
          <div className="bg-slate-900/80 flex shrink-0">
              {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => { setActiveCategory(cat.id as CraftCategory); setSelectedBp(null); setIsDetailOpen(false); }}
                    className={`
                        flex-1 p-3 flex flex-col items-center justify-center gap-1 transition-all
                        ${activeCategory === cat.id 
                            ? 'bg-amber-600/10 text-amber-500 border-b-2 border-amber-500' 
                            : 'text-slate-500 hover:text-slate-300 border-b-2 border-transparent'}
                    `}
                  >
                      <cat.icon size={16} />
                      <span className="font-bold text-[9px] uppercase">{cat.label}</span>
                  </button>
              ))}
          </div>

          <div className="flex-1 overflow-y-auto p-2 scrollbar-thin">
             <BlueprintList 
                blueprints={filteredBlueprints} 
                selectedId={selectedBp?.id} 
                onSelect={handleSelectBlueprint} 
             />
          </div>

          {selectedBp && (
              <div className="p-4 bg-slate-900 border-t border-slate-800">
                  <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-black text-slate-500 uppercase">Cấp Tiến Hóa: {selectedBp.evolutionLevel}</span>
                      <span className="text-[10px] font-black text-amber-500 uppercase">+{selectedBp.evolutionLevel * 25}% Chỉ Số</span>
                  </div>
                  <Button 
                    fullWidth 
                    size="sm" 
                    variant={canUpgrade ? 'success' : 'outline'}
                    disabled={!canUpgrade}
                    onClick={() => onUpgradeBlueprint(selectedBp.id, upgradeCost)}
                    className="gap-2"
                  >
                      <ArrowUpCircle size={14} /> NÂNG CẤP ({upgradeCost} EP)
                  </Button>
              </div>
          )}
      </div>

      <div className={`
          fixed inset-0 z-50 bg-slate-950 flex flex-col
          md:static md:z-0 md:flex md:flex-1 md:bg-transparent md:h-full
          ${isDetailOpen ? 'flex' : 'hidden md:flex'}
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
