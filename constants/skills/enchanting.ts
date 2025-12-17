
import { Skill, SkillBranch } from '../../types';

export const ENCHANTING_SKILLS: Skill[] = [
  { 
    id: 'en_cd', 
    name: 'Tư Duy Ma Pháp', 
    branch: SkillBranch.Enchanting, 
    description: 'Giảm 5% thời gian hồi chiêu của các kỹ năng.', 
    maxLevel: 10, 
    cost: 5, 
    effectValue: 5, 
    reqLevel: 10 
  },
  { 
    id: 'en_element', 
    name: 'Cường Hóa Nguyên Tố', 
    branch: SkillBranch.Enchanting, 
    description: 'Tăng 15% sát thương nguyên tố (Lửa, Băng, Sét).', 
    maxLevel: 15, 
    cost: 6, 
    effectValue: 15, 
    reqLevel: 30 
  }
];
