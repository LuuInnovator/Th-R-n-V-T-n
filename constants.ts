
import { 
  Rarity, Zone, Enemy, ElementType, MaterialType, Blueprint, EquipmentType, 
  EternalUpgrade, EternalUpgradeId, Skill, SkillBranch, CharacterClass, 
  EquipmentTalent, MonsterAbility, GemType, GemTier, SetId, MaterialTier, EnchantmentType
} from './types';

export const ZONES: Zone[] = [
  { id: 'z1', name: 'Rừng Khởi Nguyên', description: 'Nơi bắt đầu của mọi huyền thoại.', recommendedLevel: 1, materials: [MaterialType.SlimeResin, MaterialType.WolfSkin, MaterialType.WolfFang, MaterialType.ForestWood, MaterialType.SpiderSilk, MaterialType.WildHerb] },
  { id: 'z2', name: 'Hang Động Đồng Thô', description: 'Nơi chứa đựng những quặng kim loại đầu tiên.', recommendedLevel: 10, materials: [MaterialType.RawCopperOre, MaterialType.IronScraps, MaterialType.BatWing, MaterialType.GolemCore, MaterialType.Flint, MaterialType.GemStone, MaterialType.AmberFragment] },
  { id: 'z3', name: 'Núi Tuyết Vĩnh Cửu', description: 'Băng giá che phủ những bí mật cổ xưa.', recommendedLevel: 25, materials: [MaterialType.SnowCrystal, MaterialType.WarmFur, MaterialType.YetiFur, MaterialType.IceShard, MaterialType.FrozenHeart, MaterialType.FrostLotus] },
  // Fix: Added MaterialType.MagicThread to Zone 4 materials to make it obtainable and used correctly
  { id: 'z4', name: 'Thành Cổ Hoang Tàn', description: 'Tàn tích của một đế chế ma pháp hùng mạnh.', recommendedLevel: 45, materials: [MaterialType.OldBone, MaterialType.BlueSoul, MaterialType.BrokenSwordFragment, MaterialType.AncientScroll, MaterialType.MagicThread, MaterialType.GhostEssence, MaterialType.CursedStone, MaterialType.WillOfDead] },
  { id: 'z5', name: 'Cung Điện Long Tộc', description: 'Thánh địa của những sinh vật mạnh nhất thế gian.', recommendedLevel: 65, materials: [MaterialType.DragonScale, MaterialType.GoldOre, MaterialType.StarDust, MaterialType.DragonBlood, MaterialType.RoyalCloth, MaterialType.PearlOfPower, MaterialType.AncientDragonBone] },
  { id: 'z6', name: 'Vùng Đất Song Song', description: 'Thực tại bị bóp méo bởi năng lượng hư không.', recommendedLevel: 85, minRebirth: 2, materials: [MaterialType.FissionCrystal, MaterialType.VoidCore, MaterialType.DarkEssence, MaterialType.MemoryGem, MaterialType.OmniStone] },
  { id: 'z7', name: 'Vực Thẳm Vô Định', description: 'Nơi kết thúc của không gian và thời gian.', recommendedLevel: 100, minRebirth: 5, materials: [MaterialType.RealityTear, MaterialType.VoidShard, MaterialType.AncientRelic, MaterialType.EternalSpark] }
];

export const ENEMIES_DB: Record<string, Enemy[]> = {
  z1: [
    { id: 'e1_1', name: 'Slime Xanh', level: 1, hp: 100, maxHp: 100, attack: 15, defense: 2, element: ElementType.Physical, expReward: 20, goldReward: 15, dropTable: [{ materialType: MaterialType.SlimeResin, chance: 0.8, minQty: 1, maxQty: 3 }] },
    { id: 'e1_2', name: 'Sói Xám', level: 5, hp: 500, maxHp: 500, attack: 50, defense: 10, element: ElementType.Physical, expReward: 100, goldReward: 50, dropTable: [{ materialType: MaterialType.WolfSkin, chance: 0.7, minQty: 2, maxQty: 5 }] },
    { id: 'e1_boss', name: 'Vua Slime Hoàng Kim', level: 15, hp: 10000, maxHp: 10000, attack: 850, defense: 450, element: ElementType.Physical, isBoss: true, expReward: 2500, goldReward: 2000, dropTable: [{ materialType: MaterialType.SlimeResin, chance: 1, minQty: 50, maxQty: 100 }] }
  ],
  z2: [
    { id: 'e2_1', name: 'Bọ Giáp Sắt', level: 25, hp: 15000, maxHp: 15000, attack: 1200, defense: 1500, element: ElementType.Physical, expReward: 1800, goldReward: 1200, dropTable: [{ materialType: MaterialType.IronScraps, chance: 0.7, minQty: 15, maxQty: 35 }] },
    { id: 'e2_boss', name: 'Golem Cổ Đại', level: 45, hp: 250000, maxHp: 250000, attack: 8500, defense: 12000, element: ElementType.Physical, isBoss: true, abilities: [MonsterAbility.Stun, MonsterAbility.ArmorBreak], expReward: 45000, goldReward: 35000, dropTable: [{ materialType: MaterialType.GolemCore, chance: 1, minQty: 3, maxQty: 8 }] }
  ],
  z7: [
    { id: 'e7_final', name: 'Chúa Tể Hư Không', level: 999, hp: 9999999999999, maxHp: 9999999999999, attack: 850000000000, defense: 750000000000, element: ElementType.Void, isBoss: true, minRebirth: 15, abilities: [MonsterAbility.Dodge, MonsterAbility.Reflect, MonsterAbility.Silence, MonsterAbility.Stun, MonsterAbility.Regen], expReward: 9999999999, goldReward: 9999999999, dropTable: [{ materialType: MaterialType.RealityTear, chance: 1, minQty: 500, maxQty: 1500 }, { materialType: MaterialType.EternalSpark, chance: 1, minQty: 50, maxQty: 100 }] }
  ]
};

export const INITIAL_BLUEPRINTS: Blueprint[] = [
  // --- VŨ KHÍ (WEAPONS) ---
  { id: 'bp_w_1', name: 'Kiếm Gỗ Tập Sự', resultType: EquipmentType.Weapon, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.ForestWood, amount: 200 }], baseStats: { minAtk: 30, maxAtk: 60, minDef: 0, maxDef: 0 }, unlocked: true },
  { id: 'bp_w_6', name: 'Thánh Thương Long Vương', resultType: EquipmentType.Weapon, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.DragonScale, amount: 3500 }, { type: MaterialType.DragonBlood, amount: 1500 }], baseStats: { minAtk: 15000000, maxAtk: 35000000, minDef: 0, maxDef: 0 }, unlocked: true, setId: SetId.DragonWarlord },
  { id: 'bp_w_final', name: 'Diệt Thần Kiếm', resultType: EquipmentType.Weapon, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.RealityTear, amount: 15000 }, { type: MaterialType.EternalSpark, amount: 500 }], baseStats: { minAtk: 50000000000, maxAtk: 150000000000, minDef: 0, maxDef: 0 }, unlocked: true, setId: SetId.VoidSeeker },

  // --- TRANG SỨC (ACCESSORIES) - SIÊU ĐỒ SỘ ---
  { id: 'bp_acc_z1_1', name: 'Nhẫn Nhựa Slime', resultType: EquipmentType.Accessory, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.SlimeResin, amount: 1200 }], baseStats: { minAtk: 50, maxAtk: 120, minDef: 50, maxDef: 120, minHp: 800, maxHp: 2500 }, unlocked: true },
  { id: 'bp_acc_z1_2', name: 'Dây Chuyền Bào Tử', resultType: EquipmentType.Accessory, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.PoisonSpore, amount: 800 }, { type: MaterialType.WildHerb, amount: 500 }], baseStats: { minAtk: 150, maxAtk: 450, minDef: 150, maxDef: 450, minHp: 2500, maxHp: 6500 }, unlocked: true },
  
  { id: 'bp_acc_z2_1', name: 'Nhẫn Đồng Hổ Phách', resultType: EquipmentType.Accessory, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.RawCopperOre, amount: 5000 }, { type: MaterialType.AmberFragment, amount: 150 }], baseStats: { minAtk: 2500, maxAtk: 6500, minDef: 2500, maxDef: 6500, minHp: 25000, maxHp: 65000 }, unlocked: true, setId: SetId.IronWill },
  { id: 'bp_acc_z2_2', name: 'Vòng Tay Golem', resultType: EquipmentType.Accessory, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.GolemCore, amount: 85 }, { type: MaterialType.IronScale, amount: 2500 }], baseStats: { minAtk: 8500, maxAtk: 18500, minDef: 8500, maxDef: 18500, minHp: 85000, maxHp: 185000 }, unlocked: true, setId: SetId.IronWill },

  { id: 'bp_acc_z3_1', name: 'Dây Chuyền Tuyết Liên', resultType: EquipmentType.Accessory, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.FrostLotus, amount: 350 }, { type: MaterialType.SnowCrystal, amount: 6500 }], baseStats: { minAtk: 85000, maxAtk: 225000, minDef: 85000, maxDef: 225000, minHp: 850000, maxHp: 2250000 }, unlocked: true, setId: SetId.FrozenLegacy },
  { id: 'bp_acc_z3_2', name: 'Nhẫn Trái Tim Băng', resultType: EquipmentType.Accessory, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.FrozenHeart, amount: 125 }, { type: MaterialType.IceShard, amount: 8500 }], baseStats: { minAtk: 250000, maxAtk: 650000, minDef: 250000, maxDef: 650000, minHp: 2500000, maxHp: 6500000 }, unlocked: true, setId: SetId.FrozenLegacy },

  { id: 'bp_acc_z4_1', name: 'Bông Tai Vong Linh', resultType: EquipmentType.Accessory, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.WillOfDead, amount: 450 }, { type: MaterialType.BlueSoul, amount: 12000 }], baseStats: { minAtk: 1500000, maxAtk: 3500000, minDef: 1500000, maxDef: 3500000, minHp: 15000000, maxHp: 35000000 }, unlocked: true, setId: SetId.GhostlyRelic },
  { id: 'bp_acc_z4_2', name: 'Nhẫn Nguyền Rủa Tối Thượng', resultType: EquipmentType.Accessory, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.CursedStone, amount: 2500 }, { type: MaterialType.OldBone, amount: 35000 }], baseStats: { minAtk: 4500000, maxAtk: 12500000, minDef: 4500000, maxDef: 12500000, minHp: 45000000, maxHp: 125000000 }, unlocked: true, setId: SetId.GhostlyRelic },

  { id: 'bp_acc_z5_1', name: 'Ngọc Bội Long Cốt', resultType: EquipmentType.Accessory, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.AncientDragonBone, amount: 650 }, { type: MaterialType.GoldOre, amount: 50000 }], baseStats: { minAtk: 25000000, maxAtk: 65000000, minDef: 25000000, maxDef: 65000000, minHp: 250000000, maxHp: 650000000 }, unlocked: true, setId: SetId.DragonWarlord },
  { id: 'bp_acc_z5_2', name: 'Long Châu Hộ Mệnh', resultType: EquipmentType.Accessory, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.PearlOfPower, amount: 180 }, { type: MaterialType.DragonBlood, amount: 6500 }], baseStats: { minAtk: 85000000, maxAtk: 225000000, minDef: 85000000, maxDef: 225000000, minHp: 850000000, maxHp: 2250000000 }, unlocked: true, setId: SetId.DragonWarlord },

  { id: 'bp_acc_final_1', name: 'Nhẫn Toàn Năng', resultType: EquipmentType.Accessory, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.OmniStone, amount: 1500 }, { type: MaterialType.VoidCore, amount: 12000 }], baseStats: { minAtk: 1500000000, maxAtk: 4500000000, minDef: 1500000000, maxDef: 4500000000, minHp: 15000000000, maxHp: 45000000000 }, unlocked: true, setId: SetId.VoidSeeker },
  { id: 'bp_acc_final_2', name: 'Trái Tim Vĩnh Hằng', resultType: EquipmentType.Accessory, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.EternalSpark, amount: 1000 }, { type: MaterialType.AncientRelic, amount: 2500 }], baseStats: { minAtk: 85000000000, maxAtk: 225000000000, minDef: 85000000000, maxDef: 225000000000, minHp: 850000000000, maxHp: 2250000000000 }, unlocked: true, setId: SetId.InfinityChrono },

  // --- GIÁP TRỤ (ARMOR) ---
  { id: 'bp_a_1', name: 'Giáp Da Sói', resultType: EquipmentType.Armor, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.WolfSkin, amount: 800 }], baseStats: { minAtk: 0, maxAtk: 0, minDef: 150, maxDef: 350, minHp: 1500, maxHp: 5000 }, unlocked: true, setId: SetId.PrimalHunter },
  { id: 'bp_a_final', name: 'Giáp Thần Thoại', resultType: EquipmentType.Armor, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.FissionCrystal, amount: 25000 }, { type: MaterialType.RealityTear, amount: 8500 }], baseStats: { minAtk: 0, maxAtk: 0, minDef: 1200000000000, maxDef: 3500000000000, minHp: 15000000000000, maxHp: 45000000000000 }, unlocked: true, setId: SetId.InfinityChrono }
];

export const RARITY_MULTIPLIER: Record<Rarity, number> = {
  [Rarity.Common]: 1, 
  [Rarity.Rare]: 5, 
  [Rarity.Epic]: 20, 
  [Rarity.Legendary]: 85, 
  [Rarity.Mythic]: 350, 
  [Rarity.Cosmic]: 1200 // Đẩy lên x1200 để tạo khoảng cách cực lớn
};

export const ETERNAL_UPGRADES: EternalUpgrade[] = [
  { id: EternalUpgradeId.LatentPower, name: 'Sức Mạnh Tiềm Ẩn', description: 'Tăng 30% toàn bộ chỉ số nhân vật vĩnh viễn.', baseCost: 150, costMultiplier: 1.7, maxLevel: 500, effectValue: 30 },
  { id: EternalUpgradeId.EternalBlood, name: 'Huyết Mạch Vĩnh Hằng', description: 'Tăng 100% HP tối đa cho mỗi cấp Tái sinh.', baseCost: 600, costMultiplier: 2.1, maxLevel: 250, effectValue: 100 },
  { id: EternalUpgradeId.GodlyForging, name: 'Kỹ Thuật Đúc Thần', description: 'Mọi trang bị chế tạo được nhân thêm (Số lần tái sinh * 25%) chỉ số.', baseCost: 5000, costMultiplier: 3.2, maxLevel: 20, effectValue: 25 }
];

export const SKILLS: Skill[] = [
  { id: 'wp_atk', name: 'Sắc Bén Cực Hạn', branch: SkillBranch.WeaponSmith, description: 'Tăng 25% sát thương vật lý cơ bản cho mỗi cấp.', maxLevel: 20, cost: 3, effectValue: 25, reqLevel: 5 },
  { id: 'wp_mastery', name: 'Bậc Thầy Binh Khí', branch: SkillBranch.WeaponSmith, description: 'Tăng 100% chỉ số cộng thêm từ trang bị Vũ khí.', maxLevel: 15, cost: 12, effectValue: 100, reqLevel: 50, reqClass: CharacterClass.ShadowBlade }
];

export const MATERIAL_TIERS: Record<MaterialType, MaterialTier> = {
  [MaterialType.SlimeResin]: MaterialTier.Basic,
  [MaterialType.PoisonSpore]: MaterialTier.Basic,
  [MaterialType.MushroomCap]: MaterialTier.Basic,
  [MaterialType.WolfSkin]: MaterialTier.Basic,
  [MaterialType.WolfFang]: MaterialTier.Basic,
  [MaterialType.SpiderSilk]: MaterialTier.Basic,
  [MaterialType.ForestWood]: MaterialTier.Basic,
  [MaterialType.WildHerb]: MaterialTier.Basic,
  [MaterialType.RawCopperOre]: MaterialTier.Basic,
  [MaterialType.IronScale]: MaterialTier.Basic,
  [MaterialType.IronScraps]: MaterialTier.Basic,
  [MaterialType.Flint]: MaterialTier.Basic,
  [MaterialType.GemStone]: MaterialTier.Basic,
  [MaterialType.SilverOre]: MaterialTier.Basic,
  [MaterialType.AmberFragment]: MaterialTier.Basic,
  [MaterialType.BatWing]: MaterialTier.Basic,
  [MaterialType.GolemCore]: MaterialTier.Elite,
  [MaterialType.SnowCrystal]: MaterialTier.Elite,
  [MaterialType.WarmFur]: MaterialTier.Elite,
  [MaterialType.YetiFur]: MaterialTier.Elite,
  [MaterialType.IceShard]: MaterialTier.Elite,
  [MaterialType.FrozenHeart]: MaterialTier.Elite,
  [MaterialType.FrostLotus]: MaterialTier.Elite,
  [MaterialType.OldBone]: MaterialTier.Elite,
  [MaterialType.BlueSoul]: MaterialTier.Elite,
  [MaterialType.BrokenSwordFragment]: MaterialTier.Elite,
  [MaterialType.AncientScroll]: MaterialTier.Elite,
  // Fix: Added Tier mapping for MagicThread
  [MaterialType.MagicThread]: MaterialTier.Elite,
  [MaterialType.GhostEssence]: MaterialTier.Elite,
  [MaterialType.CursedStone]: MaterialTier.Elite,
  [MaterialType.WillOfDead]: MaterialTier.Elite,
  [MaterialType.GoldOre]: MaterialTier.Elite,
  [MaterialType.DragonScale]: MaterialTier.Elite,
  [MaterialType.RoyalCloth]: MaterialTier.Elite,
  [MaterialType.DragonBlood]: MaterialTier.Elite,
  [MaterialType.PearlOfPower]: MaterialTier.Elite,
  [MaterialType.AncientDragonBone]: MaterialTier.Elite,
  [MaterialType.VoidCore]: MaterialTier.Eternal,
  [MaterialType.VoidShard]: MaterialTier.Eternal,
  [MaterialType.StarDust]: MaterialTier.Eternal,
  [MaterialType.MemoryGem]: MaterialTier.Eternal,
  [MaterialType.FissionCrystal]: MaterialTier.Eternal,
  [MaterialType.DarkEssence]: MaterialTier.Eternal,
  [MaterialType.RealityTear]: MaterialTier.Eternal,
  [MaterialType.AncientRelic]: MaterialTier.Eternal,
  [MaterialType.EternalSpark]: MaterialTier.Eternal,
  [MaterialType.OmniStone]: MaterialTier.Eternal,
  [MaterialType.BlueCoreFragment]: MaterialTier.Basic,
  [MaterialType.PureIronOre]: MaterialTier.Elite,
  [MaterialType.Wood]: MaterialTier.Basic,
  [MaterialType.Leather]: MaterialTier.Basic,
  [MaterialType.Ore]: MaterialTier.Basic,
};

export const RARITY_COLOR: Record<Rarity, string> = {
  [Rarity.Common]: 'text-slate-400', [Rarity.Rare]: 'text-blue-400', [Rarity.Epic]: 'text-purple-400', [Rarity.Legendary]: 'text-yellow-400', [Rarity.Mythic]: 'text-red-500', [Rarity.Cosmic]: 'text-cyan-400'
};

export const CLASS_INFO: Record<string, { name: string; desc: string; bonuses: string }> = {
  [CharacterClass.None]: { name: 'Vô Danh', desc: 'Chưa thức tỉnh sức mạnh.', bonuses: 'Không có.' },
  [CharacterClass.HeavySentinel]: { name: 'Hộ Vệ Thủ Lĩnh', desc: 'Bậc thầy phòng ngự.', bonuses: '+100% Phòng Thủ, +200% HP' },
  [CharacterClass.ShadowBlade]: { name: 'Bóng Ma Hắc Ám', desc: 'Sát thủ tàn bạo.', bonuses: '+150% Tấn Công, +60% Chí Mạng' },
  [CharacterClass.AlchemistMage]: { name: 'Giả Kim Pháp Sư', desc: 'Bậc thầy chế tác.', bonuses: '+100% Hiệu quả thuốc, +200% Tỷ lệ Rơi đồ' }
};

export const EQUIPMENT_TALENTS: EquipmentTalent[] = [
  { name: 'Sát Thần', desc: 'Gây thêm 200% sát thương lên Boss.' },
  { name: 'Hào Quang Hồi Phục', desc: 'Hồi 15% máu mỗi giây.' },
  { name: 'Lời Nguyền Hư Không', desc: 'Giảm 80% thủ địch mỗi đòn.' }
];

export const GEM_STATS: Record<GemType, Record<GemTier, number>> = {
  [GemType.Ruby]: { [GemTier.T1]: 1000, [GemTier.T2]: 15000, [GemTier.T3]: 250000 },
  [GemType.Sapphire]: { [GemTier.T1]: 800, [GemTier.T2]: 12000, [GemTier.T3]: 200000 },
  [GemType.Topaz]: { [GemTier.T1]: 10000, [GemTier.T2]: 150000, [GemTier.T3]: 2500000 },
};

export const ENCHANT_STATS: Record<string, { name: string; desc: string }> = {
  [EnchantmentType.Sharpness]: { name: 'Sắc Bén', desc: '+100% Tổng Sát thương' },
  [EnchantmentType.Protection]: { name: 'Bảo Vệ', desc: '+100% Tổng Phòng thủ' },
  [EnchantmentType.Vitality]: { name: 'Sinh Lực', desc: '+150% HP Tối Đa' },
  [EnchantmentType.Luck]: { name: 'Vận May', desc: '+50% Tỷ Lệ Rơi Đồ' }
};

export const SETS: Record<string, { name: string }> = {
  [SetId.PrimalHunter]: { name: 'Thợ Săn Nguyên Thủy' },
  [SetId.IronWill]: { name: 'Ý Chí Thép' },
  [SetId.FrozenLegacy]: { name: 'Di Sản Băng Giá' },
  [SetId.GhostlyRelic]: { name: 'Di Vật U Linh' },
  [SetId.DragonWarlord]: { name: 'Đại Tướng Long Tộc' },
  [SetId.VoidSeeker]: { name: 'Kẻ Tầm Đạo Hư Không' },
  [SetId.InfinityChrono]: { name: 'Vòng Lặp Vô Tận' }
};
