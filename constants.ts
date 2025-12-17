
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
  MutationType,
  MonsterAbility
} from './types';

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
  [Rarity.Cosmic]: 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]'
};

export const ZONES: Zone[] = [
  { id: 'z1', name: 'Rừng Khởi Nguyên', description: 'Nơi tập luyện cho tân thủ thợ rèn.', recommendedLevel: 1, materials: [MaterialType.IronScraps, MaterialType.Wood, MaterialType.Leather] },
  { id: 'z2', name: 'Hang Động Quặng Thô', description: 'Vách đá chứa đầy tài nguyên cơ bản.', recommendedLevel: 10, materials: [MaterialType.Ore, MaterialType.StoneSharpener] },
  { id: 'z3', name: 'Núi Tuyết Vĩnh Cửu', description: 'Khí hậu khắc nghiệt, quái vật bắt đầu mạnh lên.', recommendedLevel: 25, materials: [MaterialType.Ice, MaterialType.Essence] },
  { id: 'z4', name: 'Thành Cổ Hoang Tàn', description: 'Tàn tích của đế chế thợ rèn xưa.', recommendedLevel: 45, materials: [MaterialType.SoulDust, MaterialType.StoneSharpener] },
  { id: 'z5', name: 'Cung Điện Ẩn Giấu', description: 'Khu vực bí mật chỉ dành cho kẻ đã tái sinh.', recommendedLevel: 60, materials: [MaterialType.Gem, MaterialType.MemoryShard] },
  { id: 'z6', name: 'Vùng Đất Song Song', description: 'Mọi quy luật vật lý bị đảo lộn (Thế giới gương).', recommendedLevel: 80, materials: [MaterialType.CondensedTimesand, MaterialType.FissionCrystal] },
  { id: 'z7', name: 'Vực Thẳm Vô Định', description: 'Nơi trú ngụ của những thực thể không thể gọi tên.', recommendedLevel: 100, materials: [MaterialType.MemoryShard, MaterialType.CondensedTimesand] }
];

export const ENEMIES_DB: Record<string, Enemy[]> = {
  z1: [
    { id: 'e1_1', name: 'Slime Xanh', level: 1, hp: 60, maxHp: 60, attack: 12, defense: 2, element: ElementType.Physical, expReward: 20, goldReward: 10, dropTable: [{ materialType: MaterialType.IronScraps, chance: 0.8, minQty: 1, maxQty: 2 }] },
    { id: 'e1_2', name: 'Nấm Độc', level: 3, hp: 100, maxHp: 100, attack: 18, defense: 4, element: ElementType.Acid, expReward: 35, goldReward: 15, dropTable: [{ materialType: MaterialType.Leather, chance: 0.5, minQty: 1, maxQty: 1 }] },
    { id: 'e1_3', name: 'Sâu Rừng', level: 5, hp: 160, maxHp: 160, attack: 25, defense: 6, element: ElementType.Physical, expReward: 50, goldReward: 20, dropTable: [{ materialType: MaterialType.Wood, chance: 0.7, minQty: 1, maxQty: 3 }] }
  ],
  z2: [
    { id: 'e2_1', name: 'Dơi Hang', level: 12, hp: 400, maxHp: 400, attack: 45, defense: 20, element: ElementType.Physical, expReward: 120, goldReward: 50, dropTable: [{ materialType: MaterialType.Ore, chance: 0.6, minQty: 2, maxQty: 4 }] },
    { id: 'e2_2', name: 'Nhện Đá', level: 15, hp: 600, maxHp: 600, attack: 55, defense: 35, element: ElementType.Physical, expReward: 180, goldReward: 80, dropTable: [{ materialType: MaterialType.StoneSharpener, chance: 0.4, minQty: 1, maxQty: 1 }] },
    { id: 'e2_3', name: 'Golem Đất', level: 20, hp: 1200, maxHp: 1200, attack: 80, defense: 60, element: ElementType.Physical, isBoss: true, expReward: 500, goldReward: 250, dropTable: [{ materialType: MaterialType.Ore, chance: 1, minQty: 5, maxQty: 10 }] }
  ],
  z5: [
    { id: 'e5_1', name: 'Hộ Vệ Hoàng Gia', level: 60, hp: 8000, maxHp: 8000, attack: 450, defense: 300, element: ElementType.Lightning, abilities: [MonsterAbility.ArmorBreak], expReward: 2000, goldReward: 1000, dropTable: [{ materialType: MaterialType.Gem, chance: 0.3, minQty: 1, maxQty: 1 }] },
    { id: 'e5_2', name: 'Pháp Sư Cấm Thuật', level: 65, hp: 6500, maxHp: 6500, attack: 600, defense: 150, element: ElementType.Fire, abilities: [MonsterAbility.Reflect], expReward: 2500, goldReward: 1200, dropTable: [{ materialType: MaterialType.MemoryShard, chance: 0.2, minQty: 1, maxQty: 2 }] }
  ],
  z7: [
    { id: 'e7_1', name: 'Thực Thể Vô Định', level: 100, hp: 50000, maxHp: 50000, attack: 2500, defense: 1500, element: ElementType.Physical, mutation: MutationType.Void, abilities: [MonsterAbility.Invisibility, MonsterAbility.Reflect], expReward: 10000, goldReward: 5000, dropTable: [{ materialType: MaterialType.CondensedTimesand, chance: 0.5, minQty: 2, maxQty: 5 }] }
  ]
};

export const INITIAL_BLUEPRINTS: Blueprint[] = [
  { id: 'bp1', name: 'Đoản Kiếm Rèn Vội', resultType: EquipmentType.Weapon, requiredMaterials: [{ type: MaterialType.IronScraps, amount: 5 }], baseStats: { minAtk: 12, maxAtk: 20, minDef: 0, maxDef: 0 }, unlocked: true },
  { id: 'bp2', name: 'Áo Vải Bền Chắc', resultType: EquipmentType.Armor, requiredMaterials: [{ type: MaterialType.Leather, amount: 8 }], baseStats: { minAtk: 0, maxAtk: 0, minDef: 15, maxDef: 25 }, unlocked: true },
  { id: 'bp_void', name: 'Kiếm Hư Không', resultType: EquipmentType.Weapon, requiredMaterials: [{ type: MaterialType.CondensedTimesand, amount: 20 }, { type: MaterialType.FissionCrystal, amount: 5 }], baseStats: { minAtk: 1500, maxAtk: 2500, minDef: 0, maxDef: 0 }, unlocked: false }
];

export const SETS: Record<SetId, { name: string; description: string }> = {
  [SetId.PrimalHunter]: { name: 'Thợ Săn Nguyên Thủy', description: 'Tăng mạnh khả năng sinh tồn trong rừng sâu.' },
  [SetId.InfinityChrono]: { name: 'Vòng Lặp Vĩnh Hằng', description: 'Kiểm soát thời gian rèn đúc.' }
};

export const CLASS_INFO: Record<string, { name: string; desc: string; bonuses: string }> = {
  [CharacterClass.None]: { name: 'Vô Danh', desc: 'Chưa thức tỉnh sức mạnh.', bonuses: '' },
  [CharacterClass.HeavySentinel]: { name: 'Hộ Vệ Thủ Lĩnh', desc: 'Lấy thủ làm công, vững chãi như bàn thạch.', bonuses: '+10% Phòng thủ, +20% Máu tối đa' },
  [CharacterClass.ShadowBlade]: { name: 'Bóng Ma Hắc Ám', desc: 'Nhát chém chí mạng từ hư không.', bonuses: '+15% Sát thương, +10% Tỷ lệ chí mạng' },
  [CharacterClass.AlchemistMage]: { name: 'Giả Kim Pháp Sư', desc: 'Tri thức là sức mạnh tuyệt đối.', bonuses: '+20% Hiệu quả chế tác, +10% May mắn' }
};

export const EQUIPMENT_TALENTS: EquipmentTalent[] = [
  { name: 'Sức Mạnh Thần Thánh', desc: 'Gây thêm 20% sát thương lên Boss khu vực.' },
  { name: 'Hào Quang Hồi Phục', desc: 'Hồi 1% máu mỗi khi tung đòn đánh.' },
  { name: 'Khát Máu', desc: 'Chuyển hóa 10% sát thương gây ra thành sinh lực.' },
  { name: 'Giáp Gai', desc: 'Phản lại 15% sát thương cận chiến nhận vào.' }
];

export const SKILLS: Skill[] = [
  // Kỹ năng chung
  { id: 'gen_luck', name: 'Vận May Thợ Rèn', branch: SkillBranch.WeaponSmith, description: 'Tăng nhẹ tỉ lệ rèn được trang bị cấp cao.', maxLevel: 10, cost: 1, effectValue: 1 },
  
  // Hộ Vệ Thủ Lĩnh
  { id: 'hs_armor', name: 'Bản Lĩnh Thép', branch: SkillBranch.ArmorSmith, description: 'Cường hóa độ bền của Giáp Trụ, tăng 5% thủ cơ bản.', maxLevel: 10, cost: 2, effectValue: 5, reqClass: CharacterClass.HeavySentinel },
  { id: 'hs_reflect', name: 'Khiên Phản Kích', branch: SkillBranch.ArmorSmith, description: 'Có tỉ lệ phản lại sát thương khi rèn được đồ Thần Thoại.', maxLevel: 5, cost: 3, effectValue: 4, reqClass: CharacterClass.HeavySentinel },
  { id: 'hs_wall', name: 'Bức Tường Bất Tận', branch: SkillBranch.ArmorSmith, description: 'Tăng vĩnh viễn 2% Máu tối đa mỗi cấp.', maxLevel: 10, cost: 2, effectValue: 2, reqClass: CharacterClass.HeavySentinel },
  
  // Bóng Ma Hắc Ám
  { id: 'sb_crit', name: 'Nhát Chém Hư Vô', branch: SkillBranch.WeaponSmith, description: 'Vũ khí rèn ra mang theo sát thương chí mạng cực cao.', maxLevel: 10, cost: 2, effectValue: 3, reqClass: CharacterClass.ShadowBlade },
  { id: 'sb_dodge', name: 'Bộ Pháp Ảnh Diệt', branch: SkillBranch.WeaponSmith, description: 'Tăng khả năng né tránh cơ bản thêm 2%.', maxLevel: 10, cost: 2, effectValue: 2, reqClass: CharacterClass.ShadowBlade },
  { id: 'sb_execute', name: 'Nhát Chém Khai Tử', branch: SkillBranch.WeaponSmith, description: 'Tăng 5% sát thương lên kẻ địch có máu dưới 30%.', maxLevel: 10, cost: 3, effectValue: 5, reqClass: CharacterClass.ShadowBlade },
  
  // Giả Kim Pháp Sư
  { id: 'am_essence', name: 'Dòng Chảy Tinh Hoa', branch: SkillBranch.Enchanting, description: 'Ngọc khảm vào trang bị tăng thêm 10% hiệu quả.', maxLevel: 10, cost: 2, effectValue: 10, reqClass: CharacterClass.AlchemistMage },
  { id: 'am_myth', name: 'Tri Thức Cấm Kỵ', branch: SkillBranch.Alchemy, description: 'Phá bỏ giới hạn, tăng tỉ lệ rèn đồ cấp Vũ Trụ.', maxLevel: 5, cost: 4, effectValue: 0.5, reqClass: CharacterClass.AlchemistMage },
  { id: 'am_transmute', name: 'Chuyển Hóa Vật Chất', branch: SkillBranch.Alchemy, description: 'Tăng 5% lượng vàng nhận được từ quái vật.', maxLevel: 10, cost: 2, effectValue: 5, reqClass: CharacterClass.AlchemistMage }
];

export const ETERNAL_UPGRADES: EternalUpgrade[] = [
  { id: EternalUpgradeId.LatentPower, name: 'Sức Mạnh Tiềm Ẩn', description: 'Khai mở tiềm năng vĩnh hằng của linh hồn.', baseCost: 100, costMultiplier: 2, maxLevel: 50, effectValue: 0.1 }
];

export const GEM_STATS: Record<GemType, Record<GemTier, number>> = {
  [GemType.Ruby]: { [GemTier.T1]: 10, [GemTier.T2]: 25, [GemTier.T3]: 60 },
  [GemType.Sapphire]: { [GemTier.T1]: 5, [GemTier.T2]: 15, [GemTier.T3]: 40 },
  [GemType.Topaz]: { [GemTier.T1]: 50, [GemTier.T2]: 150, [GemTier.T3]: 400 },
};

export const ENCHANT_STATS: Record<string, { desc: string }> = {
  [EnchantmentType.Sharpness]: { desc: 'Tăng 15% Sát thương vật lý của trang bị.' },
  [EnchantmentType.Protection]: { desc: 'Tăng 15% Chỉ số phòng ngự của trang bị.' },
};
