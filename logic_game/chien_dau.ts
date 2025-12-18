
import { useCallback, Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { Enemy, Player, MonsterAbility } from '../kieu_du_lieu';
import { QUAI_VAT_DB } from '../hang_so/quai_vat';
import { so_ngau_nhien } from '../tien_ich/tinh_toan';

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
  hoiPhucHoanToan: () => void
) => {
  const timerTanCong = useRef<any>(null);

  const timQuai = useCallback(() => {
    if (quaiHienTai) return;
    
    const danhSachQuai = QUAI_VAT_DB[vungHienTai.id] || [];
    if (danhSachQuai.length === 0) return;

    const locQuai = danhSachQuai.filter(e => 
      nhanVat.rebirthCount >= (e.minRebirth || 0) &&
      e.level <= nhanVat.level + 10
    );

    if (locQuai.length === 0) return;

    const base = locQuai[so_ngau_nhien(0, locQuai.length - 1)];
    
    // SCALE QUÁI VẬT THEO LUÂN HỒI
    const scaleFactor = 1 + (nhanVat.rebirthCount * 0.5); // Tăng 50% mỗi lần luân hồi
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

  // ... giữ hàm tanCong cũ ...
  const tanCong = useCallback(() => {
    if (!quaiHienTai) {
      if (dangTuDong) timQuai();
      return;
    }

    let satThuongNguoi = Math.max(1, chiSoThucTe.totalAtk - quaiHienTai.defense);
    const laChiMang = Math.random() < (chiSoThucTe.critChance / 100);
    if (laChiMang) {
      satThuongNguoi = Math.floor(satThuongNguoi * (chiSoThucTe.critDamage / 100));
      themLog(`💥 Chí mạng! ${quaiHienTai.name} nhận ${satThuongNguoi.toLocaleString()} sát thương!`);
    }

    const mauQuaiMoi = Math.max(0, quaiHienTai.hp - satThuongNguoi);

    if (mauQuaiMoi <= 0) {
      themLog(`⚔️ Hạ gục ${quaiHienTai.name}!`);
      nhanExp(quaiHienTai.expReward);
      themVang(quaiHienTai.goldReward);
      
      nhanVat.lifeStats.monstersKilled++;
      nhanVat.lifeStats.goldEarned += quaiHienTai.goldReward;
      if (satThuongNguoi > nhanVat.lifeStats.maxDamageDealt) {
          nhanVat.lifeStats.maxDamageDealt = satThuongNguoi;
      }

      quaiHienTai.dropTable.forEach(drop => {
        const tyLeThucTe = drop.chance + (chiSoThucTe.dropRateBonus || 0);
        if (Math.random() < tyLeThucTe) {
          const bonusQty = quaiHienTai.isBoss ? 2 : 1;
          const qty = so_ngau_nhien(drop.minQty, drop.maxQty) * bonusQty;
          nhanNL(drop.materialType, qty);
        }
      });

      datQuai(null);
      hoiPhucHoanToan();
      
    } else {
      datQuai({ ...quaiHienTai, hp: mauQuaiMoi });

      let satThuongQuai = Math.max(1, quaiHienTai.attack - chiSoThucTe.totalDef);
      const tyLeNe = Math.min(0.4, (chiSoThucTe.cooldownReduction || 0) * 0.5);
      
      if (Math.random() < tyLeNe) {
        themLog(`💨 Bạn đã né được đòn của ${quaiHienTai.name}!`);
      } else {
        const mauNguoiMoi = Math.max(0, nhanVat.hp - satThuongQuai);
        capNhatMau(mauNguoiMoi);
        
        if (mauNguoiMoi <= 0) {
          themLog(`💀 Bạn đã gục ngã trước ${quaiHienTai.name}!`);
          datQuai(null);
          hoiPhucHoanToan();
        }
      }
    }
  }, [quaiHienTai, chiSoThucTe, nhanVat, nhanExp, themVang, nhanNL, themLog, dangTuDong, timQuai, datQuai, capNhatMau, hoiPhucHoanToan]);

  useEffect(() => {
    if (timerTanCong.current) clearInterval(timerTanCong.current);

    if (dangTuDong) {
      const interval = 1000 / nhanVat.gameSpeed;
      timerTanCong.current = setInterval(() => {
        tanCong();
      }, interval);
    }

    return () => {
      if (timerTanCong.current) clearInterval(timerTanCong.current);
    };
  }, [dangTuDong, quaiHienTai, nhanVat.gameSpeed, tanCong]);

  return { timQuai, tanCong };
};
