
import { WEAPON_SKILLS } from './weapon';
import { ARMOR_SKILLS } from './armor';
import { ALCHEMY_SKILLS } from './alchemy';
import { ENCHANTING_SKILLS } from './enchanting';

export * from './weapon';
export * from './armor';
export * from './alchemy';
export * from './enchanting';

export const SKILLS = [
  ...WEAPON_SKILLS,
  ...ARMOR_SKILLS,
  ...ALCHEMY_SKILLS,
  ...ENCHANTING_SKILLS
];
