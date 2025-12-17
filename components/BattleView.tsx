
import React from 'react';
import { Zone, Enemy, Player, MaterialType, Blueprint } from '../types';
import { ZoneList } from './battle/ZoneList';
import { EnemyDisplay } from './battle/EnemyDisplay';
import { BattleLog } from './battle/BattleLog';
import { LogEntry } from '../hooks/useGameLog';
import { Heart, Zap, Shield, Box, Activity } from 'lucide-react';

interface BattleViewProps {
  zones: Zone[];
  activeZone: Zone;
  onSelectZone: (zone: Zone) => void;
  player: Player;
  currentEnemy: Enemy | null;
  onExplore: () => void;
  onAttack: () => void;
  logs: LogEntry[];
  onClearLogs?: () => void;
  isAutoAttacking?: boolean;
  onToggleAutoAttack?: () => void;
  decoyCount?: number;
  blueprints?: Blueprint[]; 
  dropRateBonus?: number;
}

export const BattleView: React.FC<BattleViewProps> = ({
  zones,
  activeZone,
  onSelectZone,
  player,
  currentEnemy,
  onExplore,
  onAttack,
  logs,
  onClearLogs,
  isAutoAttacking = false,
  onToggleAutoAttack = () => {},
  decoyCount = 0,
  blueprints = [],
  dropRateBonus = 0
}) => {
  return (
    <div className="relative h-full w-full overflow-hidden flex flex-col bg-slate-950">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black opacity-90 pointer-events-none"></div>

      {/* --- TOP BAR: ZONE SELECTION --- */}
      <div className="relative z-20 p-2 shrink-0 bg-slate-900/60 backdrop-blur-md border-b border-slate-800">
        <ZoneList 
            zones={zones} 
            activeZone={activeZone} 
            onSelect={onSelectZone} 
            blueprints={blueprints} 
            dropRateBonus={dropRateBonus}
        />
      </div>
      
      {/* --- MAIN BATTLE AREA --- */}
      <div className="relative z-10 flex-1 p-4 grid grid-cols-12 gap-4 min-h-0">
        
        {/* TOP LEFT: Player Stats */}
        <div className="col-span-12 lg:col-span-3 order-2 lg:order-1">
             <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center gap-2 mb-3">
                    <div className="bg-blue-600/20 p-1.5 rounded-lg border border-blue-500/30">
                        <Activity size={18} className="text-blue-400"/>
                    </div>
                    <span className="font-black text-slate-200 text-xs uppercase tracking-widest">Tình Trạng Nhân Vật</span>
                </div>
                
                {/* HP Bar */}
                <div className="mb-4">
                    <div className="flex justify-between text-[10px] font-black text-slate-500 mb-1 uppercase tracking-tighter">
                        <span>Sinh Lực</span>
                        <span>{player.hp} / {player.maxHp}</span>
                    </div>
                    <div className="relative h-4 bg-slate-950 rounded-full overflow-hidden border border-slate-800 shadow-inner">
                        <div 
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-600 to-rose-500 transition-all duration-300 shadow-[0_0_10px_rgba(225,29,72,0.4)]" 
                            style={{ width: `${(player.hp / player.maxHp) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* EXP Bar */}
                <div>
                    <div className="flex justify-between text-[10px] font-black text-slate-500 mb-1 uppercase tracking-tighter">
                        <span>Kinh Nghiệm</span>
                        <span>{Math.floor((player.currentExp / player.maxExp) * 100)}%</span>
                    </div>
                    <div className="relative h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800 shadow-inner">
                         <div 
                            className="absolute top-0 left-0 h-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)] transition-all duration-300"
                            style={{ width: `${(player.currentExp / player.maxExp) * 100}%` }}
                         ></div>
                    </div>
                </div>
             </div>
        </div>

        {/* CENTER: Enemy & Action */}
        <div className="col-span-12 lg:col-span-6 flex flex-col items-center justify-center order-1 lg:order-2 py-6">
             <EnemyDisplay 
                enemy={currentEnemy} 
                zoneDescription={activeZone.description}
                onExplore={onExplore}
                onAttack={onAttack}
                isAutoAttacking={isAutoAttacking}
                onToggleAutoAttack={onToggleAutoAttack}
            />
        </div>

        {/* RIGHT: Logs */}
        <div className="col-span-12 lg:col-span-3 order-3 flex flex-col gap-4">
             <BattleLog logs={logs} onClear={onClearLogs} />
             
             {/* Special Items Display */}
             <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 backdrop-blur-xl flex items-center justify-between shadow-xl">
                 <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-amber-600/10 rounded-xl border border-amber-600/30">
                        <Box size={20} className="text-amber-500" />
                    </div>
                    <div>
                        <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Vật Phẩm Mồi</div>
                        <div className={`font-mono font-black text-xl ${decoyCount > 0 ? 'text-amber-400' : 'text-slate-600'}`}>
                            x{decoyCount}
                        </div>
                    </div>
                 </div>
             </div>
        </div>

      </div>
    </div>
  );
};
