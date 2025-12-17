
import React from 'react';
import { Blueprint, Material, MaterialType } from '../../types';
import { Check, X } from 'lucide-react';

interface CraftingMaterialsProps {
  blueprint: Blueprint;
  materials: Material[];
}

export const CraftingMaterials: React.FC<CraftingMaterialsProps> = ({ blueprint, materials }) => {
  
  const getMaterialQuantity = (type: MaterialType) => {
    return materials.filter(m => m.type === type).reduce((acc, curr) => acc + curr.quantity, 0);
  };

  return (
    <div className="bg-slate-900/40 p-2 rounded-lg border border-slate-800 space-y-1">
        {blueprint.requiredMaterials.map((req, idx) => {
            const currentQty = getMaterialQuantity(req.type);
            const isEnough = currentQty >= req.amount;
            return (
                <div key={idx} className={`flex justify-between items-center text-[9px] p-1.5 rounded-md border transition-colors ${isEnough ? 'bg-slate-800/30 border-slate-700/30' : 'bg-red-900/10 border-red-900/10'}`}>
                    <div className="flex items-center gap-1.5">
                         <div className={`w-3 h-3 rounded-full flex items-center justify-center ${isEnough ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                             {isEnough ? <Check size={6} strokeWidth={4} /> : <X size={6} strokeWidth={4} />}
                         </div>
                         <span className="text-slate-400 font-bold uppercase tracking-tighter">{req.type}</span>
                    </div>
                    <div className="flex items-center gap-1">
                         <span className={`font-mono font-black text-[10px] ${isEnough ? 'text-green-500' : 'text-red-500'}`}>
                            {currentQty}
                         </span>
                         <span className="text-slate-600 text-[8px] font-mono">/ {req.amount}</span>
                    </div>
                </div>
            );
        })}
    </div>
  );
};
