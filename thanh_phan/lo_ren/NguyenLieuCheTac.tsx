
import React from 'react';
import { Blueprint, Material, MaterialType } from '../../kieu_du_lieu';
import { Check, X, Box } from 'lucide-react';

interface Props {
  blueprint: Blueprint;
  materials: Material[];
}

export const NguyenLieuCheTac: React.FC<Props> = ({ blueprint, materials }) => {
  const laySoLuongTrongKho = (loai: MaterialType) => {
    return materials.filter(m => m.type === loai).reduce((acc, curr) => acc + curr.quantity, 0);
  };

  return (
    <div className="bg-slate-900/60 p-5 rounded-3xl border border-slate-800 h-fit">
        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2 mb-6">
            <Box size={14} /> NGUYÊN LIỆU YÊU CẦU
        </h4>

        <div className="space-y-3">
            {blueprint.requiredMaterials.map((req, idx) => {
                const hienCo = laySoLuongTrongKho(req.type);
                const duDung = hienCo >= req.amount;
                return (
                    <div key={idx} className={`flex justify-between items-center p-3 rounded-2xl border transition-all ${duDung ? 'bg-slate-800/40 border-slate-700/50' : 'bg-red-950/10 border-red-900/20'}`}>
                        <div className="flex items-center gap-3">
                             <div className={`p-1.5 rounded-lg flex items-center justify-center ${duDung ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'}`}>
                                 {duDung ? <Check size={12} strokeWidth={4} /> : <X size={12} strokeWidth={4} />}
                             </div>
                             <span className="text-slate-300 font-black text-[10px] uppercase tracking-tight">{req.type}</span>
                        </div>
                        <div className="flex items-baseline gap-1.5">
                             <span className={`font-mono font-black text-sm ${duDung ? 'text-emerald-400' : 'text-red-500 animate-pulse'}`}>{hienCo}</span>
                             <span className="text-slate-600 text-[10px] font-bold">/ {req.amount}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
  );
};
