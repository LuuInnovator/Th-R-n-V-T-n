
import { useState, useMemo, useCallback, useEffect } from 'react';
import { 
  Zone, Enemy, Player, CharacterClass, Equipment, Blueprint, 
  EquipmentType, GemType, GemTier, EnchantmentType 
} from '../kieu_du_lieu';
import { CAC_VUNG_DAT, BAN_VE_KHOI_TAO, HE_SO_DO_HIEM } from '../hang_so';
import { tinh_toan_chi_so_nhan_vat } from '../tien_ich/tinh_toan_chi_so';
import { tao_id, thu_van_may, so_ngau_nhien } from '../tien_ich/tinh_toan';

import { dungNhatKy } from './nhat_ky';
import { dungNguoiChoi } from './nguoi_choi';
import { dungKhoDo } from './kho_do';
import { dungChienDau } from './chien_dau';
import { dungHeThong } from './he_thong';

export const dungQuanLyGame = () => {
  const { nhatKy, themLog } = dungNhatKy();
  const { 
    nguoiChoi, datNguoiChoi, datTocDoGame, nangCapBanVe, 
    nhanEXP, congDiemTiemNang, muaNangCapVinhHang, nangCapKyNang,
    thucHienLuanHoi
  } = dungNguoiChoi(themLog);
  
  const { 
    danhSachTrangBi, datDanhSachTrangBi, khoNguyenLieu, datKhoNguyenLieu, doDangMac, 
    themNguyenLieu, macTrangBi, thaoTrangBi, banTrangBi, capNhatTrangBi,
    donDepKhiLuanHoi 
  } = dungKhoDo(themLog);

  const [tabHienTai, datTabHienTai] = useState('chien_dau');
  const [vungHienTai, datVungHienTai] = useState<Zone>(CAC_VUNG_DAT[0]);
  const [quaiHienTai, datQuaiHienTai] = useState<Enemy | null>(null);
  const [hienBangChiSo, datHienBangChiSo] = useState(false);
  const [dangTuDong, datDangTuDong] = useState(false);

  const chiSoThucTe = useMemo(() => {
    return tinh_toan_chi_so_nhan_vat(nguoiChoi, doDangMac as any, (v) => v);
  }, [nguoiChoi, doDangMac]);

  const handleLuanHoiTongThe = useCallback((thienPhuMoi?: string, legacyItemId?: string) => {
      donDepKhiLuanHoi(legacyItemId);
      thucHienLuanHoi(thienPhuMoi);
      datTabHienTai('chien_dau');
      datVungHienTai(CAC_VUNG_DAT[0]);
      datQuaiHienTai(null);
  }, [donDepKhiLuanHoi, thucHienLuanHoi]);

  const hoiPhucHoanToan = useCallback(() => {
    datNguoiChoi(p => ({ ...p, hp: chiSoThucTe.totalHp }));
  }, [chiSoThucTe.totalHp, datNguoiChoi]);

  const { timQuai, tanCong } = dungChienDau(
    nguoiChoi, chiSoThucTe, vungHienTai, quaiHienTai, datQuaiHienTai,
    (hp) => datNguoiChoi(p => ({ ...p, hp })),
    nhanEXP,
    (vang) => datNguoiChoi(p => ({ ...p, gold: p.gold + vang })),
    themNguyenLieu,
    themLog,
    dangTuDong,
    hoiPhucHoanToan
  );

  const thucHienCheTac = useCallback((bp: Blueprint, dotNhiet: boolean) => {
    const duNL = bp.requiredMaterials.every(req => {
        const hienCo = khoNguyenLieu.find(m => m.type === req.type)?.quantity || 0;
        return hienCo >= req.amount;
    });

    if (!duNL) {
        themLog(`❌ Thiếu nguyên liệu!`);
        return;
    }

    datKhoNguyenLieu(prev => prev.map(m => {
        const req = bp.requiredMaterials.find(r => r.type === m.type);
        return req ? { ...m, quantity: m.quantity - req.amount } : m;
    }));

    if (dotNhiet && Math.random() < 0.90) {
        themLog(`🔥 Đúc thất bại!`);
        return;
    }

    const phamChat = thu_van_may(); 
    const heSoPhamChat = HE_SO_DO_HIEM[phamChat] * (dotNhiet ? 1.4 : 1);
    const bonusTienHoa = 1 + ((nguoiChoi.blueprintLevels[bp.id] || 0) * 0.1);
    
    const itemMoi: Equipment = {
        id: tao_id(),
        name: `${bp.name} [${phamChat}]`,
        type: bp.resultType as any,
        rarity: phamChat,
        isEquipped: false,
        value: Math.floor(50 * heSoPhamChat),
        reqLevel: bp.reqLevel,
        stats: {
            attack: bp.baseStats.maxAtk > 0 ? so_ngau_nhien(bp.baseStats.minAtk, bp.baseStats.maxAtk) * heSoPhamChat * bonusTienHoa : 0,
            defense: bp.baseStats.maxDef > 0 ? so_ngau_nhien(bp.baseStats.minDef, bp.baseStats.maxDef) * heSoPhamChat * bonusTienHoa : 0,
            hpBonus: bp.baseStats.maxHp && bp.baseStats.maxHp > 0 ? so_ngau_nhien(bp.baseStats.minHp || 0, bp.baseStats.maxHp) * heSoPhamChat * bonusTienHoa : 0,
        },
        sockets: Math.random() < 0.03 ? 1 : 0,
        socketedGems: []
    };

    datDanhSachTrangBi(prev => [...prev, itemMoi]);
    themLog(`🔨 Đã đúc: ${itemMoi.name}`);
  }, [khoNguyenLieu, datKhoNguyenLieu, nguoiChoi.blueprintLevels, datDanhSachTrangBi, themLog]);

  const handleAddSocket = useCallback((item: Equipment) => {
    const cost = 2000 * (item.sockets + 1) * (item.sockets + 1);
    if (item.sockets >= 3 || nguoiChoi.gold < cost) return;
    datNguoiChoi(p => ({ ...p, gold: p.gold - cost }));
    capNhatTrangBi(item.id, { sockets: item.sockets + 1 });
    themLog(`⚒️ Đã đục lỗ.`);
  }, [nguoiChoi.gold, capNhatTrangBi, datNguoiChoi, themLog]);

  const handleSocketGem = useCallback((gemType: GemType, gemTier: GemTier, item: Equipment) => {
    if (item.socketedGems.length >= item.sockets) return;
    const newGems = [...item.socketedGems, { type: gemType, tier: gemTier }];
    capNhatTrangBi(item.id, { socketedGems: newGems });
  }, [capNhatTrangBi]);

  const handleEnchant = useCallback((type: EnchantmentType, item: Equipment) => {
    const cost = 5000;
    if (nguoiChoi.gold < cost) return;
    datNguoiChoi(p => ({ ...p, gold: p.gold - cost }));
    capNhatTrangBi(item.id, { enchantment: type });
  }, [nguoiChoi.gold, capNhatTrangBi, datNguoiChoi]);

  const { luuLocal, taiLocal, xuatFile, nhapFile } = dungHeThong(
    nguoiChoi, datNguoiChoi, 
    danhSachTrangBi, datDanhSachTrangBi,
    khoNguyenLieu, datKhoNguyenLieu,
    themLog
  );

  return {
    state: {
      nguoiChoi, danhSachTrangBi, khoNguyenLieu, doDangMac,
      tabHienTai, vungHienTai, quaiHienTai, hienBangChiSo, dangTuDong,
      chiSoThucTe, nhatKy
    },
    actions: {
      datTabHienTai, datVungHienTai, datHienBangChiSo, datDangTuDong,
      datTocDoGame, nangCapBanVe, congDiemTiemNang, muaNangCapVinhHang, nangCapKyNang,
      macTrangBi, thaoTrangBi, banTrangBi, thucHienCheTac,
      handleAddSocket, handleSocketGem, handleEnchant,
      timQuai, tanCong,
      luuLocal, taiLocal, xuatFile, nhapFile,
      datNguoiChoi, 
      thucHienLuanHoi: handleLuanHoiTongThe
    }
  };
};
