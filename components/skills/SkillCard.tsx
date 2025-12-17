
import React from 'react';
import { Skill } from '../../types';
import { Zap, Star, Shield, Beaker, Sparkles, ChevronRight } from 'lucide-react';

interface SkillCardProps {
  skill: Skill;
  currentLevel: number;
  skillPoints: number;
  onUpgrade: (skill: Skill) => void;
  isClassSkill: boolean;
}

export const SkillCard: React.FC<SkillCardProps> = ({ 
  skill, currentLevel, skillPoints, onUpgrade, isClassSkill 
}) => {
  const isMax = currentLevel >= skill.maxLevel;
  const canUpgrade = !isMax && skillPoints >= skill.cost;
  const progress = (currentLevel / skill.maxLevel) * 100;

  return (
    <div className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col gap-4 relative overflow-hidden group ${
      isMax ? 'bg-blue-600/5 border-blue-500/20' : 
      isClassSkill ? 'bg-amber-900/10 border-amber-900/30 shadow-inner' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
    }`}>
      {/* Cấp độ Badge */}
      <div className="absolute top-4 right-4 text-[10px] font-mono font-black text-slate-600 bg-slate-950/50 px-2 py-0.5 rounded-full border border-slate-800">
        Lv.{currentLevel} / {skill.maxLevel}
      </div>

      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${
          isMax ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 
          isClassSkill ? 'bg-amber-500/20 text-amber-500 border-amber-500/30' : 'bg-slate-800 text-slate-400 border-slate-700 group-hover:text-slate-200'
        }`}>
            {isClassSkill ? <Star size={24} /> : <Zap size={24} />}
        </div>
        <div className="flex-1 min-w-0 pr-10">
            <h4 className={`text-sm font-black uppercase tracking-tight truncate ${isClassSkill ? 'text-amber-500' : 'text-slate-100'}`}>
                {skill.name}
            </h4>
            <div className="text-[10px] text-blue-400 font-bold">+{currentLevel * skill.effectValue}% hiệu lực</div>
        </div>
      </div>

      <p className="text-xs text-slate-500 leading-relaxed italic h-10 line-clamp-2">
        {skill.description}
      </p>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
        <div 
            className={`h-full transition-all duration-500 ${isMax ? 'bg-blue-500' : isClassSkill ? 'bg-amber-500' : 'bg-blue-400'}`} 
            style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="flex items-center justify-between gap-4 mt-2">
        <div className="flex flex-col">
          <span className="text-[8px] text-slate-600 uppercase font-black tracking-widest">Tiêu tốn</span>
          <div className="text-xs font-black text-slate-300">{skill.cost} SP</div>
        </div>
        
        <button 
          disabled={!canUpgrade}
          onClick={() => onUpgrade(skill)}
          className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
            isMax 
              ? 'bg-slate-800 text-slate-600 cursor-default' 
              : (canUpgrade 
                  ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-xl shadow-blue-900/30 active:scale-95' 
                  : 'bg-slate-900 text-slate-700 cursor-not-allowed')
          }`}
        >
          {isMax ? 'ĐÃ ĐẠT TỐI ĐA' : (
            <>NÂNG CẤP <ChevronRight size={14} /></>
          )}
        </button>
      </div>
    </div>
  );
};
