
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
    <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 h-full">
        <h4 className="font-bold text-xs text-slate-400 uppercase tracking-widest mb-4">Nguyên Liệu Yêu Cầu</h4>
        <div className="space-y-3">
            {blueprint.requiredMaterials.map((req, idx) => {
                const currentQty = getMaterialQuantity(req.type);
                const isEnough = currentQty >= req.amount;
                return (
                    <div key={idx} className={`flex justify-between items-center text-sm p-3 rounded-lg border transition-colors ${isEnough ? 'bg-slate-800/60 border-slate-700' : 'bg-red-900/10 border-red-900/30'}`}>
                        <div className="flex items-center gap-2">
                             <div className={`w-4 h-4 rounded-full flex items-center justify-center ${isEnough ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                                 {isEnough ? <Check size={10} strokeWidth={4} /> : <X size={10} strokeWidth={4} />}
                             </div>
                             <span className="text-slate-300 font-bold">{req.type}</span>
                        </div>
                        <div className="flex items-center gap-1">
                             <span className={`font-mono font-bold text-lg ${isEnough ? 'text-green-400' : 'text-red-400'}`}>
                                {currentQty}
                             </span>
                             <span className="text-slate-500 text-xs font-mono">/ {req.amount}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
  );
};
