
import { 
  Rarity, 
  Zone, 
  Enemy, 
  ElementType, 
  MaterialType, 
  Blueprint, 
  EquipmentType, 
  SetId, 
  EternalUpgrade, 
  EternalUpgradeId,
  Skill,
  SkillBranch,
  GemType,
  GemTier,
  EnchantmentType,
  CharacterClass,
  EquipmentTalent,
  MaterialTier,
  MutationType,
  MonsterAbility
} from './types';

export const MATERIAL_TIERS: Record<MaterialType, MaterialTier> = {
  [MaterialType.IronScraps]: MaterialTier.Basic,
  [MaterialType.Wood]: MaterialTier.Basic,
  [MaterialType.Leather]: MaterialTier.Basic,
  [MaterialType.Ore]: MaterialTier.Basic,
  [MaterialType.StoneSharpener]: MaterialTier.Basic,
  [MaterialType.Ice]: MaterialTier.Basic,
  [MaterialType.TemperedSteel]: MaterialTier.Elite,
  [MaterialType.DragonHide]: MaterialTier.Elite,
  [MaterialType.ElementalCrystal]: MaterialTier.Elite,
  [MaterialType.Essence]: MaterialTier.Elite,
  [MaterialType.SoulDust]: MaterialTier.Elite,
  [MaterialType.Gem]: MaterialTier.Elite,
  [MaterialType.StarDust]: MaterialTier.Eternal,
  [MaterialType.VoidCore]: MaterialTier.Eternal,
  [MaterialType.TimeFragment]: MaterialTier.Eternal,
  [MaterialType.CondensedTimesand]: MaterialTier.Eternal,
  [MaterialType.MemoryShard]: MaterialTier.Eternal,
  [MaterialType.FissionCrystal]: MaterialTier.Eternal,
  [MaterialType.MemoryGem]: MaterialTier.Eternal,
};

export const ZONES: Zone[] = [
  { id: 'z1', name: 'Rừng Khởi Nguyên', description: 'Nơi tập luyện cho tân thủ thợ rèn.', recommendedLevel: 1, materials: [MaterialType.IronScraps, MaterialType.Wood, MaterialType.Leather] },
  { id: 'z2', name: 'Hang Động Quặng Thô', description: 'Vách đá chứa đầy tài nguyên cơ bản.', recommendedLevel: 10, materials: [MaterialType.Ore, MaterialType.StoneSharpener] },
  { id: 'z3', name: 'Núi Tuyết Vĩnh Cửu', description: 'Khí hậu khắc nghiệt, quái vật bắt đầu mạnh lên.', recommendedLevel: 25, materials: [MaterialType.Ice, MaterialType.Essence, MaterialType.DragonHide] },
  { id: 'z4', name: 'Thành Cổ Hoang Tàn', description: 'Tàn tích của đế chế thợ rèn xưa.', recommendedLevel: 45, materials: [MaterialType.SoulDust, MaterialType.StoneSharpener, MaterialType.TemperedSteel] },
  { id: 'z5', name: 'Cung Điện Ẩn Giấu', description: 'Khu vực bí mật chỉ dành cho kẻ đã tái sinh.', recommendedLevel: 60, materials: [MaterialType.Gem, MaterialType.MemoryShard, MaterialType.ElementalCrystal] },
  { id: 'z6', name: 'Vùng Đất Song Song', description: 'Mọi quy luật vật lý bị đảo lộn (Thế giới gương).', recommendedLevel: 80, materials: [MaterialType.CondensedTimesand, MaterialType.FissionCrystal, MaterialType.VoidCore] },
  { id: 'z7', name: 'Vực Thẳm Vô Định', description: 'Nơi trú ngụ của những thực thể không thể gọi tên.', recommendedLevel: 100, materials: [MaterialType.MemoryShard, MaterialType.CondensedTimesand, MaterialType.StarDust] }
];

export const ENEMIES_DB: Record<string, Enemy[]> = {
  z1: [
    { id: 'e1_1', name: 'Slime Xanh', level: 1, hp: 60, maxHp: 60, attack: 12, defense: 2, element: ElementType.Physical, expReward: 20, goldReward: 10, dropTable: [{ materialType: MaterialType.IronScraps, chance: 0.8, minQty: 1, maxQty: 2 }] },
    { id: 'e1_2', name: 'Nấm Độc', level: 3, hp: 100, maxHp: 100, attack: 18, defense: 4, element: ElementType.Acid, expReward: 35, goldReward: 15, dropTable: [{ materialType: MaterialType.Leather, chance: 0.5, minQty: 1, maxQty: 1 }] },
  ],
  z2: [
    { id: 'e2_1', name: 'Dơi Hang Động', level: 12, hp: 450, maxHp: 450, attack: 45, defense: 10, element: ElementType.Physical, expReward: 120, goldReward: 50, dropTable: [{ materialType: MaterialType.Ore, chance: 0.7, minQty: 1, maxQty: 3 }] },
  ],
  z3: [
    { id: 'e3_1', name: 'Sói Tuyết', level: 28, hp: 1200, maxHp: 1200, attack: 180, defense: 50, element: ElementType.Ice, expReward: 450, goldReward: 180, dropTable: [{ materialType: MaterialType.Ice, chance: 0.6, minQty: 2, maxQty: 4 }] },
  ],
  z4: [
    { id: 'e4_1', name: 'Cốt Binh Tàn Tích', level: 48, hp: 4500, maxHp: 4500, attack: 650, defense: 200, element: ElementType.Physical, expReward: 1200, goldReward: 550, dropTable: [{ materialType: MaterialType.TemperedSteel, chance: 0.5, minQty: 1, maxQty: 2 }] },
  ],
  z5: [
    { id: 'e5_1', name: 'Vệ Binh Hoàng Kim', level: 65, hp: 15000, maxHp: 15000, attack: 2200, defense: 800, element: ElementType.Fire, isBoss: true, expReward: 5500, goldReward: 2500, dropTable: [{ materialType: MaterialType.Gem, chance: 0.4, minQty: 1, maxQty: 1 }] },
  ],
  z6: [
    { id: 'e6_1', name: 'Bản Sao Hư Vô', level: 85, hp: 55000, maxHp: 55000, attack: 5500, defense: 2500, element: ElementType.Lightning, mutation: MutationType.Void, expReward: 18000, goldReward: 8500, dropTable: [{ materialType: MaterialType.FissionCrystal, chance: 0.3, minQty: 1, maxQty: 2 }] },
  ],
  z7: [
    { id: 'e7_1', name: 'Boss Rebirth: Kẻ Giữ Cửa', level: 110, hp: 850000, maxHp: 850000, attack: 12000, defense: 8000, element: ElementType.Physical, isBoss: true, abilities: [MonsterAbility.Reflect, MonsterAbility.ArmorBreak], expReward: 150000, goldReward: 50000, dropTable: [{ materialType: MaterialType.StarDust, chance: 1, minQty: 2, maxQty: 5 }] }
  ]
};

export const INITIAL_BLUEPRINTS: Blueprint[] = [
  { id: 'bp1', name: 'Đoản Kiếm Rèn Vội', resultType: EquipmentType.Weapon, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.IronScraps, amount: 5 }], baseStats: { minAtk: 12, maxAtk: 20, minDef: 0, maxDef: 0 }, unlocked: true },
  { id: 'bp2', name: 'Áo Vải Bền Chắc', resultType: EquipmentType.Armor, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.Leather, amount: 8 }], baseStats: { minAtk: 0, maxAtk: 0, minDef: 15, maxDef: 25 }, unlocked: true },
  { id: 'bp_legacy', name: 'Kiếm Thánh Kế Thừa', resultType: EquipmentType.Weapon, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.MemoryGem, amount: 1 }, { type: MaterialType.StarDust, amount: 5 }], baseStats: { minAtk: 1200, maxAtk: 2500, minDef: 0, maxDef: 0 }, unlocked: true }
];

export const SKILLS: Skill[] = [
  // --- HỘ VỆ THỦ LĨNH (HEAVY SENTINEL) ---
  { id: 'hs_armor', name: 'Bản Lĩnh Thép', branch: SkillBranch.ArmorSmith, description: 'Tăng 5% thủ cơ bản mỗi cấp.', maxLevel: 10, cost: 2, effectValue: 5, reqClass: CharacterClass.HeavySentinel },
  { id: 'hs_reflect', name: 'Khiên Phản Kích', branch: SkillBranch.ArmorSmith, description: 'Phản lại 10% sát thương nhận vào.', maxLevel: 5, cost: 3, effectValue: 10, reqClass: CharacterClass.HeavySentinel },
  { id: 'hs_wall', name: 'Bức Tường Bất Tận', branch: SkillBranch.ArmorSmith, description: 'Tăng vĩnh viễn 2% Máu tối đa mỗi cấp.', maxLevel: 10, cost: 2, effectValue: 2, reqClass: CharacterClass.HeavySentinel },
  { id: 'hs_regen', name: 'Hơi Thở Sinh Mệnh', branch: SkillBranch.ArmorSmith, description: 'Hồi 1% Máu tối đa sau mỗi đòn đánh.', maxLevel: 5, cost: 4, effectValue: 1, reqClass: CharacterClass.HeavySentinel },
  { id: 'hs_taunt', name: 'Uy Nghiêm Thủ Lĩnh', branch: SkillBranch.ArmorSmith, description: 'Giảm 2% sát thương quái vật gây ra.', maxLevel: 10, cost: 2, effectValue: 2, reqClass: CharacterClass.HeavySentinel },
  { id: 'hs_fortify', name: 'Kiên Cố Hóa', branch: SkillBranch.ArmorSmith, description: 'Tăng thêm 20% Thủ khi Máu dưới 30%.', maxLevel: 5, cost: 5, effectValue: 20, reqClass: CharacterClass.HeavySentinel },

  // --- BÓNG MA HẮC ÁM (SHADOW BLADE) ---
  { id: 'sb_crit', name: 'Nhát Chém Hư Vô', branch: SkillBranch.WeaponSmith, description: 'Tăng 3% sát thương chí mạng mỗi cấp.', maxLevel: 10, cost: 2, effectValue: 3, reqClass: CharacterClass.ShadowBlade },
  { id: 'sb_dodge', name: 'Bộ Pháp Ảnh Diệt', branch: SkillBranch.WeaponSmith, description: 'Tăng 2% tỷ lệ né tránh hoàn toàn.', maxLevel: 10, cost: 2, effectValue: 2, reqClass: CharacterClass.ShadowBlade },
  { id: 'sb_execute', name: 'Nhát Chém Khai Tử', branch: SkillBranch.WeaponSmith, description: 'Gây thêm 10% sát thương lên mục tiêu < 30% HP.', maxLevel: 5, cost: 4, effectValue: 10, reqClass: CharacterClass.ShadowBlade },
  { id: 'sb_pen', name: 'Mũi Kiếm Xuyên Thấu', branch: SkillBranch.WeaponSmith, description: 'Bỏ qua 3% Phòng thủ của kẻ địch.', maxLevel: 10, cost: 2, effectValue: 3, reqClass: CharacterClass.ShadowBlade },
  { id: 'sb_bleed', name: 'Huyết Sát Luân Hồi', branch: SkillBranch.WeaponSmith, description: 'Gây thêm 2% sát thương chuẩn mỗi giây.', maxLevel: 5, cost: 5, effectValue: 2, reqClass: CharacterClass.ShadowBlade },
  { id: 'sb_luck', name: 'Phước Lành Bóng Tối', branch: SkillBranch.WeaponSmith, description: 'Tăng 5% tỷ lệ rơi đồ Rare+.', maxLevel: 10, cost: 2, effectValue: 5, reqClass: CharacterClass.ShadowBlade },

  // --- GIẢ KIM PHÁP SƯ (ALCHEMIST MAGE) ---
  { id: 'am_essence', name: 'Dòng Chảy Tinh Hoa', branch: SkillBranch.Enchanting, description: 'Ngọc khảm tăng thêm 10% hiệu quả.', maxLevel: 10, cost: 2, effectValue: 10, reqClass: CharacterClass.AlchemistMage },
  { id: 'am_myth', name: 'Tri Thức Cấm Kỵ', branch: SkillBranch.Alchemy, description: 'Tăng 0.5% tỉ lệ rèn đồ Vũ Trụ.', maxLevel: 5, cost: 4, effectValue: 0.5, reqClass: CharacterClass.AlchemistMage },
  { id: 'am_transmute', name: 'Chuyển Hóa Vật Chất', branch: SkillBranch.Alchemy, description: 'Nhận thêm 5% vàng khi đánh quái.', maxLevel: 10, cost: 2, effectValue: 5, reqClass: CharacterClass.AlchemistMage },
  { id: 'am_recycle', name: 'Tuần Hoàn Nguyên Liệu', branch: SkillBranch.Alchemy, description: '3% tỷ lệ không mất nguyên liệu khi rèn.', maxLevel: 10, cost: 3, effectValue: 3, reqClass: CharacterClass.AlchemistMage },
  { id: 'am_catalyst', name: 'Xúc Tác Ma Pháp', branch: SkillBranch.Enchanting, description: 'Tăng 10% chỉ số cộng thêm từ Phù Phép.', maxLevel: 10, cost: 2, effectValue: 10, reqClass: CharacterClass.AlchemistMage },
  { id: 'am_wisdom', name: 'Trí Tuệ Cổ Đại', branch: SkillBranch.Alchemy, description: 'Nhận thêm 10% Kinh nghiệm mỗi trận đánh.', maxLevel: 10, cost: 2, effectValue: 10, reqClass: CharacterClass.AlchemistMage }
];

export const ETERNAL_UPGRADES: EternalUpgrade[] = [
  { id: EternalUpgradeId.LatentPower, name: 'Sức Mạnh Tiềm Ẩn', description: 'Tăng 10% chỉ số tổng hợp mỗi cấp.', baseCost: 100, costMultiplier: 2, maxLevel: 50, effectValue: 10 },
  { id: EternalUpgradeId.ResourceRetention, name: 'Bảo Toàn Tinh Hoa', description: 'Giữ lại 10% nguyên liệu Elite khi Rebirth.', baseCost: 200, costMultiplier: 2.5, maxLevel: 10, effectValue: 10 },
  { id: EternalUpgradeId.BlueprintMastery, name: 'Bậc Thầy Bản Vẽ', description: 'Tăng 10% hiệu quả nâng cấp bản vẽ.', baseCost: 500, costMultiplier: 3, maxLevel: 5, effectValue: 10 },
  { id: EternalUpgradeId.EternalBlood, name: 'Huyết Mạch Vĩnh Hằng', description: 'Tăng vĩnh viễn 500 Máu mỗi cấp Rebirth.', baseCost: 1000, costMultiplier: 2, maxLevel: 20, effectValue: 500 },
  { id: EternalUpgradeId.DeepSight, name: 'Thấu Thị Hư Không', description: 'Tăng 5% tỉ lệ rơi đồ ở các Zone 5, 6, 7.', baseCost: 1500, costMultiplier: 2.5, maxLevel: 10, effectValue: 5 }
];

export const RARITY_MULTIPLIER: Record<Rarity, number> = {
  [Rarity.Common]: 1,
  [Rarity.Rare]: 1.5,
  [Rarity.Epic]: 2.5,
  [Rarity.Legendary]: 5,
  [Rarity.Mythic]: 10,
  [Rarity.Cosmic]: 25
};

export const RARITY_COLOR: Record<Rarity, string> = {
  [Rarity.Common]: 'text-slate-400',
  [Rarity.Rare]: 'text-blue-400',
  [Rarity.Epic]: 'text-purple-400',
  [Rarity.Legendary]: 'text-yellow-400',
  [Rarity.Mythic]: 'text-red-500',
  [Rarity.Cosmic]: 'text-cyan-400'
};

export const CLASS_INFO: Record<string, { name: string; desc: string; bonuses: string }> = {
  [CharacterClass.None]: { name: 'Vô Danh', desc: 'Chưa thức tỉnh.', bonuses: '' },
  [CharacterClass.HeavySentinel]: { name: 'Hộ Vệ Thủ Lĩnh', desc: 'Bậc thầy phòng ngự.', bonuses: '+10% Thủ, +20% HP' },
  [CharacterClass.ShadowBlade]: { name: 'Bóng Ma Hắc Ám', desc: 'Sát thủ hư không.', bonuses: '+15% Công, +10% Crit' },
  [CharacterClass.AlchemistMage]: { name: 'Giả Kim Pháp Sư', desc: 'Kẻ điều khiển vật chất.', bonuses: '+20% Hiệu quả chế tác' }
};

export const EQUIPMENT_TALENTS: EquipmentTalent[] = [
  { name: 'Sức Mạnh Thần Thánh', desc: 'Gây thêm 20% sát thương lên Boss.' },
  { name: 'Hào Quang Hồi Phục', desc: 'Hồi 1% máu mỗi đòn đánh.' },
  { name: 'Giáp Gai', desc: 'Phản lại 15% sát thương.' },
  { name: 'Khát Máu', desc: 'Hút 5% máu từ sát thương.' }
];

export const SETS: Record<SetId, { name: string; description: string }> = {
  [SetId.PrimalHunter]: { name: 'Thợ Săn Nguyên Thủy', description: 'Tăng sức mạnh sinh tồn.' },
  [SetId.InfinityChrono]: { name: 'Vòng Lặp Vĩnh Hằng', description: 'Thống trị thời gian.' }
};

export const GEM_STATS: Record<GemType, Record<GemTier, number>> = {
  [GemType.Ruby]: { [GemTier.T1]: 10, [GemTier.T2]: 25, [GemTier.T3]: 60 },
  [GemType.Sapphire]: { [GemTier.T1]: 5, [GemTier.T2]: 15, [GemTier.T3]: 40 },
  [GemType.Topaz]: { [GemTier.T1]: 50, [GemTier.T2]: 150, [GemTier.T3]: 400 },
};

export const ENCHANT_STATS: Record<EnchantmentType, { name: string; desc: string }> = {
  [EnchantmentType.None]: { name: 'Không', desc: 'Không có hiệu ứng' },
  [EnchantmentType.Sharpness]: { name: 'Sắc Bén', desc: '+15% Công' },
  [EnchantmentType.Protection]: { name: 'Bảo Vệ', desc: '+15% Thủ' }
};
