
import React from 'react';
import { Player, Skill, SkillBranch } from '../kieu_du_lieu';
import { BI_KY_DB } from '../hang_so/bi_ky';
import { Zap, Shield, Beaker, Sparkles, Star, BookOpen } from 'lucide-react';
import { TheBiKy } from './bi_ky/TheBiKy';

interface Props {
  player: Player;
  onUpgrade: (skill: Skill) => void;
}

export const GiaoDienCayBiKy: React.FC<Props> = ({ player, onUpgrade }) => {
  const cacNhanh = [
    { id: SkillBranch.WeaponSmith, icon: Zap, color: 'text-red-400', label: 'Cường Hóa Vũ Khí' },
    { id: SkillBranch.ArmorSmith, icon: Shield, color: 'text-blue-400', label: 'Gia Cố Giáp Trụ' },
    { id: SkillBranch.Alchemy, icon: Beaker, color: 'text-green-400', label: 'Giả Kim Thất Truyền' },
    { id: SkillBranch.Enchanting, icon: Sparkles, color: 'text-purple-400', label: 'Ma Pháp Phù Phép' }
  ];

  return (
    <div className="h-full flex flex-col bg-slate-950 overflow-hidden">
      <div className="px-8 py-6 bg-slate-900/90 border-b border-slate-800 shrink-0 z-10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center border border-white/10 shadow-lg">
                    <BookOpen size={32} className="text-white" />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-slate-100 uppercase tracking-tighter italic">Bí Pháp Thợ Rèn</h2>
                    <div className="text-[10px] font-bold text-slate-500 uppercase mt-2">
                       Hệ phái: <span className="text-cyan-400 font-black">{player.characterClass}</span>
                    </div>
                </div>
            </div>
            
            <div className="bg-slate-950 px-8 py-4 rounded-3xl border border-slate-800 flex flex-col items-center min-w-[200px] shadow-inner">
                <span className="text-[10px] text-slate-500 font-black uppercase mb-1">Điểm Bí Kỹ (SP)</span>
                <div className="text-3xl font-black text-indigo-400 tabular-nums">
                    {player.skillPoints}
                </div>
            </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-thin">
        <div className="max-w-7xl mx-auto space-y-12 pb-24">
            {cacNhanh.map(branch => {
                const branchSkills = BI_KY_DB.filter(s => 
                    s.branch === branch.id && 
                    (!s.reqClass || s.reqClass === player.characterClass)
                );
                if (branchSkills.length === 0) return null;

                return (
                    <div key={branch.id} className="space-y-6">
                        <div className="flex items-center gap-4 border-l-4 border-indigo-500 pl-4 bg-indigo-500/5 py-2 rounded-r-xl">
                            <branch.icon size={20} className={branch.color} />
                            <h3 className="font-black text-slate-200 uppercase tracking-widest text-lg italic">{branch.label}</h3>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {branchSkills.map(skill => (
                                <TheBiKy 
                                  key={skill.id}
                                  skill={skill}
                                  currentLevel={player.skills[skill.id] || 0}
                                  skillPoints={player.skillPoints}
                                  playerLevel={player.level}
                                  onUpgrade={onUpgrade}
                                />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
      </div>
    </div>
  );
};
