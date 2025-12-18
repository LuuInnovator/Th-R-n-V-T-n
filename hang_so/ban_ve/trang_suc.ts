
import { Blueprint, EquipmentType, MaterialType, SetId } from '../../kieu_du_lieu';

export const BAN_VE_TRANG_SUC: Blueprint[] = [
  // Fix: Added reqLevel to blueprints to satisfy interface requirements
  { id: 'bp_acc_1', name: 'Nhẫn Nhựa Slime', resultType: EquipmentType.Accessory, evolutionLevel: 0, reqLevel: 1, requiredMaterials: [{ type: MaterialType.SlimeResin, amount: 100 }], baseStats: { minAtk: 1, maxAtk: 2, minDef: 1, maxDef: 2, minHp: 5, maxHp: 15 }, unlocked: true },
  { id: 'bp_acc_2', name: 'Dây Chuyền Hổ Phách', resultType: EquipmentType.Accessory, evolutionLevel: 0, reqLevel: 15, requiredMaterials: [{ type: MaterialType.AmberFragment, amount: 40 }], baseStats: { minAtk: 5, maxAtk: 10, minDef: 5, maxDef: 10, minHp: 40, maxHp: 80 }, unlocked: true },
  { id: 'bp_acc_final', name: 'Trái Tim Vĩnh Hằng', resultType: EquipmentType.Accessory, evolutionLevel: 0, reqLevel: 250, requiredMaterials: [{ type: MaterialType.EternalSpark, amount: 200 }], baseStats: { minAtk: 2000, maxAtk: 5000, minDef: 2000, maxDef: 5000, minHp: 20000, maxHp: 50000 }, unlocked: true, setId: SetId.InfinityChrono }
];
