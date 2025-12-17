
import { Enemy, ElementType, MaterialType, MonsterAbility } from '../types';

export const ENEMIES_DB: Record<string, Enemy[]> = {
  z1: [
    { id: 'e1_1', name: 'Slime Xanh', level: 1, hp: 100, maxHp: 100, attack: 15, defense: 2, element: ElementType.Physical, expReward: 20, goldReward: 15, dropTable: [{ materialType: MaterialType.SlimeResin, chance: 0.8, minQty: 1, maxQty: 3 }] },
    { id: 'e1_boss', name: 'Vua Slime Hoàng Kim', level: 15, hp: 10000, maxHp: 10000, attack: 850, defense: 450, element: ElementType.Physical, isBoss: true, expReward: 2500, goldReward: 2000, dropTable: [{ materialType: MaterialType.SlimeResin, chance: 1, minQty: 50, maxQty: 100 }] }
  ],
  z7: [
    { id: 'e7_final', name: 'Chúa Tể Hư Không', level: 999, hp: 2500000000, maxHp: 2500000000, attack: 150000000, defense: 120000000, element: ElementType.Void, isBoss: true, minRebirth: 15, abilities: [MonsterAbility.Dodge, MonsterAbility.Reflect, MonsterAbility.Silence, MonsterAbility.Stun, MonsterAbility.Regen], expReward: 999999, goldReward: 999999, dropTable: [{ materialType: MaterialType.RealityTear, chance: 1, minQty: 500, maxQty: 1500 }, { materialType: MaterialType.EternalSpark, chance: 1, minQty: 50, maxQty: 100 }] }
  ]
};
