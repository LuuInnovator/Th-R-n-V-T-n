
import { Skill, SkillBranch, CharacterClass } from '../../kieu_du_lieu';

export const BI_KY_VU_KHI: Skill[] = [
  { id: 'vk_atk', name: 'Sac Ben Cuc Han', branch: SkillBranch.WeaponSmith, description: 'Tang 20% sat thuong vat ly co ban cho moi cap.', maxLevel: 20, cost: 3, effectValue: 20, reqLevel: 5 },
  { id: 'vk_chi_mang', name: 'Khai Nhan Chi Mang', branch: SkillBranch.WeaponSmith, description: 'Tang 5% Ty le chi mang va 15% Sat thuong chi mang.', maxLevel: 10, cost: 5, effectValue: 5, reqLevel: 20 },
  { id: 'vk_bac_thay', name: 'Bac Thay Binh Khi', branch: SkillBranch.WeaponSmith, description: 'Tang 50% chi so cong them tu trang bi Vu khi.', maxLevel: 15, cost: 12, effectValue: 50, reqLevel: 50, reqClass: CharacterClass.ShadowBlade }
];

export const BI_KY_GIAP: Skill[] = [
  { id: 'gt_def', name: 'Gia Co Kim Cuong', branch: SkillBranch.ArmorSmith, description: 'Tang 25% tong phong thu vat ly.', maxLevel: 20, cost: 3, effectValue: 25, reqLevel: 5 },
  { id: 'gt_hp', name: 'Huyet Mach Kien Cuong', branch: SkillBranch.ArmorSmith, description: 'Tang 30% HP toi da cua nhan vat.', maxLevel: 20, cost: 4, effectValue: 30, reqLevel: 15 }
];

export const BI_KY_GIA_KIM: Skill[] = [
  { id: 'gk_vang', name: 'Ban Tay Midas', branch: SkillBranch.Alchemy, description: 'Tang 40% luong vang nhan duoc khi danh quai.', maxLevel: 20, cost: 3, effectValue: 40, reqLevel: 5 },
  { id: 'gk_may_man', name: 'Van May Tho Ren', branch: SkillBranch.Alchemy, description: 'Tang 10% ty le roi vat pham hiem.', maxLevel: 15, cost: 6, effectValue: 10, reqLevel: 25 }
];

export const BI_KY_DB = [...BI_KY_VU_KHI, ...BI_KY_GIAP, ...BI_KY_GIA_KIM];
