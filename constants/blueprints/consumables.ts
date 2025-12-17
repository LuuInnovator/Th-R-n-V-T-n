
import { Blueprint, MaterialType } from '../../types';

export const CONSUMABLE_BLUEPRINTS: Blueprint[] = [
  { id: 'bp_con_1', name: 'Dược Liệu Hồi Phục', resultType: 'VẬT PHẨM', evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.WildHerb, amount: 10 }], baseStats: { minAtk: 0, maxAtk: 0, minDef: 0, maxDef: 0 }, unlocked: true },
  { id: 'bp_con_2', name: 'Mồi Nhử Quái Vật', resultType: 'VẬT PHẨM', evolutionLevel: 0, requiredMaterials: [{ type: MaterialType.SlimeResin, amount: 50 }], baseStats: { minAtk: 0, maxAtk: 0, minDef: 0, maxDef: 0 }, unlocked: true }
];
