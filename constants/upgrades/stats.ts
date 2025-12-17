
import { EternalUpgrade, EternalUpgradeId } from '../../types';

export const STAT_UPGRADES: EternalUpgrade[] = [
  { 
    id: EternalUpgradeId.LatentPower, 
    name: 'Sức Mạnh Tiềm Ẩn', 
    description: 'Tăng 30% toàn bộ chỉ số nhân vật vĩnh viễn mỗi cấp.', 
    baseCost: 150, 
    costMultiplier: 1.7, 
    maxLevel: 500, 
    effectValue: 30 
  },
  { 
    id: EternalUpgradeId.EternalBlood, 
    name: 'Huyết Mạch Vĩnh Hằng', 
    description: 'Tăng 50% HP tối đa cho mỗi cấp Tái sinh.', 
    baseCost: 600, 
    costMultiplier: 2.1, 
    maxLevel: 250, 
    effectValue: 50 
  },
  {
    id: 'et_crit_dmg',
    name: 'Dấu Ấn Phá Kích',
    description: 'Tăng 20% Sát thương chí mạng vĩnh viễn.',
    baseCost: 1000,
    costMultiplier: 2.5,
    maxLevel: 50,
    effectValue: 20
  }
];
