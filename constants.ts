
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
    { id: 'e1_1', name: 'Slime Xanh', level: 1, hp: 40, maxHp: 40, attack: 5, defense: 1, element: ElementType.Physical, expReward: 12, goldReward: 4, dropTable: [{ materialType: MaterialType.SlimeResin, chance: 0.7, minQty: 1, maxQty: 2 }] },
    { id: 'e1_2', name: 'Nấm Độc', level: 3, hp: 90, maxHp: 90, attack: 12, defense: 2, element: ElementType.Acid, expReward: 25, goldReward: 10, dropTable: [{ materialType: MaterialType.PoisonSpore, chance: 0.6, minQty: 1, maxQty: 3 }] },
    { id: 'e1_3', name: 'Dơi Rừng', level: 5, hp: 150, maxHp: 150, attack: 22, defense: 4, element: ElementType.Physical, expReward: 45, goldReward: 20, dropTable: [{ materialType: MaterialType.BatWing, chance: 0.4, minQty: 1, maxQty: 2 }] },
    { id: 'e1_4', name: 'Sói Xám', level: 8, hp: 350, maxHp: 350, attack: 40, defense: 8, element: ElementType.Physical, expReward: 100, goldReward: 50, dropTable: [{ materialType: MaterialType.WolfSkin, chance: 0.5, minQty: 1, maxQty: 2 }] }
  ],
  z2: [
    { id: 'e2_1', name: 'Bọ Giáp Sắt', level: 15, hp: 1200, maxHp: 1200, attack: 85, defense: 110, element: ElementType.Physical, expReward: 280, goldReward: 120, dropTable: [{ materialType: MaterialType.IronScale, chance: 0.5, minQty: 1, maxQty: 3 }] },
    { id: 'e2_2', name: 'Kobold Thợ Mỏ', level: 18, hp: 1500, maxHp: 1500, attack: 120, defense: 80, element: ElementType.Physical, expReward: 350, goldReward: 180, dropTable: [{ materialType: MaterialType.RawCopperOre, chance: 0.4, minQty: 2, maxQty: 4 }] },
    { id: 'e2_3', name: 'Nhện Hang Sâu', level: 22, hp: 2000, maxHp: 2000, attack: 160, defense: 100, element: ElementType.Acid, expReward: 500, goldReward: 250, dropTable: [{ materialType: MaterialType.PoisonSpore, chance: 0.5, minQty: 3, maxQty: 6 }] },
    { id: 'e2_boss', name: 'Golem Đá Cổ (Boss)', level: 25, hp: 12000, maxHp: 12000, attack: 280, defense: 350, element: ElementType.Physical, isBoss: true, abilities: [MonsterAbility.Stun, MonsterAbility.Reflect], expReward: 4000, goldReward: 1500, dropTable: [{ materialType: MaterialType.GolemCore, chance: 1, minQty: 1, maxQty: 1 }] }
  ],
  z3: [
    { id: 'e3_1', name: 'Sói Tuyết', level: 30, hp: 5000, maxHp: 5000, attack: 350, defense: 180, element: ElementType.Ice, expReward: 1500, goldReward: 600, dropTable: [{ materialType: MaterialType.WarmFur, chance: 0.5, minQty: 1, maxQty: 2 }] },
    { id: 'e3_2', name: 'Băng Tinh Linh', level: 35, hp: 6500, maxHp: 6500, attack: 480, defense: 220, element: ElementType.Ice, expReward: 2200, goldReward: 800, dropTable: [{ materialType: MaterialType.SnowCrystal, chance: 0.4, minQty: 2, maxQty: 4 }] },
    { id: 'e3_boss', name: 'Yeti Vương (Boss)', level: 45, hp: 30000, maxHp: 30000, attack: 950, defense: 600, element: ElementType.Ice, isBoss: true, abilities: [MonsterAbility.Freeze, MonsterAbility.Regen], expReward: 12000, goldReward: 4000, dropTable: [{ materialType: MaterialType.YetiFur, chance: 1, minQty: 2, maxQty: 4 }] }
  ],
  z4: [
    { id: 'e4_1', name: 'Chiến Binh Xương', level: 50, hp: 12000, maxHp: 12000, attack: 1200, defense: 850, element: ElementType.Physical, expReward: 6000, goldReward: 2000, dropTable: [{ materialType: MaterialType.OldBone, chance: 0.5, minQty: 3, maxQty: 7 }] },
    { id: 'e4_2', name: 'Hồn Ma Thành Cổ', level: 55, hp: 10000, maxHp: 10000, attack: 1500, defense: 700, element: ElementType.Void, expReward: 8000, goldReward: 2500, dropTable: [{ materialType: MaterialType.BlueSoul, chance: 0.4, minQty: 1, maxQty: 2 }] },
    { id: 'e4_3', name: 'Kỵ Sĩ Mục Nát', level: 60, hp: 25000, maxHp: 25000, attack: 2200, defense: 1500, element: ElementType.Physical, expReward: 15000, goldReward: 5000, dropTable: [{ materialType: MaterialType.BrokenSwordFragment, chance: 0.3, minQty: 1, maxQty: 3 }] }
  ],
  z7: [
    { id: 'e7_1', name: 'Lính Canh Hư Không', level: 110, hp: 1500000, maxHp: 1500000, attack: 35000, defense: 25000, element: ElementType.Void, expReward: 250000, goldReward: 100000, dropTable: [{ materialType: MaterialType.VoidShard, chance: 0.3, minQty: 2, maxQty: 5 }] },
    { id: 'e7_boss', name: 'Chúa Tể Hư Không (Final Boss)', level: 125, hp: 8000000, maxHp: 8000000, attack: 95000, defense: 65000, element: ElementType.Void, isBoss: true, abilities: [MonsterAbility.ArmorBreak, MonsterAbility.Reflect, MonsterAbility.Stun, MonsterAbility.Regen], expReward: 2000000, goldReward: 1000000, dropTable: [{ materialType: MaterialType.VoidCore, chance: 1, minQty: 5, maxQty: 10 }] }
  ]
};

export const INITIAL_BLUEPRINTS: Blueprint[] = [
  // ⚔️ VŨ KHÍ (Giảm sát thương để cân bằng game)
  { id: 'bp_legacy', name: 'Kiếm Thánh Kế Thừa', resultType: EquipmentType.Weapon, evolutionLevel: 0, 
    requiredMaterials: [
        { type: MaterialType.MemoryGem, amount: 5 }, 
        { type: MaterialType.VoidCore, amount: 20 }, 
        { type: MaterialType.StarDust, amount: 100 },
        { type: MaterialType.BlueSoul, amount: 50 }
    ], 
    baseStats: { minAtk: 450, maxAtk: 750, minDef: 0, maxDef: 0 }, unlocked: true 
  },
  { id: 'bp_w_1', name: 'Đoản Kiếm Rèn Vội', resultType: EquipmentType.Weapon, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.SlimeResin, amount: 10 }], baseStats: { minAtk: 4, maxAtk: 9, minDef: 0, maxDef: 0 }, unlocked: true },
  { id: 'bp_w_2', name: 'Cung Gỗ Rừng', resultType: EquipmentType.Weapon, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.ForestWood, amount: 15 }, { type: MaterialType.WolfSkin, amount: 8 }], baseStats: { minAtk: 12, maxAtk: 20, minDef: 0, maxDef: 0 }, unlocked: true },
  { id: 'bp_w_3', name: 'Trượng Nấm Độc', resultType: EquipmentType.Weapon, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.PoisonSpore, amount: 20 }, { type: MaterialType.SlimeResin, amount: 15 }], baseStats: { minAtk: 25, maxAtk: 42, minDef: 0, maxDef: 0 }, unlocked: true },
  { id: 'bp_w_4', name: 'Kiếm Băng Giá', resultType: EquipmentType.Weapon, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.SnowCrystal, amount: 12 }, { type: MaterialType.PureIronOre, amount: 25 }], baseStats: { minAtk: 85, maxAtk: 150, minDef: 0, maxDef: 0 }, unlocked: true },
  { id: 'bp_w_5', name: 'Thương Thành Cổ', resultType: EquipmentType.Weapon, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.BrokenSwordFragment, amount: 10 }, { type: MaterialType.BlueSoul, amount: 30 }], baseStats: { minAtk: 250, maxAtk: 450, minDef: 0, maxDef: 0 }, unlocked: true },

  // 🛡️ GIÁP
  { id: 'bp_a_1', name: 'Áo Da Sói', resultType: EquipmentType.Armor, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.WolfSkin, amount: 15 }], baseStats: { minAtk: 0, maxAtk: 0, minDef: 10, maxDef: 18 }, unlocked: true },
  { id: 'bp_a_2', name: 'Mũ Nấm Độc', resultType: EquipmentType.Helmet, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.MushroomCap, amount: 12 }], baseStats: { minAtk: 0, maxAtk: 0, minDef: 6, maxDef: 12 }, unlocked: true },
  { id: 'bp_a_3', name: 'Giáp Vảy Sắt', resultType: EquipmentType.Armor, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.IronScale, amount: 30 }], baseStats: { minAtk: 0, maxAtk: 0, minDef: 45, maxDef: 85 }, unlocked: true },
  { id: 'bp_a_4', name: 'Mũ Hoàng Kim', resultType: EquipmentType.Helmet, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.GoldOre, amount: 10 }], baseStats: { minAtk: 3, maxAtk: 8, minDef: 35, maxDef: 60 }, unlocked: true },

  // 🧪 DÙNG
  { id: 'bp_c_1', name: 'Bình Hồi Phục', resultType: 'VẬT PHẨM', evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.SlimeResin, amount: 8 }, { type: MaterialType.WildHerb, amount: 15 }], baseStats: { minAtk: 0, maxAtk: 0, minDef: 0, maxDef: 0 }, unlocked: true }
];

export const SKILLS: Skill[] = [
  { id: 'wp_atk', name: 'Sắc Bén Cực Hạn', branch: SkillBranch.WeaponSmith, description: 'Tăng 5% sát thương vật lý cơ bản.', maxLevel: 10, cost: 2, effectValue: 5, reqLevel: 5 },
  { id: 'wp_crit', name: 'Nhãn Lực Thợ Rèn', branch: SkillBranch.WeaponSmith, description: 'Tăng 2% tỷ lệ chí mạng khi chiến đấu.', maxLevel: 10, cost: 3, effectValue: 2, reqLevel: 15 },
  { id: 'hv_hp', name: 'Huyết Mạch Hộ Vệ', branch: SkillBranch.ArmorSmith, description: 'Tăng 10% HP tối đa.', maxLevel: 10, cost: 4, effectValue: 10, reqLevel: 20, reqClass: CharacterClass.HeavySentinel },
  { id: 'bm_atk', name: 'Lưỡi Dao Hư Không', branch: SkillBranch.WeaponSmith, description: 'Tăng 10% sát thương xuyên thấu.', maxLevel: 10, cost: 4, effectValue: 10, reqLevel: 20, reqClass: CharacterClass.ShadowBlade },
  { id: 'gk_craft', name: 'Tinh Hoa Vật Chất', branch: SkillBranch.Alchemy, description: 'Tăng 10% chỉ số khi rèn đồ.', maxLevel: 10, cost: 4, effectValue: 10, reqLevel: 20, reqClass: CharacterClass.AlchemistMage }
];

export const ETERNAL_UPGRADES: EternalUpgrade[] = [
  { id: EternalUpgradeId.LatentPower, name: 'Sức Mạnh Tiềm Ẩn', description: 'Tăng 10% toàn bộ chỉ số nhân vật vĩnh viễn.', baseCost: 100, costMultiplier: 2, maxLevel: 50, effectValue: 10 },
  { id: EternalUpgradeId.ResourceRetention, name: 'Bảo Toàn Tinh Hoa', description: 'Giữ lại 10% nguyên liệu khi Tái sinh.', baseCost: 200, costMultiplier: 2.5, maxLevel: 10, effectValue: 10 }
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
