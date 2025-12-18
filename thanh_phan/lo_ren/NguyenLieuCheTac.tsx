
import React from 'react';
import { Blueprint, Material, MaterialType } from '../../kieu_du_lieu';
import { Check, X, Box, Gem } from 'lucide-react';
import { dinh_dang_so } from '../../tien_ich/tinh_toan';

interface Props {
  blueprint: Blueprint;
  materials: Material[];
}

export const NguyenLieuCheTac: React.FC<Props> = ({ blueprint, materials }) => {
  const laySoLuongTrongKho = (loai: MaterialType) => {
    return materials.filter(m => m.type === loai).reduce((acc, curr) => acc + curr.quantity, 0);
  };

  return (
    <div className="bg-slate-900/40 p-6 rounded-[2.5rem] border border-white/5 shadow-xl h-fit">
        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2 mb-6">
            <Box size={14} /> NGUYÊN LIỆU YÊU CẦU
        </h4>

        <div className="space-y-3">
            {blueprint.requiredMaterials.map((req, idx) => {
                const hienCo = laySoLuongTrongKho(req.type);
                const duDung = hienCo >= req.amount;
                return (
                    <div key={idx} className={`flex justify-between items-center p-4 rounded-2xl border transition-all ${duDung ? 'bg-slate-950/60 border-emerald-500/20' : 'bg-red-950/10 border-red-900/20'}`}>
                        <div className="flex items-center gap-4">
                             <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${duDung ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                                 {duDung ? <Check size={16} strokeWidth={3} /> : <X size={16} strokeWidth={3} />}
                             </div>
                             <div className="flex flex-col">
                                <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest leading-none mb-1">Loại</span>
                                <span className="text-[10px] text-white font-black uppercase">{req.type}</span>
                             </div>
                        </div>
                        <div className="flex flex-col items-end">
                             <span className="text-[8px] text-slate-600 font-black uppercase mb-1">Số lượng</span>
                             <div className="flex items-baseline gap-1.5">
                                <span className={`text-lg font-black tabular-nums ${duDung ? 'text-emerald-400' : 'text-red-500 animate-pulse'}`}>{dinh_dang_so(hienCo)}</span>
                                <span className="text-slate-700 text-[10px] font-bold">/ {dinh_dang_so(req.amount)}</span>
                             </div>
                        </div>
                    </div>
                );
            })}
        </div>

        <div className="mt-8 p-4 bg-slate-950/80 rounded-2xl border border-white/5 flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <Gem size={14} />
            </div>
            <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
                Các nguyên liệu hiếm sẽ không bị tiêu hao nếu bạn sử dụng <span className="text-indigo-400">Bảo Hiểm Lò Rèn</span>.
            </p>
        </div>
    </div>
  );
};
