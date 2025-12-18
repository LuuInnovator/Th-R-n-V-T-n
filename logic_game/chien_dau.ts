
import { useCallback, Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { Enemy, Player, MonsterAbility, LifeStats } from '../kieu_du_lieu';
import { QUAI_VAT_DB } from '../hang_so/quai_vat';
import { so_ngau_nhien, dinh_dang_so } from '../tien_ich/tinh_toan';

export const dungChienDau = (
  nhanVat: Player,
  chiSoThucTe: any,
  vungHienTai: any,
  quaiHienTai: Enemy | null,
  datQuai: Dispatch<SetStateAction<Enemy | null>>,
  capNhatMau: (hp: number) => void,
  nhanExp: (exp: number) => void,
  themVang: (gold: number) => void,
  nhanNL: (type: any, qty: number) => void,
  themLog: (msg: string) => void,
  dangTuDong: boolean,
  hoiPhucHoanToan: () => void,
  capNhatLifeStats: (updates: Partial<LifeStats>) => void
) => {
  const timerTanCong = useRef<any>(null);
  // Fix: Thêm giá trị khởi tạo null cho useRef để tránh lỗi tham số trong một số cấu hình TypeScript
  const tanCongRef = useRef<(() => void) | null>(null);

  const timQuai = useCallback(() => {
    if (quaiHienTai) return;
    
    const danhSachQuai = QUAI_VAT_DB[vungHienTai.id] || [];
    if (danhSachQuai.length === 0) return;

    const locQuai = danhSachQuai.filter(e => 
      nhanVat.rebirthCount >= (e.minRebirth || 0) &&
      e.level <= nhanVat.level + 15
    );

    if (locQuai.length === 0) return;

    const base = locQuai[so_ngau_nhien(0, locQuai.length - 1)];
    const scaleFactor = 1 + (nhanVat.rebirthCount * 0.5); 
    const nameSuffix = nhanVat.rebirthCount > 0 ? ` [Luân Hồi ${nhanVat.rebirthCount}]` : "";

    const quaiScaled: Enemy = {
        ...base,
        name: base.name + nameSuffix,
        maxHp: Math.floor(base.maxHp * scaleFactor),
        hp: Math.floor(base.maxHp * scaleFactor),
        attack: Math.floor(base.attack * scaleFactor),
        defense: Math.floor(base.defense * scaleFactor),
        goldReward: Math.floor(base.goldReward * (1 + nhanVat.rebirthCount * 0.2)),
        expReward: Math.floor(base.expReward * (1 + nhanVat.rebirthCount * 0.1))
    };

    datQuai(quaiScaled);
    themLog(`🔍 Phát hiện: ${quaiScaled.name}!`);
  }, [vungHienTai, nhanVat.rebirthCount, nhanVat.level, themLog, datQuai, quaiHienTai]);

  const tanCong = useCallback(() => {
    if (!quaiHienTai) {
      if (dangTuDong) timQuai();
      return;
    }

    // --- LƯỢT NGƯỜI CHƠI ---
    let satThuongNguoi = Math.max(1, chiSoThucTe.totalAtk - quaiHienTai.defense);
    const laChiMang = Math.random() < (chiSoThucTe.critChance / 100);
    
    if (laChiMang) {
      satThuongNguoi = Math.floor(satThuongNguoi * 2.0);
      themLog(`💥 Chí mạng! ${quaiHienTai.name} nhận ${dinh_dang_so(satThuongNguoi)} sát thương!`);
    }

    // Lifesteal & Regen
    let hpLifesteal = Math.floor(satThuongNguoi * (chiSoThucTe.lifesteal / 100));
    let hpRegen = chiSoThucTe.regen || 0;
    const mauNguoiSauHoi = Math.min(chiSoThucTe.totalHp, nhanVat.hp + hpLifesteal + hpRegen);
    if (hpLifesteal > 0 || hpRegen > 0) capNhatMau(mauNguoiSauHoi);

    const mauQuaiMoi = Math.max(0, quaiHienTai.hp - satThuongNguoi);

    if (mauQuaiMoi <= 0) {
      themLog(`⚔️ Hạ gục ${quaiHienTai.name}!`);
      nhanExp(quaiHienTai.expReward);
      themVang(quaiHienTai.goldReward);
      
      // Cập nhật thống kê AN TOÀN qua setter
      capNhatLifeStats({
        monstersKilled: nhanVat.lifeStats.monstersKilled + 1,
        goldEarned: nhanVat.lifeStats.goldEarned + quaiHienTai.goldReward,
        maxDamageDealt: Math.max(nhanVat.lifeStats.maxDamageDealt, satThuongNguoi)
      });

      quaiHienTai.dropTable.forEach(drop => {
        if (Math.random() < drop.chance) {
          const qty = so_ngau_nhien(drop.minQty, drop.maxQty) * (quaiHienTai.isBoss ? 2 : 1);
          nhanNL(drop.materialType, qty);
        }
      });

      datQuai(null);
      hoiPhucHoanToan();
    } else {
      datQuai({ ...quaiHienTai, hp: mauQuaiMoi });

      // --- LƯỢT QUÁI ---
      if (Math.random() < (chiSoThucTe.dodge / 100)) {
        themLog(`💨 Bạn đã né được đòn của ${quaiHienTai.name}!`);
      } else {
        let satThuongQuai = Math.max(1, quaiHienTai.attack - chiSoThucTe.totalDef);
        
        // Reflect
        if (chiSoThucTe.reflect > 0) {
            const satThuongPhan = Math.floor(satThuongQuai * (chiSoThucTe.reflect / 100));
            const mauQuaiSauPhan = Math.max(0, mauQuaiMoi - satThuongPhan);
            datQuai(prev => prev ? { ...prev, hp: mauQuaiSauPhan } : null);
            if (satThuongPhan > 0) themLog(`🛡️ Phản đòn! Gây ${dinh_dang_so(satThuongPhan)} sát thương.`);
        }

        const mauNguoiMoi = Math.max(0, mauNguoiSauHoi - satThuongQuai);
        capNhatMau(mauNguoiMoi);
        
        if (mauNguoiMoi <= 0) {
          themLog(`💀 Bạn đã gục ngã trước ${quaiHienTai.name}!`);
          datQuai(null);
          hoiPhucHoanToan();
        }
      }
    }
  }, [quaiHienTai, chiSoThucTe, nhanVat.hp, nhanVat.lifeStats, nhanExp, themVang, nhanNL, themLog, dangTuDong, timQuai, datQuai, capNhatMau, hoiPhucHoanToan, capNhatLifeStats]);

  // LUÔN giữ tham chiếu tấn công mới nhất để setInterval sử dụng mà không cần reset
  useEffect(() => {
    tanCongRef.current = tanCong;
  }, [tanCong]);

  useEffect(() => {
    if (timerTanCong.current) clearInterval(timerTanCong.current);

    if (dangTuDong) {
      const ms = Math.max(100, 1000 / nhanVat.gameSpeed);
      timerTanCong.current = setInterval(() => {
        if (tanCongRef.current) tanCongRef.current();
      }, ms);
    }

    return () => {
      if (timerTanCong.current) clearInterval(timerTanCong.current);
    };
  }, [dangTuDong, nhanVat.gameSpeed]);

  return { timQuai, tanCong };
};
