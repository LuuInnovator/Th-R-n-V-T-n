
import { Rarity } from '../types';

export const RARITY_MULTIPLIER: Record<Rarity, number> = {
  [Rarity.Common]: 1, 
  [Rarity.Rare]: 2.5, 
  [Rarity.Epic]: 8, 
  [Rarity.Legendary]: 25, 
  [Rarity.Mythic]: 70, 
  [Rarity.Cosmic]: 180 // Đưa về mức thực tế hơn
};

export const RARITY_COLOR: Record<Rarity, string> = {
  [Rarity.Common]: 'text-slate-400', 
  [Rarity.Rare]: 'text-blue-400', 
  [Rarity.Epic]: 'text-purple-400', 
  [Rarity.Legendary]: 'text-yellow-400', 
  [Rarity.Mythic]: 'text-red-500', 
  [Rarity.Cosmic]: 'text-cyan-400'
};
