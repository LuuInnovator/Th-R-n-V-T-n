
import { Blueprint, EquipmentType, MaterialType } from '../../kieu_du_lieu';

export const BAN_VE_VU_KHI: Blueprint[] = [
  { 
    id: 'bp_w_1', name: 'Kiếm Gỗ Tập Sự', resultType: EquipmentType.Weapon, evolutionLevel: 0, reqLevel: 1,
    requiredMaterials: [{ type: MaterialType.ForestWood, amount: 5 }],
    baseStats: { minAtk: 5, maxAtk: 12, minDef: 0, maxDef: 0 }, unlocked: true 
  },
  { 
    id: 'bp_w_wolf', name: 'Đoản Đao Nanh Sói', resultType: EquipmentType.Weapon, evolutionLevel: 0, reqLevel: 8,
    requiredMaterials: [{ type: MaterialType.WolfFang, amount: 12 }, { type: MaterialType.WolfSkin, amount: 5 }],
    baseStats: { minAtk: 45, maxAtk: 75, minDef: 0, maxDef: 0 }, unlocked: true 
  },
  { 
    id: 'bp_w_2', name: 'Trường Kiếm Đồng Đen', resultType: EquipmentType.Weapon, evolutionLevel: 0, reqLevel: 20,
    requiredMaterials: [{ type: MaterialType.RawCopperOre, amount: 40 }, { type: MaterialType.IronScraps, amount: 10 }], 
    baseStats: { minAtk: 180, maxAtk: 250, minDef: 0, maxDef: 0 }, unlocked: true 
  },
  { 
    id: 'bp_w_golem', name: 'Đại Đao Lõi Golem', resultType: EquipmentType.Weapon, evolutionLevel: 0, reqLevel: 45,
    requiredMaterials: [{ type: MaterialType.GolemCore, amount: 5 }, { type: MaterialType.SilverOre, amount: 50 }], 
    baseStats: { minAtk: 1200, maxAtk: 1800, minDef: 0, maxDef: 0 }, unlocked: true 
  },
  { 
    id: 'bp_w_ice', name: 'Kiếm Băng Vĩnh Cửu', resultType: EquipmentType.Weapon, evolutionLevel: 0, reqLevel: 80,
    requiredMaterials: [{ type: MaterialType.IceShard, amount: 100 }, { type: MaterialType.FrozenHeart, amount: 2 }], 
    baseStats: { minAtk: 6500, maxAtk: 9000, minDef: 0, maxDef: 0 }, unlocked: true 
  },
  { 
    id: 'bp_w_soul', name: 'Lưỡi Hái Linh Hồn', resultType: EquipmentType.Weapon, evolutionLevel: 0, reqLevel: 180,
    requiredMaterials: [{ type: MaterialType.GhostEssence, amount: 80 }, { type: MaterialType.WillOfDead, amount: 15 }], 
    baseStats: { minAtk: 45000, maxAtk: 70000, minDef: 0, maxDef: 0 }, unlocked: true 
  },
  { 
    id: 'bp_w_dragon', name: 'Hỏa Long Trảm Mã Kiếm', resultType: EquipmentType.Weapon, evolutionLevel: 0, reqLevel: 450,
    requiredMaterials: [{ type: MaterialType.DragonScale, amount: 300 }, { type: MaterialType.DragonBlood, amount: 50 }], 
    baseStats: { minAtk: 550000, maxAtk: 900000, minDef: 0, maxDef: 0 }, unlocked: true 
  },
  { 
    id: 'bp_w_void', name: 'Đoản Kiếm Hư Không', resultType: EquipmentType.Weapon, evolutionLevel: 0, reqLevel: 1000,
    requiredMaterials: [{ type: MaterialType.VoidShard, amount: 2000 }, { type: MaterialType.VoidCore, amount: 10 }], 
    baseStats: { minAtk: 8000000, maxAtk: 15000000, minDef: 0, maxDef: 0 }, unlocked: true 
  }
];
