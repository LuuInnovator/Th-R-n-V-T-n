import React from 'react';
import { Blueprint, Material, MaterialType, Rarity } from '../../types';
import { Button } from '../Button';
import { Info, Hammer } from 'lucide-react';
import { Card } from '../Card';
import { RARITY_COLOR } from '../../constants';

interface CraftingDetailProps {
  blueprint: Blueprint | null;
  materials: Material[];
  onCraft: (bp: Blueprint) => void;
}

export const CraftingDetail: React.FC<CraftingDetailProps> = ({ blueprint, materials, onCraft }) => {
  const getMaterialQuantity = (type: MaterialType) => {
    // Tổng hợp số lượng từ tất cả các rarity của loại đó
    return materials.filter(m => m.type === type).reduce((acc, curr) => acc + curr.quantity, 0);
  };

  const checkRequirements = (bp: Blueprint) => {
    return bp.requiredMaterials.every(req => {
      const totalQty = getMaterialQuantity(req.type);
      return totalQty >= req.amount;
    });
  };

  if (!blueprint) {
    return (
      <Card className="h-full flex flex-col items-center justify-center text-center p-12">
        <div className="p-6 bg-slate-800 rounded-full mb-6 animate-pulse-slow">
            <Hammer size={48} className="text-slate-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-300 mb-2">Xưởng Rèn</h3>
        <p className="text-slate-500">Chọn một bản thiết kế bên trái để bắt đầu chế tạo trang bị.</p>
      </Card>
    );
  }

  const canCraft = checkRequirements(blueprint);

  return (
    <Card className="h-full flex flex-col relative overflow-hidden">
        {/* Bg decoration */}
        <div className="absolute top-0 right-0 p-32 bg-blue-500/5 blur-3xl rounded-full pointer-events-none"></div>

        <div className="relative z-10 flex-1 flex flex-col">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500 mb-2">
                    {blueprint.name}
                </h2>
                <div className="flex justify-center gap-6 text-sm font-mono text-slate-400 bg-slate-900/50 py-2 rounded-lg mx-auto max-w-sm border border-slate-700">
                    <span className="flex items-center gap-1"><span className="text-red-400">ATK</span> {blueprint.baseStats.minAtk}-{blueprint.baseStats.maxAtk}</span>
                    <span className="w-px bg-slate-700 h-4"></span>
                    <span className="flex items-center gap-1"><span className="text-blue-400">DEF</span> {blueprint.baseStats.minDef}-{blueprint.baseStats.maxDef}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-700">
                    <h4 className="font-bold text-xs text-slate-400 uppercase tracking-widest mb-4">Nguyên Liệu Yêu Cầu</h4>
                    <div className="space-y-3">
                        {blueprint.requiredMaterials.map((req, idx) => {
                            const currentQty = getMaterialQuantity(req.type);
                            const isEnough = currentQty >= req.amount;
                            return (
                                <div key={idx} className="flex justify-between items-center text-sm p-2 rounded bg-slate-800/50">
                                    <span className="text-slate-300 font-medium">{req.type}</span>
                                    <span className={`font-mono font-bold ${isEnough ? 'text-green-400' : 'text-red-400'}`}>
                                        {currentQty} / {req.amount}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="bg-blue-900/10 p-5 rounded-xl border border-blue-500/20">
                    <h4 className="font-bold text-xs text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Info size={14} /> Tỷ Lệ Thành Phẩm
                    </h4>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center">
                            <span className={RARITY_COLOR[Rarity.Common]}>Thường</span>
                            <span className="text-slate-400">50%</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className={RARITY_COLOR[Rarity.Rare]}>Hiếm</span>
                            <span className="text-slate-400">25%</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className={RARITY_COLOR[Rarity.Epic]}>Sử Thi</span>
                            <span className="text-slate-400">14%</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className={RARITY_COLOR[Rarity.Legendary]}>Huyền Thoại</span>
                            <span className="text-slate-400">10%</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className={RARITY_COLOR[Rarity.Mythic]}>Thần Thoại</span>
                            <span className="text-slate-400">1%</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-auto">
                <Button
                    size="xl"
                    fullWidth
                    disabled={!canCraft}
                    onClick={() => onCraft(blueprint)}
                    className={canCraft ? 'shadow-[0_0_20px_rgba(37,99,235,0.3)] animate-pulse-slow' : 'opacity-50'}
                >
                    {canCraft ? 'BẮT ĐẦU RÈN' : 'KHÔNG ĐỦ NGUYÊN LIỆU'}
                </Button>
            </div>
        </div>
    </Card>
  );
};