
import { WEAPON_BLUEPRINTS } from './weapons';
import { ARMOR_BLUEPRINTS } from './armor';
import { ACCESSORY_BLUEPRINTS } from './accessories';
import { CONSUMABLE_BLUEPRINTS } from './consumables';

export * from './weapons';
export * from './armor';
export * from './accessories';
export * from './consumables';

export const INITIAL_BLUEPRINTS = [
  ...WEAPON_BLUEPRINTS,
  ...ARMOR_BLUEPRINTS,
  ...ACCESSORY_BLUEPRINTS,
  ...CONSUMABLE_BLUEPRINTS
];
