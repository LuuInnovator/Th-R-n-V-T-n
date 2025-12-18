
import { EternalUpgrade, EternalUpgradeId } from '../../kieu_du_lieu';

export const NANG_CAP_CHI_SO: EternalUpgrade[] = [
  { id: EternalUpgradeId.LatentPower, name: 'Sức Mạnh Tiềm Ẩn', description: 'Tăng 35% toàn bộ chỉ số nhân vật vĩnh viễn.', baseCost: 150, costMultiplier: 1.45, maxLevel: 999, effectValue: 35 },
  { id: EternalUpgradeId.EternalBlood, name: 'Huyết Mạch Vĩnh Hằng', description: 'Tăng 60% HP tối đa cơ bản.', baseCost: 500, costMultiplier: 1.7, maxLevel: 500, effectValue: 60 },
  { id: 'nc_long_luc_vo_tan', name: 'Long Lực Vô Tận', description: 'Tăng 50% sát thương đòn đánh chí mạng.', baseCost: 1500, costMultiplier: 2.0, maxLevel: 100, effectValue: 50 },
  { id: 'nc_tri_tue_co_dai', name: 'Trí Tuệ Cổ Đại', description: 'Tăng 15% lượng Kinh nghiệm (EXP) nhận được mỗi cấp.', baseCost: 300, costMultiplier: 1.5, maxLevel: 200, effectValue: 15 },
  { id: 'nc_phuoc_lanh_vang', name: 'Phước Lành Của Midas', description: 'Tăng 25% lượng Vàng nhận được khi diệt quái.', baseCost: 200, costMultiplier: 1.35, maxLevel: 300, effectValue: 25 }
];

export const NANG_CAP_DUC_REN: EternalUpgrade[] = [
  { id: EternalUpgradeId.GodlyForging, name: 'Kỹ Thuật Đúc Thần', description: 'Trang bị chế tạo nhận thêm (Số lần tái sinh * 20%) chỉ số.', baseCost: 2000, costMultiplier: 2.3, maxLevel: 100, effectValue: 20 },
  { id: 'nc_khai_thac_than_toc', name: 'Khai Thác Thần Tốc', description: 'Tăng 8% tỷ lệ rơi nguyên liệu từ quái vật.', baseCost: 1000, costMultiplier: 1.9, maxLevel: 50, effectValue: 8 },
  { id: 'nc_than_nhan_tinh_anh', name: 'Thần Nhãn Tinh Anh', description: 'Tăng 5% tỷ lệ xuất hiện trang bị phẩm chất cao khi đúc.', baseCost: 5000, costMultiplier: 2.8, maxLevel: 20, effectValue: 5 },
  { id: 'nc_on_dinh_nhiet', name: 'Ổn Định Nhiệt Lượng', description: 'Giảm 7% tỷ lệ thất bại khi đúc ở chế độ Đốt Nhiệt.', baseCost: 8000, costMultiplier: 3.2, maxLevel: 10, effectValue: 7 }
];

export const NANG_CAP_DB = [...NANG_CAP_CHI_SO, ...NANG_CAP_DUC_REN];
