
import { Enemy, ElementType, MaterialType, MonsterAbility } from '../../kieu_du_lieu';

export const QUAI_VAT_RUNG: Enemy[] = [
  { 
    id: 'e1_1', name: 'Slime Xanh Nhớt', level: 1, hp: 120, maxHp: 120, attack: 18, defense: 2, 
    element: ElementType.Nature, expReward: 25, goldReward: 20, 
    dropTable: [{ materialType: MaterialType.SlimeResin, chance: 0.8, minQty: 1, maxQty: 3 }] 
  },
  { 
    id: 'e1_1b', name: 'Ong Bắp Cày Độc', level: 3, hp: 250, maxHp: 250, attack: 45, defense: 5, 
    element: ElementType.Nature, expReward: 45, goldReward: 35, 
    dropTable: [{ materialType: MaterialType.BeeSting, chance: 0.6, minQty: 1, maxQty: 2 }] 
  },
  { 
    id: 'e1_2', name: 'Sói Xám Hung Dữ', level: 6, hp: 650, maxHp: 650, attack: 75, defense: 15, 
    element: ElementType.Physical, expReward: 120, goldReward: 70, 
    dropTable: [
        { materialType: MaterialType.WolfSkin, chance: 0.7, minQty: 2, maxQty: 4 },
        { materialType: MaterialType.WolfFang, chance: 0.4, minQty: 1, maxQty: 2 }
    ] 
  },
  { 
    id: 'e1_3', name: 'Nhện Rừng Bẫy Rập', level: 9, hp: 1500, maxHp: 1500, attack: 150, defense: 40, 
    element: ElementType.Nature, expReward: 400, goldReward: 220, 
    abilities: [MonsterAbility.Silence],
    dropTable: [{ materialType: MaterialType.SpiderSilk, chance: 0.7, minQty: 3, maxQty: 6 }] 
  },
  { 
    id: 'e1_4', name: 'Gấu Nâu To Lớn', level: 12, hp: 3500, maxHp: 3500, attack: 350, defense: 120, 
    element: ElementType.Physical, expReward: 900, goldReward: 550, 
    dropTable: [{ materialType: MaterialType.BearClaw, chance: 0.5, minQty: 2, maxQty: 4 }] 
  },
  { 
    id: 'e1_boss', name: 'Vua Slime Hoàng Kim', level: 18, hp: 15000, maxHp: 15000, attack: 1200, defense: 600, 
    element: ElementType.Physical, isBoss: true, expReward: 4500, goldReward: 3500, 
    abilities: [MonsterAbility.Regen, MonsterAbility.Stun],
    dropTable: [
        { materialType: MaterialType.SlimeResin, chance: 1, minQty: 50, maxQty: 80 },
        { materialType: MaterialType.AmberFragment, chance: 0.3, minQty: 2, maxQty: 5 }
    ] 
  }
];
