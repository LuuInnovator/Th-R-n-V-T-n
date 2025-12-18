
import { Enemy, ElementType, MaterialType, MonsterAbility } from '../../kieu_du_lieu';

export const QUAI_VAT_NUI_TUYET: Enemy[] = [
  { 
    id: 'e3_1', name: 'Sói Tuyết', level: 50, hp: 85000, maxHp: 85000, attack: 12000, defense: 5000, 
    element: ElementType.Ice, expReward: 15000, goldReward: 10000, 
    dropTable: [{ materialType: MaterialType.WarmFur, chance: 0.7, minQty: 10, maxQty: 25 }] 
  },
  { 
    id: 'e3_2', name: 'Ma Tuyết', level: 60, hp: 150000, maxHp: 150000, attack: 25000, defense: 8000, 
    element: ElementType.Ice, expReward: 35000, goldReward: 22000, 
    dropTable: [{ materialType: MaterialType.SnowCrystal, chance: 0.6, minQty: 8, maxQty: 20 }] 
  },
  { 
    id: 'e3_boss', name: 'Yeti Bạo Chúa', level: 85, hp: 1500000, maxHp: 1500000, attack: 120000, defense: 85000, 
    element: ElementType.Ice, isBoss: true, abilities: [MonsterAbility.Freeze, MonsterAbility.Regen], 
    expReward: 500000, goldReward: 350000, 
    dropTable: [{ materialType: MaterialType.FrozenHeart, chance: 1, minQty: 2, maxQty: 5 }] 
  }
];
