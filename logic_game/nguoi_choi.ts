
import { useState, useCallback } from 'react';
import { Player, CharacterClass, Skill, EternalUpgrade, EternalUpgradeId, LifeStats } from '../kieu_du_lieu';

export const THONG_KE_KIEP_MOI: LifeStats = {
  monstersKilled: 0,
  goldEarned: 0,
  itemsCrafted: 0,
  maxDamageDealt: 0
};

export const NHAN_VAT_MAC_DINH: Player = {
  characterClass: CharacterClass.HeavySentinel, // Mặc định là Hộ Vệ để bắt đầu ngay
  level: 1,
  currentExp: 0,
  maxExp: 100,
  hp: 30,
  maxHp: 30,
  attack: 1,
  defense: 0,
  gold: 0,
  eternalPoints: 0,
  rebirthCount: 0,
  skillPoints: 0,
  skills: {},
  eternalUpgrades: {},
  gemInventory: {}, 
  guild: { name: 'Vô Danh', level: 1, fame: 0, blueprints: [] },
  statPoints: 5, 
  stats: { strength: 1, dexterity: 1, intelligence: 1, vitality: 1, luck: 1 },
  blueprintLevels: {},
  gameSpeed: 1,
  memoryGemPotential: 0,
  rebirthTalents: [],
  lifeStats: THONG_KE_KIEP_MOI,
  inventorySlots: 50
};

export const dungNguoiChoi = (themLog: (msg: string) => void) => {
  const [nguoiChoi, datNguoiChoi] = useState<Player>(NHAN_VAT_MAC_DINH);

  const layCapDoLuanHoiYeuCau = useCallback(() => {
    return 25 + (nguoiChoi.rebirthCount * 5);
  }, [nguoiChoi.rebirthCount]);

  const thucHienLuanHoi = useCallback((thienPhuMoi?: string) => {
    const capYeuCau = layCapDoLuanHoiYeuCau();
    
    datNguoiChoi(prev => {
      if (prev.level < capYeuCau) return prev;

      const epNhanDuoc = prev.level * 10;
      const talentsMoi = thienPhuMoi ? [...prev.rebirthTalents, thienPhuMoi] : prev.rebirthTalents;
      
      themLog(`🌀 LUÂN HỒI THÀNH CÔNG! Nhận được ${epNhanDuoc} EP. Cấp độ yêu cầu tiếp theo: ${25 + (prev.rebirthCount + 1) * 5}`);
      
      return {
        ...prev,
        level: 1,
        currentExp: 0,
        maxExp: 100,
        gold: 0,
        statPoints: 10 + (prev.rebirthCount * 10),
        stats: { strength: 1, dexterity: 1, intelligence: 1, vitality: 1, luck: 1 },
        rebirthCount: prev.rebirthCount + 1,
        eternalPoints: prev.eternalPoints + epNhanDuoc,
        rebirthTalents: talentsMoi,
        lifeStats: { ...THONG_KE_KIEP_MOI }
      };
    });
  }, [themLog, layCapDoLuanHoiYeuCau]);

  const datTocDoGame = useCallback((tocDo: number) => {
    datNguoiChoi(p => ({ ...p, gameSpeed: tocDo }));
    themLog(`⏩ Tốc độ: x${tocDo}`);
  }, [themLog]);

  const nangCapBanVe = useCallback((idBanVe: string, gia: number) => {
    datNguoiChoi(prev => {
      if (prev.eternalPoints < gia) return prev;
      const capHienTai = prev.blueprintLevels[idBanVe] || 0;
      return {
        ...prev,
        eternalPoints: prev.eternalPoints - gia,
        blueprintLevels: { ...prev.blueprintLevels, [idBanVe]: capHienTai + 1 }
      };
    });
  }, []);

  const nhanEXP = useCallback((luong: number) => {
    datNguoiChoi(prev => {
      let expMoi = prev.currentExp + luong;
      let capMoi = prev.level;
      let expToiDaMoi = prev.maxExp;
      let daLenCap = false;

      while (expMoi >= expToiDaMoi && capMoi < 999) {
        expMoi -= expToiDaMoi;
        capMoi++;
        expToiDaMoi = Math.floor(expToiDaMoi * 1.6);
        daLenCap = true;
      }
      
      const spNhanDuoc = daLenCap ? (capMoi % 5 === 0 ? 3 : 1) : 0;
      
      if (daLenCap) themLog(`🎉 Cấp độ tăng lên: ${capMoi}!`);
      return { 
        ...prev, 
        currentExp: expMoi, 
        level: capMoi, 
        maxExp: expToiDaMoi,
        statPoints: prev.statPoints + (daLenCap ? 5 : 0),
        skillPoints: prev.skillPoints + spNhanDuoc
      };
    });
  }, [themLog]);

  const congDiemTiemNang = useCallback((tenChiSo: keyof Player['stats'], luong: number = 1) => {
    datNguoiChoi(prev => {
      if (prev.statPoints < luong) return prev;
      return {
        ...prev,
        statPoints: prev.statPoints - luong,
        stats: { ...prev.stats, [tenChiSo]: prev.stats[tenChiSo] + luong }
      };
    });
  }, []);

  const muaNangCapVinhHang = useCallback((nangCap: EternalUpgrade) => {
    datNguoiChoi(prev => {
      const capHienTai = prev.eternalUpgrades[nangCap.id] || 0;
      if (capHienTai >= nangCap.maxLevel) return prev;
      
      const gia = Math.floor(nangCap.baseCost * Math.pow(nangCap.costMultiplier, capHienTai));
      if (prev.eternalPoints < gia) {
          themLog("❌ Không đủ Điểm Vĩnh Hằng!");
          return prev;
      }
      
      themLog(`✨ Đã nâng cấp vĩnh hằng: ${nangCap.name} lên cấp ${capHienTai + 1}`);
      return {
        ...prev,
        eternalPoints: prev.eternalPoints - gia,
        eternalUpgrades: { ...prev.eternalUpgrades, [nangCap.id]: capHienTai + 1 }
      };
    });
  }, [themLog]);

  const nangCapKyNang = useCallback((kyNang: Skill) => {
    datNguoiChoi(prev => {
      const capHienTai = prev.skills[kyNang.id] || 0;
      if (capHienTai >= kyNang.maxLevel) return prev;
      if (prev.skillPoints < kyNang.cost) {
          themLog("❌ Không đủ Điểm Bí Kỹ!");
          return prev;
      }
      if (prev.level < kyNang.reqLevel) {
          themLog(`❌ Yêu cầu cấp độ ${kyNang.reqLevel}!`);
          return prev;
      }
      
      themLog(`🧠 Đã lĩnh hội bí kỹ: ${kyNang.name} (Cấp ${capHienTai + 1})`);
      return {
        ...prev,
        skillPoints: prev.skillPoints - kyNang.cost,
        skills: { ...prev.skills, [kyNang.id]: capHienTai + 1 }
      };
    });
  }, [themLog]);

  return { 
    nguoiChoi, datNguoiChoi, datTocDoGame, nangCapBanVe, 
    nhanEXP, congDiemTiemNang, muaNangCapVinhHang, nangCapKyNang,
    thucHienLuanHoi, layCapDoLuanHoiYeuCau
  };
};
