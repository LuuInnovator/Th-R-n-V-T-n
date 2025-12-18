
import React from 'react';
import { Skill } from '../../kieu_du_lieu';
import { Zap, Lock, ChevronRight } from 'lucide-react';

interface Props {
  skill: Skill;
  currentLevel: number;
  skillPoints: number;
  playerLevel: number;
  onUpgrade: (skill: Skill) => void;
}

export const TheBiKy: React.FC<Props> = ({ skill, currentLevel, skillPoints, playerLevel, onUpgrade }) => {
  const daMax = currentLevel >= skill.maxLevel;
  const biKhoaCap = playerLevel < skill.reqLevel;
  const coTheNang = !daMax && !biKhoaCap && skillPoints >= skill.cost;
  const tienDo = (currentLevel / skill.maxLevel) * 100;

  return (
    <div className={`p-6 rounded-3xl border transition-all duration-500 flex flex-col gap-5 relative overflow-hidden group ${biKhoaCap ? 'bg-slate-900/40 border-slate-800 opacity-60' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'}`}>
      {biKhoaCap && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/60 backdrop-blur-[2px]">
              <Lock size={20} className="text-slate-500 mb-2" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-900 px-3 py-1 rounded-full border border-slate-800 text-center">Yêu cầu Cấp {skill.reqLevel}</span>
          </div>
      )}

      <div className="absolute top-5 right-5 text-[11px] font-mono font-black text-slate-500 bg-slate-950/50 px-3 py-1 rounded-full border border-slate-800 z-10">
        {currentLevel} / {skill.maxLevel}
      </div>

      <div className="flex items-center gap-5 relative z-10">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-300 ${daMax ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-900/20' : 'bg-slate-800 text-slate-400 border-slate-700 group-hover:text-slate-200'}`}>
            <Zap size={28} />
        </div>
        <div className="flex-1 min-w-0 pr-12">
            <h4 className="text-base font-black uppercase tracking-tight truncate text-slate-100">{skill.name}</h4>
            <div className="text-[10px] text-blue-400 font-bold uppercase mt-1">
                +{currentLevel * skill.effectValue}% Hiệu Lực
            </div>
        </div>
      </div>

      <p className="text-[11px] text-slate-500 leading-relaxed italic h-12 line-clamp-3 opacity-80 group-hover:opacity-100 transition-opacity">
        {skill.description}
      </p>

      <div className="space-y-1.5 mt-2">
          <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800/50 shadow-inner">
            <div className={`h-full rounded-full transition-all duration-700 ease-out ${daMax ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-blue-400'}`} style={{ width: `${tienDo}%` }}></div>
          </div>
          <div className="flex justify-between items-center text-[9px] font-black uppercase text-slate-600">
              <span>Độ thuần thục</span>
              <span>{Math.floor(tienDo)}%</span>
          </div>
      </div>
      
      <div className="flex items-center justify-between gap-5 mt-4 relative z-10">
        <div className="flex flex-col">
          <span className="text-[9px] text-slate-600 uppercase font-black mb-0.5">Tiêu tốn</span>
          <div className={`text-sm font-black ${coTheNang ? 'text-slate-200' : 'text-slate-700'}`}>
            {skill.cost} <span className="text-[10px] text-slate-600">SP</span>
          </div>
        </div>
        
        <button 
          disabled={!coTheNang}
          onClick={() => onUpgrade(skill)}
          className={`flex-1 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2 border-none ${daMax ? 'bg-slate-800 text-slate-600' : (coTheNang ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-xl shadow-blue-900/40 active:scale-95' : 'bg-slate-900 text-slate-700 cursor-not-allowed')}`}
        >
          {daMax ? 'ĐÃ ĐẠT TỐI ĐA' : <>LĨNH HỘI <ChevronRight size={16} /></>}
        </button>
      </div>
    </div>
  );
};
