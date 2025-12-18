import { Enemy, ElementType, MaterialType, MonsterAbility } from '../../kieu_du_lieu';

export const QUAI_VAT_NUI_TUYET: Enemy[] = [
  { 
    id: 'e3_1', name: 'Sói Tuyết Băng Giá', level: 55, hp: 120000, maxHp: 120000, attack: 15000, defense: 8000, 
    element: ElementType.Ice, expReward: 25000, goldReward: 15000, 
    abilities: [MonsterAbility.Freeze],
    dropTable: [{ materialType: MaterialType.WarmFur, chance: 0.7, minQty: 10, maxQty: 25 }] 
  },
  { 
    id: 'e3_1b', name: 'Đại Bàng Tuyết', level: 60, hp: 180000, maxHp: 180000, attack: 22000, defense: 5000, 
    element: ElementType.Lightning, expReward: 35000, goldReward: 20000, 
    abilities: [MonsterAbility.Dodge],
    dropTable: [{ materialType: MaterialType.IceShard, chance: 0.6, minQty: 15, maxQty: 35 }] 
  },
  { 
    id: 'e3_2', name: 'Ma Tuyết Vong Hồn', level: 70, hp: 350000, maxHp: 350000, attack: 45000, defense: 12000, 
    element: ElementType.Ice, expReward: 75000, goldReward: 45000, 
    abilities: [MonsterAbility.Freeze, MonsterAbility.Silence],
    dropTable: [{ materialType: MaterialType.SnowCrystal, chance: 0.7, minQty: 10, maxQty: 25 }] 
  },
  { 
    id: 'e3_3', name: 'Người Đá Băng Tinh', level: 80, hp: 850000, maxHp: 850000, attack: 65000, defense: 45000, 
    element: ElementType.Physical, expReward: 150000, goldReward: 95000, 
    // Sửa lỗi: Sử dụng MonsterAbility.Hardened đã được định nghĩa trong kieu_du_lieu.ts
    abilities: [MonsterAbility.Hardened],
    dropTable: [{ materialType: MaterialType.IceShard, chance: 0.8, minQty: 30, maxQty: 60 }] 
  },
  { 
    id: 'e3_boss', name: 'Yeti Bạo Chúa Độc Tôn', level: 100, hp: 3500000, maxHp: 3500000, attack: 250000, defense: 180000, 
    element: ElementType.Ice, isBoss: true, abilities: [MonsterAbility.Freeze, MonsterAbility.Regen, MonsterAbility.Stun], 
    expReward: 1200000, goldReward: 850000, 
    dropTable: [
        { materialType: MaterialType.FrozenHeart, chance: 1, minQty: 3, maxQty: 8 },
        { materialType: MaterialType.YetiFur, chance: 0.8, minQty: 20, maxQty: 50 }
    ] 
  }
];