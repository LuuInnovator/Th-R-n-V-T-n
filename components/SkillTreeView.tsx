
import React from 'react';
import { Player, Skill, SkillBranch } from '../types';
import { SKILLS } from '../constants';
import { Button } from './Button';
import { Card } from './Card';
import { Zap, Shield, Beaker, Sparkles, Star } from 'lucide-react';

interface SkillTreeViewProps {
  player: Player;
  onUpgrade: (skill: Skill) => void;
}

export const SkillTreeView: React.FC<SkillTreeViewProps> = ({ player, onUpgrade }) => {
  const branches = [
    { id: SkillBranch.WeaponSmith, icon: Zap, color: 'text-red-400' },
    { id: SkillBranch.ArmorSmith, icon: Shield, color: 'text-blue-400' },
    { id: SkillBranch.Alchemy, icon: Beaker, color: 'text-green-400' },
    { id: SkillBranch.Enchanting, icon: Sparkles, color: 'text-purple-400' }
  ];

  return (
    <div className="h-full p-4 max-w-7xl mx-auto w-full overflow-y-auto">
      <div className="flex items-center justify-between mb-6 bg-slate-900/80 p-4 rounded-xl border border-slate-700 backdrop-blur-sm sticky top-0 z-10">
        <div>
            <h2 className="text-2xl font-bold text-slate-200">Cây Kỹ Năng</h2>
            <p className="text-xs text-slate-400 mt-1">Lớp nhân vật hiện tại: <span className="text-amber-400 font-bold">{player.characterClass}</span></p>
        </div>
        <div className="bg-blue-900/30 px-4 py-2 rounded-lg border border-blue-500/30">
          <span className="text-slate-400 text-sm uppercase mr-2">Điểm Kỹ Năng (SP):</span>
          <span className="text-2xl font-bold text-blue-300">{player.skillPoints}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {branches.map(branch => {
          // Lọc kỹ năng: Bao gồm kỹ năng chung (không có reqClass) HOẶC kỹ năng đúng Class của người chơi
          const branchSkills = SKILLS.filter(s => 
              s.branch === branch.id && 
              (!s.reqClass || s.reqClass === player.characterClass)
          );
          const Icon = branch.icon;

          if (branchSkills.length === 0) return null;

          return (
            <Card key={branch.id} className="relative overflow-hidden">
               {/* Background Icon */}
               <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
                 <Icon size={120} />
               </div>

               <div className="flex items-center gap-3 mb-4 border-b border-slate-700/50 pb-2">
                 <Icon className={branch.color} size={24} />
                 <h3 className="font-bold text-lg text-slate-200">{branch.id}</h3>
               </div>

               <div className="space-y-4">
                 {branchSkills.map(skill => {
                   const currentLevel = player.skills[skill.id] || 0;
                   const isMax = currentLevel >= skill.maxLevel;
                   const canUpgrade = !isMax && player.skillPoints >= skill.cost;
                   const isClassSkill = !!skill.reqClass;

                   return (
                     <div key={skill.id} className={`bg-slate-900/60 p-3 rounded-lg border ${isClassSkill ? 'border-amber-500/40 shadow-sm shadow-amber-900/20' : 'border-slate-700/50'}`}>
                       <div className="flex justify-between items-start mb-2">
                         <div>
                           <div className="flex items-center gap-2">
                               <div className={`font-bold ${isClassSkill ? 'text-amber-300' : 'text-slate-200'}`}>{skill.name}</div>
                               {isClassSkill && <Star size={12} className="text-amber-400 fill-amber-400" />}
                           </div>
                           <div className="text-xs text-slate-500">{skill.description}</div>
                         </div>
                         <div className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-slate-400 shrink-0">
                           Lv {currentLevel}/{skill.maxLevel}
                         </div>
                       </div>
                       
                       <div className="flex justify-between items-center mt-3">
                         <div className="text-xs text-blue-300">
                           Hiệu ứng: +{currentLevel * skill.effectValue} {skill.id === 'en_overheat' ? '%' : ''}
                           {currentLevel < skill.maxLevel && (
                             <span className="text-slate-500"> (Sau: +{(currentLevel + 1) * skill.effectValue})</span>
                           )}
                         </div>
                         <Button 
                           size="xs" 
                           onClick={() => onUpgrade(skill)} 
                           disabled={!canUpgrade}
                           variant={canUpgrade ? 'primary' : 'ghost'}
                           className={isClassSkill && canUpgrade ? 'bg-amber-600 hover:bg-amber-500 border-amber-500/50' : ''}
                         >
                           {isMax ? 'Tối Đa' : `Nâng cấp (${skill.cost} SP)`}
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
  );
};
