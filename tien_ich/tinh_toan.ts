
import { Rarity } from '../kieu_du_lieu';

export const so_ngau_nhien = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const thu_van_may = (bonus: number = 0): Rarity => {
  // Điều chỉnh tỉ lệ gắt hơn: 
  // Common: 80%, Rare: 15%, Epic: 4%, Legendary: 0.9%, Mythic: 0.09%, Cosmic: 0.01%
  const roll = Math.random() + bonus;
  
  if (roll > 0.9999) return Rarity.Cosmic;
  if (roll > 0.999) return Rarity.Mythic;
  if (roll > 0.99) return Rarity.Legendary;
  if (roll > 0.95) return Rarity.Epic;
  if (roll > 0.80) return Rarity.Rare;
  return Rarity.Common;
};

export const dinh_dang_so = (num: number): string => {
  if (num === undefined || num === null) return "0";
  return Math.floor(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const tao_id = (): string => {
  return Math.random().toString(36).substr(2, 9);
};
