
import { Skill, SkillBranch, CharacterClass } from '../../types';

export const WEAPON_SKILLS: Skill[] = [
  { 
    id: 'wp_atk', 
    name: 'Sắc Bén Cực Hạn', 
    branch: SkillBranch.WeaponSmith, 
    description: 'Tăng 20% sát thương vật lý cơ bản cho mỗi cấp.', 
    maxLevel: 20, 
    cost: 3, 
    effectValue: 20, 
    reqLevel: 5 
  },
  { 
    id: 'wp_crit', 
    name: 'Khai Nhãn Chí Mạng', 
    branch: SkillBranch.WeaponSmith, 
    description: 'Tăng 5% Tỷ lệ chí mạng và 15% Sát thương chí mạng.', 
    maxLevel: 10, 
    cost: 5, 
    effectValue: 5, 
    reqLevel: 20 
  },
  { 
    id: 'wp_mastery', 
    name: 'Bậc Thầy Binh Khí', 
    branch: SkillBranch.WeaponSmith, 
    description: 'Tăng 50% chỉ số cộng thêm từ trang bị Vũ khí.', 
    maxLevel: 15, 
    cost: 12, 
    effectValue: 50, 
    reqLevel: 50, 
    reqClass: CharacterClass.ShadowBlade 
  }
];
