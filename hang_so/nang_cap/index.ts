
import { EternalUpgrade, EternalUpgradeId } from '../../kieu_du_lieu';

export const NANG_CAP_CHI_SO: EternalUpgrade[] = [
  { id: EternalUpgradeId.LatentPower, name: 'Suc Manh Tiem An', description: 'Tang 30% toan bo chi so nhan vat vinh vien.', baseCost: 150, costMultiplier: 1.7, maxLevel: 500, effectValue: 30 },
  { id: EternalUpgradeId.EternalBlood, name: 'Huyet Mach Vinh Hang', description: 'Tang 50% HP toi da cho moi cap Tai sinh.', baseCost: 600, costMultiplier: 2.1, maxLevel: 250, effectValue: 50 }
];

export const NANG_CAP_DUC_REN: EternalUpgrade[] = [
  { id: EternalUpgradeId.GodlyForging, name: 'Ky Thuat Duc Than', description: 'Trang bi che tao nhan them (So lan tai sinh * 15%) chi so.', baseCost: 5000, costMultiplier: 3.2, maxLevel: 20, effectValue: 15 },
  { id: 'nc_bua_co_dai', name: 'Bua Ren Co Dai', description: 'Tang 5% ty le xuat hien trang bi pham chat cao.', baseCost: 2500, costMultiplier: 2.8, maxLevel: 10, effectValue: 5 }
];

export const NANG_CAP_DB = [...NANG_CAP_CHI_SO, ...NANG_CAP_DUC_REN];
