
import { useState, useCallback } from 'react';

export interface DongNhatKy {
  id: string;
  tin_nhan: string;
}

export const dungNhatKy = () => {
  const [nhatKy, datNhatKy] = useState<DongNhatKy[]>([]);

  const themLog = useCallback((msg: string) => {
    const thoiGian = new Date().toLocaleTimeString('vi-VN', { hour12: false });
    const logMoi = {
      id: Date.now().toString() + Math.random().toString().slice(2, 6),
      tin_nhan: `[${thoiGian}] ${msg}`
    };

    datNhatKy(prev => {
      const danhSachMoi = [logMoi, ...prev];
      return danhSachMoi.slice(0, 40); // Giữ tối đa 40 dòng
    });
  }, []);

  const xoaNhatKy = useCallback(() => datNhatKy([]), []);

  return { nhatKy, themLog, xoaNhatKy };
};
