
import { Enemy, ElementType, MaterialType, MonsterAbility } from '../../kieu_du_lieu';

export const QUAI_VAT_HANG_DONG: Enemy[] = [
  { 
    id: 'e2_1', name: 'Bọ Giáp Sắt Kiên Cố', level: 22, hp: 10000, maxHp: 10000, attack: 850, defense: 1000, 
    element: ElementType.Physical, expReward: 1800, goldReward: 1200, 
    dropTable: [{ materialType: MaterialType.IronScraps, chance: 0.8, minQty: 8, maxQty: 18 }] 
  },
  { 
    id: 'e2_1b', name: 'Goblin Đào Mỏ', level: 25, hp: 15000, maxHp: 15000, attack: 1400, defense: 600, 
    element: ElementType.Physical, expReward: 2800, goldReward: 2500, 
    dropTable: [
        { materialType: MaterialType.RawCopperOre, chance: 0.7, minQty: 10, maxQty: 25 },
        { materialType: MaterialType.GoblinEar, chance: 0.4, minQty: 1, maxQty: 2 }
    ] 
  },
  { 
    id: 'e2_2', name: 'Dơi Quỷ Hút Máu', level: 30, hp: 22000, maxHp: 22000, attack: 2800, defense: 800, 
    element: ElementType.Void, expReward: 5500, goldReward: 3800, 
    abilities: [MonsterAbility.LifeSteal],
    dropTable: [{ materialType: MaterialType.BatWing, chance: 0.7, minQty: 6, maxQty: 15 }] 
  },
  { 
    id: 'e2_3', name: 'Pháp Sư Goblin', level: 35, hp: 45000, maxHp: 45000, attack: 6500, defense: 1500, 
    element: ElementType.Lightning, expReward: 12000, goldReward: 8500, 
    abilities: [MonsterAbility.Stun],
    dropTable: [{ materialType: MaterialType.MagicDust, chance: 0.6, minQty: 4, maxQty: 10 }] 
  },
  { 
    id: 'e2_boss', name: 'Golem Cổ Đại Ngàn Năm', level: 50, hp: 450000, maxHp: 450000, attack: 15000, defense: 22000, 
    element: ElementType.Physical, isBoss: true, abilities: [MonsterAbility.Stun, MonsterAbility.ArmorBreak, MonsterAbility.Reflect], 
    expReward: 85000, goldReward: 65000, 
    dropTable: [
        { materialType: MaterialType.GolemCore, chance: 1, minQty: 5, maxQty: 12 },
        { materialType: MaterialType.SilverOre, chance: 0.5, minQty: 20, maxQty: 50 }
    ] 
  }
];
