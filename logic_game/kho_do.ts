
import { useState, useCallback, useMemo } from 'react';
import { Material, Equipment, EquipmentType, MaterialType, MaterialTier } from '../kieu_du_lieu';
import { PHAN_CAP_NGUYEN_LIEU } from '../hang_so/nguyen_lieu/phan_cap';
import { tao_id } from '../tien_ich/tinh_toan';

export const dungKhoDo = (themLog: (msg: string) => void) => {
  const [danhSachTrangBi, datDanhSachTrangBi] = useState<Equipment[]>([]);
  const [khoNguyenLieu, datKhoNguyenLieu] = useState<Material[]>([]);
  
  const doDangMac = useMemo(() => {
    const mac: Record<string, Equipment | null> = {
      [EquipmentType.Weapon]: null, [EquipmentType.Armor]: null, [EquipmentType.Accessory]: null,
      [EquipmentType.Helmet]: null, [EquipmentType.Gloves]: null, [EquipmentType.Boots]: null
    };
    danhSachTrangBi.forEach(item => {
      if (item.isEquipped) mac[item.type] = item;
    });
    return mac;
  }, [danhSachTrangBi]);

  const donDepKhiLuanHoi = useCallback((legacyItemId?: string) => {
    // 1. Giữ lại trang bị Legacy hoặc đang mặc nếu được đánh dấu
    datDanhSachTrangBi(prev => prev.filter(item => item.id === legacyItemId || item.isLegacy));
    
    // 2. Mất nguyên liệu Basic, giữ lại Elite và Eternal
    datKhoNguyenLieu(prev => prev.filter(m => {
        const phanCap = PHAN_CAP_NGUYEN_LIEU[m.type] || MaterialTier.Basic;
        return phanCap !== MaterialTier.Basic;
    }));

    themLog("🧹 Kho đồ đã được dọn dẹp cho kiếp mới.");
  }, [themLog]);

  // ... giữ các hàm themNguyenLieu, banTrangBi, macTrangBi, thaoTrangBi, capNhatTrangBi cũ ...
  const themNguyenLieu = useCallback((loai: MaterialType, soLuong: number) => {
    datKhoNguyenLieu(prev => {
      const tonTai = prev.find(m => m.type === loai);
      if (tonTai) {
        return prev.map(m => m.id === tonTai.id ? { ...m, quantity: m.quantity + soLuong } : m);
      }
      return [...prev, { id: tao_id(), name: loai, type: loai, quantity: soLuong }];
    });
    themLog(`📦 Nhận được: +${soLuong} ${loai}`);
  }, [themLog]);

  const banTrangBi = useCallback((item: Equipment, onNhanVang: (v: number) => void) => {
    if (item.isEquipped) {
        themLog("❌ Tháo trang bị ra trước khi bán!");
        return;
    }
    const giaBan = Math.floor(item.value || 50);
    datDanhSachTrangBi(prev => prev.filter(i => i.id !== item.id));
    onNhanVang(giaBan);
    themLog(`💰 Đã bán ${item.name} thu về ${giaBan} vàng.`);
  }, [themLog]);

  const macTrangBi = useCallback((monDo: Equipment, capNguoiChoi: number) => {
    if (capNguoiChoi < monDo.reqLevel) {
        themLog(`❌ Cấp độ không đủ! Yêu cầu cấp ${monDo.reqLevel}`);
        return;
    }

    datDanhSachTrangBi(prev => prev.map(item => {
        if (item.id === monDo.id) return { ...item, isEquipped: true };
        if (item.type === monDo.type && item.isEquipped) return { ...item, isEquipped: false };
        return item;
    }));

    themLog(`⚔️ Đã trang bị: ${monDo.name}`);
  }, [themLog]);

  const thaoTrangBi = useCallback((itemId: string) => {
    datDanhSachTrangBi(prev => prev.map(item => 
        item.id === itemId ? { ...item, isEquipped: false } : item
    ));
    themLog(`🛡️ Đã tháo trang bị.`);
  }, [themLog]);

  const capNhatTrangBi = useCallback((itemId: string, updates: Partial<Equipment>) => {
    datDanhSachTrangBi(prev => prev.map(item => 
        item.id === itemId ? { ...item, ...updates } : item
    ));
  }, []);

  return { 
    danhSachTrangBi, khoNguyenLieu, doDangMac, 
    themNguyenLieu, macTrangBi, thaoTrangBi, banTrangBi, capNhatTrangBi,
    datDanhSachTrangBi, datKhoNguyenLieu, donDepKhiLuanHoi
  };
};
