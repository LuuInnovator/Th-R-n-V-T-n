
import { Enemy, ElementType, MaterialType, MonsterAbility } from '../../kieu_du_lieu';

export const QUAI_VAT_HANG_DONG: Enemy[] = [
  { 
    id: 'e2_1', name: 'Bọ Giáp Sắt', level: 20, hp: 8000, maxHp: 8000, attack: 650, defense: 800, 
    element: ElementType.Physical, expReward: 1200, goldReward: 800, 
    dropTable: [{ materialType: MaterialType.IronScraps, chance: 0.7, minQty: 5, maxQty: 15 }] 
  },
  { 
    id: 'e2_2', name: 'Dơi Quỷ', level: 25, hp: 12000, maxHp: 12000, attack: 1200, defense: 400, 
    element: ElementType.Physical, expReward: 2500, goldReward: 1500, 
    dropTable: [{ materialType: MaterialType.BatWing, chance: 0.65, minQty: 4, maxQty: 12 }] 
  },
  { 
    id: 'e2_boss', name: 'Golem Cổ Đại', level: 45, hp: 250000, maxHp: 250000, attack: 8500, defense: 12000, 
    element: ElementType.Physical, isBoss: true, abilities: [MonsterAbility.Stun, MonsterAbility.ArmorBreak], 
    expReward: 45000, goldReward: 35000, 
    dropTable: [{ materialType: MaterialType.GolemCore, chance: 1, minQty: 3, maxQty: 8 }] 
  }
];
