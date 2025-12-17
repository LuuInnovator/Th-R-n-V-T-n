
import { STAT_UPGRADES } from './stats';
import { FORGING_UPGRADES } from './forging';
import { ECONOMY_UPGRADES } from './economy';

export * from './stats';
export * from './forging';
export * from './economy';

export const ETERNAL_UPGRADES = [
  ...STAT_UPGRADES,
  ...FORGING_UPGRADES,
  ...ECONOMY_UPGRADES
];
