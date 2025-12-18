
import { useState, useCallback, useMemo, useEffect } from 'react';
import { dungNguoiChoi } from './nguoi_choi';
import { dungKhoDo } from './kho_do';
import { dungChienDau } from './chien_dau';
import { dungNhatKy } from './nhat_ky';
import { dungHeThong } from './he_thong';
import { tinh_toan_chi_so_nhan_vat } from '../tien_ich/tinh_toan_chi_so';
import { Blueprint, Equipment, EquipmentType, Rarity, GemType, GemTier, EnchantmentType } from '../kieu_du_lieu';
import { HE_SO_DO_HIEM } from '../hang_so/do_hiem';
import { tao_id, so_ngau_nhien, thu_van_may } from '../tien_ich/tinh_toan';

export const dungQuanLyGame = () => {
  const { nhatKy, themLog, xoaNhatKy } = dungNhatKy();
  
  const { 
    nguoiChoi, datNguoiChoi, datTocDoGame, 
    nhanEXP, congDiemTiemNang, muaNangCapVinhHang, nangCapKyNang,
    thucHienLuanHoi: luanHoiNguoiChoi, layCapDoLuanHoiYeuCau, capNhatLifeStats
  } = dungNguoiChoi(themLog);

  const { 
    danhSachTrangBi, khoNguyenLieu, doDangMac, 
    themNguyenLieu, macTrangBi, thaoTrangBi, banTrangBi, capNhatTrangBi,
    datDanhSachTrangBi, datKhoNguyenLieu, donDepKhiLuanHoi, banNhieuTrangBi
  } = dungKhoDo(themLog);

  const [tabHienTai, datTabHienTai] = useState('chien_dau');
  const [hienBangChiSo, datHienBangChiSo] = useState(false);
  const [vungHienTai, datVungHienTai] = useState({ id: 'z1', name: 'Rừng Khởi Nguyên', description: 'Nơi bắt đầu của mọi huyền thoại.', recommendedLevel: 1, materials: [] });
  const [quaiHienTai, datQuaiHienTai] = useState<any>(null);
  const [dangTuDong, datDangTuDong] = useState(false);

  const chiSoThucTe = useMemo(() => 
    tinh_toan_chi_so_nhan_vat(nguoiChoi, doDangMac, (v) => v), 
    [nguoiChoi, doDangMac]
  );

  const thucHienHoiPhucHoanToan = useCallback(() => {
    datNguoiChoi(p => {
        const stats = tinh_toan_chi_so_nhan_vat(p, doDangMac, (v) => v);
        return { ...p, hp: stats.totalHp };
    });
  }, [doDangMac, datNguoiChoi]);

  const { timQuai, tanCong } = dungChienDau(
    nguoiChoi, chiSoThucTe, vungHienTai, quaiHienTai, datQuaiHienTai,
    (hp) => datNguoiChoi(p => ({ ...p, hp })),
    nhanEXP,
    (gold) => datNguoiChoi(p => ({ ...p, gold: p.gold + gold })),
    themNguyenLieu,
    themLog,
    dangTuDong,
    thucHienHoiPhucHoanToan,
    capNhatLifeStats
  );

  const { luuLocal, taiLocal, xuatFile, nhapFile } = dungHeThong(
    nguoiChoi, datNguoiChoi, danhSachTrangBi, datDanhSachTrangBi,
    khoNguyenLieu, datKhoNguyenLieu, themLog
  );

  const handleSocketGem = useCallback((gemType: GemType, gemTier: GemTier, item: Equipment) => {
    themLog(`💎 Đã khảm ${gemType} vào ${item.name}`);
    capNhatTrangBi(item.id, { 
      socketedGems: [...item.socketedGems, { type: gemType, tier: gemTier }] 
    });
  }, [themLog, capNhatTrangBi]);

  const handleAddSocket = useCallback((item: Equipment) => {
    const cost = item.sockets === 0 ? 500 : (item.sockets === 1 ? 5000 : 50000);
    if (nguoiChoi.gold < cost) {
      themLog("❌ Không đủ vàng!");
      return;
    }
    datNguoiChoi(p => ({ ...p, gold: p.gold - cost }));
    capNhatTrangBi(item.id, { sockets: item.sockets + 1 });
    themLog(`🛠️ Đã đục thêm lỗ cho ${item.name}`);
  }, [nguoiChoi.gold, datNguoiChoi, capNhatTrangBi, themLog]);

  const handleEnchant = useCallback((type: EnchantmentType, item: Equipment) => {
    if (nguoiChoi.gold < 2000) {
      themLog("❌ Không đủ vàng!");
      return;
    }
    datNguoiChoi(p => ({ ...p, gold: p.gold - 2000 }));
    capNhatTrangBi(item.id, { enchantment: type });
    themLog(`✨ Đã phù phép ${type} cho ${item.name}`);
  }, [nguoiChoi.gold, datNguoiChoi, capNhatTrangBi, themLog]);

  // Fix: Thêm hàm nangCapBanVe để xử lý việc nâng cấp bản vẽ trang bị
  const nangCapBanVe = useCallback((id: string, cost: number) => {
    if (nguoiChoi.eternalPoints < cost) {
      themLog("❌ Không đủ Điểm Vĩnh Hằng!");
      return;
    }
    datNguoiChoi(p => ({
      ...p,
      eternalPoints: p.eternalPoints - cost,
      blueprintLevels: {
        ...p.blueprintLevels,
        [id]: (p.blueprintLevels[id] || 0) + 1
      }
    }));
    themLog(`📜 Đã nâng cấp bản vẽ thành công!`);
  }, [nguoiChoi.eternalPoints, datNguoiChoi, themLog]);

  const thucHienLuanHoi = useCallback((thienPhuMoi?: string, legacyItemId?: string) => {
    luanHoiNguoiChoi(thienPhuMoi);
    donDepKhiLuanHoi(legacyItemId);
    datQuaiHienTai(null);
    datDangTuDong(false);
  }, [luanHoiNguoiChoi, donDepKhiLuanHoi]);

  const thucHienCheTac = useCallback((bp: Blueprint, dotNhiet: boolean) => {
    const duNL = bp.requiredMaterials.every(req => {
        const hienCo = khoNguyenLieu.find(m => m.type === req.type)?.quantity || 0;
        return hienCo >= req.amount;
    });

    if (!duNL) {
        themLog(`❌ Thiếu nguyên liệu chế tác!`);
        return;
    }

    datKhoNguyenLieu(prev => prev.map(m => {
        const req = bp.requiredMaterials.find(r => r.type === m.type);
        return req ? { ...m, quantity: m.quantity - req.amount } : m;
    }));

    if (dotNhiet && Math.random() < 0.65) {
        themLog(`🔥 PHÔI TAN CHẢY! Sức nóng cực đại đã phá hủy bản vẽ này.`);
        return;
    }

    const phamChat = thu_van_may(); 
    const heSoRarity = HE_SO_DO_HIEM[phamChat] * (dotNhiet ? 2.5 : 1);
    const bonusTienHoa = 1 + ((nguoiChoi.blueprintLevels[bp.id] || 0) * 0.25);
    
    const extraStats: any = {};
    const chanceTable: Record<string, number> = { [Rarity.Rare]: 0.3, [Rarity.Epic]: 0.6, [Rarity.Legendary]: 0.8, [Rarity.Mythic]: 1, [Rarity.Cosmic]: 1 };
    const numRolls = phamChat === Rarity.Cosmic ? 4 : (phamChat === Rarity.Mythic ? 3 : (phamChat === Rarity.Legendary ? 2 : 1));
    
    if (Math.random() < (chanceTable[phamChat] || 0)) {
        const possibleStats = ['dodge', 'reflect', 'silence', 'stun', 'regen', 'lifesteal'];
        for(let i = 0; i < numRolls; i++) {
            const statName = possibleStats[Math.floor(Math.random() * possibleStats.length)];
            const baseVal = statName === 'regen' ? (bp.reqLevel * 5) : (1.5 + Math.random() * 3);
            extraStats[statName] = Number((baseVal * heSoRarity * (dotNhiet ? 1.5 : 1)).toFixed(1));
        }
    }

    const itemMoi: Equipment = {
        id: tao_id(),
        name: `${bp.name}`,
        type: bp.resultType as any,
        rarity: phamChat,
        isEquipped: false,
        value: Math.floor(100 * heSoRarity * (bp.reqLevel / 5)),
        reqLevel: bp.reqLevel,
        stats: {
            attack: bp.baseStats.maxAtk > 0 ? so_ngau_nhien(bp.baseStats.minAtk, bp.baseStats.maxAtk) * heSoRarity * bonusTienHoa : 0,
            defense: bp.baseStats.maxDef > 0 ? so_ngau_nhien(bp.baseStats.minDef, bp.baseStats.maxDef) * heSoRarity * bonusTienHoa : 0,
            hpBonus: bp.baseStats.maxHp ? so_ngau_nhien(bp.baseStats.minHp || 0, bp.baseStats.maxHp) * heSoRarity * bonusTienHoa : 0,
            ...extraStats
        },
        sockets: Math.random() < 0.15 ? 1 : 0,
        socketedGems: []
    };

    capNhatLifeStats({ itemsCrafted: nguoiChoi.lifeStats.itemsCrafted + 1 });
    datDanhSachTrangBi(prev => [itemMoi, ...prev]);
    themLog(`⚒️ LUYỆN KIM THÀNH CÔNG: [${phamChat}] ${itemMoi.name}`);
  }, [khoNguyenLieu, datKhoNguyenLieu, nguoiChoi.blueprintLevels, datDanhSachTrangBi, themLog, capNhatLifeStats, nguoiChoi.lifeStats.itemsCrafted]);

  return {
    state: {
      nguoiChoi, chiSoThucTe, nhatKy, danhSachTrangBi, khoNguyenLieu, doDangMac,
      tabHienTai, hienBangChiSo, vungHienTai, quaiHienTai, dangTuDong,
      reqRebirthLevel: layCapDoLuanHoiYeuCau()
    },
    actions: {
      datTabHienTai, datHienBangChiSo, datVungHienTai, datDangTuDong, datTocDoGame,
      timQuai, tanCong, macTrangBi, thaoTrangBi, banTrangBi, banNhieuTrangBi,
      thucHienCheTac, handleSocketGem, handleAddSocket, handleEnchant,
      thucHienLuanHoi, muaNangCapVinhHang, nangCapKyNang,
      congDiemTiemNang, datNguoiChoi, luuLocal, taiLocal, xuatFile, nhapFile, xoaNhatKy, nangCapBanVe
    }
  };
};
