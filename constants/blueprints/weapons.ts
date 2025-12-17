
import { Blueprint, EquipmentType, MaterialType, SetId } from '../../types';

export const WEAPON_BLUEPRINTS: Blueprint[] = [
  { id: 'bp_w_1', name: 'Kiếm Gỗ Tập Sự', resultType: EquipmentType.Weapon, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.ForestWood, amount: 20 }], baseStats: { minAtk: 10, maxAtk: 20, minDef: 0, maxDef: 0 }, unlocked: true },
  { id: 'bp_w_2', name: 'Đoản Kiếm Đồng', resultType: EquipmentType.Weapon, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.RawCopperOre, amount: 50 }], baseStats: { minAtk: 45, maxAtk: 85, minDef: 0, maxDef: 0 }, unlocked: true },
  { id: 'bp_w_3', name: 'Trọng Kiếm Sắt', resultType: EquipmentType.Weapon, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.IronScraps, amount: 120 }], baseStats: { minAtk: 150, maxAtk: 320, minDef: 0, maxDef: 0 }, unlocked: true },
  { id: 'bp_w_4', name: 'Thương Băng Giá', resultType: EquipmentType.Weapon, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.IceShard, amount: 250 }, { type: MaterialType.FrozenHeart, amount: 5 }], baseStats: { minAtk: 1200, maxAtk: 2500, minDef: 0, maxDef: 0 }, unlocked: true, setId: SetId.FrozenLegacy },
  { id: 'bp_w_5', name: 'Đại Đao Long Tộc', resultType: EquipmentType.Weapon, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.DragonScale, amount: 500 }, { type: MaterialType.DragonBlood, amount: 20 }], baseStats: { minAtk: 15000, maxAtk: 35000, minDef: 0, maxDef: 0 }, unlocked: true, setId: SetId.DragonWarlord },
  { id: 'bp_w_final', name: 'Diệt Thần Kiếm', resultType: EquipmentType.Weapon, evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.RealityTear, amount: 5000 }, { type: MaterialType.EternalSpark, amount: 100 }], baseStats: { minAtk: 500000, maxAtk: 1200000, minDef: 0, maxDef: 0 }, unlocked: true, setId: SetId.VoidSeeker }
];
