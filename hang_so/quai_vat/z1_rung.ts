
import { Enemy, ElementType, MaterialType } from '../../kieu_du_lieu';

export const QUAI_VAT_RUNG: Enemy[] = [
  { 
    id: 'e1_1', name: 'Slime Xanh', level: 1, hp: 100, maxHp: 100, attack: 15, defense: 2, 
    element: ElementType.Physical, expReward: 20, goldReward: 15, 
    dropTable: [{ materialType: MaterialType.SlimeResin, chance: 0.8, minQty: 1, maxQty: 3 }] 
  },
  { 
    id: 'e1_2', name: 'Soi Xam', level: 5, hp: 500, maxHp: 500, attack: 50, defense: 10, 
    element: ElementType.Physical, expReward: 100, goldReward: 50, 
    dropTable: [{ materialType: MaterialType.WolfSkin, chance: 0.7, minQty: 2, maxQty: 5 }] 
  },
  { 
    id: 'e1_3', name: 'Nhen Rung Ram', level: 8, hp: 1200, maxHp: 1200, attack: 120, defense: 30, 
    element: ElementType.Physical, expReward: 350, goldReward: 180, 
    dropTable: [{ materialType: MaterialType.SpiderSilk, chance: 0.6, minQty: 3, maxQty: 8 }] 
  },
  { 
    id: 'e1_boss', name: 'Vua Slime Hoang Kim', level: 15, hp: 10000, maxHp: 10000, attack: 850, defense: 450, 
    element: ElementType.Physical, isBoss: true, expReward: 2500, goldReward: 2000, 
    dropTable: [{ materialType: MaterialType.SlimeResin, chance: 1, minQty: 50, maxQty: 100 }] 
  }
];
