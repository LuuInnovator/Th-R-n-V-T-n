import { Rarity } from './types';

// Hàm ngẫu nhiên số nguyên
export const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Hàm xác định độ hiếm khi chế tạo
export const rollRarity = (bonusChance: number = 0): Rarity => {
  const roll = Math.random() + bonusChance;
  if (roll > 0.98) return Rarity.Mythic;
  if (roll > 0.90) return Rarity.Legendary;
  if (roll > 0.75) return Rarity.Epic;
  if (roll > 0.50) return Rarity.Rare;
  return Rarity.Common;
};

// Hàm định dạng số tiền
export const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// Hàm tạo ID duy nhất
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};