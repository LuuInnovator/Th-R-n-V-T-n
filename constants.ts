
import { 
  Rarity, Zone, Enemy, ElementType, MaterialType, Blueprint, EquipmentType, 
  EternalUpgrade, EternalUpgradeId, Skill, SkillBranch, CharacterClass, 
  EquipmentTalent, MutationType, MonsterAbility, GemType, GemTier, SetId, MaterialTier
} from './types';

export const ZONES: Zone[] = [
  { id: 'z1', name: 'Rừng Khởi Nguyên', description: 'Khu vực tân thủ, tập trung vào nguyên liệu da, gỗ và nhựa.', recommendedLevel: 1, materials: [MaterialType.SlimeResin, MaterialType.WolfSkin, MaterialType.PoisonSpore, MaterialType.ForestWood, MaterialType.WildHerb] },
  { id: 'z2', name: 'Hang Động Quặng Thô', description: 'Nơi khai thác quặng đồng, sắt và đá cường hóa.', recommendedLevel: 10, materials: [MaterialType.RawCopperOre, MaterialType.IronScale, MaterialType.Flint, MaterialType.GemStone] },
  { id: 'z3', name: 'Núi Tuyết Vĩnh Cửu', description: 'Khu vực khắc nghiệt, quái vật có khả năng làm chậm.', recommendedLevel: 25, materials: [MaterialType.SnowCrystal, MaterialType.WarmFur, MaterialType.YetiFur] },
  { id: 'z4', name: 'Thành Cổ Hoang Tàn', description: 'Nơi rơi các bản thiết kế cổ đại và linh hồn.', recommendedLevel: 45, materials: [MaterialType.OldBone, MaterialType.BlueSoul, MaterialType.BrokenSwordFragment] },
  { id: 'z5', name: 'Cung Điện Ẩn Giấu', description: 'Nơi tập trung trang bị Sử Thi và nguyên liệu hiếm.', recommendedLevel: 65, materials: [MaterialType.MemoryGem, MaterialType.StarDust, MaterialType.GoldOre] },
  { id: 'z6', name: 'Vùng Đất Song Song', description: 'Phiên bản ác mộng của các khu vực trước. Quái vật cực mạnh.', recommendedLevel: 85, minRebirth: 1, materials: [MaterialType.FissionCrystal, MaterialType.VoidCore] },
  { id: 'z7', name: 'Vực Thẳm Vô Định', description: 'Khu vực cuối cùng, chứa đựng bí mật tối thượng.', recommendedLevel: 100, minRebirth: 5, materials: [MaterialType.VoidCore, MaterialType.VoidShard] }
];

export const ENEMIES_DB: Record<string, Enemy[]> = {
  z1: [
    { id: 'e1_1', name: 'Slime Xanh', level: 1, hp: 60, maxHp: 60, attack: 12, defense: 2, element: ElementType.Physical, expReward: 20, goldReward: 10, dropTable: [{ materialType: MaterialType.SlimeResin, chance: 0.7, minQty: 1, maxQty: 2 }] },
    { id: 'e1_2', name: 'Nấm Độc', level: 3, hp: 150, maxHp: 150, attack: 28, defense: 5, element: ElementType.Acid, expReward: 45, goldReward: 25, dropTable: [{ materialType: MaterialType.PoisonSpore, chance: 0.6, minQty: 1, maxQty: 3 }, { materialType: MaterialType.MushroomCap, chance: 0.4, minQty: 1, maxQty: 1 }] },
    { id: 'e1_3', name: 'Sói Xám', level: 7, hp: 450, maxHp: 450, attack: 65, defense: 15, element: ElementType.Physical, expReward: 120, goldReward: 60, dropTable: [{ materialType: MaterialType.WolfSkin, chance: 0.5, minQty: 1, maxQty: 2 }, { materialType: MaterialType.WolfFang, chance: 0.3, minQty: 1, maxQty: 1 }] }
  ],
  z2: [
    { id: 'e2_1', name: 'Bọ Giáp Sắt', level: 18, hp: 2500, maxHp: 2500, attack: 180, defense: 250, element: ElementType.Physical, expReward: 500, goldReward: 250, dropTable: [{ materialType: MaterialType.IronScale, chance: 0.5, minQty: 1, maxQty: 3 }] },
    { id: 'e2_boss', name: 'Golem Đá (Boss)', level: 25, hp: 15000, maxHp: 15000, attack: 450, defense: 500, element: ElementType.Physical, isBoss: true, abilities: [MonsterAbility.Stun], expReward: 5000, goldReward: 2000, dropTable: [{ materialType: MaterialType.GolemCore, chance: 1, minQty: 1, maxQty: 1 }] }
  ],
  z3: [
    { id: 'e3_1', name: 'Yeti Tuyết', level: 35, hp: 12000, maxHp: 12000, attack: 850, defense: 400, element: ElementType.Ice, expReward: 4000, goldReward: 1500, dropTable: [{ materialType: MaterialType.YetiFur, chance: 0.4, minQty: 1, maxQty: 3 }] }
  ],
  z7: [
    { id: 'e7_boss', name: 'Chúa Tể Hư Không (Final Boss)', level: 120, hp: 5000000, maxHp: 5000000, attack: 150000, defense: 80000, element: ElementType.Void, isBoss: true, abilities: [MonsterAbility.ArmorBreak, MonsterAbility.Reflect], expReward: 1000000, goldReward: 500000, dropTable: [{ materialType: MaterialType.VoidCore, chance: 1, minQty: 2, maxQty: 5 }, { materialType: MaterialType.VoidShard, chance: 0.5, minQty: 1, maxQty: 1 }] }
  ]
};

export const INITIAL_BLUEPRINTS: Blueprint[] = [
  // ⚔️ VŨ KHÍ (Yêu cầu NL theo bậc quái)
  { id: 'bp_legacy', name: 'Kiếm Thánh Kế Thừa', resultType: EquipmentType.Weapon, evolutionLevel: 0, 
    requiredMaterials: [
        { type: MaterialType.MemoryGem, amount: 5 }, 
        { type: MaterialType.VoidCore, amount: 20 }, 
        { type: MaterialType.StarDust, amount: 100 },
        { type: MaterialType.BlueSoul, amount: 50 }
    ], 
    baseStats: { minAtk: 1500, maxAtk: 2500, minDef: 0, maxDef: 0 }, unlocked: true 
  },
  { id: 'bp_w_1', name: 'Đoản Kiếm Rèn Vội', resultType: EquipmentType.Weapon, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.SlimeResin, amount: 10 }], baseStats: { minAtk: 15, maxAtk: 25, minDef: 0, maxDef: 0 }, unlocked: true },
  { id: 'bp_w_2', name: 'Cung Gỗ Rừng', resultType: EquipmentType.Weapon, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.ForestWood, amount: 15 }, { type: MaterialType.WolfSkin, amount: 8 }], baseStats: { minAtk: 35, maxAtk: 55, minDef: 0, maxDef: 0 }, unlocked: true },
  { id: 'bp_w_3', name: 'Trượng Nấm Độc', resultType: EquipmentType.Weapon, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.PoisonSpore, amount: 20 }, { type: MaterialType.SlimeResin, amount: 15 }], baseStats: { minAtk: 60, maxAtk: 100, minDef: 0, maxDef: 0 }, unlocked: true },
  { id: 'bp_w_4', name: 'Kiếm Băng Giá', resultType: EquipmentType.Weapon, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.SnowCrystal, amount: 12 }, { type: MaterialType.PureIronOre, amount: 25 }], baseStats: { minAtk: 250, maxAtk: 400, minDef: 0, maxDef: 0 }, unlocked: true },
  { id: 'bp_w_5', name: 'Thương Thành Cổ', resultType: EquipmentType.Weapon, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.BrokenSwordFragment, amount: 10 }, { type: MaterialType.BlueSoul, amount: 30 }], baseStats: { minAtk: 700, maxAtk: 1100, minDef: 0, maxDef: 0 }, unlocked: true },

  // 🛡️ GIÁP (Giáp trụ, Mũ, Giày, Găng)
  { id: 'bp_a_1', name: 'Áo Da Sói', resultType: EquipmentType.Armor, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.WolfSkin, amount: 15 }], baseStats: { minAtk: 0, maxAtk: 0, minDef: 25, maxDef: 45 }, unlocked: true },
  { id: 'bp_a_2', name: 'Mũ Nấm Độc', resultType: EquipmentType.Helmet, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.MushroomCap, amount: 12 }], baseStats: { minAtk: 0, maxAtk: 0, minDef: 15, maxDef: 25 }, unlocked: true },
  { id: 'bp_a_3', name: 'Giáp Vảy Sắt', resultType: EquipmentType.Armor, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.IronScale, amount: 30 }], baseStats: { minAtk: 0, maxAtk: 0, minDef: 120, maxDef: 200 }, unlocked: true },
  { id: 'bp_a_4', name: 'Mũ Hoàng Kim', resultType: EquipmentType.Helmet, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.GoldOre, amount: 10 }], baseStats: { minAtk: 10, maxAtk: 20, minDef: 80, maxDef: 130 }, unlocked: true },
  { id: 'bp_a_5', name: 'Giày Nhựa Slime', resultType: EquipmentType.Boots, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.SlimeResin, amount: 40 }], baseStats: { minAtk: 0, maxAtk: 0, minDef: 10, maxDef: 20 }, unlocked: true },
  { id: 'bp_a_6', name: 'Bao Tay Golem', resultType: EquipmentType.Gloves, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.GolemCore, amount: 2 }], baseStats: { minAtk: 30, maxAtk: 50, minDef: 60, maxDef: 100 }, unlocked: true },
  { id: 'bp_a_7', name: 'Giày Tuyết Yeti', resultType: EquipmentType.Boots, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.YetiFur, amount: 15 }], baseStats: { minAtk: 0, maxAtk: 0, minDef: 90, maxDef: 160 }, unlocked: true },
  { id: 'bp_a_8', name: 'Găng Hư Không', resultType: EquipmentType.Gloves, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.VoidShard, amount: 15 }, { type: MaterialType.VoidCore, amount: 1 }], baseStats: { minAtk: 200, maxAtk: 350, minDef: 200, maxDef: 350 }, unlocked: true },

  // 💍 TRANG SỨC (Sức)
  { id: 'bp_s_1', name: 'Nhẫn Thạch Anh', resultType: EquipmentType.Accessory, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.GemStone, amount: 20 }], baseStats: { minAtk: 10, maxAtk: 20, minDef: 10, maxDef: 20 }, unlocked: true },
  { id: 'bp_s_2', name: 'Dây Chuyền Linh Hồn', resultType: EquipmentType.Accessory, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.BlueSoul, amount: 30 }], baseStats: { minAtk: 100, maxAtk: 200, minDef: 100, maxDef: 200 }, unlocked: true },
  { id: 'bp_s_3', name: 'Bùa May Mắn', resultType: EquipmentType.Accessory, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.MemoryGem, amount: 2 }, { type: MaterialType.StarDust, amount: 20 }], baseStats: { minAtk: 0, maxAtk: 0, minDef: 0, maxDef: 0 }, unlocked: true },
  { id: 'bp_s_4', name: 'Vòng Tay Pha Lê', resultType: EquipmentType.Accessory, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.SnowCrystal, amount: 30 }], baseStats: { minAtk: 80, maxAtk: 150, minDef: 50, maxDef: 100 }, unlocked: true },

  // 🧪 DÙNG (Tiêu hao)
  { id: 'bp_c_1', name: 'Bình Hồi Phục', resultType: 'VẬT PHẨM', evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.SlimeResin, amount: 8 }, { type: MaterialType.WildHerb, amount: 15 }], baseStats: { minAtk: 0, maxAtk: 0, minDef: 0, maxDef: 0 }, unlocked: true },
  { id: 'bp_c_2', name: 'Thuốc Giải Độc', resultType: 'VẬT PHẨM', evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.PoisonSpore, amount: 20 }], baseStats: { minAtk: 0, maxAtk: 0, minDef: 0, maxDef: 0 }, unlocked: true },
  { id: 'bp_c_3', name: 'Đá Mài Cường Hóa', resultType: 'VẬT PHẨM', evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.PureIronOre, amount: 10 }], baseStats: { minAtk: 0, maxAtk: 0, minDef: 0, maxDef: 0 }, unlocked: true }
];

export const SKILLS: Skill[] = [
  { id: 'wp_atk', name: 'Sắc Bén Cực Hạn', branch: SkillBranch.WeaponSmith, description: 'Tăng 5% sát thương vật lý cơ bản.', maxLevel: 10, cost: 2, effectValue: 5, reqLevel: 5 },
  { id: 'wp_crit', name: 'Nhãn Lực Thợ Rèn', branch: SkillBranch.WeaponSmith, description: 'Tăng 2% tỷ lệ chí mạng khi chiến đấu.', maxLevel: 10, cost: 3, effectValue: 2, reqLevel: 15 },
  { id: 'gen_exp', name: 'Hào Quang Kinh Nghiệm', branch: SkillBranch.Alchemy, description: 'Tăng 5% điểm EXP nhận được.', maxLevel: 10, cost: 3, effectValue: 5, reqLevel: 10 },
  { id: 'gen_luck', name: 'Vận May Thợ Rèn', branch: SkillBranch.Enchanting, description: 'Tăng 2% tỷ lệ rơi vật phẩm quý hiếm.', maxLevel: 10, cost: 4, effectValue: 2, reqLevel: 20 },
  { id: 'gen_gold', name: 'Bàn Tay Midas', branch: SkillBranch.Alchemy, description: 'Tăng 10% ngân lượng nhận được.', maxLevel: 10, cost: 2, effectValue: 10, reqLevel: 15 }
];

export const ETERNAL_UPGRADES: EternalUpgrade[] = [
  { id: EternalUpgradeId.LatentPower, name: 'Sức Mạnh Tiềm Ẩn', description: 'Tăng 10% toàn bộ chỉ số nhân vật vĩnh viễn.', baseCost: 100, costMultiplier: 2, maxLevel: 50, effectValue: 10 },
  { id: EternalUpgradeId.ResourceRetention, name: 'Bảo Toàn Tinh Hoa', description: 'Giữ lại 10% nguyên liệu khi Tái sinh.', baseCost: 200, costMultiplier: 2.5, maxLevel: 10, effectValue: 10 },
  { id: EternalUpgradeId.BlueprintMastery, name: 'Bậc Thầy Bản Vẽ', description: 'Tăng 10% hiệu quả chỉ số khi rèn.', baseCost: 500, costMultiplier: 3, maxLevel: 5, effectValue: 10 },
  { id: 'eternal_gold', name: 'Phú Quý Vĩnh Hằng', description: 'Tăng 20% Ngân lượng nhận được vĩnh viễn.', baseCost: 300, costMultiplier: 1.8, maxLevel: 15, effectValue: 20 },
  { id: 'eternal_ep', name: 'Tuệ Nhãn Luân Hồi', description: 'Tăng 15% điểm EP nhận được khi Tái sinh.', baseCost: 800, costMultiplier: 2.2, maxLevel: 10, effectValue: 15 }
];

export const RARITY_MULTIPLIER: Record<Rarity, number> = {
  [Rarity.Common]: 1, [Rarity.Rare]: 1.5, [Rarity.Epic]: 2.5, [Rarity.Legendary]: 5, [Rarity.Mythic]: 10, [Rarity.Cosmic]: 25
};

export const RARITY_COLOR: Record<Rarity, string> = {
  [Rarity.Common]: 'text-slate-400', [Rarity.Rare]: 'text-blue-400', [Rarity.Epic]: 'text-purple-400', [Rarity.Legendary]: 'text-yellow-400', [Rarity.Mythic]: 'text-red-500', [Rarity.Cosmic]: 'text-cyan-400'
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

export const GEM_STATS: Record<GemType, Record<GemTier, number>> = {
  [GemType.Ruby]: { [GemTier.T1]: 10, [GemTier.T2]: 25, [GemTier.T3]: 60 },
  [GemType.Sapphire]: { [GemTier.T1]: 5, [GemTier.T2]: 15, [GemTier.T3]: 40 },
  [GemType.Topaz]: { [GemTier.T1]: 50, [GemTier.T2]: 150, [GemTier.T3]: 400 },
};

export const ENCHANT_STATS: Record<string, { name: string; desc: string }> = {
  'Sharpness': { name: 'Sắc Bén', desc: '+15% Công' },
  'Protection': { name: 'Bảo Vệ', desc: '+15% Thủ' }
};

export const SETS: Record<SetId, { name: string }> = {
  [SetId.PrimalHunter]: { name: 'Thợ Săn Nguyên Thủy' },
  [SetId.InfinityChrono]: { name: 'Vòng Lặp Vô Tận' }
};

export const MATERIAL_TIERS: Record<MaterialType, MaterialTier> = {
  [MaterialType.SlimeResin]: MaterialTier.Basic,
  [MaterialType.BlueCoreFragment]: MaterialTier.Basic,
  [MaterialType.PoisonSpore]: MaterialTier.Basic,
  [MaterialType.MushroomCap]: MaterialTier.Basic,
  [MaterialType.WolfSkin]: MaterialTier.Basic,
  [MaterialType.WolfFang]: MaterialTier.Basic,
  [MaterialType.BatWing]: MaterialTier.Basic,
  [MaterialType.Flint]: MaterialTier.Basic,
  [MaterialType.IronScale]: MaterialTier.Basic,
  [MaterialType.RawCopperOre]: MaterialTier.Basic,
  [MaterialType.GolemCore]: MaterialTier.Elite,
  [MaterialType.PureIronOre]: MaterialTier.Elite,
  [MaterialType.SnowCrystal]: MaterialTier.Elite,
  [MaterialType.WarmFur]: MaterialTier.Elite,
  [MaterialType.OldBone]: MaterialTier.Elite,
  [MaterialType.BrokenSwordFragment]: MaterialTier.Elite,
  [MaterialType.BlueSoul]: MaterialTier.Elite,
  [MaterialType.VoidCore]: MaterialTier.Eternal,
  [MaterialType.StarDust]: MaterialTier.Eternal,
  [MaterialType.MemoryGem]: MaterialTier.Eternal,
  [MaterialType.FissionCrystal]: MaterialTier.Eternal,
  [MaterialType.IronScraps]: MaterialTier.Basic,
  [MaterialType.Wood]: MaterialTier.Basic,
  [MaterialType.Leather]: MaterialTier.Basic,
  [MaterialType.Ore]: MaterialTier.Basic,
  [MaterialType.ForestWood]: MaterialTier.Basic,
  [MaterialType.WildHerb]: MaterialTier.Basic,
  [MaterialType.YetiFur]: MaterialTier.Elite,
  [MaterialType.GoldOre]: MaterialTier.Elite,
  [MaterialType.VoidShard]: MaterialTier.Eternal,
  [MaterialType.GemStone]: MaterialTier.Basic,
};
