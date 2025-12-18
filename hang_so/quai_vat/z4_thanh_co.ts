
import { Enemy, ElementType, MaterialType, MonsterAbility } from '../../kieu_du_lieu';

export const QUAI_VAT_THANH_CO: Enemy[] = [
  { 
    id: 'e4_1', name: 'Chiến Binh Xương', level: 100, hp: 850000, maxHp: 850000, attack: 150000, defense: 95000, 
    element: ElementType.Physical, expReward: 250000, goldReward: 150000, 
    dropTable: [{ materialType: MaterialType.OldBone, chance: 0.8, minQty: 20, maxQty: 50 }] 
  },
  { 
    id: 'e4_boss', name: 'Vong Hồn Đại Tướng', level: 150, hp: 15000000, maxHp: 15000000, attack: 2500000, defense: 1800000, 
    element: ElementType.Void, isBoss: true, abilities: [MonsterAbility.Silence, MonsterAbility.LifeSteal], 
    expReward: 5000000, goldReward: 3500000, 
    dropTable: [{ materialType: MaterialType.WillOfDead, chance: 1, minQty: 5, maxQty: 15 }] 
  }
];
