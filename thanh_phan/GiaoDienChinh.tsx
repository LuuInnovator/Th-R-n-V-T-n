
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
  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-950 overflow-hidden relative">
      {tabHienTai === 'chien_dau' && <GiaoDienChienDau {...duLieuGoc.chienDau} />}
      {tabHienTai === 'hanh_trang' && <GiaoDienHanhTrang {...duLieuGoc.hanhTrang} />}
      {tabHienTai === 'lo_ren' && <GiaoDienLoRen {...duLieuGoc.loRen} />}
      {tabHienTai === 'bi_ky' && <GiaoDienCayBiKy player={duLieuGoc.loRen.player} onUpgrade={duLieuGoc.loRen.onUpgradeSkill} />}
      {tabHienTai === 'luan_hoi' && <GiaoDienLuanHoi {...duLieuGoc.luanHoi} />}
      {tabHienTai === 'co_thu' && <GiaoDienCoThu 
        vung_dat={duLieuGoc.chienDau.vung_dat} 
        ban_ve={duLieuGoc.loRen.blueprints} 
        player={duLieuGoc.loRen.player} 
        equipped={duLieuGoc.hanhTrang.dangMac}
      />}
      {tabHienTai === 'cai_dat' && <GiaoDienCaiDat {...duLieuGoc.caiDat} />}
    </div>
  );
};
