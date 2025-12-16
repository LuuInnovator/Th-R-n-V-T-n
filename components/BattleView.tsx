import React from 'react';
import { Zone, Enemy, Player } from '../types';
import { ZoneList } from './battle/ZoneList';
import { EnemyDisplay } from './battle/EnemyDisplay';
import { BattleLog } from './battle/BattleLog';
import { LogEntry } from '../hooks/useGameLog';

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
  onClearLogs
}) => {
  return (
    <div className="flex flex-col h-full gap-4 p-4 max-w-7xl mx-auto w-full overflow-y-auto lg:overflow-hidden">
      <ZoneList zones={zones} activeZone={activeZone} onSelect={onSelectZone} />
      
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0 pb-20 lg:pb-0">
        {/* Enemy Section */}
        <div className="lg:col-span-2 min-h-[400px]">
          <EnemyDisplay 
            enemy={currentEnemy} 
            zoneDescription={activeZone.description}
            onExplore={onExplore}
            onAttack={onAttack}
          />
        </div>
        
        {/* Log Section - Căn chỉnh để nằm gọn gàng */}
        <div className="lg:col-span-1 flex flex-col justify-end lg:justify-end h-full">
          <BattleLog logs={logs} onClear={onClearLogs} />
        </div>
      </div>
    </div>
  );
};