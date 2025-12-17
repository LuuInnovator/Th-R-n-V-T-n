
import React from 'react';
import { Player, Skill, SkillBranch } from '../types';
import { SKILLS } from '../constants';
import { Button } from './Button';
import { Card } from './Card';
import { Zap, Shield, Beaker, Sparkles, Star, Target } from 'lucide-react';

interface SkillTreeViewProps {
  player: Player;
  onUpgrade: (skill: Skill) => void;
}

export const SkillTreeView: React.FC<SkillTreeViewProps> = ({ player, onUpgrade }) => {
  const branches = [
    { id: SkillBranch.WeaponSmith, icon: Zap, color: 'text-red-400', label: 'Rèn Vũ Khí' },
    { id: SkillBranch.ArmorSmith, icon: Shield, color: 'text-blue-400', label: 'Rèn Giáp Trụ' },
    { id: SkillBranch.Alchemy, icon: Beaker, color: 'text-green-400', label: 'Giả Kim Thuật' },
    { id: SkillBranch.Enchanting, icon: Sparkles, color: 'text-purple-400', label: 'Phù Phép' }
  ];

  return (
    <div className="h-full flex flex-col bg-slate-950 overflow-hidden">
      {/* Fixed Header */}
      <div className="p-4 bg-slate-900 border-b border-slate-800 shrink-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div>
                <h2 className="text-2xl font-black text-slate-100 uppercase tracking-tight flex items-center gap-2">
                   <Target size={24} className="text-blue-500" /> Kỹ Năng Nhân Vật
                </h2>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-0.5">
                   Lớp: <span className="text-amber-500">{player.characterClass}</span>
                </div>
            </div>
            <div className="bg-blue-600/10 px-4 py-2 rounded-xl border border-blue-500/30 shadow-inner flex flex-col items-end">
              <span className="text-slate-500 text-[9px] font-black uppercase tracking-widest">Điểm SP Còn Lại</span>
              <span className="text-2xl font-black text-blue-400 tabular-nums leading-none mt-1">{player.skillPoints}</span>
            </div>
        </div>
      </div>

      {/* Scrollable Branches */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-thin">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
            {branches.map(branch => {
            const branchSkills = SKILLS.filter(s => 
                s.branch === branch.id && 
                (!s.reqClass || s.reqClass === player.characterClass)
            );
            const Icon = branch.icon;

            if (branchSkills.length === 0) return null;

            return (
                <Card key={branch.id} className="relative overflow-hidden border-slate-800 bg-slate-900/40">
                {/* Background Decoration */}
                <div className={`absolute -right-6 -bottom-6 opacity-5 pointer-events-none ${branch.color}`}>
                    <Icon size={160} />
                </div>

                <div className="flex items-center gap-3 mb-6 border-b border-slate-800/50 pb-4">
                    <div className={`p-2.5 rounded-xl bg-slate-900 border border-slate-700 ${branch.color}`}>
                        <Icon size={22} />
                    </div>
                    <div>
                        <h3 className="font-black text-slate-200 uppercase tracking-widest text-sm">{branch.label}</h3>
                        <div className="text-[10px] text-slate-500 font-bold uppercase">{branchSkills.length} Kỹ năng khả dụng</div>
                    </div>
                </div>

                <div className="space-y-3">
                    {branchSkills.map(skill => {
                    const currentLevel = player.skills[skill.id] || 0;
                    const isMax = currentLevel >= skill.maxLevel;
                    const canUpgrade = !isMax && player.skillPoints >= skill.cost;
                    const isClassSkill = !!skill.reqClass;

                    return (
                        <div key={skill.id} className={`group p-3 rounded-xl border transition-all duration-300 ${isClassSkill ? 'bg-amber-900/10 border-amber-900/30 hover:border-amber-500/50' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'}`}>
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex-1 min-w-0 pr-4">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className={`font-black text-sm uppercase truncate ${isClassSkill ? 'text-amber-400' : 'text-slate-200'}`}>{skill.name}</div>
                                    {isClassSkill && <div className="bg-amber-500/20 text-amber-500 p-1 rounded-md"><Star size={10} fill="currentColor" /></div>}
                                </div>
                                <div className="text-[11px] text-slate-400 leading-snug line-clamp-2">{skill.description}</div>
                            </div>
                            <div className="shrink-0 flex flex-col items-end">
                                <div className="text-[10px] font-black font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded-full border border-slate-800">
                                    LV {currentLevel}/{skill.maxLevel}
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex justify-between items-center bg-slate-950/50 p-2 rounded-lg border border-slate-800/50">
                            <div className="text-[10px] font-bold">
                                <span className="text-slate-500 uppercase mr-1">Hiệu quả:</span>
                                <span className="text-blue-400 font-mono">+{currentLevel * skill.effectValue}{skill.id.includes('chance') ? '%' : ''}</span>
                                {currentLevel < skill.maxLevel && (
                                <span className="text-slate-600 font-mono"> → +{(currentLevel + 1) * skill.effectValue}</span>
                                )}
                            </div>
                            <Button 
                                size="xs" 
                                onClick={() => onUpgrade(skill)} 
                                disabled={!canUpgrade}
                                className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${isMax ? 'bg-slate-800 text-slate-600' : (isClassSkill ? 'bg-amber-600 hover:bg-amber-500 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white')}`}
                            >
                                {isMax ? 'TỐI ĐA' : `NÂNG CẤP (${skill.cost} SP)`}
                            </Button>
                        </div>
                        </div>
                    );
                    })}
                </div>
                </Card>
            );
            })}
        </div>
      </div>
    </div>
  );
};
