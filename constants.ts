import { Blueprint, Enemy, EquipmentType, MaterialType, Rarity, Zone } from './types';

// Danh sách khu vực
export const ZONES: Zone[] = [
  {
    id: 'z1',
    name: 'Rừng Chết',
    description: 'Nơi sinh sống của loài sói ma và cây ăn thịt. Nguồn cung cấp Gỗ và Da.',
    recommendedLevel: 1,
    materials: [MaterialType.Wood, MaterialType.Leather],
    enemies: [] // Sẽ được điền bên dưới để tránh lỗi vòng tròn (nhưng trong file này ta định nghĩa enemy riêng)
  },
  {
    id: 'z2',
    name: 'Mỏ Đá Cổ',
    description: 'Hầm ngục bỏ hoang đầy rẫy golem. Nơi tốt nhất để tìm Quặng.',
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
  }
];

// Danh sách quái vật mẫu
export const ENEMIES_DB: Record<string, Enemy[]> = {
  'z1': [
    {
      id: 'e1_1', name: 'Sói Xám', level: 1, hp: 50, maxHp: 50, attack: 5, defense: 0, isBoss: false,
      expReward: 15, goldReward: 5,
      dropTable: [{ materialType: MaterialType.Leather, chance: 0.8, minQty: 1, maxQty: 2 }]
    },
    {
      id: 'e1_2', name: 'Mộc Tinh', level: 3, hp: 80, maxHp: 80, attack: 8, defense: 2, isBoss: false,
      expReward: 25, goldReward: 8,
      dropTable: [{ materialType: MaterialType.Wood, chance: 0.8, minQty: 1, maxQty: 3 }]
    },
    {
      id: 'e1_boss', name: 'Vua Sói Ma (Boss)', level: 10, hp: 500, maxHp: 500, attack: 25, defense: 10, isBoss: true,
      expReward: 350, goldReward: 100,
      dropTable: [
        { materialType: MaterialType.Leather, chance: 1, minQty: 5, maxQty: 10 },
        { materialType: MaterialType.Gem, chance: 0.5, minQty: 1, maxQty: 1 }
      ]
    }
  ],
  'z2': [
    {
      id: 'e2_1', name: 'Golem Đá', level: 12, hp: 300, maxHp: 300, attack: 20, defense: 20, isBoss: false,
      expReward: 65, goldReward: 20,
      dropTable: [{ materialType: MaterialType.Ore, chance: 0.7, minQty: 2, maxQty: 4 }]
    },
    {
      id: 'e2_boss', name: 'Người Khổng Lồ Đá (Boss)', level: 20, hp: 1500, maxHp: 1500, attack: 60, defense: 50, isBoss: true,
      expReward: 800, goldReward: 300,
      dropTable: [{ materialType: MaterialType.Ore, chance: 1, minQty: 10, maxQty: 20 }, { materialType: MaterialType.Gem, chance: 0.8, minQty: 2, maxQty: 5 }]
    }
  ],
  'z3': [
    {
      id: 'e3_1', name: 'Quỷ Lửa', level: 28, hp: 800, maxHp: 800, attack: 80, defense: 30, isBoss: false,
      expReward: 180, goldReward: 50,
      dropTable: [{ materialType: MaterialType.Essence, chance: 0.6, minQty: 1, maxQty: 2 }]
    },
    {
      id: 'e3_boss', name: 'Rồng Hỏa Tinh (World Boss)', level: 50, hp: 10000, maxHp: 10000, attack: 200, defense: 150, isBoss: true,
      expReward: 8000, goldReward: 2000,
      dropTable: [{ materialType: MaterialType.Essence, chance: 1, minQty: 5, maxQty: 10 }, { materialType: MaterialType.Gem, chance: 1, minQty: 5, maxQty: 10 }]
    }
  ]
};

// Bản thiết kế cơ bản
export const INITIAL_BLUEPRINTS: Blueprint[] = [
  {
    id: 'bp_sword_1',
    name: 'Kiếm Sắt',
    resultType: EquipmentType.Weapon,
    unlocked: true,
    requiredMaterials: [
      { type: MaterialType.Ore, amount: 3 },
      { type: MaterialType.Wood, amount: 1 }
    ],
    baseStats: { minAtk: 5, maxAtk: 10, minDef: 0, maxDef: 0 }
  },
  {
    id: 'bp_armor_1',
    name: 'Áo Giáp Da',
    resultType: EquipmentType.Armor,
    unlocked: true,
    requiredMaterials: [
      { type: MaterialType.Leather, amount: 5 }
    ],
    baseStats: { minAtk: 0, maxAtk: 0, minDef: 3, maxDef: 8 }
  },
  {
    id: 'bp_sword_2',
    name: 'Đại Đao Tinh Thể',
    resultType: EquipmentType.Weapon,
    unlocked: false, // Cần đánh boss hoặc mua để mở
    requiredMaterials: [
      { type: MaterialType.Ore, amount: 10 },
      { type: MaterialType.Gem, amount: 2 }
    ],
    baseStats: { minAtk: 25, maxAtk: 40, minDef: 0, maxDef: 5 }
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