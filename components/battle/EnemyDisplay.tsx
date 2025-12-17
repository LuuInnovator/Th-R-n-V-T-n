
import React from 'react';
import { Enemy, MutationType, MonsterAbility } from '../../types';
import { Button } from '../Button';
import { Zap, Shield, Skull, Map, Repeat, Target, Sparkles, Ghost, ShieldAlert } from 'lucide-react';

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
      <div className="text-center animate-fade-in mt-10">
        <div className="inline-block p-6 bg-slate-900/50 rounded-full mb-4 border border-slate-700 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <Map className="w-16 h-16 text-slate-500" />
        </div>
        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 backdrop-blur-sm shadow-xl max-w-sm mx-auto">
            <h3 className="text-xl font-bold text-slate-300 mb-1">Khu Vực An Toàn</h3>
            <p className="text-xs text-slate-500 mb-4">{zoneDescription}</p>
            <Button size="lg" onClick={onExplore} fullWidth className="animate-pulse-slow font-bold">
            <Skull size={20} /> TÌM QUÁI VẬT
            </Button>
        </div>
      </div>
    );
  }

  const hpPercent = (enemy.hp / enemy.maxHp) * 100;

  return (
    <div className="w-full max-w-lg flex flex-col items-center animate-fade-in">
      {/* Mutation Badge */}
      {enemy.mutation && enemy.mutation !== MutationType.None && (
          <div className={`mb-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border shadow-lg ${
              enemy.mutation === MutationType.Stalker ? 'bg-red-600 border-red-400 text-white animate-bounce' :
              enemy.mutation === MutationType.Void ? 'bg-purple-900 border-purple-500 text-purple-200' :
              enemy.mutation === MutationType.Corrupted ? 'bg-indigo-900 border-indigo-400 text-indigo-100' :
              'bg-slate-800 border-slate-600 text-slate-400'
          }`}>
              {enemy.mutation === MutationType.Stalker && <Ghost size={12}/>}
              {enemy.mutation === MutationType.Void && <Sparkles size={12}/>}
              {enemy.mutation === MutationType.Corrupted && <Skull size={12}/>}
              {enemy.mutation}
          </div>
      )}

      {/* Boss Info Header */}
      <div className="text-center mb-2 w-full">
         <div className="flex items-center justify-center gap-2 mb-1">
            {enemy.isBoss && <Skull className="text-red-500 animate-pulse" size={20} />}
            <h2 className={`text-2xl font-black tracking-tight drop-shadow-md ${enemy.isBoss ? 'text-red-500 scale-110' : 'text-slate-200'}`}>
                {enemy.name}
            </h2>
            {enemy.isBoss && <Skull className="text-red-500 animate-pulse" size={20} />}
         </div>
         <div className="text-xs font-mono text-slate-400 bg-black/40 inline-block px-2 py-0.5 rounded">
            Level {enemy.level} • {enemy.element}
         </div>
      </div>

      {/* BIG HEALTH BAR */}
      <div className="w-full h-6 bg-slate-950 rounded-full border-2 border-slate-700 relative overflow-hidden shadow-2xl mb-4">
         <div 
            className={`absolute top-0 left-0 h-full transition-all duration-200 ease-linear ${enemy.isBoss ? 'bg-gradient-to-r from-red-900 via-red-600 to-orange-600' : 'bg-gradient-to-r from-red-700 to-red-500'}`}
            style={{ width: `${hpPercent}%` }}
         ></div>
         <div className="absolute inset-0 flex items-center justify-between px-3 text-[10px] font-bold text-white drop-shadow-md z-10">
            <span>HP</span>
            <span>{Math.max(0, enemy.hp)} / {enemy.maxHp} ({Math.floor(hpPercent)}%)</span>
         </div>
      </div>

      {/* Abilities Visual */}
      <div className="flex gap-2 mb-4">
          {enemy.abilities?.map((ab, i) => (
              <div key={i} className="bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700 text-[9px] font-black uppercase text-slate-500 flex items-center gap-1">
                  <ShieldAlert size={10} /> {ab}
              </div>
          ))}
      </div>

      {/* Model / Visual Placeholder (Circle) */}
      <div className={`
         w-32 h-32 rounded-full border-4 flex items-center justify-center mb-6 relative group transition-all duration-300
         ${enemy.isBoss ? 'border-red-600 shadow-[0_0_40px_rgba(220,38,38,0.4)] bg-slate-900 scale-110' : 
           enemy.mutation === MutationType.Corrupted ? 'border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.3)] bg-slate-900' :
           'border-slate-600 bg-slate-800'}
      `}>
          <Target size={64} className={`${enemy.isBoss ? 'text-red-500' : 'text-slate-500'} transition-transform duration-100 group-active:scale-90`} />
      </div>

      {/* Stats Mini */}
      <div className="flex gap-4 mb-6 text-xs font-bold">
          <div className="bg-slate-900/80 px-3 py-1 rounded border border-red-900/30 text-red-400 flex items-center gap-1">
              <Zap size={12}/> {enemy.attack} ATK
          </div>
          <div className="bg-slate-900/80 px-3 py-1 rounded border border-blue-900/30 text-blue-400 flex items-center gap-1">
              <Shield size={12}/> {enemy.defense} DEF
          </div>
      </div>

      {/* Main Action Buttons */}
      <div className="flex gap-3 w-full max-w-xs">
          <Button 
            variant="danger" 
            size="lg" 
            fullWidth
            onClick={onAttack} 
            className="shadow-xl active:scale-95"
          >
            TẤN CÔNG
          </Button>

          {onToggleAutoAttack && (
             <Button 
              variant={isAutoAttacking ? 'primary' : 'outline'}
              size="lg" 
              onClick={onToggleAutoAttack}
              className={`px-3 ${isAutoAttacking ? 'animate-pulse' : ''}`}
            >
              <Repeat size={20} />
            </Button>
          )}
      </div>
    </div>
  );
};
