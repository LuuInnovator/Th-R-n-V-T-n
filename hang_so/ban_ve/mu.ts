
import { Blueprint, EquipmentType, MaterialType, SetId } from '../../kieu_du_lieu';

export const BAN_VE_MU: Blueprint[] = [
  { 
    id: 'bp_h_1', name: 'Mũ Da Thợ Săn', resultType: EquipmentType.Helmet, evolutionLevel: 0, reqLevel: 4, 
    requiredMaterials: [{ type: MaterialType.WolfSkin, amount: 8 }], 
    baseStats: { minAtk: 2, maxAtk: 5, minDef: 8, maxDef: 15, minHp: 50, maxHp: 100 }, unlocked: true, setId: SetId.PrimalHunter 
  },
  { 
    id: 'bp_h_golem', name: 'Mũ Đá Golem', resultType: EquipmentType.Helmet, evolutionLevel: 0, reqLevel: 40, 
    requiredMaterials: [{ type: MaterialType.GolemCore, amount: 3 }, { type: MaterialType.IronScraps, amount: 60 }], 
    baseStats: { minAtk: 50, maxAtk: 100, minDef: 200, maxDef: 350, minHp: 800, maxHp: 1500 }, unlocked: true, setId: SetId.IronWill 
  },
  { 
    id: 'bp_h_ghost', name: 'Mũ Trùm U Linh', resultType: EquipmentType.Helmet, evolutionLevel: 0, reqLevel: 150, 
    requiredMaterials: [{ type: MaterialType.GhostEssence, amount: 50 }, { type: MaterialType.AncientScroll, amount: 10 }], 
    baseStats: { minAtk: 5000, maxAtk: 8000, minDef: 6000, maxDef: 10000, minHp: 50000, maxHp: 90000 }, unlocked: true, setId: SetId.GhostlyRelic 
  }
];
