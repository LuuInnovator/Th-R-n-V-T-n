
import { BAN_VE_VU_KHI } from './vu_khi';
import { BAN_VE_GIAP } from './giap';
import { BAN_VE_MU } from './mu';
import { BAN_VE_GIAY } from './giay';
import { BAN_VE_NHAN } from './nhan';
import { BAN_VE_VONG_CO } from './vong_co';
import { BAN_VE_VAT_PHAM } from './vat_pham';

export * from './vu_khi';
export * from './giap';
export * from './mu';
export * from './giay';
export * from './nhan';
export * from './vong_co';
export * from './vat_pham';

export const BAN_VE_KHOI_TAO = [
  ...BAN_VE_VU_KHI,
  ...BAN_VE_GIAP,
  ...BAN_VE_MU,
  ...BAN_VE_GIAY,
  ...BAN_VE_NHAN,
  ...BAN_VE_VONG_CO,
  ...BAN_VE_VAT_PHAM
];
