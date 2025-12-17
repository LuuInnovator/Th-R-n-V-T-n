
import React from 'react';
import { Skill } from '../../types';
import { Zap, Star, Shield, Beaker, Sparkles, ChevronRight, Lock, Eye } from 'lucide-react';

interface SkillCardProps {
  skill: Skill;
  currentLevel: number;
  skillPoints: number;
  playerLevel: number;
  onUpgrade: (skill: Skill) => void;
  isClassSkill: boolean;
}

export const SkillCard: React.FC<SkillCardProps> = ({ 
  skill, currentLevel, skillPoints, playerLevel, onUpgrade, isClassSkill 
}) => {
  const isMax = currentLevel >= skill.maxLevel;
  const isLevelLocked = playerLevel < skill.reqLevel;
  const canUpgrade = !isMax && !isLevelLocked && skillPoints >= skill.cost;
  const progress = (currentLevel / skill.maxLevel) * 100;

  return (
    <div className={`p-6 rounded-3xl border transition-all duration-500 flex flex-col gap-5 relative overflow-hidden group ${
      isLevelLocked ? 'bg-slate-900/40 border-slate-800 opacity-60 grayscale' :
      isMax ? 'bg-blue-600/5 border-blue-500/20 shadow-[0_0_20px_rgba(37,99,235,0.05)]' : 
      isClassSkill ? 'bg-amber-900/10 border-amber-900/30 shadow-inner' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
    }`}>
      {/* Khóa Cấp Độ Overlay */}
      {isLevelLocked && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/40 backdrop-blur-[2px]">
              <div className="p-3 bg-slate-800 rounded-full border border-slate-700 mb-2 shadow-xl">
                <Lock size={20} className="text-slate-500" />
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-900 px-3 py-1 rounded-full border border-slate-800">Yêu cầu Cấp {skill.reqLevel}</span>
          </div>
      )}

      {/* Cấp độ Badge */}
      <div className="absolute top-5 right-5 text-[11px] font-mono font-black text-slate-500 bg-slate-950/50 px-3 py-1 rounded-full border border-slate-800 backdrop-blur-md z-10">
        {currentLevel} / {skill.maxLevel}
      </div>

      <div className="flex items-center gap-5 relative z-10">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-300 ${
          isMax ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] border-blue-400' : 
          isClassSkill ? 'bg-amber-500/20 text-amber-500 border-amber-500/30' : 'bg-slate-800 text-slate-400 border-slate-700 group-hover:text-slate-200'
        }`}>
            {isClassSkill ? <Star size={28} /> : <Zap size={28} />}
        </div>
        <div className="flex-1 min-w-0 pr-12">
            <h4 className={`text-base font-black uppercase tracking-tight truncate ${isClassSkill ? 'text-amber-500' : 'text-slate-100'}`}>
                {skill.name}
            </h4>
            <div className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mt-1">
                +{currentLevel * skill.effectValue}% <span className="opacity-60">Hiệu Lực</span>
            </div>
        </div>
      </div>

      <p className="text-[11px] text-slate-500 leading-relaxed italic h-12 line-clamp-3 opacity-80 group-hover:opacity-100 transition-opacity relative z-10">
        {skill.description}
      </p>

      {/* Progress Bar Container */}
      <div className="space-y-1.5 mt-2 relative z-10">
          <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800/50 shadow-inner p-0.5">
            <div 
                className={`h-full rounded-full transition-all duration-700 ease-out ${isMax ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : isClassSkill ? 'bg-amber-500' : 'bg-blue-400'}`} 
                style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-slate-600">
              <span>Độ thuần thục</span>
              <span>{Math.floor(progress)}%</span>
          </div>
      </div>
      
      <div className="flex items-center justify-between gap-5 mt-4 relative z-10">
        <div className="flex flex-col">
          <span className="text-[9px] text-slate-600 uppercase font-black tracking-[0.2em] mb-0.5">Tiêu tốn</span>
          <div className={`text-sm font-black transition-colors ${canUpgrade ? 'text-slate-200' : 'text-slate-700'}`}>
            {skill.cost} <span className="text-[10px] text-slate-600">SP</span>
          </div>
        </div>
        
        <button 
          disabled={!canUpgrade}
          onClick={() => onUpgrade(skill)}
          className={`flex-1 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2 border-none ${
            isMax 
              ? 'bg-slate-800 text-slate-600 cursor-default' 
              : (canUpgrade 
                  ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-xl shadow-blue-900/40 active:scale-95' 
                  : 'bg-slate-900 text-slate-700 cursor-not-allowed')
          }`}
        >
          {isMax ? 'ĐÃ ĐẠT TỐI ĐA' : (
            <>LĨNH HỘI <ChevronRight size={16} /></>
          )}
        </button>
      </div>
    </div>
  );
};
