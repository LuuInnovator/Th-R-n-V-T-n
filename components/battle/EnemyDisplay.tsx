import React from 'react';
import { Enemy } from '../../types';
import { Button } from '../Button';
import { Zap, Shield, Skull, Map, Repeat } from 'lucide-react';
import { Card } from '../Card';

interface EnemyDisplayProps {
  enemy: Enemy | null;
  zoneDescription: string;
  onExplore: () => void;
  onAttack: () => void;
  isAutoAttacking?: boolean;
  onToggleAutoAttack?: () => void;
}

export const EnemyDisplay: React.FC<EnemyDisplayProps> = ({ 
  enemy, 
  zoneDescription, 
  onExplore, 
  onAttack,
  isAutoAttacking = false,
  onToggleAutoAttack
}) => {
  if (!enemy) {
    return (
      <Card className="h-full items-center justify-center text-center p-8 min-h-[400px]">
        <div className="mb-6 relative">
          <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-10 rounded-full"></div>
          <Map className="w-24 h-24 text-slate-600 mx-auto opacity-50" />
        </div>
        <h3 className="text-2xl font-bold text-slate-300 mb-2">Khu Vực An Toàn</h3>
        <p className="text-slate-500 mb-8 max-w-sm mx-auto">{zoneDescription}</p>
        <Button size="xl" onClick={onExplore} className="animate-pulse-slow mx-auto">
          <Skull size={24} /> TRUY TÌM QUÁI VẬT
        </Button>
      </Card>
    );
  }

  const hpPercent = (enemy.hp / enemy.maxHp) * 100;

  return (
    <Card className="h-full relative overflow-hidden min-h-[400px]">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-slate-900 to-slate-900 pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col h-full items-center justify-center p-6 text-center animate-fade-in">
        <div className="mb-6">
          <span className={`
            inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border shadow-lg
            ${enemy.isBoss 
              ? 'bg-red-500/10 text-red-400 border-red-500/50 shadow-red-900/20' 
              : 'bg-slate-700/50 text-slate-300 border-slate-600'}
          `}>
            {enemy.isBoss ? '⚠️ BOSS KHU VỰC' : 'Quái Vật Thường'}
          </span>
          
          <h2 className={`text-4xl font-black mb-2 drop-shadow-lg ${enemy.isBoss ? 'text-red-500' : 'text-slate-100'}`}>
            {enemy.name}
          </h2>
          <p className="text-slate-400 font-mono">Cấp độ {enemy.level}</p>
        </div>

        {/* Health Bar */}
        <div className="w-full max-w-md mb-8">
          <div className="flex justify-between text-xs font-bold text-slate-400 mb-1 uppercase tracking-wide">
            <span>HP</span>
            <span>{enemy.hp} / {enemy.maxHp}</span>
          </div>
          <div className="h-4 bg-slate-900 rounded-full overflow-hidden border border-slate-700 shadow-inner relative">
            <div 
              className="absolute top-0 left-0 h-full bg-red-600 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(220,38,38,0.7)]"
              style={{ width: `${hpPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-6 mb-10 w-full max-w-sm">
          <div className="flex-1 bg-slate-800/50 p-3 rounded-lg border border-slate-700 backdrop-blur-sm">
            <div className="text-slate-500 text-xs uppercase mb-1 flex items-center justify-center gap-1">
              <Zap size={12} /> Tấn công
            </div>
            <div className="text-red-400 font-bold text-xl">{enemy.attack}</div>
          </div>
          <div className="flex-1 bg-slate-800/50 p-3 rounded-lg border border-slate-700 backdrop-blur-sm">
            <div className="text-slate-500 text-xs uppercase mb-1 flex items-center justify-center gap-1">
              <Shield size={12} /> Phòng thủ
            </div>
            <div className="text-blue-400 font-bold text-xl">{enemy.defense}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto items-center justify-center">
          <Button 
            variant="danger" 
            size="xl" 
            onClick={onAttack} 
            className={`w-full sm:w-auto shadow-xl hover:scale-105 flex-1 ${enemy.isBoss ? "animate-pulse" : ""}`}
          >
            <Zap size={24} /> 
            TẤN CÔNG
          </Button>

          {onToggleAutoAttack && (
             <Button 
              variant={isAutoAttacking ? 'primary' : 'outline'}
              size="xl" 
              onClick={onToggleAutoAttack}
              className={`w-full sm:w-auto transition-all ${isAutoAttacking ? 'shadow-[0_0_20px_rgba(59,130,246,0.5)] border-blue-400' : 'border-slate-600'}`}
              title="Tự động tấn công mỗi giây"
            >
              <Repeat size={24} className={isAutoAttacking ? 'animate-spin' : ''} />
              {isAutoAttacking ? 'ĐANG TỰ ĐỘNG' : 'TỰ ĐỘNG ĐÁNH'}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};