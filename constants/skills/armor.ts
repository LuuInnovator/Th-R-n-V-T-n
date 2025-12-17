
import { Skill, SkillBranch, CharacterClass } from '../../types';

export const ARMOR_SKILLS: Skill[] = [
  { 
    id: 'ar_def', 
    name: 'Gia Cố Kim Cương', 
    branch: SkillBranch.ArmorSmith, 
    description: 'Tăng 25% tổng phòng thủ vật lý.', 
    maxLevel: 20, 
    cost: 3, 
    effectValue: 25, 
    reqLevel: 5 
  },
  { 
    id: 'ar_hp', 
    name: 'Huyết Mạch Kiên Cường', 
    branch: SkillBranch.ArmorSmith, 
    description: 'Tăng 30% HP tối đa của nhân vật.', 
    maxLevel: 20, 
    cost: 4, 
    effectValue: 30, 
    reqLevel: 15 
  },
  { 
    id: 'ar_mastery', 
    name: 'Hộ Vệ Bất Diệt', 
    branch: SkillBranch.ArmorSmith, 
    description: 'Giảm 15% sát thương nhận vào từ quái vật Boss.', 
    maxLevel: 10, 
    cost: 15, 
    effectValue: 15, 
    reqLevel: 60, 
    reqClass: CharacterClass.HeavySentinel 
  }
];
