
import React, { useState } from 'react';
import { Blueprint, Material, MaterialType } from '../../types';
import { Button } from '../Button';
import { Hammer, ArrowLeft } from 'lucide-react';
import { Card } from '../Card';
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

  // Logic kiểm tra đủ nguyên liệu (vẫn giữ ở đây để disable nút bấm)
  const checkRequirements = (bp: Blueprint) => {
    return bp.requiredMaterials.every(req => {
      const totalQty = materials.filter(m => m.type === req.type).reduce((acc, curr) => acc + curr.quantity, 0);
      return totalQty >= req.amount;
    });
  };

  if (!blueprint) {
    return (
      <Card className="h-full flex flex-col items-center justify-center text-center p-12 bg-transparent md:bg-slate-900/40 border-none shadow-none md:border md:shadow-xl">
        <div className="hidden md:block">
            <div className="p-6 bg-slate-800 rounded-full mb-6 animate-pulse-slow inline-block">
                <Hammer size={48} className="text-slate-600" />
            </div>
        </div>
        <h3 className="text-xl font-bold text-slate-300 mb-2">Xưởng Rèn</h3>
        <p className="text-slate-500 text-sm">Chọn bản thiết kế để xem thông số chi tiết.</p>
      </Card>
    );
  }

  const canCraft = checkRequirements(blueprint);

  return (
    <Card className="h-full flex flex-col relative overflow-hidden border-none shadow-none md:border md:shadow-xl bg-slate-950 md:bg-slate-900/40">
        {/* Header - Mobile Only Back Button */}
        <div className="md:hidden flex items-center gap-3 mb-4 pb-3 border-b border-slate-800 bg-slate-950 sticky top-0 z-20 pt-2 px-2">
            <button onClick={onClose} className="p-2 bg-slate-800 rounded-lg text-slate-300 hover:bg-slate-700 active:scale-95 transition-transform">
                <ArrowLeft size={20} />
            </button>
            <span className="font-bold text-slate-200 text-lg truncate flex-1">{blueprint.name}</span>
        </div>

        {/* Background Effect */}
        <div className={`absolute top-0 right-0 p-40 blur-3xl rounded-full pointer-events-none transition-colors duration-500 opacity-30 ${useOverheat ? 'bg-red-500' : 'bg-blue-500'}`}></div>

        <div className="relative z-10 flex-1 flex flex-col overflow-y-auto scrollbar-thin px-2 md:px-0 pb-24 md:pb-0">
            {/* Title Section (Desktop) */}
            <div className="hidden md:block text-center mb-6">
                <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500 mb-1">
                    {blueprint.name}
                </h2>
                <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Bản Thiết Kế Cấp {useOverheat ? 'Quá Tải' : 'Tiêu Chuẩn'}</div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6">
                {/* Cột 1: Thông số & Điều khiển */}
                <CraftingStats 
                    blueprint={blueprint} 
                    useOverheat={useOverheat} 
                    onToggleOverheat={() => setUseOverheat(!useOverheat)} 
                />

                {/* Cột 2: Nguyên liệu */}
                <CraftingMaterials 
                    blueprint={blueprint} 
                    materials={materials} 
                />
            </div>
        </div>
        
        {/* Footer Action Button */}
        <div className="mt-auto pt-4 md:pt-4 pb-safe-area-bottom sticky bottom-0 bg-slate-950/90 md:bg-transparent p-4 md:p-0 z-20 border-t border-slate-800 md:border-none backdrop-blur-md">
            <Button
                size="xl"
                fullWidth
                disabled={!canCraft}
                onClick={() => onCraft(blueprint, useOverheat)}
                className={`
                    shadow-2xl transition-all duration-300
                    ${canCraft ? 'animate-pulse-slow hover:scale-[1.02]' : 'opacity-50 grayscale'}
                    ${useOverheat ? 'bg-gradient-to-r from-red-600 to-orange-600 shadow-red-900/50 border border-red-500/50' : ''}
                `}
            >
                {canCraft 
                    ? (useOverheat ? 'RÈN CỰC HẠN (NGUY HIỂM!)' : 'CHẾ TẠO NGAY') 
                    : 'THIẾU NGUYÊN LIỆU'}
            </Button>
        </div>
    </Card>
  );
};
