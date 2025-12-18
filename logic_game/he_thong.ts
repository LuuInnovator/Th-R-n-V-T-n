
import { useCallback } from 'react';
import { Player, Equipment, Material } from '../kieu_du_lieu';

export const dungHeThong = (
  nguoiChoi: Player, 
  datNguoiChoi: (p: Player) => void,
  danhSachTrangBi: Equipment[],
  datDanhSachTrangBi: (e: Equipment[]) => void,
  khoNguyenLieu: Material[],
  datKhoNguyenLieu: (m: Material[]) => void,
  themLog: (msg: string) => void
) => {
  const phienBanSave = "v2.6.5";

  const layDuLieuTong = useCallback(() => {
    return {
      phienBan: phienBanSave,
      nguoiChoi,
      danhSachTrangBi,
      khoNguyenLieu
    };
  }, [nguoiChoi, danhSachTrangBi, khoNguyenLieu]);

  const apDungDuLieu = useCallback((data: any) => {
    if (!data) return;
    if (data.nguoiChoi) datNguoiChoi(data.nguoiChoi);
    if (data.danhSachTrangBi) datDanhSachTrangBi(data.danhSachTrangBi);
    if (data.khoNguyenLieu) datKhoNguyenLieu(data.khoNguyenLieu);
  }, [datNguoiChoi, datDanhSachTrangBi, datKhoNguyenLieu]);

  const luuLocal = useCallback((imLang: boolean = false) => {
    const data = layDuLieuTong();
    localStorage.setItem('tho_ren_v2_full_save', JSON.stringify(data));
    if (!imLang) themLog("💾 Đã lưu toàn bộ tiến trình vào trình duyệt.");
  }, [layDuLieuTong, themLog]);

  const taiLocal = useCallback(() => {
    const data = localStorage.getItem('tho_ren_v2_full_save');
    if (data) {
      try {
        const parsed = JSON.parse(data);
        apDungDuLieu(parsed);
        themLog(`📂 Khôi phục dữ liệu thành công (Bản lưu ${parsed.phienBan || 'cũ'}).`);
      } catch (e) {
        themLog("❌ Lỗi khi tải dữ liệu từ trình duyệt.");
      }
    }
  }, [apDungDuLieu, themLog]);

  const xuatFile = useCallback(() => {
    const data = layDuLieuTong();
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ThoRen_MasterSave_${new Date().getTime()}.json`;
    link.click();
    themLog("📤 Đã xuất file sao lưu toàn diện.");
  }, [layDuLieuTong, themLog]);

  const nhapFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        apDungDuLieu(parsed);
        themLog("📂 Nhập dữ liệu từ file thành công!");
      } catch (err) {
        themLog("❌ Lỗi: Tệp tin sao lưu không hợp lệ.");
      }
    };
    reader.readAsText(file);
  }, [apDungDuLieu, themLog]);

  return { luuLocal, taiLocal, xuatFile, nhapFile };
};
