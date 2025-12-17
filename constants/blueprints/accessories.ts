
import { Blueprint, EquipmentType, MaterialType, SetId } from '../../types';

export const ACCESSORY_BLUEPRINTS: Blueprint[] = [
  { id: 'bp_acc_1', name: 'Nhẫn Nhựa Slime', resultType: EquipmentType.Accessory, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.SlimeResin, amount: 100 }], baseStats: { minAtk: 5, maxAtk: 10, minDef: 5, maxDef: 10, minHp: 50, maxHp: 100 }, unlocked: true },
  { id: 'bp_acc_2', name: 'Dây Chuyền Hổ Phách', resultType: EquipmentType.Accessory, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.AmberFragment, amount: 15 }], baseStats: { minAtk: 25, maxAtk: 55, minDef: 25, maxDef: 55, minHp: 250, maxHp: 650 }, unlocked: true },
  { id: 'bp_acc_3', name: 'Long Châu Hộ Mệnh', resultType: EquipmentType.Accessory, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.PearlOfPower, amount: 10 }], baseStats: { minAtk: 8500, maxAtk: 18500, minDef: 8500, maxDef: 18500, minHp: 85000, maxHp: 185000 }, unlocked: true, setId: SetId.DragonWarlord },
  { id: 'bp_acc_final', name: 'Trái Tim Vĩnh Hằng', resultType: EquipmentType.Accessory, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.EternalSpark, amount: 200 }], baseStats: { minAtk: 250000, maxAtk: 650000, minDef: 250000, maxDef: 650000, minHp: 2500000, maxHp: 6500000 }, unlocked: true, setId: SetId.InfinityChrono }
];
