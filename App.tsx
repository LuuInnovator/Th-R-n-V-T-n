
import React, { useEffect } from 'react';
import { CharacterClass, EquipmentType } from './kieu_du_lieu';
import { CAC_VUNG_DAT, BAN_VE_KHOI_TAO } from './hang_so';
import { dungQuanLyGame } from './logic_game/quan_ly_game';

// Thành phần giao diện
import { ThanhBen } from './thanh_phan/bo_khung/ThanhBen';
import { ThanhDau } from './thanh_phan/bo_khung/ThanhDau';
import { GiaoDienChinh } from './thanh_phan/GiaoDienChinh';
import { BangChiSoNhanVat } from './thanh_phan/BangChiSoNhanVat';

const App: React.FC = () => {
  const { state, actions } = dungQuanLyGame();

  useEffect(() => {
    actions.taiLocal();
  }, []);

  const duLieuGoc = {
    chienDau: {
      vung_dat: CAC_VUNG_DAT, vung_hien_tai: state.vungHienTai, 
      onChonVung: actions.datVungHienTai,
      nguoi_choi: { ...state.nguoiChoi, attack: state.chiSoThucTe.totalAtk, defense: state.chiSoThucTe.totalDef, maxHp: state.chiSoThucTe.totalHp }, 
      quai_vat: state.quaiHienTai, onKhamPha: actions.timQuai,
      onTanCong: actions.tanCong, nhat_ky: state.nhatKy, 
      dangTuDong: state.dangTuDong, datDangTuDong: actions.datDangTuDong
    },
    hanhTrang: {
      trangBi: state.danhSachTrangBi, nguyenLieu: state.khoNguyenLieu,
      dangMac: state.doDangMac, 
      onMac: (item: any) => actions.macTrangBi(item, state.nguoiChoi.level),
      onSell: (item: any) => actions.banTrangBi(item, (v) => actions.datNguoiChoi(p => ({ ...p, gold: p.gold + v }))),
      onSellMany: (ids: string[], onDone: any) => actions.banNhieuTrangBi(ids, (v) => actions.datNguoiChoi(p => ({ ...p, gold: p.gold + v }))),
      onSocketGem: actions.handleSocketGem,
      onAddSocket: actions.handleAddSocket,
      onEnchant: actions.handleEnchant,
      player: state.nguoiChoi
    },
    loRen: {
      blueprints: BAN_VE_KHOI_TAO, materials: state.khoNguyenLieu,
      onCraft: actions.thucHienCheTac,
      craftingSkill: 1, onUpgradeBlueprint: actions.nangCapBanVe,
      eternalPoints: state.nguoiChoi.eternalPoints, player: state.nguoiChoi,
      onUpgradeSkill: actions.nangCapKyNang
    },
    luanHoi: {
      player: state.nguoiChoi, onRebirth: actions.thucHienLuanHoi, 
      canRebirth: state.nguoiChoi.level >= state.reqRebirthLevel, onBuyUpgrade: actions.muaNangCapVinhHang
    },
    caiDat: { onLuu: () => actions.luuLocal(false), onTai: actions.taiLocal, onReset: () => { localStorage.clear(); window.location.reload(); }, onXuatFile: actions.xuatFile, onNhapFile: actions.nhapFile }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 font-sans overflow-hidden">
      <ThanhBen 
        player={{ ...state.nguoiChoi, attack: state.chiSoThucTe.totalAtk, defense: state.chiSoThucTe.totalDef, maxHp: state.chiSoThucTe.totalHp }} 
        activeTab={state.tabHienTai} setActiveTab={actions.datTabHienTai} 
        setShowStatsModal={actions.datHienBangChiSo} 
      />
      
      <main className="flex-1 flex flex-col min-w-0 bg-black">
        <ThanhDau 
          activeTab={state.tabHienTai} 
          getTabLabel={(id) => id} 
          player={state.nguoiChoi} 
          onSetGameSpeed={actions.datTocDoGame} 
        />
        <GiaoDienChinh tabHienTai={state.tabHienTai} datTab={actions.datTabHienTai} duLieuGoc={duLieuGoc} />
      </main>

      {state.hienBangChiSo && (
        <BangChiSoNhanVat 
          player={state.nguoiChoi} 
          equipped={state.doDangMac as any} 
          onClose={() => actions.datHienBangChiSo(false)} 
          getStatMultiplier={(v) => v} 
          onAllocate={actions.congDiemTiemNang}
          onUnequip={(type) => actions.thaoTrangBi(type)}
        />
      )}
    </div>
  );
};

export default App;
