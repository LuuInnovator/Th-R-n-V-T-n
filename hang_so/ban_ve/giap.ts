
import { Blueprint, EquipmentType, MaterialType, SetId } from '../../kieu_du_lieu';

export const BAN_VE_GIAP: Blueprint[] = [
  { 
    id: 'bp_a_1', name: 'Áo Choàng Da Sói', resultType: EquipmentType.Armor, evolutionLevel: 0, reqLevel: 5, 
    requiredMaterials: [{ type: MaterialType.WolfSkin, amount: 15 }], 
    baseStats: { minAtk: 0, maxAtk: 0, minDef: 20, maxDef: 35, minHp: 150, maxHp: 250 }, unlocked: true, setId: SetId.PrimalHunter 
  },
  { 
    id: 'bp_a_iron', name: 'Đại Giáp Sắt Vụn', resultType: EquipmentType.Armor, evolutionLevel: 0, reqLevel: 25, 
    requiredMaterials: [{ type: MaterialType.IronScraps, amount: 120 }, { type: MaterialType.RawCopperOre, amount: 50 }], 
    baseStats: { minAtk: 0, maxAtk: 0, minDef: 250, maxDef: 400, minHp: 1200, maxHp: 2000 }, unlocked: true, setId: SetId.IronWill 
  },
  { 
    id: 'bp_a_snow', name: 'Giáp Băng Tuyết', resultType: EquipmentType.Armor, evolutionLevel: 0, reqLevel: 75, 
    requiredMaterials: [{ type: MaterialType.IceShard, amount: 200 }, { type: MaterialType.WarmFur, amount: 50 }], 
    baseStats: { minAtk: 0, maxAtk: 0, minDef: 1500, maxDef: 2500, minHp: 8000, maxHp: 15000 }, unlocked: true, setId: SetId.FrozenLegacy 
  },
  { 
    id: 'bp_a_dragon', name: 'Long Lân Giáp', resultType: EquipmentType.Armor, evolutionLevel: 0, reqLevel: 500, 
    requiredMaterials: [{ type: MaterialType.DragonScale, amount: 800 }, { type: MaterialType.AncientDragonBone, amount: 50 }], 
    baseStats: { minAtk: 0, maxAtk: 0, minDef: 80000, maxDef: 150000, minHp: 1500000, maxHp: 3000000 }, unlocked: true, setId: SetId.DragonWarlord 
  }
];
