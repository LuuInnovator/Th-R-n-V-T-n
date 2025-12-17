
import React from 'react';
import { SkillBranch } from '../../types';
import { SKILLS } from '../../constants';
import { BookOpen, Zap, Shield, Beaker, Sparkles, Box } from 'lucide-react';

export const SkillWiki: React.FC = () => {
  const branches = [
    { id: SkillBranch.WeaponSmith, icon: Zap, color: 'text-red-400', label: 'Rèn Vũ Khí' },
    { id: SkillBranch.ArmorSmith, icon: Shield, color: 'text-blue-400', label: 'Rèn Giáp Trụ' },
    { id: SkillBranch.Alchemy, icon: Beaker, color: 'text-green-400', label: 'Giả Kim Thuật' },
    { id: SkillBranch.Enchanting, icon: Sparkles, color: 'text-purple-400', label: 'Phù Phép' }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-12 scrollbar-thin bg-slate-950 animate-fade-in">
      <div className="max-w-5xl mx-auto space-y-12 pb-24">
        <div className="mb-6 border-l-4 border-indigo-500 pl-6 py-2">
          <h3 className="text-2xl font-black text-slate-100 uppercase tracking-tighter italic">Cẩm Nang Bí Pháp</h3>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2">Tổng hợp mọi bí kỹ thợ rèn đã thất lạc qua hàng thiên niên kỷ</p>
        </div>
        
        {branches.map(branch => (
          <div key={branch.id} className="space-y-6">
            <h4 className="text-xs font-black text-indigo-400 uppercase tracking-[0.4em] flex items-center gap-3 mb-6 bg-indigo-500/5 py-3 px-5 rounded-2xl w-fit border border-indigo-500/20">
              <branch.icon size={16} className={branch.color} /> {branch.label}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SKILLS.filter(s => s.branch === branch.id).map(skill => (
                <div key={skill.id} className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl flex flex-col gap-4 group hover:border-indigo-500/30 transition-all backdrop-blur-sm">
                  <div className="flex justify-between items-start">
                    <h5 className="font-black text-slate-100 uppercase text-base tracking-tight italic group-hover:text-indigo-400 transition-colors">{skill.name}</h5>
                    <div className="px-3 py-1 bg-slate-950 text-indigo-400 text-[10px] font-black rounded-full border border-indigo-900/50 shadow-inner">MAX LV.{skill.maxLevel}</div>
                  </div>
                  
                  <p className="text-xs text-slate-500 italic leading-relaxed h-10 line-clamp-2">{skill.description}</p>
                  
                  <div className="mt-2 grid grid-cols-2 gap-4 pt-4 border-t border-slate-800/50">
                    <div className="flex flex-col">
                        <span className="text-[9px] text-slate-600 font-black uppercase tracking-widest mb-1">Cần Cấp</span>
                        <span className="text-xs font-bold text-slate-300">Cấp {skill.reqLevel}</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[9px] text-slate-600 font-black uppercase tracking-widest mb-1">Hiệu Lực</span>
                        <span className="text-xs font-black text-indigo-400">+{skill.effectValue}%/cấp</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
