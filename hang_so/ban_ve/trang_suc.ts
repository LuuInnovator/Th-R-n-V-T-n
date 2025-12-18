
import { Blueprint, EquipmentType, MaterialType, SetId } from '../../kieu_du_lieu';

export const BAN_VE_TRANG_SUC: Blueprint[] = [
  // Set Thợ Săn Nguyên Thủy
  { 
    id: 'bp_acc_ring_1', 
    name: 'Nhẫn Nanh Sói', 
    resultType: EquipmentType.Ring, 
    evolutionLevel: 0, 
    reqLevel: 5, 
    requiredMaterials: [{ type: MaterialType.WolfFang, amount: 10 }, { type: MaterialType.WolfSkin, amount: 5 }], 
    baseStats: { minAtk: 10, maxAtk: 20, minDef: 2, maxDef: 5 }, 
    unlocked: true, 
    setId: SetId.PrimalHunter 
  },
  { 
    id: 'bp_acc_neck_1', 
    name: 'Vòng Cổ Nhựa Slime', 
    resultType: EquipmentType.Necklace, 
    evolutionLevel: 0, 
    reqLevel: 1, 
    requiredMaterials: [{ type: MaterialType.SlimeResin, amount: 50 }], 
    baseStats: { minAtk: 2, maxAtk: 5, minDef: 2, maxDef: 5, minHp: 50, maxHp: 100 }, 
    unlocked: true, 
    setId: SetId.PrimalHunter 
  },

  // Set Ý Chí Thép
  { 
    id: 'bp_acc_ring_2', 
    name: 'Nhẫn Đồng Thô', 
    resultType: EquipmentType.Ring, 
    evolutionLevel: 0, 
    reqLevel: 15, 
    requiredMaterials: [{ type: MaterialType.RawCopperOre, amount: 30 }], 
    baseStats: { minAtk: 30, maxAtk: 60, minDef: 10, maxDef: 20 }, 
    unlocked: true, 
    setId: SetId.IronWill 
  },
  { 
    id: 'bp_acc_neck_2', 
    name: 'Vòng Cổ Hổ Phách', 
    resultType: EquipmentType.Necklace, 
    evolutionLevel: 0, 
    reqLevel: 20, 
    requiredMaterials: [{ type: MaterialType.AmberFragment, amount: 20 }, { type: MaterialType.IronScraps, amount: 10 }], 
    baseStats: { minAtk: 20, maxAtk: 40, minDef: 30, maxDef: 60, minHp: 300, maxHp: 600 }, 
    unlocked: true, 
    setId: SetId.IronWill 
  },

  // Cao cấp
  { 
    id: 'bp_acc_final_ring', 
    name: 'Nhẫn Hư Không', 
    resultType: EquipmentType.Ring, 
    evolutionLevel: 0, 
    reqLevel: 300, 
    requiredMaterials: [{ type: MaterialType.VoidShard, amount: 500 }, { type: MaterialType.DarkEssence, amount: 100 }], 
    baseStats: { minAtk: 15000, maxAtk: 35000, minDef: 5000, maxDef: 10000 }, 
    unlocked: true, 
    setId: SetId.VoidSeeker 
  },
  { 
    id: 'bp_acc_final_neck', 
    name: 'Dây Chuyền Vĩnh Hằng', 
    resultType: EquipmentType.Necklace, 
    evolutionLevel: 0, 
    reqLevel: 500, 
    requiredMaterials: [{ type: MaterialType.EternalSpark, amount: 500 }, { type: MaterialType.RealityTear, amount: 100 }], 
    baseStats: { minAtk: 50000, maxAtk: 120000, minDef: 50000, maxDef: 120000, minHp: 1000000, maxHp: 2500000 }, 
    unlocked: true, 
    setId: SetId.InfinityChrono 
  }
];
