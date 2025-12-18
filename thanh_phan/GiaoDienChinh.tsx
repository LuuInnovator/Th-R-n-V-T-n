
import React from 'react';
import { GiaoDienChienDau } from './GiaoDienChienDau';
import { GiaoDienHanhTrang } from './GiaoDienHanhTrang';
import { GiaoDienLoRen } from './GiaoDienLoRen';
import { GiaoDienLuanHoi } from './GiaoDienLuanHoi';
import { GiaoDienCayBiKy } from './GiaoDienCayBiKy';
import { GiaoDienCoThu } from './GiaoDienCoThu';
import { GiaoDienCaiDat } from './GiaoDienCaiDat';

interface Props {
  tabHienTai: string;
  datTab: (tab: string) => void;
  duLieuGoc: any;
}

export const GiaoDienChinh: React.FC<Props> = ({ tabHienTai, duLieuGoc }) => {
  // Chỉ hiển thị nội dung, không hiển thị thanh tab ngang vì đã có Sidebar
  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-950 overflow-hidden relative">
      {tabHienTai === 'chien_dau' && <GiaoDienChienDau {...duLieuGoc.chienDau} />}
      {tabHienTai === 'hanh_trang' && <GiaoDienHanhTrang {...duLieuGoc.hanhTrang} />}
      {tabHienTai === 'lo_ren' && <GiaoDienLoRen {...duLieuGoc.loRen} />}
      {/* Fix: Passed the correct onUpgradeSkill function instead of onUpgradeBlueprint to match GiaoDienCayBiKy props */}
      {tabHienTai === 'bi_ky' && <GiaoDienCayBiKy player={duLieuGoc.loRen.player} onUpgrade={duLieuGoc.loRen.onUpgradeSkill} />}
      {tabHienTai === 'luan_hoi' && <GiaoDienLuanHoi {...duLieuGoc.luanHoi} />}
      {tabHienTai === 'co_thu' && <GiaoDienCoThu vung_dat={duLieuGoc.chienDau.vung_dat} ban_ve={duLieuGoc.loRen.blueprints} />}
      {tabHienTai === 'cai_dat' && <GiaoDienCaiDat {...duLieuGoc.caiDat} />}
    </div>
  );
};
