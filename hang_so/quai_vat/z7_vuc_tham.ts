
import { Enemy, ElementType, MaterialType, MonsterAbility } from '../../kieu_du_lieu';

export const QUAI_VAT_VUC_THAM: Enemy[] = [
  { 
    id: 'e7_final', name: 'Chúa Tể Hư Không', level: 999, hp: 2500000000, maxHp: 2500000000, attack: 150000000, defense: 120000000, 
    element: ElementType.Void, isBoss: true, minRebirth: 15, 
    abilities: [MonsterAbility.Dodge, MonsterAbility.Reflect, MonsterAbility.Silence, MonsterAbility.Stun, MonsterAbility.Regen], 
    expReward: 9999999, goldReward: 9999999, 
    dropTable: [
        { materialType: MaterialType.RealityTear, chance: 1, minQty: 500, maxQty: 1500 }, 
        { materialType: MaterialType.EternalSpark, chance: 1, minQty: 50, maxQty: 100 }
    ] 
  }
];
