
import { useState, useCallback } from 'react';
import { Material, Equipment, EquipmentType, MaterialType, GemType, GemTier, EnchantmentType } from '../kieu_du_lieu';
import { tao_id } from '../tien_ich/tinh_toan';

export const dungKhoDo = (themLog: (msg: string) => void) => {
  const [danhSachTrangBi, datDanhSachTrangBi] = useState<Equipment[]>([]);
  const [khoNguyenLieu, datKhoNguyenLieu] = useState<Material[]>([]);
  
  const [doDangMac, datDoDangMac] = useState<Record<EquipmentType, Equipment | null>>({
    [EquipmentType.Weapon]: null, [EquipmentType.Armor]: null, [EquipmentType.Accessory]: null,
    [EquipmentType.Helmet]: null, [EquipmentType.Gloves]: null, [EquipmentType.Boots]: null
  });

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
        themLog("❌ Không thể bán món đồ đang mặc!");
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

    datDoDangMac(prev => ({ ...prev, [monDo.type]: { ...monDo, isEquipped: true } }));
    themLog(`⚔️ Đã trang bị: ${monDo.name}`);
  }, [themLog]);

  const thaoTrangBi = useCallback((loai: EquipmentType) => {
    datDoDangMac(prev => {
        const monDo = prev[loai];
        if (monDo) {
            datDanhSachTrangBi(list => list.map(item => 
                item.id === monDo.id ? { ...item, isEquipped: false } : item
            ));
            themLog(`🛡️ Đã tháo: ${monDo.name}`);
        }
        return { ...prev, [loai]: null };
    });
  }, [themLog]);

  const capNhatTrangBi = useCallback((itemId: string, updates: Partial<Equipment>) => {
    datDanhSachTrangBi(prev => prev.map(item => 
        item.id === itemId ? { ...item, ...updates } : item
    ));
    // Cập nhật cả đồ đang mặc nếu cần
    datDoDangMac(prev => {
        const newMac = { ...prev };
        Object.keys(newMac).forEach(key => {
            const k = key as EquipmentType;
            if (newMac[k]?.id === itemId) {
                newMac[k] = { ...newMac[k]!, ...updates };
            }
        });
        return newMac;
    });
  }, []);

  return { 
    danhSachTrangBi, khoNguyenLieu, doDangMac, 
    themNguyenLieu, macTrangBi, thaoTrangBi, banTrangBi, capNhatTrangBi,
    datDanhSachTrangBi, datKhoNguyenLieu 
  };
};
