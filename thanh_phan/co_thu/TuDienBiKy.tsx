
import React from 'react';
import { BookOpen, Zap, Shield, Beaker, Sparkles } from 'lucide-react';
import { BI_KY_DB } from '../../hang_so/bi_ky';
import { SkillBranch } from '../../kieu_du_lieu';

export const TuDienBiKy: React.FC = () => {
  const cacNhanh = [
    { id: SkillBranch.WeaponSmith, icon: Zap, color: 'text-red-400', label: 'Cường Hóa Vũ Khí' },
    { id: SkillBranch.ArmorSmith, icon: Shield, color: 'text-blue-400', label: 'Gia Cố Giáp Trụ' },
    { id: SkillBranch.Alchemy, icon: Beaker, color: 'text-green-400', label: 'Giả Kim Thất Truyền' },
    { id: SkillBranch.Enchanting, icon: Sparkles, color: 'text-purple-400', label: 'Ma Pháp Phù Phép' }
  ];

  return (
    <div className="h-full p-6 overflow-y-auto animate-fade-in scrollbar-thin">
      <div className="max-w-5xl mx-auto space-y-12 pb-24">
        {cacNhanh.map(branch => {
          const skills = BI_KY_DB.filter(s => s.branch === branch.id);
          if (skills.length === 0) return null;

          return (
            <div key={branch.id} className="space-y-6">
              <div className="flex items-center gap-3 border-l-4 border-indigo-500 pl-4">
                <branch.icon size={18} className={branch.color} />
                <h3 className="text-lg font-black text-slate-200 uppercase tracking-widest italic">{branch.label}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map(skill => (
                  <div key={skill.id} className="bg-slate-900/40 border border-slate-800 p-5 rounded-2xl hover:bg-slate-800/40 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[9px] font-black text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 uppercase">Cấp {skill.reqLevel}</span>
                      <span className="text-[9px] font-black text-slate-600 uppercase">Max Cấp {skill.maxLevel}</span>
                    </div>
                    <h4 className="font-black text-slate-100 uppercase text-sm mb-2">{skill.name}</h4>
                    <p className="text-[10px] text-slate-500 leading-relaxed italic">
                      {skill.description}
                    </p>
                    <div className="mt-4 pt-4 border-t border-slate-800/50 flex justify-between items-center">
                        <span className="text-[9px] text-slate-600 font-bold uppercase tracking-tighter">Giá lĩnh hội:</span>
                        <span className="text-xs font-black text-indigo-400">{skill.cost} SP</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
