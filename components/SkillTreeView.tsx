
import React from 'react';
import { Player, Skill, SkillBranch } from '../types';
import { SKILLS } from '../constants';
import { Card } from './Card';
import { Zap, Shield, Beaker, Sparkles, Target, Info, Star } from 'lucide-react';
import { SkillCard } from './skills/SkillCard';

interface SkillTreeViewProps {
  player: Player;
  onUpgrade: (skill: Skill) => void;
}

export const SkillTreeView: React.FC<SkillTreeViewProps> = ({ player, onUpgrade }) => {
  const branches = [
    { id: SkillBranch.WeaponSmith, icon: Zap, color: 'text-red-400', label: 'Cường Hóa Vũ Khí' },
    { id: SkillBranch.ArmorSmith, icon: Shield, color: 'text-blue-400', label: 'Gia Cố Giáp Trụ' },
    { id: SkillBranch.Alchemy, icon: Beaker, color: 'text-green-400', label: 'Giả Kim Thất Truyền' },
    { id: SkillBranch.Enchanting, icon: Sparkles, color: 'text-purple-400', label: 'Ma Pháp Phù Phép' }
  ];

  return (
    <div className="h-full flex flex-col bg-slate-950 overflow-hidden">
      {/* Header gọn gàng */}
      <div className="px-8 py-6 bg-slate-900/90 border-b border-slate-800 shrink-0 z-10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center border border-white/10 shadow-lg shadow-blue-900/20">
                    <Target size={32} className="text-white" />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-slate-100 uppercase tracking-tighter italic leading-none">Bí Pháp Thợ Rèn</h2>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-2 flex items-center gap-2">
                       Hệ phái: <span className="text-amber-500 bg-amber-500/5 px-3 py-1 rounded-full border border-amber-500/20">{player.characterClass}</span>
                    </div>
                </div>
            </div>
            
            <div className="bg-slate-950 px-8 py-4 rounded-3xl border border-slate-800 flex flex-col items-center justify-center min-w-[200px] shadow-inner">
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mb-1">Điểm Tiềm Năng</span>
                <div className="text-3xl font-black text-blue-400 tabular-nums drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                    {player.skillPoints} <span className="text-xs text-slate-600 font-bold ml-1">SP</span>
                </div>
            </div>
        </div>
      </div>

      {/* Grid 2 cột thoáng đãng */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-thin">
        <div className="max-w-7xl mx-auto space-y-12 pb-24">
            {branches.map(branch => {
                const branchSkills = SKILLS.filter(s => 
                    s.branch === branch.id && 
                    (!s.reqClass || s.reqClass === player.characterClass)
                );
                const Icon = branch.icon;

                if (branchSkills.length === 0) return null;

                return (
                    <div key={branch.id} className="space-y-6">
                        <div className="flex items-center gap-4 border-l-4 border-blue-500 pl-4">
                            <Icon size={20} className={branch.color} />
                            <h3 className="font-black text-slate-200 uppercase tracking-widest text-lg italic">{branch.label}</h3>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {branchSkills.map(skill => (
                                <SkillCard 
                                  key={skill.id}
                                  skill={skill}
                                  currentLevel={player.skills[skill.id] || 0}
                                  skillPoints={player.skillPoints}
                                  onUpgrade={onUpgrade}
                                  isClassSkill={!!skill.reqClass}
                                />
                            ))}
                        </div>
                    </div>
                );
            })}

            {/* Empty state hint */}
            <div className="bg-slate-900/20 border border-dashed border-slate-800 p-12 rounded-3xl text-center">
                <Star size={40} className="mx-auto text-slate-800 mb-4" />
                <p className="text-xs text-slate-600 font-black uppercase tracking-[0.3em]">Cấp độ 90 là giới hạn hiện tại của bí pháp</p>
            </div>
        </div>
      </div>
    </div>
  );
};
