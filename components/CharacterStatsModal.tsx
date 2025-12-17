
import React, { useMemo, useState } from 'react';
import { Player, Equipment, EquipmentType, ElementType, SetId } from '../types';
// Fix: Removed non-existent MILESTONES export
import { calculatePlayerStats } from '../utils/statCalculator';
import { SETS } from '../constants';
import { X, Shield, Sword, Zap, Activity, Flame, Snowflake, Plus, RefreshCw, Trophy, AlertTriangle, Target } from 'lucide-react';
import { Button } from './Button';
import { formatNumber } from '../utils';

interface CharacterStatsModalProps {
  player: Player;
  equipped: Record<EquipmentType, Equipment | null>;
  onClose: () => void;
  getStatMultiplier: (base: number) => number;
  // New props for allocation
  onAllocate?: (stat: keyof Player['stats'], amount: number) => void;
  onRespec?: () => void;
}

export const CharacterStatsModal: React.FC<CharacterStatsModalProps> = ({ 
  player, 
  equipped, 
  onClose,
  getStatMultiplier,
  onAllocate,
  onRespec
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'allocation'>('allocation');

  // Sử dụng Stat Calculator để lấy toàn bộ chỉ số đã tính toán
  const stats = useMemo(() => calculatePlayerStats(player, equipped, getStatMultiplier), [player, equipped, getStatMultiplier]);

  const StatRow = ({ label, value, subtext, icon: Icon, colorClass }: any) => (
      <div className="flex justify-between items-center bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
          <div className="flex items-center gap-3">
              <div className={`p-2 rounded bg-slate-900 ${colorClass}`}>
                  <Icon size={18} />
              </div>
              <div>
                  <div className="text-sm font-bold text-slate-200">{label}</div>
                  {subtext && <div className="text-[10px] text-slate-500">{subtext}</div>}
              </div>
          </div>
          <div className={`font-mono font-bold text-lg ${colorClass.replace('text-', '')}`}>
              {value}
          </div>
      </div>
  );

  const AllocationRow = ({ statKey, name, icon: Icon, color, desc }: { statKey: keyof Player['stats'], name: string, icon: any, color: string, desc: string }) => {
      const currentValue = player.stats[statKey];
      const isSoftCapped = currentValue > 50;
      const isHardCapped = currentValue >= 90;
      
      return (
          <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 flex flex-col gap-2">
              <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                       <Icon className={color} size={20} />
                       <div>
                           <div className="font-bold text-slate-200">{name}</div>
                           <div className="text-[10px] text-slate-500">{desc}</div>
                       </div>
                  </div>
                  <div className="text-right">
                      <div className={`text-xl font-black ${isHardCapped ? 'text-red-500' : color}`}>{currentValue} <span className="text-xs text-slate-500 font-normal">/ 90</span></div>
                      {isHardCapped ? (
                          <div className="text-[9px] text-red-500 font-bold uppercase">Max Level</div>
                      ) : isSoftCapped ? (
                          <div className="text-[9px] text-yellow-500 font-bold">⚠️ Soft Cap (50%)</div>
                      ) : null}
                  </div>
              </div>
              
              <div className="flex gap-2 mt-1">
                  <div className="flex-1 bg-slate-900 h-8 rounded-lg relative overflow-hidden">
                      <div 
                        className={`absolute top-0 left-0 bottom-0 opacity-20 ${color.replace('text-', 'bg-')}`} 
                        style={{ width: `${Math.min(100, (currentValue / 90) * 100)}%` }}
                      ></div>
                      {/* Milestones Markers */}
                      <div className="absolute top-0 bottom-0 left-[22.2%] w-0.5 bg-slate-600/50" title="Mốc 20"></div>
                      <div className="absolute top-0 bottom-0 left-[55.5%] w-0.5 bg-slate-600/50" title="Mốc 50"></div>
                  </div>
                  <Button 
                    size="xs" 
                    disabled={player.statPoints <= 0 || isHardCapped}
                    onClick={() => onAllocate && onAllocate(statKey, 1)}
                    className={`w-12 h-8 flex items-center justify-center ${isHardCapped ? 'bg-slate-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'}`}
                  >
                      {isHardCapped ? 'MAX' : <Plus size={16} />}
                  </Button>
              </div>
          </div>
      );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in safe-area-bottom">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-950 flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <Activity className="text-blue-500" /> Hồ Sơ Thợ Rèn
            </h2>
            <div className="text-slate-400 text-xs">Cấp {player.level} / 90 • {player.characterClass}</div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
            <X size={24} className="text-slate-400 hover:text-white" />
          </button>
        </div>

        <div className="flex border-b border-slate-800 shrink-0">
            <button 
                onClick={() => setActiveTab('allocation')}
                className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'allocation' ? 'border-blue-500 text-blue-400 bg-slate-800/50' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
            >
                CỘNG ĐIỂM TIỀM NĂNG
            </button>
            <button 
                onClick={() => setActiveTab('overview')}
                className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'overview' ? 'border-amber-500 text-amber-400 bg-slate-800/50' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
            >
                TỔNG QUAN CHỈ SỐ
            </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-thin">
            {activeTab === 'allocation' && (
                <div className="flex flex-col md:flex-row gap-6 h-full">
                    {/* Left: Allocation Panel */}
                    <div className="flex-1 space-y-4">
                        <div className="flex justify-between items-center bg-blue-900/20 p-4 rounded-xl border border-blue-500/30 mb-4">
                             <div>
                                 <div className="text-slate-400 text-xs uppercase font-bold">Điểm Tiềm Năng</div>
                                 <div className="text-3xl font-black text-blue-400">{player.statPoints}</div>
                             </div>
                             {onRespec && (
                                 <Button variant="outline" size="sm" onClick={onRespec} className="border-red-500/50 text-red-400 hover:bg-red-900/20">
                                     <RefreshCw size={14} className="mr-1" /> Tẩy Điểm
                                 </Button>
                             )}
                        </div>

                        <div className="space-y-3">
                            <AllocationRow 
                                statKey="strength" name="Sức Mạnh (STR)" icon={Sword} color="text-red-500"
                                desc="Tăng Sát thương Vật lý, Khả năng mang vác"
                            />
                            <AllocationRow 
                                statKey="dexterity" name="Khéo Léo (DEX)" icon={Zap} color="text-yellow-400"
                                desc="Tăng Chí mạng, Tốc độ đánh, Né tránh"
                            />
                            <AllocationRow 
                                statKey="intelligence" name="Trí Tuệ (INT)" icon={Snowflake} color="text-blue-400"
                                desc="Tăng MP, Hiệu quả kỹ năng, Kháng phép"
                            />
                            <AllocationRow 
                                statKey="vitality" name="Thể Lực (VIT)" icon={Shield} color="text-green-500"
                                desc="Tăng Máu tối đa, Phòng thủ"
                            />
                            <AllocationRow 
                                statKey="luck" name="May Mắn (LUK)" icon={Trophy} color="text-purple-400"
                                desc="Tăng Tỷ lệ rơi đồ, Sát thương Chí mạng"
                            />
                        </div>
                    </div>

                    {/* Right: Milestones & Effects */}
                    <div className="w-full md:w-80 space-y-4 shrink-0">
                        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                             <h3 className="font-bold text-slate-200 mb-3 flex items-center gap-2">
                                 <Trophy size={16} className="text-amber-500" /> Cột Mốc Sức Mạnh
                             </h3>
                             <div className="space-y-2 max-h-[300px] overflow-y-auto scrollbar-thin pr-1">
                                 {stats.activeMilestones.length === 0 ? (
                                     <div className="text-slate-500 italic text-sm text-center py-4">Chưa đạt mốc nào (20/50 điểm)</div>
                                 ) : (
                                     stats.activeMilestones.map((m: any, idx) => (
                                         <div key={idx} className="bg-slate-900 p-2 rounded border border-amber-900/30 flex gap-2">
                                             <div className="mt-1"><Trophy size={12} className="text-amber-500" /></div>
                                             <div>
                                                 <div className="text-xs font-bold text-amber-400">{m.name}</div>
                                                 <div className="text-[10px] text-slate-400">{m.description}</div>
                                             </div>
                                         </div>
                                     ))
                                 )}
                             </div>
                        </div>

                        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                            <h3 className="font-bold text-slate-200 mb-3">Chỉ Số Dẫn Xuất</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between text-slate-400">
                                    <span>HP Tối Đa:</span> <span className="text-green-400 font-mono">{formatNumber(stats.totalHp)}</span>
                                </div>
                                <div className="flex justify-between text-slate-400">
                                    <span>Tấn Công:</span> <span className="text-red-400 font-mono">{formatNumber(stats.totalAtk)}</span>
                                </div>
                                <div className="flex justify-between text-slate-400">
                                    <span>Phòng Thủ:</span> <span className="text-blue-400 font-mono">{formatNumber(stats.totalDef)}</span>
                                </div>
                                <div className="w-full h-px bg-slate-700 my-2"></div>
                                <div className="flex justify-between text-slate-400">
                                    <span>Chí Mạng:</span> <span className="text-yellow-400 font-mono">{stats.critChance}%</span>
                                </div>
                                <div className="flex justify-between text-slate-400">
                                    <span>Hồi Chiêu:</span> <span className="text-cyan-400 font-mono">-{(stats.cooldownReduction * 100).toFixed(1)}%</span>
                                </div>
                                <div className="flex justify-between text-slate-400">
                                    <span>May Mắn (Drop):</span> <span className="text-purple-400 font-mono">+{(stats.dropRateBonus * 100).toFixed(1)}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'overview' && (
                 <div className="space-y-6">
                    {/* Main Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-red-900/20 p-4 rounded-xl border border-red-500/30 flex flex-col items-center justify-center text-center">
                            <Sword className="text-red-400 mb-2" size={28} />
                            <div className="text-slate-400 text-xs uppercase tracking-widest font-bold">Tấn Công</div>
                            <div className="text-2xl font-black text-red-200">{formatNumber(stats.totalAtk)}</div>
                            <div className="text-[10px] text-red-400/70 mt-1">
                                (Hệ: {stats.weaponElement === ElementType.Physical ? 'Vật Lý' : stats.weaponElement === ElementType.Fire ? 'Lửa' : stats.weaponElement === ElementType.Ice ? 'Băng' : 'Sét'})
                            </div>
                        </div>

                        <div className="bg-blue-900/20 p-4 rounded-xl border border-blue-500/30 flex flex-col items-center justify-center text-center">
                            <Shield className="text-blue-400 mb-2" size={28} />
                            <div className="text-slate-400 text-xs uppercase tracking-widest font-bold">Phòng Thủ</div>
                            <div className="text-2xl font-black text-blue-200">{formatNumber(stats.totalDef)}</div>
                            <div className="text-[10px] text-blue-400/70 mt-1">Giảm sát thương vật lý</div>
                        </div>

                        <div className="bg-green-900/20 p-4 rounded-xl border border-green-500/30 flex flex-col items-center justify-center text-center">
                            <Activity className="text-green-400 mb-2" size={28} />
                            <div className="text-slate-400 text-xs uppercase tracking-widest font-bold">Sinh Lực (HP)</div>
                            <div className="text-2xl font-black text-green-200">{formatNumber(stats.totalHp)}</div>
                        </div>
                    </div>

                    {/* Detailed Lists */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                             <h3 className="text-sm font-bold text-amber-500 border-b border-slate-700 pb-1 mb-2">Chỉ Số Nâng Cao</h3>
                             <StatRow label="Tỷ lệ Chí Mạng" value={`${stats.critChance}%`} icon={Zap} colorClass="text-yellow-400" />
                             <StatRow label="Sát thương Chí Mạng" value={`${stats.critDamage}%`} icon={Target} colorClass="text-red-500" />
                             <StatRow label="Giảm Hồi Chiêu" value={`${(stats.cooldownReduction * 100).toFixed(1)}%`} icon={RefreshCw} colorClass="text-cyan-400" />
                        </div>
                        <div className="space-y-2">
                             <h3 className="text-sm font-bold text-purple-500 border-b border-slate-700 pb-1 mb-2">Hiệu Ứng Bộ (Set Bonus)</h3>
                             {Object.keys(stats.activeSets).length === 0 ? (
                                 <div className="text-slate-500 text-sm italic p-2">Chưa kích hoạt bộ trang bị nào.</div>
                             ) : (
                                 Object.entries(stats.activeSets).map(([setId, count]) => {
                                     // Fix TypeScript error by casting setId to SetId enum
                                     const id = setId as SetId;
                                     const setInfo = SETS[id];
                                     // Cast count to any to avoid "unknown" rendering error
                                     const c = count as any;
                                     return (
                                        <div key={id} className="bg-slate-800 p-2 rounded border border-slate-700">
                                            <div className="text-yellow-500 font-bold text-sm">
                                                {setInfo ? setInfo.name : id} <span className="text-slate-400 text-xs">({c}/6)</span>
                                            </div>
                                        </div>
                                     );
                                 })
                             )}
                        </div>
                    </div>
                 </div>
            )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50 flex justify-end">
            <Button variant="outline" onClick={onClose}>Đóng</Button>
        </div>
      </div>
    </div>
  );
};
