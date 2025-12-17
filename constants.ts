
import { Blueprint, CharacterClass, EnchantmentType, Enemy, EquipmentType, GemTier, GemType, MaterialType, Rarity, Zone, Skill, SkillBranch, SetId, ElementType, EternalUpgrade, EternalUpgradeId } from './types';

// Danh sách khu vực
export const ZONES: Zone[] = [
  {
    id: 'z1',
    name: 'Rừng Chết',
    description: 'Nơi sinh sống của loài sói ma và cây ăn thịt. Nguồn cung cấp Gỗ và Da.',
    recommendedLevel: 1,
    materials: [MaterialType.Wood, MaterialType.Leather],
    enemies: [] 
  },
  {
    id: 'z2',
    name: 'Mỏ Đá Cổ',
    description: 'Hầm ngục bỏ hoang đầy rẫy golem. Nơi tốt nhất để tìm Quặng và Đá Quý Thô.',
    recommendedLevel: 10,
    materials: [MaterialType.Ore, MaterialType.Gem],
    enemies: []
  },
  {
    id: 'z3',
    name: 'Núi Lửa Hỏa Tinh',
    description: 'Vùng đất chết chóc. Chỉ những thợ rèn giỏi nhất mới dám khai thác Tinh Hoa ở đây.',
    recommendedLevel: 25,
    materials: [MaterialType.Ore, MaterialType.Essence],
    enemies: []
  },
  {
    id: 'z4_rebirth',
    name: 'Lò Rèn Vĩnh Hằng',
    description: '⚠️ [Vùng Tái Sinh] Nơi ngự trị của Cự Thạch Nham Thạch.',
    recommendedLevel: 1,
    reqRebirth: 1,
    materials: [MaterialType.Essence, MaterialType.FissionCrystal, MaterialType.SoulDust],
    enemies: []
  },
  {
    id: 'z5_time',
    name: 'Đồng Hồ Cát Vô Định',
    description: '💀 [Nguy Hiểm Tột Cùng] Không gian bị bóp méo bởi Kẻ Gìn Giữ Thời Gian.',
    recommendedLevel: 60,
    reqRebirth: 2,
    materials: [MaterialType.CondensedTimesand, MaterialType.SoulDust],
    enemies: []
  }
];

// Danh sách quái vật (Đã cân bằng lại: Tỷ lệ rơi thấp hơn để tăng độ khó)
export const ENEMIES_DB: Record<string, Enemy[]> = {
  'z1': [
    {
      id: 'e1_1', name: 'Sói Xám', level: 1, hp: 60, maxHp: 60, attack: 8, defense: 2, isBoss: false, element: ElementType.Physical,
      expReward: 23, goldReward: 5,
      dropTable: [{ materialType: MaterialType.Leather, chance: 0.15, minQty: 1, maxQty: 1 }] // Giảm từ 25% xuống 15%
    },
    {
      id: 'e1_2', name: 'Mộc Tinh', level: 3, hp: 100, maxHp: 100, attack: 12, defense: 4, isBoss: false, element: ElementType.Physical,
      expReward: 38, goldReward: 8,
      dropTable: [{ materialType: MaterialType.Wood, chance: 0.15, minQty: 1, maxQty: 2 }] // Giảm từ 25% xuống 15%
    },
    {
      id: 'e1_boss', name: 'Vua Sói Ma (Boss)', level: 10, hp: 800, maxHp: 800, attack: 55, defense: 15, isBoss: true, element: ElementType.Physical,
      expReward: 525, goldReward: 100,
      dropTable: [
        { materialType: MaterialType.Leather, chance: 0.40, minQty: 3, maxQty: 5 }, // Giảm chance và số lượng
        { materialType: MaterialType.Gem, chance: 0.08, minQty: 1, maxQty: 1 }, // Rất hiếm
        { materialType: MaterialType.SoulDust, chance: 0.02, minQty: 1, maxQty: 1 } // Cực hiếm
      ]
    }
  ],
  'z2': [
    {
      id: 'e2_1', name: 'Golem Đá', level: 12, hp: 450, maxHp: 450, attack: 35, defense: 25, isBoss: false, element: ElementType.Physical,
      expReward: 98, goldReward: 20,
      dropTable: [{ materialType: MaterialType.Ore, chance: 0.15, minQty: 1, maxQty: 3 }]
    },
    {
      id: 'e2_boss', name: 'Người Khổng Lồ Đá (Boss)', level: 20, hp: 2500, maxHp: 2500, attack: 180, defense: 90, isBoss: true, element: ElementType.Physical,
      expReward: 1200, goldReward: 300,
      dropTable: [
          { materialType: MaterialType.Ore, chance: 0.50, minQty: 5, maxQty: 10 }, 
          { materialType: MaterialType.Gem, chance: 0.15, minQty: 1, maxQty: 2 },
          { materialType: MaterialType.SoulDust, chance: 0.05, minQty: 1, maxQty: 2 }
      ]
    }
  ],
  'z3': [
    {
      id: 'e3_1', name: 'Quỷ Lửa', level: 28, hp: 1000, maxHp: 1000, attack: 130, defense: 40, isBoss: false, element: ElementType.Fire,
      expReward: 270, goldReward: 50,
      dropTable: [{ materialType: MaterialType.Essence, chance: 0.10, minQty: 1, maxQty: 1 }] // Khó kiếm Essence
    },
    {
      id: 'e3_boss', name: 'Rồng Hỏa Tinh (World Boss)', level: 50, hp: 20000, maxHp: 20000, attack: 950, defense: 350, isBoss: true, element: ElementType.Fire,
      expReward: 12000, goldReward: 2000,
      dropTable: [
          { materialType: MaterialType.Essence, chance: 0.5, minQty: 3, maxQty: 5 }, 
          { materialType: MaterialType.Gem, chance: 0.3, minQty: 2, maxQty: 5 },
          { materialType: MaterialType.SoulDust, chance: 0.2, minQty: 2, maxQty: 5 }
      ]
    }
  ],
  'z4_rebirth': [
    {
        id: 'e4_1', name: 'Linh Hồn Than', level: 5, hp: 4000, maxHp: 4000, attack: 400, defense: 150, isBoss: false, element: ElementType.Fire,
        expReward: 750, goldReward: 200,
        dropTable: [{ materialType: MaterialType.Essence, chance: 0.2, minQty: 1, maxQty: 2 }]
    },
    {
        id: 'e4_boss', name: 'Cự Thạch Nham Thạch', level: 20, hp: 100000, maxHp: 100000, attack: 3000, defense: 1200, isBoss: true, element: ElementType.Fire,
        expReward: 37500, goldReward: 10000,
        dropTable: [
            { materialType: MaterialType.FissionCrystal, chance: 0.2, minQty: 1, maxQty: 1 }, // Rất khó rơi
            { materialType: MaterialType.Ore, chance: 0.8, minQty: 20, maxQty: 50 },
             { materialType: MaterialType.SoulDust, chance: 0.3, minQty: 5, maxQty: 10 }
        ]
    }
  ],
  'z5_time': [
      {
          id: 'e5_boss', name: 'Kẻ Gìn Giữ Thời Gian (Final Boss)', level: 99, hp: 666666, maxHp: 666666, attack: 12000, defense: 6000, isBoss: true, element: ElementType.Lightning,
          expReward: 150000, goldReward: 50000,
          dropTable: [
              { materialType: MaterialType.CondensedTimesand, chance: 0.05, minQty: 1, maxQty: 1 }, // 5% cơ hội
              { materialType: MaterialType.SoulDust, chance: 0.5, minQty: 10, maxQty: 20 },
              { materialType: MaterialType.Gem, chance: 0.5, minQty: 5, maxQty: 10 }
          ]
      }
  ]
};

// --- CONSTANTS CHO HỆ THỐNG MỚI ---

export const GEM_STATS = {
  [GemType.Ruby]: { [GemTier.Chipped]: 2, [GemTier.Flawed]: 5, [GemTier.Normal]: 10, [GemTier.Flawless]: 20, [GemTier.Perfect]: 50 }, // Attack
  [GemType.Sapphire]: { [GemTier.Chipped]: 2, [GemTier.Flawed]: 5, [GemTier.Normal]: 10, [GemTier.Flawless]: 20, [GemTier.Perfect]: 50 }, // Defense
  [GemType.Topaz]: { [GemTier.Chipped]: 10, [GemTier.Flawed]: 25, [GemTier.Normal]: 50, [GemTier.Flawless]: 100, [GemTier.Perfect]: 250 } // HP
};

export const ENCHANT_STATS = {
  [EnchantmentType.Sharpness]: { desc: "+15% Tấn công", multAtk: 0.15 },
  [EnchantmentType.Protection]: { desc: "+15% Phòng thủ", multDef: 0.15 },
  [EnchantmentType.Vampirism]: { desc: "Hồi 5% HP khi đánh", lifesteal: 0.05 },
  [EnchantmentType.Fortune]: { desc: "+20% Tỷ lệ rơi đồ", dropRate: 0.20 }
};

export const CLASS_INFO = {
  [CharacterClass.HeavySentinel]: {
    name: "Chiến Binh Giáp Nặng",
    desc: "Bậc thầy cận chiến và phòng thủ.",
    bonuses: "Tăng 10% khả năng tìm Quặng. Tăng 10% Phòng thủ gốc."
  },
  [CharacterClass.ShadowBlade]: {
    name: "Sát Thủ Bóng Đêm",
    desc: "Nhanh nhẹn và chết chóc.",
    bonuses: "Giảm 10% thời gian đánh (Tốc độ). Tăng 10% Tấn công gốc."
  },
  [CharacterClass.AlchemistMage]: {
    name: "Pháp Sư Luyện Kim",
    desc: "Thông thái và khéo léo.",
    bonuses: "Tăng 15% khả năng tìm Bụi Linh Hồn. Tăng hiệu quả hồi phục."
  }
};

// Định nghĩa Set (Giữ nguyên)
export const SETS: Record<SetId, { name: string, bonuses: Record<number, string> }> = {
  [SetId.ForgeSpirit]: {
    name: "Tinh Thần Lò Rèn",
    bonuses: {
      2: "Tập Trung: Tăng 5% cơ hội Chế tạo Đồ hiếm.",
      4: "Đòn Thấu Quang: Đòn đánh bỏ qua 20% Giáp đối thủ.",
      6: "Hồi Sinh Vô Tận: 1 lần hồi sinh/trận với 50% HP."
    }
  },
  [SetId.PrimalHunter]: {
    name: "Kẻ Săn Mồi Viễn Cổ",
    bonuses: {
      2: "Sức Mạnh Tàn Bạo: +15% Sát thương lên Boss.",
      4: "Săn Đuổi: Giảm 20% thời gian hồi đòn đánh.",
      6: "Phản Ứng Nguyên Tố: Tăng 30% Sát thương Chí mạng."
    }
  },
  [SetId.DragonfireKeeper]: {
    name: "Hỏa Long Sứ",
    bonuses: {
        2: "Kháng Nhiệt: Giảm 30% Sát thương Lửa nhận vào.",
        4: "Dung Nham Phản Phệ: Phản lại 20% sát thương khi bị đánh.",
        6: "Hơi Thở Rồng: Đòn đánh có 10% cơ hội gây thêm 500% sát thương chuẩn."
    }
  },
  [SetId.InfinityChrono]: {
      name: "Thời Gian Vô Tận",
      bonuses: {
          2: "Tốc Độ Ánh Sáng: Giảm 50% thời gian đánh tự động.",
          4: "Quay Ngược: Khi HP < 20%, tự động hồi 100% HP (Cooldown 5 phút).",
          6: "Lãnh Chúa Thời Gian: Sát thương tăng theo thời gian trận đấu (1% mỗi giây)."
      }
  }
};

// Kỹ Năng (Giữ nguyên)
export const SKILLS: Skill[] = [
  {
    id: 'wp_mastery',
    name: 'Bậc Thầy Vũ Khí',
    description: 'Tăng sát thương cho mọi vũ khí bạn chế tạo.',
    branch: SkillBranch.WeaponSmith,
    maxLevel: 10,
    cost: 1,
    effectValue: 2
  },
  {
    id: 'wp_crit',
    name: 'Điểm Yếu Tinh Xảo',
    description: 'Tăng cơ hội chí mạng khi sử dụng vũ khí.',
    branch: SkillBranch.WeaponSmith,
    maxLevel: 5,
    cost: 2,
    effectValue: 1
  },
  {
    id: 'ar_mastery',
    name: 'Lớp Giáp Hoàn Hảo',
    description: 'Tăng chỉ số phòng thủ cho giáp bạn chế tạo.',
    branch: SkillBranch.ArmorSmith,
    maxLevel: 10,
    cost: 1,
    effectValue: 2 
  },
  {
    id: 'al_efficiency',
    name: 'Tiết Kiệm Nguyên Liệu',
    description: 'Giảm lượng nguyên liệu cần thiết (mô phỏng bằng cách hoàn trả).',
    branch: SkillBranch.Alchemy,
    maxLevel: 5,
    cost: 3,
    effectValue: 5
  },
  {
    id: 'en_overheat',
    name: 'Kiểm Soát Nhiệt',
    description: 'Giảm rủi ro thất bại khi Tăng Nhiệt Lò Rèn.',
    branch: SkillBranch.Enchanting,
    maxLevel: 5,
    cost: 2,
    effectValue: 5
  }
];

// Nâng cấp Vĩnh hằng (Giữ nguyên)
export const ETERNAL_UPGRADES: EternalUpgrade[] = [
    {
        id: EternalUpgradeId.HuntersEye,
        name: "Mắt Thợ Săn",
        description: "Tăng tỷ lệ rơi nguyên liệu hiếm.",
        maxLevel: 10,
        baseCost: 50,
        costMultiplier: 1.5,
        effectValue: 1 
    },
    {
        id: EternalUpgradeId.SolidFoundation,
        name: "Nền Tảng Vững Chắc",
        description: "Giữ lại một lượng Gỗ & Quặng sau khi Tái sinh.",
        maxLevel: 5,
        baseCost: 150,
        costMultiplier: 2,
        effectValue: 20 
    },
    {
        id: EternalUpgradeId.LearnFromFailure,
        name: "Học Hỏi Từ Thất Bại",
        description: "Giảm tỷ lệ thất bại khi rèn đồ (đặc biệt là Overheat).",
        maxLevel: 5,
        baseCost: 250,
        costMultiplier: 1.5,
        effectValue: 2 
    },
    {
        id: EternalUpgradeId.LatentPower,
        name: "Sức Mạnh Tiềm Ẩn",
        description: "Tăng vĩnh viễn mọi chỉ số (Máu, Công, Thủ) thêm %.",
        maxLevel: 10,
        baseCost: 500,
        costMultiplier: 1.8,
        effectValue: 5 
    }
];

// Bản thiết kế (Mở rộng thêm Giấy Phép Thuật)
export const INITIAL_BLUEPRINTS: Blueprint[] = [
  // --- CONSUMABLES MỚI ---
  {
      id: 'bp_anti_rust',
      name: 'Thuốc Giải Rỉ Sét',
      resultType: 'MATERIAL',
      resultMaterial: MaterialType.AntiRustPotion,
      unlocked: true,
      requiredMaterials: [{ type: MaterialType.Essence, amount: 2 }, { type: MaterialType.Gem, amount: 1 }],
      baseStats: { minAtk: 0, maxAtk: 0, minDef: 0, maxDef: 0 }
  },
  {
      id: 'bp_decoy',
      name: 'Vật Phẩm Mồi',
      resultType: 'MATERIAL',
      resultMaterial: MaterialType.DecoyItem,
      unlocked: true,
      requiredMaterials: [{ type: MaterialType.Ore, amount: 5 }, { type: MaterialType.Wood, amount: 5 }],
      baseStats: { minAtk: 0, maxAtk: 0, minDef: 0, maxDef: 0 }
  },
  {
    id: 'bp_enchant_scroll',
    name: 'Giấy Phép Thuật',
    resultType: 'MATERIAL',
    resultMaterial: MaterialType.EnchantScroll,
    unlocked: true,
    requiredMaterials: [{ type: MaterialType.SoulDust, amount: 5 }, { type: MaterialType.Leather, amount: 2 }],
    baseStats: { minAtk: 0, maxAtk: 0, minDef: 0, maxDef: 0 }
  },
  // --- WEAPONS & ARMORS ---
  {
    id: 'bp_sword_1',
    name: 'Kiếm Sắt',
    resultType: EquipmentType.Weapon,
    element: ElementType.Physical,
    unlocked: true,
    requiredMaterials: [{ type: MaterialType.Ore, amount: 3 }, { type: MaterialType.Wood, amount: 1 }],
    baseStats: { minAtk: 5, maxAtk: 10, minDef: 0, maxDef: 0 }
  },
  {
    id: 'bp_sword_ice',
    name: 'Băng Kiếm',
    resultType: EquipmentType.Weapon,
    element: ElementType.Ice,
    unlocked: true,
    requiredMaterials: [{ type: MaterialType.Ore, amount: 5 }, { type: MaterialType.Gem, amount: 2 }],
    baseStats: { minAtk: 15, maxAtk: 25, minDef: 0, maxDef: 0 }
  },
  {
    id: 'bp_armor_1',
    name: 'Áo Giáp Da',
    resultType: EquipmentType.Armor,
    unlocked: true,
    requiredMaterials: [{ type: MaterialType.Leather, amount: 5 }],
    baseStats: { minAtk: 0, maxAtk: 0, minDef: 3, maxDef: 8 }
  },
  // Set Tinh Thần Lò Rèn
  {
    id: 'bp_set1_helm',
    name: 'Mũ Tinh Thần',
    resultType: EquipmentType.Helmet,
    unlocked: true,
    setId: SetId.ForgeSpirit,
    requiredMaterials: [{ type: MaterialType.Ore, amount: 10 }, { type: MaterialType.Gem, amount: 1 }],
    baseStats: { minAtk: 2, maxAtk: 5, minDef: 5, maxDef: 10 }
  },
  {
    id: 'bp_set1_glove',
    name: 'Găng Tay Tinh Thần',
    resultType: EquipmentType.Gloves,
    unlocked: true,
    setId: SetId.ForgeSpirit,
    requiredMaterials: [{ type: MaterialType.Leather, amount: 8 }, { type: MaterialType.Ore, amount: 5 }],
    baseStats: { minAtk: 3, maxAtk: 6, minDef: 3, maxDef: 6 }
  },
  {
    id: 'bp_set1_sword',
    name: 'Kiếm Tinh Thần',
    resultType: EquipmentType.Weapon,
    unlocked: false, 
    setId: SetId.ForgeSpirit,
    requiredMaterials: [{ type: MaterialType.Ore, amount: 20 }, { type: MaterialType.Gem, amount: 3 }],
    baseStats: { minAtk: 30, maxAtk: 50, minDef: 0, maxDef: 5 }
  },
  // Set Hỏa Long Sứ
  {
    id: 'bp_set3_amulet',
    name: 'Vòng Cổ Hỏa Long',
    resultType: EquipmentType.Accessory,
    unlocked: false,
    setId: SetId.DragonfireKeeper,
    requiredMaterials: [{ type: MaterialType.FissionCrystal, amount: 1 }, { type: MaterialType.Essence, amount: 50 }],
    baseStats: { minAtk: 100, maxAtk: 150, minDef: 50, maxDef: 80 }
  },
  // --- GUILD / LATE GAME BLUEPRINTS ---
  {
      id: 'bp_set_chrono_sword',
      name: 'Vô Tận Kiếm',
      resultType: EquipmentType.Weapon,
      unlocked: false,
      isGuildBlueprint: true,
      guildFameCost: 1000,
      setId: SetId.InfinityChrono,
      element: ElementType.Lightning,
      requiredMaterials: [{ type: MaterialType.CondensedTimesand, amount: 2 }, { type: MaterialType.FissionCrystal, amount: 5 }],
      baseStats: { minAtk: 200, maxAtk: 300, minDef: 0, maxDef: 0 }
  },
  {
      id: 'bp_set_chrono_armor',
      name: 'Giáp Vô Tận',
      resultType: EquipmentType.Armor,
      unlocked: false,
      isGuildBlueprint: true,
      guildFameCost: 1000,
      setId: SetId.InfinityChrono,
      requiredMaterials: [{ type: MaterialType.CondensedTimesand, amount: 2 }, { type: MaterialType.FissionCrystal, amount: 5 }],
      baseStats: { minAtk: 0, maxAtk: 0, minDef: 150, maxDef: 200 }
  }
];

export const RARITY_MULTIPLIER: Record<Rarity, number> = {
  [Rarity.Common]: 1,
  [Rarity.Rare]: 1.5,
  [Rarity.Epic]: 2.5,
  [Rarity.Legendary]: 5,
  [Rarity.Mythic]: 10
};

export const RARITY_COLOR: Record<Rarity, string> = {
  [Rarity.Common]: 'text-gray-400',
  [Rarity.Rare]: 'text-blue-400',
  [Rarity.Epic]: 'text-purple-400',
  [Rarity.Legendary]: 'text-yellow-400',
  [Rarity.Mythic]: 'text-red-500'
};
