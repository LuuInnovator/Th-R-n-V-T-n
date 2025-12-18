
import { Blueprint, EquipmentType, MaterialType, SetId } from '../../kieu_du_lieu';

export const BAN_VE_GIAP: Blueprint[] = [
  // Fix: Added reqLevel to blueprints to satisfy interface requirements
  { id: 'bp_a_1', name: 'Áo Da Sói', resultType: EquipmentType.Armor, evolutionLevel: 0, reqLevel: 1, requiredMaterials: [{ type: MaterialType.WolfSkin, amount: 8 }], baseStats: { minAtk: 0, maxAtk: 0, minDef: 5, maxDef: 10, minHp: 20, maxHp: 50 }, unlocked: true, setId: SetId.PrimalHunter },
  { id: 'bp_a_2', name: 'Giáp Sắt Vụn', resultType: EquipmentType.Armor, evolutionLevel: 0, reqLevel: 20, requiredMaterials: [{ type: MaterialType.IronScraps, amount: 100 }], baseStats: { minAtk: 0, maxAtk: 0, minDef: 50, maxDef: 120, minHp: 200, maxHp: 500 }, unlocked: true, setId: SetId.IronWill },
  { id: 'bp_a_final', name: 'Giáp Thần Thoại', resultType: EquipmentType.Armor, evolutionLevel: 0, reqLevel: 500, requiredMaterials: [{ type: MaterialType.RealityTear, amount: 20000 }], baseStats: { minAtk: 0, maxAtk: 0, minDef: 15000, maxDef: 35000, minHp: 100000, maxHp: 300000 }, unlocked: true, setId: SetId.InfinityChrono }
];
