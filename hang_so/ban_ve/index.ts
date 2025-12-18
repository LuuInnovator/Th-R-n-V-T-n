
import { BAN_VE_VU_KHI } from './vu_khi';
import { BAN_VE_GIAP } from './giap';
import { BAN_VE_TRANG_SUC } from './trang_suc';
import { BAN_VE_VAT_PHAM } from './vat_pham';

export * from './vu_khi';
export * from './giap';
export * from './trang_suc';
export * from './vat_pham';

export const BAN_VE_KHOI_TAO = [
  ...BAN_VE_VU_KHI,
  ...BAN_VE_GIAP,
  ...BAN_VE_TRANG_SUC,
  ...BAN_VE_VAT_PHAM
];
