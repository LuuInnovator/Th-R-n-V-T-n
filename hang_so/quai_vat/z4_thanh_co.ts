
import { Enemy, ElementType, MaterialType, MonsterAbility } from '../../kieu_du_lieu';

export const QUAI_VAT_THANH_CO: Enemy[] = [
  { 
    id: 'e4_1', name: 'Chiến Binh Xương Mục Nát', level: 110, hp: 2500000, maxHp: 2500000, attack: 350000, defense: 150000, 
    element: ElementType.Physical, expReward: 450000, goldReward: 250000, 
    dropTable: [
        { materialType: MaterialType.OldBone, chance: 0.8, minQty: 30, maxQty: 80 },
        { materialType: MaterialType.SkeletonRib, chance: 0.5, minQty: 5, maxQty: 15 }
    ] 
  },
  { 
    id: 'e4_1b', name: 'Cung Thủ U Minh', level: 130, hp: 3800000, maxHp: 3800000, attack: 750000, defense: 100000, 
    element: ElementType.Void, expReward: 850000, goldReward: 450000, 
    abilities: [MonsterAbility.Dodge],
    dropTable: [{ materialType: MaterialType.MagicThread, chance: 0.7, minQty: 15, maxQty: 35 }] 
  },
  { 
    id: 'e4_2', name: 'Bóng Ma Lang Thang', level: 150, hp: 6500000, maxHp: 6500000, attack: 1200000, defense: 350000, 
    element: ElementType.Void, expReward: 1800000, goldReward: 950000, 
    abilities: [MonsterAbility.Silence],
    dropTable: [{ materialType: MaterialType.GhostEssence, chance: 0.7, minQty: 10, maxQty: 25 }] 
  },
  { 
    id: 'e4_3', name: 'Kỵ Sĩ Không Đầu', level: 180, hp: 12000000, maxHp: 12000000, attack: 3500000, defense: 1200000, 
    element: ElementType.Physical, expReward: 4500000, goldReward: 2500000, 
    abilities: [MonsterAbility.ArmorBreak],
    dropTable: [{ materialType: MaterialType.BrokenSwordFragment, chance: 0.6, minQty: 10, maxQty: 30 }] 
  },
  { 
    id: 'e4_boss', name: 'Vong Hồn Đại Tướng Quân', level: 250, hp: 55000000, maxHp: 55000000, attack: 8500000, defense: 4500000, 
    element: ElementType.Void, isBoss: true, abilities: [MonsterAbility.Silence, MonsterAbility.LifeSteal, MonsterAbility.Reflect], 
    expReward: 25000000, goldReward: 15000000, 
    dropTable: [
        { materialType: MaterialType.WillOfDead, chance: 1, minQty: 10, maxQty: 25 },
        { materialType: MaterialType.AncientScroll, chance: 0.6, minQty: 5, maxQty: 12 }
    ] 
  }
];
