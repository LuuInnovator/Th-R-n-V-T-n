
import { Enemy, ElementType, MaterialType, MonsterAbility } from '../../kieu_du_lieu';

export const QUAI_VAT_LONG_CUNG: Enemy[] = [
  { 
    id: 'e5_1', name: 'Long Nhân Tuần Tra', level: 300, hp: 150000000, maxHp: 150000000, attack: 18000000, defense: 12000000, 
    element: ElementType.Fire, expReward: 55000000, goldReward: 35000000, 
    dropTable: [{ materialType: MaterialType.DragonScale, chance: 0.7, minQty: 25, maxQty: 60 }] 
  },
  { 
    id: 'e5_1b', name: 'Tinh Linh Lửa Cháy', level: 350, hp: 280000000, maxHp: 280000000, attack: 35000000, defense: 8000000, 
    element: ElementType.Fire, expReward: 85000000, goldReward: 55000000, 
    dropTable: [{ materialType: MaterialType.LavaRock, chance: 0.8, minQty: 15, maxQty: 45 }] 
  },
  { 
    id: 'e5_2', name: 'Chiến Binh Long Tộc', level: 450, hp: 650000000, maxHp: 650000000, attack: 75000000, defense: 45000000, 
    element: ElementType.Physical, expReward: 250000000, goldReward: 150000000, 
    abilities: [MonsterAbility.ArmorBreak],
    dropTable: [{ materialType: MaterialType.DragonBlood, chance: 0.6, minQty: 10, maxQty: 25 }] 
  },
  { 
    id: 'e5_boss', name: 'Hỏa Long Vương Bất Diệt', level: 600, hp: 5500000000, maxHp: 5500000000, attack: 450000000, defense: 250000000, 
    element: ElementType.Fire, isBoss: true, abilities: [MonsterAbility.ArmorBreak, MonsterAbility.Regen, MonsterAbility.Reflect], 
    expReward: 1500000000, goldReward: 1200000000, 
    dropTable: [
        { materialType: MaterialType.AncientDragonBone, chance: 1, minQty: 15, maxQty: 40 },
        { materialType: MaterialType.PearlOfPower, chance: 0.7, minQty: 5, maxQty: 15 },
        { materialType: MaterialType.GoldOre, chance: 0.8, minQty: 500, maxQty: 2000 }
    ] 
  }
];
