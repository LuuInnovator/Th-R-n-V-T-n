import React, { useState } from 'react';
import { Blueprint, Material } from '../types';
import { BlueprintList } from './crafting/BlueprintList';
import { CraftingDetail } from './crafting/CraftingDetail';

interface CraftingViewProps {
  blueprints: Blueprint[];
  materials: Material[];
  onCraft: (blueprint: Blueprint) => void;
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 h-full max-w-7xl mx-auto w-full">
      <div className="md:col-span-1 h-[300px] md:h-full min-h-0">
        <BlueprintList 
            blueprints={blueprints} 
            selectedId={selectedBp?.id} 
            onSelect={setSelectedBp} 
        />
      </div>
      <div className="md:col-span-2 h-full min-h-[500px]">
        <CraftingDetail 
            blueprint={selectedBp} 
            materials={materials} 
            onCraft={onCraft} 
        />
      </div>
    </div>
  );
};