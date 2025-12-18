
import { QUAI_VAT_RUNG } from './z1_rung';
import { QUAI_VAT_HANG_DONG } from './z2_hang_dong';
import { QUAI_VAT_NUI_TUYET } from './z3_nui_tuyet';
import { QUAI_VAT_THANH_CO } from './z4_thanh_co';
import { QUAI_VAT_LONG_CUNG } from './z5_long_cung';
import { QUAI_VAT_VUC_THAM } from './z7_vuc_tham';
import { Enemy } from '../../kieu_du_lieu';

const TRONG: Enemy[] = [];

export const QUAI_VAT_DB: Record<string, Enemy[]> = {
  z1: QUAI_VAT_RUNG,
  z2: QUAI_VAT_HANG_DONG,
  z3: QUAI_VAT_NUI_TUYET,
  z4: QUAI_VAT_THANH_CO,
  z5: QUAI_VAT_LONG_CUNG,
  z6: TRONG,
  z7: QUAI_VAT_VUC_THAM
};

export * from './z1_rung';
export * from './z2_hang_dong';
export * from './z3_nui_tuyet';
export * from './z4_thanh_co';
export * from './z5_long_cung';
export * from './z7_vuc_tham';
