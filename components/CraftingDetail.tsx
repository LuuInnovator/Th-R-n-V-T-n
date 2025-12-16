
import React, { useState } from 'react';
import { Blueprint, Material, MaterialType, Rarity } from '../../types';
import { Button } from '../Button';
import { Info, Hammer, Flame, AlertTriangle } from 'lucide-react';
import { Card } from '../Card';
import { RARITY_COLOR } from '../../constants';

interface CraftingDetailProps {
  blueprint: Blueprint | null;
  materials: Material[];
  onCraft: (bp: Blueprint, useOverheat: boolean) => void;
}

export const CraftingDetail: React.FC<CraftingDetailProps> = ({ blueprint, materials, onCraft }) => {
  const [useOverheat, setUseOverheat] = useState(false);

  const getMaterialQuantity = (type: MaterialType) => {
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
        <div className={`absolute top-0 right-0 p-32 blur-3xl rounded-full pointer-events-none transition-colors duration-500 ${useOverheat ? 'bg-red-500/10' : 'bg-blue-500/5'}`}></div>

        <div className="relative z-10 flex-1 flex flex-col">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500 mb-2">
                    {blueprint.name}
                </h2>
                <div className="flex justify-center gap-6 text-sm font-mono text-slate-400 bg-slate-900/50 py-2 rounded-lg mx-auto max-w-sm border border-slate-700">
                    <span className="flex items-center gap-1"><span className="text-red-400">ATK</span> {blueprint.baseStats.minAtk}-{blueprint.baseStats.maxAtk}</span>
                    <span className="w-px bg-slate-700 h-4"></span>
                    <span className="flex items-center gap-1"><span className="text-blue-400">DEF</span> {blueprint.baseStats.minDef}-{blueprint.baseStats.maxDef}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                    <h4 className="font-bold text-xs text-slate-400 uppercase tracking-widest mb-3">Nguyên Liệu</h4>
                    <div className="space-y-2">
                        {blueprint.requiredMaterials.map((req, idx) => {
                            const currentQty = getMaterialQuantity(req.type);
                            const isEnough = currentQty >= req.amount;
                            return (
                                <div key={idx} className="flex justify-between items-center text-sm p-1.5 rounded bg-slate-800/50">
                                    <span className="text-slate-300 font-medium">{req.type}</span>
                                    <span className={`font-mono font-bold ${isEnough ? 'text-green-400' : 'text-red-400'}`}>
                                        {currentQty} / {req.amount}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                  {/* Tỷ lệ thành phẩm */}
                   <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 flex-1">
                      <h4 className="font-bold text-xs text-blue-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                          <Info size={14} /> Tỷ Lệ ({useOverheat ? 'Tăng nhiệt' : 'Thường'})
                      </h4>
                      <div className="space-y-1 text-xs">
                          {useOverheat ? (
                            <>
                              <div className="flex justify-between text-red-300 font-bold">
                                <span>THẤT BẠI (Mất đồ)</span>
                                <span>30%</span>
                              </div>
                              <div className="flex justify-between text-yellow-400">
                                <span>Huyền Thoại+</span>
                                <span>~25%</span>
                              </div>
                            </>
                          ) : (
                             <div className="flex justify-between text-slate-400">
                                <span>Thường/Hiếm</span>
                                <span>~75%</span>
                            </div>
                          )}
                      </div>
                  </div>

                  {/* Overheat Toggle */}
                  <div 
                    onClick={() => setUseOverheat(!useOverheat)}
                    className={`
                      cursor-pointer p-4 rounded-xl border transition-all duration-300 relative overflow-hidden group
                      ${useOverheat 
                        ? 'bg-red-900/20 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]' 
                        : 'bg-slate-800 border-slate-600 hover:border-slate-500'}
                    `}
                  >
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${useOverheat ? 'bg-red-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                          <Flame size={20} className={useOverheat ? 'animate-pulse' : ''} />
                        </div>
                        <div>
                          <div className={`font-bold ${useOverheat ? 'text-red-400' : 'text-slate-300'}`}>Tăng Nhiệt Lò Rèn</div>
                          <div className="text-[10px] text-slate-500">Rủi ro cao, Phần thưởng lớn</div>
                        </div>
                      </div>
                      <div className={`w-6 h-6 rounded border flex items-center justify-center ${useOverheat ? 'bg-red-500 border-red-400' : 'border-slate-500'}`}>
                        {useOverheat && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                    </div>
                  </div>
                </div>
            </div>

            <div className="mt-auto">
                <Button
                    size="xl"
                    fullWidth
                    disabled={!canCraft}
                    onClick={() => onCraft(blueprint, useOverheat)}
                    className={`
                      ${canCraft ? 'animate-pulse-slow' : 'opacity-50'}
                      ${useOverheat ? 'from-red-600 to-orange-600 shadow-red-900/50' : ''}
                    `}
                >
                    {canCraft 
                      ? (useOverheat ? 'RÈN CỰC HẠN (NGUY HIỂM!)' : 'BẮT ĐẦU RÈN') 
                      : 'KHÔNG ĐỦ NGUYÊN LIỆU'}
                </Button>
            </div>
        </div>
    </Card>
  );
};
