
import { useState, useCallback, useMemo } from 'react';
import { Material, Equipment, EquipmentType, MaterialType, MaterialTier } from '../kieu_du_lieu';
import { PHAN_CAP_NGUYEN_LIEU } from '../hang_so/nguyen_lieu/phan_cap';
import { tao_id } from '../tien_ich/tinh_toan';

export const dungKhoDo = (themLog: (msg: string) => void) => {
  const [danhSachTrangBi, datDanhSachTrangBi] = useState<Equipment[]>([]);
  const [khoNguyenLieu, datKhoNguyenLieu] = useState<Material[]>([]);
  
  const doDangMac = useMemo(() => {
    const mac: any = {
      [EquipmentType.Weapon]: null, [EquipmentType.Armor]: null, [EquipmentType.Helmet]: null,
      [EquipmentType.Boots]: null, [EquipmentType.Necklace]: null, Ring1: null, Ring2: null
    };

    danhSachTrangBi.forEach(item => {
      if (item.isEquipped) {
        if (item.type === EquipmentType.Ring) {
          if (item.ringSlot === 1) mac.Ring1 = item;
          else if (item.ringSlot === 2) mac.Ring2 = item;
        } else {
          mac[item.type] = item;
        }
      }
    });
    return mac;
  }, [danhSachTrangBi]);

  const banNhieuTrangBi = useCallback((ids: string[], onNhanVang: (v: number) => void) => {
    let tongVang = 0;
    const itemsBiBan = danhSachTrangBi.filter(i => ids.includes(i.id) && !i.isEquipped);
    
    itemsBiBan.forEach(i => {
      tongVang += Math.floor(i.value || 50);
    });

    datDanhSachTrangBi(prev => prev.filter(i => !ids.includes(i.id) || i.isEquipped));
    onNhanVang(tongVang);
    themLog(`💰 Đã bán ${itemsBiBan.length} trang bị, thu về ${tongVang.toLocaleString()} vàng.`);
  }, [danhSachTrangBi, themLog]);

  const donDepKhiLuanHoi = useCallback((legacyItemId?: string) => {
    datDanhSachTrangBi(prev => {
        // Lọc giữ lại món legacy hoặc đồ cũ đã có tag legacy
        const newInventory = prev.filter(item => item.id === legacyItemId || item.isLegacy);
        // Đánh dấu món mới chọn là Legacy
        return newInventory.map(item => item.id === legacyItemId ? { ...item, isLegacy: true, isEquipped: true } : item);
    });
    
    datKhoNguyenLieu(prev => prev.filter(m => {
        const phanCap = PHAN_CAP_NGUYEN_LIEU[m.type] || MaterialTier.Basic;
        return phanCap !== MaterialTier.Basic;
    }));
    themLog("🧹 Kho đồ đã được dọn dẹp cho kiếp mới.");
  }, [themLog]);

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

    datDanhSachTrangBi(prev => {
      if (monDo.type === EquipmentType.Ring) {
        const r1 = prev.find(i => i.isEquipped && i.type === EquipmentType.Ring && i.ringSlot === 1);
        const r2 = prev.find(i => i.isEquipped && i.type === EquipmentType.Ring && i.ringSlot === 2);
        let slotTarget: 1 | 2 = 1;
        if (!r1) slotTarget = 1;
        else if (!r2) slotTarget = 2;
        else slotTarget = 1;

        return prev.map(item => {
          if (item.id === monDo.id) return { ...item, isEquipped: true, ringSlot: slotTarget };
          if (item.type === EquipmentType.Ring && item.isEquipped && item.ringSlot === slotTarget) {
            return { ...item, isEquipped: false, ringSlot: undefined };
          }
          return item;
        });
      }
      return prev.map(item => {
        if (item.id === monDo.id) return { ...item, isEquipped: true };
        if (item.type === monDo.type && item.isEquipped) return { ...item, isEquipped: false };
        return item;
      });
    });

    themLog(`⚔️ Đã trang bị: ${monDo.name}`);
  }, [themLog]);

  const thaoTrangBi = useCallback((itemIdOrType: string) => {
    datDanhSachTrangBi(prev => prev.map(item => {
      if (item.id === itemIdOrType || item.type === itemIdOrType || 
         (itemIdOrType === 'Ring1' && item.type === EquipmentType.Ring && item.ringSlot === 1) ||
         (itemIdOrType === 'Ring2' && item.type === EquipmentType.Ring && item.ringSlot === 2)
      ) {
        return { ...item, isEquipped: false, ringSlot: undefined };
      }
      return item;
    }));
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
    datDanhSachTrangBi, datKhoNguyenLieu, donDepKhiLuanHoi, banNhieuTrangBi
  };
};
