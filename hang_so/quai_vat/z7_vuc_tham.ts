
import { Enemy, ElementType, MaterialType, MonsterAbility } from '../../kieu_du_lieu';

export const QUAI_VAT_VUC_THAM: Enemy[] = [
  { 
    id: 'e7_1', name: 'Tầm Đạo Giả Hư Không', level: 800, hp: 15000000000, maxHp: 15000000000, attack: 1200000000, defense: 850000000, 
    element: ElementType.Void, expReward: 5500000000, goldReward: 3500000000, 
    abilities: [MonsterAbility.Silence, MonsterAbility.Dodge],
    dropTable: [{ materialType: MaterialType.VoidShard, chance: 0.8, minQty: 100, maxQty: 300 }] 
  },
  { 
    id: 'e7_2', name: 'Ác Mộng Vô Hình', level: 1200, hp: 45000000000, maxHp: 45000000000, attack: 3500000000, defense: 1500000000, 
    element: ElementType.Void, expReward: 15000000000, goldReward: 8500000000, 
    abilities: [MonsterAbility.LifeSteal, MonsterAbility.Stun],
    dropTable: [{ materialType: MaterialType.DarkEssence, chance: 0.7, minQty: 50, maxQty: 150 }] 
  },
  { 
    id: 'e7_final', name: 'Chúa Tể Hư Không Tối Thượng', level: 2500, hp: 500000000000, maxHp: 500000000000, attack: 25000000000, defense: 15000000000, 
    element: ElementType.Void, isBoss: true, minRebirth: 15, 
    abilities: [MonsterAbility.Dodge, MonsterAbility.Reflect, MonsterAbility.Silence, MonsterAbility.Stun, MonsterAbility.Regen, MonsterAbility.LifeSteal], 
    expReward: 99999999999, goldReward: 99999999999, 
    dropTable: [
        { materialType: MaterialType.RealityTear, chance: 1, minQty: 1500, maxQty: 5000 }, 
        { materialType: MaterialType.EternalSpark, chance: 1, minQty: 200, maxQty: 500 },
        { materialType: MaterialType.OmniStone, chance: 0.5, minQty: 10, maxQty: 30 },
        { materialType: MaterialType.VoidCore, chance: 1, minQty: 50, maxQty: 100 }
    ] 
  }
];
