
import React from 'react';
import { Zone, Enemy, Player, MaterialType } from '../types';
import { ZoneList } from './battle/ZoneList';
import { EnemyDisplay } from './battle/EnemyDisplay';
import { BattleLog } from './battle/BattleLog';
import { LogEntry } from '../hooks/useGameLog';
import { Heart, Zap, Shield, Box } from 'lucide-react';

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
  // Nhận thêm danh sách nguyên liệu để đếm Decoy Item
  decoyCount?: number; 
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
  decoyCount = 0
}) => {
  return (
    <div className="relative h-full w-full overflow-hidden flex flex-col bg-slate-950">
      {/* Background Layer (Optional visual) */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black opacity-80 pointer-events-none"></div>

      {/* --- TOP BAR: ZONE SELECTION --- */}
      <div className="relative z-20 p-2 shrink-0 bg-slate-900/50 backdrop-blur-sm border-b border-slate-800">
        <ZoneList zones={zones} activeZone={activeZone} onSelect={onSelectZone} />
      </div>
      
      {/* --- MAIN BATTLE AREA (HUD LAYOUT) --- */}
      <div className="relative z-10 flex-1 p-4 grid grid-cols-12 grid-rows-6 gap-4 min-h-0">
        
        {/* TOP LEFT: Player Stats (HP/MP) */}
        <div className="col-span-4 row-span-1 flex flex-col justify-start">
             <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-700 w-full max-w-xs shadow-lg backdrop-blur-md">
                <div className="flex items-center gap-2 mb-1">
                    <div className="bg-slate-800 p-1 rounded"><Shield size={16} className="text-blue-400"/></div>
                    <span className="font-bold text-slate-200 text-sm">Lv.{player.level} {player.characterClass}</span>
                </div>
                {/* HP Bar */}
                <div className="relative h-4 bg-slate-950 rounded-full overflow-hidden border border-slate-800 mb-1">
                    <div 
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-600 to-red-500 transition-all duration-300" 
                        style={{ width: `${(player.hp / player.maxHp) * 100}%` }}
                    ></div>
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white drop-shadow-md">
                        {player.hp} / {player.maxHp} HP
                    </span>
                </div>
                {/* MP Bar (Simulated using EXP for visual or placeholder) */}
                <div className="relative h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                     <div 
                        className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-300"
                        style={{ width: `${(player.currentExp / player.maxExp) * 100}%` }}
                     ></div>
                </div>
             </div>
        </div>

        {/* TOP CENTER: Boss Frame (Only visible if enemy exists) */}
        <div className="col-span-4 row-span-4 flex justify-center items-start pt-4">
             <EnemyDisplay 
                enemy={currentEnemy} 
                zoneDescription={activeZone.description}
                onExplore={onExplore}
                onAttack={onAttack}
                isAutoAttacking={isAutoAttacking}
                onToggleAutoAttack={onToggleAutoAttack}
            />
        </div>

        {/* TOP RIGHT: Logs */}
        <div className="col-span-4 row-span-3 flex justify-end items-start pointer-events-none">
             <div className="w-full max-w-xs pointer-events-auto">
                 <BattleLog logs={logs} onClear={onClearLogs} />
             </div>
        </div>

        {/* BOTTOM LEFT: Skills (Placeholder for future update) */}
        <div className="col-span-4 row-span-2 row-start-5 flex items-end">
             <div className="flex gap-2">
                 {[1, 2, 3, 4].map(i => (
                     <div key={i} className="w-12 h-12 bg-slate-900/80 border border-slate-600 rounded-lg flex items-center justify-center hover:border-amber-500 cursor-pointer shadow-lg transition-colors group">
                         <span className="text-slate-600 text-xs font-bold group-hover:text-slate-400">{i}</span>
                     </div>
                 ))}
             </div>
        </div>

        {/* BOTTOM RIGHT: Special Items / Decoy */}
        <div className="col-span-4 row-span-2 row-start-5 col-start-9 flex items-end justify-end">
             <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-700 backdrop-blur-md flex items-center gap-3">
                 <div className="text-right">
                     <div className="text-[10px] text-slate-400 uppercase font-bold">Vật Phẩm Mồi</div>
                     <div className={`font-mono font-bold text-lg ${decoyCount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                         x{decoyCount}
                     </div>
                 </div>
                 <div className="p-2 bg-slate-800 rounded-full border border-slate-600">
                     <Box size={24} className="text-amber-500" />
                 </div>
             </div>
        </div>

      </div>
    </div>
  );
};
