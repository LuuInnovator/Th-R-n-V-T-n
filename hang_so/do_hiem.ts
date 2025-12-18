
import { Rarity } from '../kieu_du_lieu';

export const HE_SO_DO_HIEM: Record<Rarity, number> = {
  [Rarity.Common]: 1, 
  [Rarity.Rare]: 1.8, 
  [Rarity.Epic]: 3.5, 
  [Rarity.Legendary]: 8, 
  [Rarity.Mythic]: 20, 
  [Rarity.Cosmic]: 50
};

export const MAU_DO_HIEM: Record<Rarity, string> = {
  [Rarity.Common]: 'text-slate-400', 
  [Rarity.Rare]: 'text-blue-400', 
  [Rarity.Epic]: 'text-purple-400', 
  [Rarity.Legendary]: 'text-yellow-400', 
  [Rarity.Mythic]: 'text-red-500', 
  [Rarity.Cosmic]: 'text-cyan-400'
};
