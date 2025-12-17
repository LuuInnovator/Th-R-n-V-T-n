
import React, { useState } from 'react';
import { Blueprint, Material } from '../../types';
import { Button } from '../Button';
import { Hammer, AlertCircle, Sparkles, X, Flame } from 'lucide-react';
import { CraftingStats } from './CraftingStats';
import { CraftingMaterials } from './CraftingMaterials';

interface CraftingDetailProps {
  blueprint: Blueprint | null;
  materials: Material[];
  onCraft: (bp: Blueprint, useOverheat: boolean) => void;
  onClose?: () => void;
}

export const CraftingDetail: React.FC<CraftingDetailProps> = ({ blueprint, materials, onCraft, onClose }) => {
  const [useOverheat, setUseOverheat] = useState(false);

  const checkRequirements = (bp: Blueprint) => {
    return bp.requiredMaterials.every(req => {
      const totalQty = materials.filter(m => m.type === req.type).reduce((acc, curr) => acc + curr.quantity, 0);
      return totalQty >= req.amount;
    });
  };

  if (!blueprint) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-slate-950/20">
        <div className="p-8 bg-slate-900/40 rounded-full mb-6 border border-slate-800 shadow-inner">
            <Hammer size={48} className="text-slate-700" />
        </div>
        <h3 className="text-xl font-black text-slate-500 uppercase tracking-tighter">Sẵn sàng đúc rèn</h3>
        <p className="text-slate-600 text-[10px] mt-2 italic uppercase tracking-widest">Chọn bản vẽ từ danh sách để bắt đầu</p>
      </div>
    );
  }

  const canCraft = checkRequirements(blueprint);

  return (
    <div className="h-full flex flex-col bg-slate-950 relative overflow-hidden">
        <button onClick={onClose} className="md:hidden absolute top-4 right-4 z-50 p-2 bg-slate-800 rounded-full text-slate-400">
            <X size={20} />
        </button>

        <div className="flex-1 overflow-y-auto scrollbar-thin px-4 py-6 md:px-8 pb-32">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 px-2 py-0.5 bg-slate-900 border border-slate-800 rounded-md mb-2">
                        <Sparkles size={10} className="text-amber-500" />
                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">Lò Rèn Thần Binh</span>
                    </div>
                    <h2 className="text-2xl font-black text-slate-100 uppercase tracking-tighter mb-3 drop-shadow-md">
                        {blueprint.name}
                    </h2>
                    
                    <button 
                        onClick={() => setUseOverheat(!useOverheat)}
                        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all
                        ${useOverheat ? 'bg-red-500/10 border-red-500/30 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'bg-slate-900 border-slate-800 text-slate-500'}`}
                    >
                        {useOverheat ? <Flame size={12} className="animate-pulse" /> : null}
                        {useOverheat ? '🔥 ĐANG ĐỐT NHIỆT 🔥' : '🔨 CHẾ ĐỘ TIÊU CHUẨN 🔨'}
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
                    <div className="space-y-4">
                        <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-1 flex items-center gap-2">
                             Dự Đoán Kết Quả
                        </div>
                        <CraftingStats blueprint={blueprint} useOverheat={useOverheat} onToggleOverheat={() => setUseOverheat(!useOverheat)} />
                    </div>
                    <div className="space-y-4">
                        <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-1 flex items-center gap-2">
                             Nguyên Liệu Cần Có
                        </div>
                        <CraftingMaterials blueprint={blueprint} materials={materials} />
                    </div>
                </div>
            </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent z-40 border-t border-slate-800/10 backdrop-blur-md">
            <div className="max-w-xl mx-auto flex flex-col items-center gap-3">
                {!canCraft && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-950/30 border border-red-900/30 text-red-500 animate-pulse">
                        <AlertCircle size={12} />
                        <span className="text-[8px] font-black uppercase tracking-widest">Kho không đủ tài nguyên!</span>
                    </div>
                )}
                
                <Button
                    size="lg"
                    fullWidth
                    disabled={!canCraft}
                    onClick={() => onCraft(blueprint, useOverheat)}
                    className={`
                        py-4 rounded-xl text-sm font-black tracking-widest transition-all duration-300 border
                        ${canCraft ? 'hover:scale-[1.01] active:scale-95' : 'opacity-30 grayscale'}
                        ${useOverheat 
                            ? 'bg-gradient-to-r from-red-600 to-orange-600 border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.4)]' 
                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-400'}
                    `}
                >
                    {canCraft ? (useOverheat ? 'KHAI HỎA ĐỐT NHIỆT' : 'BẮT ĐẦU CHẾ TÁC') : 'THIẾU NGUYÊN LIỆU'}
                </Button>
            </div>
        </div>
    </div>
  );
};
