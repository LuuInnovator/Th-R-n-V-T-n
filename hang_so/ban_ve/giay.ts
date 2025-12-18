
import { Blueprint, EquipmentType, MaterialType, SetId } from '../../kieu_du_lieu';

export const BAN_VE_GIAY: Blueprint[] = [
  { 
    id: 'bp_b_1', name: 'Giày Da Dã Ngoại', resultType: EquipmentType.Boots, evolutionLevel: 0, reqLevel: 3, 
    requiredMaterials: [{ type: MaterialType.WolfSkin, amount: 6 }], 
    baseStats: { minAtk: 0, maxAtk: 0, minDef: 5, maxDef: 10, minHp: 30, maxHp: 60 }, unlocked: true, setId: SetId.PrimalHunter 
  },
  { 
    id: 'bp_b_snow', name: 'Ủng Tuyết Ấm Áp', resultType: EquipmentType.Boots, evolutionLevel: 0, reqLevel: 60, 
    requiredMaterials: [{ type: MaterialType.WarmFur, amount: 40 }, { type: MaterialType.IceShard, amount: 20 }], 
    baseStats: { minAtk: 0, maxAtk: 0, minDef: 500, maxDef: 800, minHp: 3000, maxHp: 6000 }, unlocked: true, setId: SetId.FrozenLegacy 
  },
  { 
    id: 'bp_b_void', name: 'Giày Hư Không', resultType: EquipmentType.Boots, evolutionLevel: 0, reqLevel: 800, 
    requiredMaterials: [{ type: MaterialType.VoidShard, amount: 500 }, { type: MaterialType.DarkEssence, amount: 100 }], 
    baseStats: { minAtk: 50000, maxAtk: 100000, minDef: 250000, maxDef: 400000, minHp: 5000000, maxHp: 10000000 }, unlocked: true, setId: SetId.VoidSeeker 
  }
];
