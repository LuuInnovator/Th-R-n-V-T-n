
import React, { useState } from 'react';
import { Blueprint, Material } from '../types';
import { BlueprintList } from './crafting/BlueprintList';
import { CraftingDetail } from './crafting/CraftingDetail';

interface CraftingViewProps {
  blueprints: Blueprint[];
  materials: Material[];
  onCraft: (blueprint: Blueprint, useOverheat: boolean) => void;
  craftingSkill: number;
}

export const CraftingView: React.FC<CraftingViewProps> = ({
  blueprints,
  materials,
  onCraft,
  craftingSkill
}) => {
  const [selectedBp, setSelectedBp] = useState<Blueprint | null>(null);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 h-full max-w-7xl mx-auto w-full overflow-hidden">
      {/* Danh sách bản vẽ - Scroll độc lập */}
      <div className="w-full md:w-1/3 h-[40%] md:h-full flex flex-col min-h-0">
        <BlueprintList 
            blueprints={blueprints} 
            selectedId={selectedBp?.id} 
            onSelect={setSelectedBp} 
        />
      </div>

      {/* Chi tiết chế tạo - Scroll độc lập nếu quá dài */}
      <div className="w-full md:w-2/3 h-[60%] md:h-full flex flex-col min-h-0">
        <CraftingDetail 
            blueprint={selectedBp} 
            materials={materials} 
            onCraft={onCraft} 
        />
      </div>
    </div>
  );
};
