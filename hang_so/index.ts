
export * from './do_hiem';
export * from './vung_dat';
export * from './quai_vat';
export * from './ban_ve';
export * from './nang_cap';
export * from './bi_ky';
export * from './nguyen_lieu/phan_cap';
export * from './he_phai';
export * from './bo_trang_bi';

import { EquipmentTalent, GemType, GemTier, EnchantmentType } from '../kieu_du_lieu';
import { THONG_TIN_HE_PHAI } from './he_phai';
import { BO_TRANG_BI } from './bo_trang_bi';

export const THIEN_PHU_TRANG_BI: EquipmentTalent[] = [
  { name: 'Sát Thần', desc: 'Gây thêm 100% sát thương lên các mục tiêu Boss.' },
  { name: 'Hào Quang Hồi Phục', desc: 'Hồi phục 10% sinh lực tối đa mỗi giây.' },
  { name: 'Lời Nguyền Hư Không', desc: 'Mọi đòn đánh giảm 50% phòng thủ của đối phương.' }
];

export const CHISO_NGOC: Record<GemType, Record<GemTier, number>> = {
  [GemType.Ruby]: { [GemTier.T1]: 500, [GemTier.T2]: 8000, [GemTier.T3]: 120000 },
  [GemType.Sapphire]: { [GemTier.T1]: 400, [GemTier.T2]: 6500, [GemTier.T3]: 95000 },
  [GemType.Topaz]: { [GemTier.T1]: 5000, [GemTier.T2]: 75000, [GemTier.T3]: 1000000 },
};

export const PHU_PHEP_STATS: Record<string, { name: string; desc: string }> = {
  [EnchantmentType.Sharpness]: { name: 'Sắc Bén', desc: '+50% Tổng Sát thương' },
  [EnchantmentType.Protection]: { name: 'Bảo Vệ', desc: '+50% Tổng Phòng thủ' },
  [EnchantmentType.Vitality]: { name: 'Sinh Lực', desc: '+50% HP Tối Đa' },
  [EnchantmentType.Luck]: { name: 'Vận May', desc: '+25% Tỷ Lệ Rơi Đồ' }
};

export const SETS = BO_TRANG_BI;
export const CLASS_INFO = THONG_TIN_HE_PHAI;
