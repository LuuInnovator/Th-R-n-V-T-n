
import { Blueprint, EquipmentType, MaterialType, SetId } from '../../kieu_du_lieu';

export const BAN_VE_NHAN: Blueprint[] = [
  { 
    id: 'bp_r_1', name: 'Nhẫn Nanh Sói', resultType: EquipmentType.Ring, evolutionLevel: 0, reqLevel: 5, 
    requiredMaterials: [{ type: MaterialType.WolfFang, amount: 10 }, { type: MaterialType.AmberFragment, amount: 2 }], 
    baseStats: { minAtk: 15, maxAtk: 25, minDef: 5, maxDef: 10, minHp: 0, maxHp: 0 }, unlocked: true, setId: SetId.PrimalHunter 
  },
  { 
    id: 'bp_r_copper', name: 'Nhẫn Đồng Cổ', resultType: EquipmentType.Ring, evolutionLevel: 0, reqLevel: 20, 
    requiredMaterials: [{ type: MaterialType.RawCopperOre, amount: 50 }], 
    baseStats: { minAtk: 80, maxAtk: 150, minDef: 40, maxDef: 80, minHp: 0, maxHp: 0 }, unlocked: true, setId: SetId.IronWill 
  },
  { 
    id: 'bp_r_dragon', name: 'Nhẫn Hỏa Long', resultType: EquipmentType.Ring, evolutionLevel: 0, reqLevel: 400, 
    requiredMaterials: [{ type: MaterialType.DragonBlood, amount: 20 }, { type: MaterialType.PearlOfPower, amount: 2 }], 
    baseStats: { minAtk: 80000, maxAtk: 150000, minDef: 40000, maxDef: 70000, minHp: 0, maxHp: 0 }, unlocked: true, setId: SetId.DragonWarlord 
  }
];
