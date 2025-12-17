
import { Blueprint, EquipmentType, MaterialType, SetId } from '../../types';

export const ARMOR_BLUEPRINTS: Blueprint[] = [
  { id: 'bp_a_1', name: 'Áo Da Sói', resultType: EquipmentType.Armor, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.WolfSkin, amount: 30 }], baseStats: { minAtk: 0, maxAtk: 0, minDef: 15, maxDef: 35, minHp: 100, maxHp: 250 }, unlocked: true, setId: SetId.PrimalHunter },
  { id: 'bp_a_2', name: 'Giáp Sắt Tinh Luyện', resultType: EquipmentType.Armor, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.IronScale, amount: 150 }], baseStats: { minAtk: 0, maxAtk: 0, minDef: 85, maxDef: 185, minHp: 800, maxHp: 1500 }, unlocked: true, setId: SetId.IronWill },
  { id: 'bp_a_3', name: 'Giáp Băng Vĩnh Cửu', resultType: EquipmentType.Armor, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.IceShard, amount: 400 }], baseStats: { minAtk: 0, maxAtk: 0, minDef: 1200, maxDef: 2800, minHp: 12000, maxHp: 25000 }, unlocked: true, setId: SetId.FrozenLegacy },
  { id: 'bp_a_final', name: 'Giáp Thần Thoại', resultType: EquipmentType.Armor, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.RealityTear, amount: 8000 }], baseStats: { minAtk: 0, maxAtk: 0, minDef: 850000, maxDef: 2200000, minHp: 5000000, maxHp: 12000000 }, unlocked: true, setId: SetId.InfinityChrono }
];
