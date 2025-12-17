
import { Skill, SkillBranch, CharacterClass } from '../../types';

export const ALCHEMY_SKILLS: Skill[] = [
  { 
    id: 'al_gold', 
    name: 'Bàn Tay Midas', 
    branch: SkillBranch.Alchemy, 
    description: 'Tăng 40% lượng vàng nhận được khi đánh quái.', 
    maxLevel: 20, 
    cost: 3, 
    effectValue: 40, 
    reqLevel: 5 
  },
  { 
    id: 'al_luck', 
    name: 'Vận May Thợ Rèn', 
    branch: SkillBranch.Alchemy, 
    description: 'Tăng 10% tỷ lệ rơi vật phẩm hiếm.', 
    maxLevel: 15, 
    cost: 6, 
    effectValue: 10, 
    reqLevel: 25 
  },
  { 
    id: 'al_mastery', 
    name: 'Đại Pháp Sư Giả Kim', 
    branch: SkillBranch.Alchemy, 
    description: 'Mọi vật phẩm tiêu hao (Thuốc) tăng 100% hiệu lực.', 
    maxLevel: 5, 
    cost: 20, 
    effectValue: 100, 
    reqLevel: 70, 
    reqClass: CharacterClass.AlchemistMage 
  }
];
