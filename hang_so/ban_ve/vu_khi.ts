
import { Blueprint, EquipmentType, MaterialType, SetId } from '../../kieu_du_lieu';

export const BAN_VE_VU_KHI: Blueprint[] = [
  { 
    id: 'bp_w_1', 
    name: 'Kiếm Gỗ Tập Sự', 
    resultType: EquipmentType.Weapon, 
    evolutionLevel: 0, 
    reqLevel: 1,
    requiredMaterials: [{ type: MaterialType.ForestWood, amount: 2 }],
    baseStats: { minAtk: 5, maxAtk: 10, minDef: 0, maxDef: 0 }, 
    unlocked: true 
  },
  { 
    id: 'bp_w_2', 
    name: 'Đoản Kiếm Đồng', 
    resultType: EquipmentType.Weapon, 
    evolutionLevel: 0, 
    reqLevel: 10,
    requiredMaterials: [{ type: MaterialType.RawCopperOre, amount: 15 }], 
    baseStats: { minAtk: 40, maxAtk: 80, minDef: 0, maxDef: 0 }, 
    unlocked: true 
  },
  { 
    id: 'bp_w_3', 
    name: 'Kiếm Sắt Tinh Khiết', 
    resultType: EquipmentType.Weapon, 
    evolutionLevel: 0, 
    reqLevel: 25,
    requiredMaterials: [{ type: MaterialType.IronScraps, amount: 40 }, { type: MaterialType.Flint, amount: 10 }], 
    baseStats: { minAtk: 150, maxAtk: 300, minDef: 0, maxDef: 0 }, 
    unlocked: true 
  },
  { 
    id: 'bp_w_4', 
    name: 'Thanh Kiếm Bạc', 
    resultType: EquipmentType.Weapon, 
    evolutionLevel: 0, 
    reqLevel: 50,
    requiredMaterials: [{ type: MaterialType.SilverOre, amount: 100 }], 
    baseStats: { minAtk: 800, maxAtk: 1500, minDef: 0, maxDef: 0 }, 
    unlocked: true 
  },
  { 
    id: 'bp_w_5', 
    name: 'Hoàng Kim Đại Kiếm', 
    resultType: EquipmentType.Weapon, 
    evolutionLevel: 0, 
    reqLevel: 100,
    requiredMaterials: [{ type: MaterialType.GoldOre, amount: 250 }], 
    baseStats: { minAtk: 5000, maxAtk: 10000, minDef: 0, maxDef: 0 }, 
    unlocked: true 
  }
];
