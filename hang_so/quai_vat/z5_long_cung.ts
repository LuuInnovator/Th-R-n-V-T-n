
import { Enemy, ElementType, MaterialType, MonsterAbility } from '../../kieu_du_lieu';

export const QUAI_VAT_LONG_CUNG: Enemy[] = [
  { 
    id: 'e5_1', name: 'Long Nhân Tuần Tra', level: 180, hp: 45000000, maxHp: 45000000, attack: 6500000, defense: 4200000, 
    element: ElementType.Fire, expReward: 12000000, goldReward: 8500000, 
    dropTable: [{ materialType: MaterialType.DragonScale, chance: 0.6, minQty: 15, maxQty: 40 }] 
  },
  { 
    id: 'e5_boss', name: 'Hỏa Long Vương', level: 350, hp: 850000000, maxHp: 850000000, attack: 120000000, defense: 85000000, 
    element: ElementType.Fire, isBoss: true, abilities: [MonsterAbility.ArmorBreak, MonsterAbility.Regen], 
    expReward: 250000000, goldReward: 180000000, 
    dropTable: [{ materialType: MaterialType.AncientDragonBone, chance: 1, minQty: 5, maxQty: 12 }] 
  }
];
