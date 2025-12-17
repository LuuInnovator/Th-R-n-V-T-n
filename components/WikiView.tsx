
import React, { useState } from 'react';
import { Zone, Blueprint, MaterialType } from '../types';
import { ENEMIES_DB, EQUIPMENT_TALENTS } from '../constants';
import { Map, Target, Skull, ChevronDown, ChevronUp, Search, Heart, Zap, Shield, Sparkles, Coins, Hammer, Star } from 'lucide-react';

interface WikiViewProps {
  zones: Zone[];
  blueprints: Blueprint[];
}

export const WikiView: React.FC<WikiViewProps> = ({ zones, blueprints }) => {
  const [activeTab, setActiveTab] = useState<'monsters' | 'talents'>('monsters');
  const [activeZoneId, setActiveZoneId] = useState<string>(zones[0]?.id || '');
  const [expandedEnemyId, setExpandedEnemyId] = useState<string | null>(null);

  const getUsages = (matType: MaterialType) => {
    return blueprints.filter(bp => 
      bp.requiredMaterials.some(req => req.type === matType)
    );
  };

  const activeZone = zones.find(z => z.id === activeZoneId);
  const enemies = activeZone ? ENEMIES_DB[activeZone.id] || [] : [];

  return (
    <div className="h-full w-full flex flex-col bg-slate-950 overflow-hidden">
      {/* Header Tabs */}
      <div className="flex bg-slate-900 border-b border-slate-800 shrink-0 px-4">
          <button 
            onClick={() => setActiveTab('monsters')}
            className={`py-4 px-6 text-[10px] font-black uppercase tracking-[0.2em] border-b-2 transition-all flex items-center gap-2 ${activeTab === 'monsters' ? 'border-blue-500 text-blue-400 bg-blue-500/5' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
          >
            <Skull size={14} /> Quái Vật & Rơi Đồ
          </button>
          <button 
            onClick={() => setActiveTab('talents')}
            className={`py-4 px-6 text-[10px] font-black uppercase tracking-[0.2em] border-b-2 transition-all flex items-center gap-2 ${activeTab === 'talents' ? 'border-amber-500 text-amber-400 bg-amber-500/5' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
          >
            <Star size={14} /> Thiên Phú Trang Bị
          </button>
      </div>

      {activeTab === 'monsters' ? (
        <div className="flex flex-1 overflow-hidden">
            {/* Sidebar Zones */}
            <div className="w-16 md:w-52 bg-slate-900/30 border-r border-slate-800 flex flex-col shrink-0 overflow-y-auto scrollbar-hide">
                {zones.map(zone => (
                    <button
                      key={zone.id}
                      onClick={() => { setActiveZoneId(zone.id); setExpandedEnemyId(null); }}
                      className={`p-4 flex flex-col md:flex-row items-center gap-3 transition-all border-b border-slate-800/30 relative
                          ${activeZoneId === zone.id ? 'bg-blue-600/10 text-blue-400' : 'text-slate-500 hover:bg-slate-800/40'}`}
                    >
                        {activeZoneId === zone.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>}
                        <Map size={16} />
                        <span className="hidden md:block text-[10px] font-black uppercase truncate">{zone.name}</span>
                    </button>
                ))}
            </div>

            {/* Main Content Monsters */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-thin">
               <div className="max-w-2xl mx-auto space-y-3 pb-12">
                   {enemies.map(enemy => (
                        <div key={enemy.id} className={`rounded-xl border transition-all overflow-hidden ${expandedEnemyId === enemy.id ? 'bg-slate-900 border-slate-700' : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'}`}>
                            <button 
                                onClick={() => setExpandedEnemyId(expandedEnemyId === enemy.id ? null : enemy.id)}
                                className="w-full p-3 flex items-center justify-between"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`p-1.5 rounded-lg ${enemy.isBoss ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-500'}`}>
                                        {enemy.isBoss ? <Skull size={14} /> : <Target size={14} />}
                                    </div>
                                    <div className="text-left">
                                        <div className={`font-black text-xs ${enemy.isBoss ? 'text-red-400' : 'text-slate-300'}`}>{enemy.name}</div>
                                        <div className="text-[8px] font-bold text-slate-600 uppercase">Lv.{enemy.level}</div>
                                    </div>
                                </div>
                                {expandedEnemyId === enemy.id ? <ChevronUp size={14} className="text-slate-600" /> : <ChevronDown size={14} className="text-slate-600" />}
                            </button>

                            {expandedEnemyId === enemy.id && (
                                <div className="px-4 pb-4 animate-fade-in border-t border-slate-800 pt-3">
                                    <div className="grid grid-cols-5 gap-2 mb-4">
                                        {[
                                            { label: 'HP', val: enemy.maxHp, icon: Heart, color: 'text-red-500' },
                                            { label: 'ATK', val: enemy.attack, icon: Zap, color: 'text-orange-400' },
                                            { label: 'DEF', val: enemy.defense, icon: Shield, color: 'text-blue-400' },
                                            { label: 'EXP', val: enemy.expReward, icon: Sparkles, color: 'text-cyan-400' },
                                            { label: 'Vàng', val: enemy.goldReward, icon: Coins, color: 'text-yellow-500' },
                                        ].map((s, i) => (
                                            <div key={i} className="bg-slate-950/50 p-1 rounded-lg border border-slate-800 flex flex-col items-center">
                                                <s.icon size={10} className={s.color} />
                                                <div className="text-[9px] font-mono font-bold text-slate-400 mt-0.5">{s.val}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-2">
                                        <div className="text-[8px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-2">CHẾ TÁC</div>
                                        {enemy.dropTable.map((drop, idx) => {
                                            const usages = getUsages(drop.materialType);
                                            return (
                                                <div key={idx} className="bg-slate-950/40 border border-slate-800 p-2 rounded-lg">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <div className="text-[10px] font-black text-slate-300">{drop.materialType}</div>
                                                        <div className="text-amber-500 font-mono text-[10px]">{(drop.chance * 100).toFixed(0)}%</div>
                                                    </div>
                                                    <div className="flex flex-wrap gap-1">
                                                        {usages.map(bp => (
                                                            <span key={bp.id} className="text-[8px] px-1.5 py-0.5 bg-blue-900/10 border border-blue-800/30 text-blue-400 rounded font-bold">
                                                                {bp.name}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                   ))}
               </div>
            </div>
        </div>
      ) : (
        /* Talents Tab Content */
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
            <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-3 pb-12">
                {EQUIPMENT_TALENTS.map((talent, idx) => (
                    <div key={idx} className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl group hover:border-amber-500/50 transition-all">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500 group-hover:scale-110 transition-transform">
                                <Sparkles size={16} />
                            </div>
                            <h4 className="font-black text-slate-100 text-sm uppercase tracking-tighter">{talent.name}</h4>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                            {talent.desc}
                        </p>
                    </div>
                ))}
                <div className="col-span-full mt-6 bg-slate-900/20 border border-dashed border-slate-800 p-6 rounded-2xl text-center">
                    <Hammer className="mx-auto text-slate-700 mb-2" size={32} />
                    <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest italic">
                        "Thiên phú xuất hiện ngẫu nhiên khi rèn được trang bị cấp Hiếm trở lên"
                    </p>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
