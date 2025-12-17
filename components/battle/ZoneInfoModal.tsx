
import React from 'react';
import { Zone, Blueprint, MaterialType } from '../../types';
import { ENEMIES_DB, RARITY_COLOR } from '../../constants';
import { X, Search, ChevronRight, Target, Percent, Hammer } from 'lucide-react';
import { Button } from '../Button';

interface ZoneInfoModalProps {
  zone: Zone;
  blueprints: Blueprint[];
  onClose: () => void;
  dropRateBonus?: number;
}

export const ZoneInfoModal: React.FC<ZoneInfoModalProps> = ({ zone, blueprints, onClose, dropRateBonus = 0 }) => {
  const enemies = ENEMIES_DB[zone.id] || [];

  // Hàm tìm các bản vẽ sử dụng nguyên liệu này
  const getUsage = (matType: MaterialType) => {
    // HIỂN THỊ TẤT CẢ CÔNG THỨC (Kể cả chưa mở khóa) để người chơi biết tác dụng
    const usages = blueprints.filter(bp => 
      bp.requiredMaterials.some(req => req.type === matType)
    ).map(bp => bp.name);

    if (usages.length === 0) return "Chưa có công thức";
    
    // Hiển thị toàn bộ, không cắt bớt để người chơi dễ tra cứu
    return usages.join(', ');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in safe-area-bottom">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl relative">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-950 flex justify-between items-center sticky top-0 rounded-t-2xl z-10">
          <div>
            <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <Search className="text-blue-500" size={24} /> 
              Thông Tin: {zone.name}
            </h2>
            <div className="flex gap-2 items-center text-sm mt-1 flex-wrap">
                <span className="text-slate-300">{zone.description}</span>
                {dropRateBonus > 0 && (
                    <span className="text-green-400 font-bold bg-green-900/20 px-2 py-0.5 rounded border border-green-800 whitespace-nowrap text-xs">
                        Bonus Rơi Đồ: +{(dropRateBonus * 100).toFixed(0)}%
                    </span>
                )}
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-colors shrink-0 ml-2">
            <X size={28} className="text-slate-400 hover:text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto scrollbar-thin space-y-4">
          {enemies.length === 0 ? (
            <div className="text-center text-slate-500 py-8 italic">Chưa có thông tin quái vật cho khu vực này.</div>
          ) : (
            enemies.map(enemy => (
              <div key={enemy.id} className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
                {/* Enemy Header */}
                <div className="px-4 py-3 bg-slate-800 flex justify-between items-center border-b border-slate-700/50 sticky top-0">
                   <div className="flex items-center gap-2">
                      <Target size={20} className={enemy.isBoss ? "text-red-500" : "text-slate-400"} />
                      <span className={`font-bold text-base ${enemy.isBoss ? "text-red-400" : "text-slate-200"}`}>
                        {enemy.name} <span className="text-sm font-normal text-slate-400 ml-1">(Lv.{enemy.level})</span>
                      </span>
                   </div>
                   {enemy.isBoss && <span className="text-[10px] font-bold bg-red-900/50 text-red-300 px-2 py-1 rounded border border-red-800 shrink-0 ml-2">BOSS</span>}
                </div>

                {/* Drop Table */}
                <div className="p-0 overflow-x-auto">
                    <table className="w-full text-left text-slate-400 min-w-[400px]">
                        <thead className="text-xs font-bold text-slate-400 uppercase bg-slate-900/80">
                            <tr>
                                <th className="px-4 py-2 whitespace-nowrap w-1/3">Vật Phẩm Rơi</th>
                                <th className="px-4 py-2 text-center whitespace-nowrap w-1/6"><Percent size={12} className="inline mr-1"/>Tỷ Lệ</th>
                                <th className="px-4 py-2 w-1/2"><Hammer size={12} className="inline mr-1"/>Dùng Chế Tạo</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50 text-sm">
                            {enemy.dropTable.map((drop, idx) => {
                                const baseChance = drop.chance * 100;
                                const bonusChance = dropRateBonus * 100;
                                const totalChance = Math.min(100, baseChance + bonusChance);
                                
                                return (
                                <tr key={idx} className="hover:bg-slate-700/40 transition-colors">
                                    <td className="px-4 py-3 font-bold text-slate-200 align-top">
                                        <div className="flex flex-col sm:flex-row sm:items-baseline">
                                            <span className="mr-2">{drop.materialType}</span>
                                            <span className="text-xs text-slate-400 whitespace-nowrap font-normal">
                                                (x{drop.minQty}-{drop.maxQty})
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-center font-mono align-top">
                                        <div className="flex flex-col items-center">
                                            <span className="text-yellow-400 font-bold text-base">{totalChance.toFixed(0)}%</span>
                                            {dropRateBonus > 0 && totalChance > baseChance && (
                                                <span className="text-[10px] text-green-400 whitespace-nowrap">
                                                    (+{bonusChance.toFixed(0)}%)
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-slate-100 align-top whitespace-normal break-words leading-relaxed">
                                        {getUsage(drop.materialType)}
                                    </td>
                                </tr>
                            )})}
                        </tbody>
                    </table>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/80 flex justify-end rounded-b-2xl sticky bottom-0 z-10 backdrop-blur">
            <Button variant="primary" onClick={onClose}>Đã Hiểu</Button>
        </div>
      </div>
    </div>
  );
};
