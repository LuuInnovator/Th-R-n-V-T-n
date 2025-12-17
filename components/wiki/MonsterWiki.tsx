
import React, { useState } from 'react';
import { Zone, Blueprint, MaterialType } from '../../types';
import { ENEMIES_DB } from '../../constants';
import { Map, Skull, Target, ChevronDown, ChevronUp, Heart, Zap, Shield, Sparkles, Coins, Box } from 'lucide-react';

interface MonsterWikiProps {
  zones: Zone[];
  blueprints: Blueprint[];
}

export const MonsterWiki: React.FC<MonsterWikiProps> = ({ zones, blueprints }) => {
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
    <div className="flex h-full overflow-hidden animate-fade-in">
      {/* Sidebar Zones */}
      <div className="w-16 md:w-56 bg-slate-900/30 border-r border-slate-800 flex flex-col shrink-0 overflow-y-auto scrollbar-hide">
        {zones.map(zone => (
          <button
            key={zone.id}
            onClick={() => { setActiveZoneId(zone.id); setExpandedEnemyId(null); }}
            className={`p-4 flex flex-col md:flex-row items-center gap-3 transition-all border-b border-slate-800/30 relative
                ${activeZoneId === zone.id ? 'bg-blue-600/10 text-blue-400' : 'text-slate-500 hover:bg-slate-800/40'}`}
          >
            {activeZoneId === zone.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>}
            <Map size={16} />
            <span className="hidden md:block text-[10px] font-black uppercase truncate tracking-tighter">{zone.name}</span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-thin">
        <div className="max-w-3xl mx-auto space-y-4 pb-20">
          <div className="mb-8 p-6 bg-slate-900/40 border border-slate-800 rounded-3xl backdrop-blur-sm">
            <h3 className="text-lg font-black text-slate-100 mb-2 uppercase tracking-tight">{activeZone?.name}</h3>
            <p className="text-xs text-slate-500 italic leading-relaxed">{activeZone?.description}</p>
          </div>
          
          {enemies.length === 0 ? (
            <div className="text-center py-20 text-slate-700 italic text-xs uppercase tracking-widest">
              Chưa có thông tin quái vật khu vực này
            </div>
          ) : enemies.map(enemy => (
            <div key={enemy.id} className={`rounded-2xl border transition-all overflow-hidden ${expandedEnemyId === enemy.id ? 'bg-slate-900 border-slate-700 shadow-2xl' : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'}`}>
              <button 
                onClick={() => setExpandedEnemyId(expandedEnemyId === enemy.id ? null : enemy.id)}
                className="w-full p-5 flex items-center justify-between group"
              >
                <div className="flex items-center gap-5">
                  <div className={`p-3 rounded-2xl transition-transform group-hover:scale-110 ${enemy.isBoss ? 'bg-red-600 text-white shadow-lg shadow-red-900/20' : 'bg-slate-800 text-slate-500'}`}>
                    {enemy.isBoss ? <Skull size={20} /> : <Target size={20} />}
                  </div>
                  <div className="text-left">
                    <div className={`font-black text-base uppercase tracking-tight ${enemy.isBoss ? 'text-red-400' : 'text-slate-200'}`}>{enemy.name}</div>
                    <div className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] mt-1">Cấp {enemy.level} • {enemy.element}</div>
                  </div>
                </div>
                {expandedEnemyId === enemy.id ? <ChevronUp size={20} className="text-slate-600" /> : <ChevronDown size={20} className="text-slate-600" />}
              </button>

              {expandedEnemyId === enemy.id && (
                <div className="px-6 pb-8 animate-slide-down border-t border-slate-800/50 pt-6 space-y-8">
                  <div className="grid grid-cols-5 gap-3">
                    {[
                      { label: 'HP', val: enemy.maxHp, icon: Heart, color: 'text-red-500' },
                      { label: 'ATK', val: enemy.attack, icon: Zap, color: 'text-orange-400' },
                      { label: 'DEF', val: enemy.defense, icon: Shield, color: 'text-blue-400' },
                      { label: 'EXP', val: enemy.expReward, icon: Sparkles, color: 'text-cyan-400' },
                      { label: 'Vàng', val: enemy.goldReward, icon: Coins, color: 'text-yellow-500' },
                    ].map((s, i) => (
                      <div key={i} className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex flex-col items-center shadow-inner">
                        <s.icon size={14} className={s.color} />
                        <div className="text-[10px] font-mono font-black text-slate-300 mt-2">{s.val.toLocaleString('vi-VN')}</div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] flex items-center gap-3 mb-4">
                      <Box size={14} className="text-blue-500" /> BẢNG RƠI VẬT PHẨM
                    </div>
                    {enemy.dropTable.map((drop, idx) => {
                      const usages = getUsages(drop.materialType);
                      return (
                        <div key={idx} className="bg-slate-950/60 border border-slate-800 p-5 rounded-2xl flex flex-col gap-4 group/drop hover:border-slate-600 transition-colors">
                          <div className="flex justify-between items-center">
                            <div className="flex flex-col">
                              <span className="text-sm font-black text-slate-100 uppercase tracking-tight">{drop.materialType}</span>
                              <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-1">Số lượng: {drop.minQty}-{drop.maxQty}</span>
                            </div>
                            <div className="text-blue-400 font-mono text-lg font-black drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]">{(drop.chance * 100).toFixed(0)}%</div>
                          </div>
                          
                          {usages.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800/50">
                              <div className="w-full text-[9px] font-black text-slate-700 uppercase mb-1 tracking-widest">Sử dụng trong:</div>
                              {usages.map(bp => (
                                <span key={bp.id} className="text-[10px] px-3 py-1 bg-blue-600/5 border border-blue-500/20 text-blue-400 rounded-full font-black uppercase tracking-tighter">
                                  {bp.name}
                                </span>
                              ))}
                            </div>
                          )}
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
  );
};
