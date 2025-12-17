
import { EternalUpgrade, EternalUpgradeId } from '../../types';

export const ECONOMY_UPGRADES: EternalUpgrade[] = [
  { 
    id: EternalUpgradeId.ResourceRetention, 
    name: 'Bảo Toàn Di Sản', 
    description: 'Giữ lại 10% nguyên liệu Tinh Hoa khi tái sinh.', 
    baseCost: 800, 
    costMultiplier: 1.9, 
    maxLevel: 10, 
    effectValue: 10 
  },
  {
    id: 'et_lucky_coin',
    name: 'Đồng Xu May Mắn',
    description: 'Tăng 50% lượng vàng nhận được vĩnh viễn.',
    baseCost: 300,
    costMultiplier: 1.6,
    maxLevel: 100,
    effectValue: 50
  },
  {
    id: 'et_game_speed_limit',
    name: 'Phá Vỡ Giới Hạn',
    description: 'Mở khóa thêm x1 tốc độ trò chơi tối đa.',
    baseCost: 50000,
    costMultiplier: 10,
    maxLevel: 5,
    effectValue: 1
  }
];
