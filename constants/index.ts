
export * from './rarity';
export * from './zones';
export * from './enemies';
export * from './blueprints';
export * from './upgrades';

import { MaterialType, MaterialTier, EquipmentTalent, GemType, GemTier, EnchantmentType, SetId } from '../types';

export const MATERIAL_TIERS: Record<MaterialType, MaterialTier> = {
  [MaterialType.SlimeResin]: MaterialTier.Basic,
  [MaterialType.RealityTear]: MaterialTier.Eternal,
  [MaterialType.EternalSpark]: MaterialTier.Eternal,
  // ... (Sẽ được hệ thống tự hiểu từ MaterialType)
} as any;

export const EQUIPMENT_TALENTS: EquipmentTalent[] = [
  { name: 'Sát Thần', desc: 'Gây thêm 50% sát thương lên Boss.' },
  { name: 'Hào Quang Hồi Phục', desc: 'Hồi 5% máu mỗi giây.' },
  { name: 'Lời Nguyền Hư Không', desc: 'Giảm 30% thủ địch mỗi đòn.' }
];

export const GEM_STATS: Record<GemType, Record<GemTier, number>> = {
  [GemType.Ruby]: { [GemTier.T1]: 100, [GemTier.T2]: 1500, [GemTier.T3]: 25000 },
  [GemType.Sapphire]: { [GemTier.T1]: 80, [GemTier.T2]: 1200, [GemTier.T3]: 20000 },
  [GemType.Topaz]: { [GemTier.T1]: 1000, [GemTier.T2]: 15000, [GemTier.T3]: 250000 },
};

export const ENCHANT_STATS: Record<string, { name: string; desc: string }> = {
  [EnchantmentType.Sharpness]: { name: 'Sắc Bén', desc: '+30% Tổng Sát thương' },
  [EnchantmentType.Protection]: { name: 'Bảo Vệ', desc: '+30% Tổng Phòng thủ' },
  [EnchantmentType.Vitality]: { name: 'Sinh Lực', desc: '+50% HP Tối Đa' },
};

export const SETS: Record<string, { name: string }> = {
  [SetId.VoidSeeker]: { name: 'Kẻ Tầm Đạo Hư Không' },
  [SetId.InfinityChrono]: { name: 'Vòng Lặp Vô Tận' }
};
