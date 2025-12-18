
import React, { useMemo } from 'react';
import { Player, Equipment, EquipmentType } from '../kieu_du_lieu';
import { tinh_toan_chi_so_nhan_vat } from '../tien_ich/tinh_toan_chi_so';
import { X, Shield, Sword, Zap, Plus, Star, Heart, Target, Sparkles, HardHat, Footprints, Hand, CircuitBoard, Brain, Clover, Activity, Flame, Wind, RotateCcw } from 'lucide-react';
import { dinh_dang_so } from '../tien_ich/tinh_toan';
import { MAU_DO_HIEM } from '../hang_so/do_hiem';

interface Props {
  player: Player;
  equipped: Record<EquipmentType, Equipment | null>;
  onClose: () => void;
  getStatMultiplier: (base: number) => number;
  onAllocate: (stat: keyof Player['stats'], amount: number) => void;
  onUnequip?: (type: EquipmentType) => void;
}

const SLOT_ICONS: Record<string, any> = {
  [EquipmentType.Weapon]: Sword,
  [EquipmentType.Armor]: Shield,
  [EquipmentType.Helmet]: HardHat,
  [EquipmentType.Gloves]: Hand,
  [EquipmentType.Boots]: Footprints,
  [EquipmentType.Accessory]: CircuitBoard
};

export const BangChiSoNhanVat: React.FC<Props> = ({ 
  player, equipped, onClose, getStatMultiplier, onAllocate, onUnequip
}) => {
  const stats = useMemo(() => tinh_toan_chi_so_nhan_vat(player, equipped, getStatMultiplier), [player, equipped, getStatMultiplier]);

  const StatRow = ({ label, statKey, value, icon: Icon, color, desc }: any) => (
    <div className="bg-slate-900/40 p-3 md:p-4 rounded-2xl border border-white/5 flex items-center justify-between group hover:bg-slate-800/40 transition-all">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center bg-slate-950 border border-white/10 ${color}`}>
            <Icon size={16} />
        </div>
        <div>
            <div className="flex items-baseline gap-2">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">{label}</span>
                <span className="text-xs md:text-sm font-black text-white">{value}</span>
            </div>
            <p className="text-[7px] text-slate-500 font-bold uppercase hidden md:block">{desc}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
         <button 
            onClick={() => onAllocate(statKey, 1)}
            disabled={player.statPoints <= 0}
            className="w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-20 flex items-center justify-center text-white transition-all active:scale-90"
         >
            <Plus size={14} />
         </button>
         <button 
            onClick={() => onAllocate(statKey, 10)}
            disabled={player.statPoints < 10}
            className="px-2 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-20 text-[9px] font-black text-slate-400"
         >
            +10
         </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-2 md:p-10 animate-fade-in overflow-hidden">
      <div className="bg-slate-900 border border-white/10 rounded-[2rem] md:rounded-[3rem] w-full max-w-6xl h-full max-h-[95vh] flex flex-col relative overflow-hidden shadow-2xl">
        
        <div className="relative z-10 p-6 md:p-10 border-b border-white/5 flex justify-between items-center bg-slate-900/80 shrink-0">
          <div className="flex items-center gap-4 md:gap-8">
            <div className="relative">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl md:rounded-[2rem] flex items-center justify-center border-2 md:border-4 border-white/10 shadow-2xl">
                    <Star className="text-white" size={32} />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-slate-900">
                    CẤP {player.level}
                </div>
            </div>
            <div>
              <h2 className="text-xl md:text-3xl font-black text-white uppercase italic tracking-tighter mb-1">Hồ Sơ Anh Hùng</h2>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-[8px] font-black rounded-full border border-blue-500/20 uppercase">{player.characterClass}</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-3 bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white rounded-xl transition-all"><X size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-10 scrollbar-thin space-y-8 md:space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
                <div className="lg:col-span-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                            <Activity size={14} className="text-blue-500" /> Điểm Tiềm Năng
                        </h4>
                        <span className="text-blue-400 font-black text-sm">{player.statPoints}</span>
                    </div>
                    <div className="space-y-2">
                        <StatRow label="Sức Mạnh" statKey="strength" value={player.stats.strength} icon={Sword} color="text-red-400" desc="+15 Công" />
                        <StatRow label="Khéo Léo" statKey="dexterity" value={player.stats.dexterity} icon={Wind} color="text-cyan-400" desc="+0.1% Chí mạng" />
                        <StatRow label="Thông Thái" statKey="intelligence" value={player.stats.intelligence} icon={Brain} color="text-purple-400" desc="+1% Bí pháp" />
                        <StatRow label="Sinh Lực" statKey="vitality" value={player.stats.vitality} icon={Heart} color="text-rose-400" desc="+120 Máu" />
                        <StatRow label="May Mắn" statKey="luck" value={player.stats.luck} icon={Clover} color="text-emerald-400" desc="+1% Rơi đồ" />
                    </div>
                </div>

                <div className="lg:col-span-4 bg-slate-950/40 rounded-[2rem] p-6 border border-white/5 relative">
                    <div className="text-[9px] font-black text-slate-600 uppercase text-center tracking-widest mb-6">Trang Bị (Nhấn để tháo)</div>
                    <div className="grid grid-cols-2 gap-4">
                        {(Object.values(EquipmentType) as EquipmentType[]).map(type => {
                            const item = equipped[type];
                            const Icon = SLOT_ICONS[type] || Sword;
                            return (
                                <button 
                                    key={type} 
                                    onClick={() => item && onUnequip?.(type)}
                                    className={`flex flex-col items-center gap-2 group/slot relative ${!item ? 'cursor-default' : 'cursor-pointer'}`}
                                >
                                    <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl border flex items-center justify-center transition-all ${item ? `bg-slate-900 hover:bg-rose-950/20 hover:border-rose-500/50 ${MAU_DO_HIEM[item.rarity].replace('text-', 'border-').replace('400', '500/20')}` : 'bg-slate-950 border-dashed border-slate-800 opacity-30'}`}>
                                        <Icon size={24} className={item ? MAU_DO_HIEM[item.rarity] : 'text-slate-700'} />
                                        {item && (
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/slot:opacity-100 bg-rose-900/40 rounded-2xl transition-opacity">
                                                <RotateCcw size={20} className="text-white" />
                                            </div>
                                        )}
                                    </div>
                                    <div className={`text-[8px] font-black uppercase truncate max-w-[80px] ${item ? 'text-white' : 'text-slate-700'}`}>
                                        {item ? item.name : type}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-6">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <Target size={14} className="text-amber-500" /> Chỉ Số Chiến Đấu
                    </h4>
                    <div className="bg-slate-900/60 rounded-3xl p-6 border border-white/5 space-y-4">
                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                            <span className="text-[8px] font-black text-slate-500 uppercase">Tấn Công</span>
                            <span className="text-sm font-black text-red-400">{dinh_dang_so(stats.totalAtk)}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                            <span className="text-[8px] font-black text-slate-500 uppercase">Phòng Thủ</span>
                            <span className="text-sm font-black text-blue-400">{dinh_dang_so(stats.totalDef)}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                            <span className="text-[8px] font-black text-slate-500 uppercase">Sinh Lực</span>
                            <span className="text-sm font-black text-rose-400">{dinh_dang_so(stats.totalHp)}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                            <span className="text-[8px] font-black text-slate-500 uppercase">Chí Mạng</span>
                            <span className="text-sm font-black text-amber-400">{stats.critChance.toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <span className="text-[8px] font-black text-slate-500 uppercase">May Mắn</span>
                            <span className="text-sm font-black text-emerald-400">+{Math.floor(stats.dropRateBonus * 100)}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="p-6 md:p-8 bg-slate-950 border-t border-white/5 flex justify-between items-center shrink-0">
            <div className="flex gap-6">
                <div>
                    <span className="text-[7px] text-slate-600 uppercase block font-black">Ký Ức</span>
                    <span className="text-xs font-black text-amber-500">+{player.memoryGemPotential}</span>
                </div>
                <div>
                    <span className="text-[7px] text-slate-600 uppercase block font-black">Vàng</span>
                    <span className="text-xs font-black text-amber-500">{dinh_dang_so(player.gold)}</span>
                </div>
            </div>
            <p className="text-[8px] font-black text-slate-700 uppercase tracking-widest">v2.6 Blacksmith Profile</p>
        </div>
      </div>
    </div>
  );
};
