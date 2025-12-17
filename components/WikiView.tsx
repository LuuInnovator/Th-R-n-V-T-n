
import React, { useState } from 'react';
import { Zone, Blueprint, MaterialType } from '../types';
import { ENEMIES_DB } from '../constants';
import { Card } from './Card';
import { Map, Target, Skull, ChevronDown, ChevronUp, Search, Percent, Hammer } from 'lucide-react';

interface WikiViewProps {
  zones: Zone[];
  blueprints: Blueprint[];
}

export const WikiView: React.FC<WikiViewProps> = ({ zones, blueprints }) => {
  const [activeZoneId, setActiveZoneId] = useState<string>(zones[0].id);
  const [expandedEnemyId, setExpandedEnemyId] = useState<string | null>(null);

  // Hàm tìm công thức chế tạo từ nguyên liệu
  const getUsage = (matType: MaterialType) => {
    const usages = blueprints.filter(bp => 
      bp.requiredMaterials.some(req => req.type === matType)
    ).map(bp => bp.name);

    if (usages.length === 0) return "Chưa có công thức";
    return usages.join(', ');
  };

  const activeZone = zones.find(z => z.id === activeZoneId);
  const enemies = activeZone ? ENEMIES_DB[activeZone.id] || [] : [];

  return (
    <div className="h-full w-full flex flex-col bg-slate-950 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-slate-900 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2 mb-2">
              <Search className="text-blue-500" size={24} />
              <h2 className="text-xl font-bold text-slate-100">Từ Điển Sinh Vật</h2>
          </div>
          <p className="text-sm text-slate-400">Tra cứu thông tin quái vật và tỷ lệ rơi đồ.</p>
      </div>

      <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Zone List (Desktop/Mobile integrated) */}
          <div className="w-16 md:w-64 bg-slate-900/50 border-r border-slate-800 flex flex-col shrink-0 overflow-y-auto scrollbar-thin">
              {zones.map(zone => (
                  <button
                    key={zone.id}
                    onClick={() => {
                        setActiveZoneId(zone.id);
                        setExpandedEnemyId(null);
                    }}
                    className={`
                        p-3 md:px-4 md:py-3 flex flex-col md:flex-row items-center gap-2 md:gap-3 transition-colors border-b border-slate-800/50 relative
                        ${activeZoneId === zone.id ? 'bg-blue-900/20 text-blue-400' : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'}
                    `}
                  >
                      {activeZoneId === zone.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>}
                      <Map size={20} />
                      <span className="text-[10px] md:text-sm font-bold text-center md:text-left hidden md:block">{zone.name}</span>
                  </button>
              ))}
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-4 scrollbar-thin bg-slate-950">
             <div className="max-w-4xl mx-auto space-y-4">
                 {/* Zone Info */}
                 {activeZone && (
                     <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 mb-6">
                         <h3 className="text-lg font-bold text-slate-200 mb-1">{activeZone.name}</h3>
                         <p className="text-sm text-slate-400 mb-2">{activeZone.description}</p>
                         <div className="flex flex-wrap gap-2">
                             <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-300 border border-slate-700">
                                 Cấp độ: {activeZone.recommendedLevel}
                             </span>
                             {activeZone.reqRebirth ? (
                                 <span className="text-xs bg-purple-900/30 px-2 py-1 rounded text-purple-400 border border-purple-800 font-bold">
                                     Yêu cầu Tái Sinh: {activeZone.reqRebirth}
                                 </span>
                             ) : null}
                         </div>
                     </div>
                 )}

                 {/* Enemy List */}
                 {enemies.length === 0 ? (
                     <div className="text-center text-slate-500 py-10 italic">Chưa có dữ liệu sinh vật cho vùng này.</div>
                 ) : (
                     enemies.map(enemy => (
                         <div key={enemy.id} className="bg-slate-900/40 rounded-xl border border-slate-800 overflow-hidden transition-all">
                             {/* Accordion Header */}
                             <button 
                                onClick={() => setExpandedEnemyId(expandedEnemyId === enemy.id ? null : enemy.id)}
                                className="w-full p-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors"
                             >
                                 <div className="flex items-center gap-3">
                                     <div className={`p-2 rounded-lg ${enemy.isBoss ? 'bg-red-900/20 text-red-500' : 'bg-slate-800 text-slate-400'}`}>
                                         {enemy.isBoss ? <Skull size={24} /> : <Target size={24} />}
                                     </div>
                                     <div className="text-left">
                                         <div className={`font-bold text-base flex items-center gap-2 ${enemy.isBoss ? 'text-red-400' : 'text-slate-200'}`}>
                                             {enemy.name}
                                             {enemy.isBoss && <span className="text-[9px] bg-red-600 text-white px-1.5 py-0.5 rounded font-black">BOSS</span>}
                                         </div>
                                         <div className="text-xs text-slate-500">Lv.{enemy.level} • {enemy.element} • HP: {enemy.maxHp}</div>
                                     </div>
                                 </div>
                                 <div className="text-slate-500">
                                     {expandedEnemyId === enemy.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                 </div>
                             </button>

                             {/* Expanded Drop Table */}
                             {expandedEnemyId === enemy.id && (
                                 <div className="p-4 border-t border-slate-800/50 bg-slate-900/60 animate-fade-in">
                                     <div className="text-xs font-bold text-slate-500 uppercase mb-3 flex items-center gap-2">
                                         <Search size={14} /> Danh Sách Vật Phẩm Rơi
                                     </div>
                                     <div className="overflow-x-auto">
                                         <table className="w-full text-left min-w-[500px]">
                                             <thead>
                                                 <tr className="text-xs text-slate-500 border-b border-slate-700/50">
                                                     <th className="pb-2 font-medium w-[30%]">Vật Phẩm</th>
                                                     <th className="pb-2 font-medium w-[15%] text-center">Tỷ Lệ</th>
                                                     <th className="pb-2 font-medium w-[55%]">Sử Dụng Để Chế Tạo</th>
                                                 </tr>
                                             </thead>
                                             <tbody className="divide-y divide-slate-800/50 text-sm">
                                                 {enemy.dropTable.map((drop, idx) => (
                                                     <tr key={idx}>
                                                         <td className="py-3 pr-2">
                                                             <div className="font-bold text-slate-200">{drop.materialType}</div>
                                                             <div className="text-[10px] text-slate-500">Số lượng: {drop.minQty}-{drop.maxQty}</div>
                                                         </td>
                                                         <td className="py-3 px-2 text-center">
                                                             <div className="inline-flex items-center gap-1 font-mono font-bold text-yellow-500 bg-yellow-900/10 px-2 py-1 rounded border border-yellow-900/30">
                                                                 <Percent size={10} /> {(drop.chance * 100).toFixed(0)}%
                                                             </div>
                                                         </td>
                                                         <td className="py-3 pl-2 text-slate-400 text-xs leading-relaxed">
                                                             <div className="flex items-start gap-1.5">
                                                                 <Hammer size={12} className="mt-0.5 text-blue-500 shrink-0" />
                                                                 <span>{getUsage(drop.materialType)}</span>
                                                             </div>
                                                         </td>
                                                     </tr>
                                                 ))}
                                             </tbody>
                                         </table>
                                     </div>
                                 </div>
                             )}
                         </div>
                     ))
                 )}
             </div>
          </div>
      </div>
    </div>
  );
};
