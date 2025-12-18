
import { Blueprint, EquipmentType, MaterialType, SetId } from '../../kieu_du_lieu';

export const BAN_VE_VONG_CO: Blueprint[] = [
  { 
    id: 'bp_n_1', name: 'Dây Chuyền Nhựa Slime', resultType: EquipmentType.Necklace, evolutionLevel: 0, reqLevel: 2, 
    requiredMaterials: [{ type: MaterialType.SlimeResin, amount: 30 }], 
    baseStats: { minAtk: 2, maxAtk: 5, minDef: 2, maxDef: 5, minHp: 100, maxHp: 200 }, unlocked: true, setId: SetId.PrimalHunter 
  },
  { 
    id: 'bp_n_ghost', name: 'Vòng Cổ U Hồn', resultType: EquipmentType.Necklace, evolutionLevel: 0, reqLevel: 180, 
    requiredMaterials: [{ type: MaterialType.GhostEssence, amount: 40 }, { type: MaterialType.WillOfDead, amount: 5 }], 
    baseStats: { minAtk: 1000, maxAtk: 2000, minDef: 5000, maxDef: 9000, minHp: 80000, maxHp: 150000 }, unlocked: true, setId: SetId.GhostlyRelic 
  },
  { 
    id: 'bp_n_eternity', name: 'Dây Chuyền Vĩnh Hằng', resultType: EquipmentType.Necklace, evolutionLevel: 0, reqLevel: 900, 
    requiredMaterials: [{ type: MaterialType.EternalSpark, amount: 100 }, { type: MaterialType.RealityTear, amount: 20 }], 
    baseStats: { minAtk: 250000, maxAtk: 500000, minDef: 250000, maxDef: 500000, minHp: 10000000, maxHp: 25000000 }, unlocked: true, setId: SetId.InfinityChrono 
  }
];
