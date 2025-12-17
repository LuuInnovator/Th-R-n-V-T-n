
import { EternalUpgrade, EternalUpgradeId } from '../../types';

export const FORGING_UPGRADES: EternalUpgrade[] = [
  { 
    id: EternalUpgradeId.GodlyForging, 
    name: 'Kỹ Thuật Đúc Thần', 
    description: 'Mọi trang bị chế tạo được nhân thêm (Số lần tái sinh * 15%) chỉ số.', 
    baseCost: 5000, 
    costMultiplier: 3.2, 
    maxLevel: 20, 
    effectValue: 15 
  },
  {
    id: 'et_master_hammer',
    name: 'Búa Rèn Cổ Đại',
    description: 'Tăng 5% tỷ lệ xuất hiện trang bị phẩm chất cao (Huyền Thoại+).',
    baseCost: 2500,
    costMultiplier: 2.8,
    maxLevel: 10,
    effectValue: 5
  },
  {
    id: 'et_blueprint_exp',
    name: 'Nghiên Cứu Bản Vẽ',
    description: 'Giảm 10% chi phí EP khi nâng cấp tiến hóa bản vẽ.',
    baseCost: 10000,
    costMultiplier: 4.0,
    maxLevel: 5,
    effectValue: 10
  }
];
