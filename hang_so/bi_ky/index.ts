
import { Skill, SkillBranch, CharacterClass } from '../../kieu_du_lieu';

export const BI_KY_VU_KHI: Skill[] = [
  { id: 'vk_atk', name: 'Sắc Bén Cực Hạn', branch: SkillBranch.WeaponSmith, description: 'Tăng 20% sát thương vật lý cơ bản cho mỗi cấp.', maxLevel: 30, cost: 2, effectValue: 20, reqLevel: 1 },
  { id: 'vk_chi_mang', name: 'Khai Nhãn Chí Mạng', branch: SkillBranch.WeaponSmith, description: 'Tăng 5% Tỷ lệ chí mạng và 15% Sát thương chí mạng.', maxLevel: 15, cost: 5, effectValue: 5, reqLevel: 20 },
  { id: 'vk_pha_giap', name: 'Mũi Nhọn Xuyên Thấu', branch: SkillBranch.WeaponSmith, description: 'Bỏ qua 10% phòng thủ của đối phương.', maxLevel: 20, cost: 8, effectValue: 10, reqLevel: 50 },
  { id: 'vk_chay_mau', name: 'Vết Cắt Sâu', branch: SkillBranch.WeaponSmith, description: 'Gây thêm 15% sát thương kéo dài.', maxLevel: 10, cost: 12, effectValue: 15, reqLevel: 100 },
  { id: 'vk_hut_mau', name: 'Huyết Ma Chú', branch: SkillBranch.WeaponSmith, description: 'Chuyển hóa 5% sát thương gây ra thành sinh lực.', maxLevel: 10, cost: 15, effectValue: 5, reqLevel: 150 },
  { id: 'vk_diet_than', name: 'Trảm Sát Thần Ma', branch: SkillBranch.WeaponSmith, description: 'Tăng 40% sát thương lên Boss.', maxLevel: 5, cost: 30, effectValue: 40, reqLevel: 400 },
  { id: 'vk_toc_do', name: 'Ảnh Ma Bộ', branch: SkillBranch.WeaponSmith, description: 'Tăng tốc độ ra đòn, giảm 10% thời gian hồi chiêu.', maxLevel: 10, cost: 20, effectValue: 10, reqLevel: 250 }
];

export const BI_KY_GIAP: Skill[] = [
  { id: 'gt_def', name: 'Gia Cố Kim Cương', branch: SkillBranch.ArmorSmith, description: 'Tăng 25% tổng phòng thủ vật lý.', maxLevel: 30, cost: 2, effectValue: 25, reqLevel: 1 },
  { id: 'gt_hp', name: 'Huyết Mạch Kiên Cường', branch: SkillBranch.ArmorSmith, description: 'Tăng 30% HP tối đa của nhân vật.', maxLevel: 30, cost: 3, effectValue: 30, reqLevel: 10 },
  { id: 'gt_phan_don', name: 'Giáp Gai Cổ Đại', branch: SkillBranch.ArmorSmith, description: 'Phản lại 15% sát thương nhận vào cho kẻ địch.', maxLevel: 15, cost: 10, effectValue: 15, reqLevel: 80 },
  { id: 'gt_khoi_phuc', name: 'Hơi Thở Sự Sống', branch: SkillBranch.ArmorSmith, description: 'Hồi 2% HP mỗi giây trong trận đấu.', maxLevel: 10, cost: 18, effectValue: 2, reqLevel: 120 },
  { id: 'gt_mien_nhiem', name: 'Thân Thể Bất Diệt', branch: SkillBranch.ArmorSmith, description: 'Giảm 5% mọi sát thương nhận vào từ Boss.', maxLevel: 10, cost: 25, effectValue: 5, reqLevel: 300 },
  { id: 'gt_bao_ve', name: 'Lá Chắn Linh Hồn', branch: SkillBranch.ArmorSmith, description: 'Có 10% tỷ lệ hoàn toàn miễn nhiễm sát thương đòn đánh.', maxLevel: 10, cost: 40, effectValue: 10, reqLevel: 500 }
];

export const BI_KY_GIA_KIM: Skill[] = [
  { id: 'gk_vang', name: 'Bàn Tay Midas', branch: SkillBranch.Alchemy, description: 'Tăng 50% lượng vàng nhận được khi danh quái.', maxLevel: 20, cost: 2, effectValue: 50, reqLevel: 5 },
  { id: 'gk_may_man', name: 'Vận May Thợ Rèn', branch: SkillBranch.Alchemy, description: 'Tăng 8% tỷ lệ rơi vật phẩm hiếm.', maxLevel: 20, cost: 4, effectValue: 8, reqLevel: 30 },
  { id: 'gk_kinh_nghiem', name: 'Huân Chương Trí Tuệ', branch: SkillBranch.Alchemy, description: 'Tăng 20% lượng EXP nhận được.', maxLevel: 20, cost: 5, effectValue: 20, reqLevel: 15 },
  { id: 'gk_nguyen_lieu', name: 'Kẻ Săn Tìm Tài Nguyên', branch: SkillBranch.Alchemy, description: 'Có 20% tỷ lệ nhận gấp đôi nguyên liệu rơi ra.', maxLevel: 15, cost: 12, effectValue: 20, reqLevel: 100 },
  { id: 'gk_tinh_hoa', name: 'Thu Thập Tinh Hoa', branch: SkillBranch.Alchemy, description: 'Nhận thêm 5% EXP từ mọi nguồn.', maxLevel: 20, cost: 10, effectValue: 5, reqLevel: 60 }
];

export const BI_KY_PHU_PHEP: Skill[] = [
  { id: 'pp_success', name: 'Chân Ngôn Phù Thủy', branch: SkillBranch.Enchanting, description: 'Tăng 10% tỷ lệ thành công khi đính ngọc.', maxLevel: 10, cost: 5, effectValue: 10, reqLevel: 40 },
  { id: 'pp_power', name: 'Cộng Hưởng Ma Pháp', branch: SkillBranch.Enchanting, description: 'Tăng 20% hiệu lực của các dòng Phù Phép.', maxLevel: 15, cost: 15, effectValue: 20, reqLevel: 200 },
  { id: 'pp_bao_hiem', name: 'Bảo Hiểm Linh Hồn', branch: SkillBranch.Enchanting, description: 'Giảm 50% vàng tiêu hao khi Phù Phép.', maxLevel: 10, cost: 20, effectValue: 50, reqLevel: 350 }
];

export const BI_KY_DB = [
  ...BI_KY_VU_KHI, 
  ...BI_KY_GIAP, 
  ...BI_KY_GIA_KIM, 
  ...BI_KY_PHU_PHEP
];
