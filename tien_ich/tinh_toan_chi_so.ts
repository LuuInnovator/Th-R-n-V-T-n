
import { Player, Equipment, EquipmentType, CharacterClass, EternalUpgradeId } from '../kieu_du_lieu';

export const tinh_toan_chi_so_nhan_vat = (
  player: Player, 
  equipped: Record<string, Equipment | null>,
  getStatMultiplier: (val: number) => number 
) => {
  const stats = player.stats || { strength: 1, dexterity: 1, intelligence: 1, vitality: 1, luck: 1 };
  const rebirthCount = player.rebirthCount || 0;
  
  // Buff vĩnh hằng
  const latentPowerLevel = player.eternalUpgrades[EternalUpgradeId.LatentPower] || 0;
  const globalMult = 1 + (latentPowerLevel * 0.35);

  // Chỉ số cơ bản từ Tiềm năng
  let baseAtk = 1 + stats.strength * 15;
  let baseDef = 0 + stats.vitality * 4;
  let baseHp = 20 + stats.vitality * 120;

  // Khởi tạo 6 chỉ số đặc biệt (từ Tiềm năng gốc)
  let totalDodge = (stats.dexterity * 0.05) + (stats.luck * 0.02);
  let totalReflect = (stats.vitality * 0.04);
  let totalSilence = (stats.intelligence * 0.06);
  let totalStun = (stats.strength * 0.03) + (stats.dexterity * 0.02);
  let totalRegen = (stats.vitality * 2);
  let totalLifesteal = (stats.strength * 0.02) + (stats.luck * 0.03);

  let equipmentAtk = 0;
  let equipmentDef = 0;
  let equipmentHp = 0;

  // Cộng dồn từ trang bị
  Object.values(equipped).forEach(item => {
    if (item) {
      // Scale sức mạnh trang bị nếu chưa đủ cấp (phạt chỉ số)
      let scale = player.level < item.reqLevel ? Math.max(0.1, player.level / item.reqLevel) : 1.0;
      
      equipmentAtk += (item.stats.attack || 0) * scale;
      equipmentDef += (item.stats.defense || 0) * scale;
      equipmentHp += (item.stats.hpBonus || 0) * scale;

      // Cộng dồn chỉ số đặc biệt từ đồ
      totalDodge += (item.stats.dodge || 0) * scale;
      totalReflect += (item.stats.reflect || 0) * scale;
      totalSilence += (item.stats.silence || 0) * scale;
      totalStun += (item.stats.stun || 0) * scale;
      totalRegen += (item.stats.regen || 0) * scale;
      totalLifesteal += (item.stats.lifesteal || 0) * scale;
    }
  });

  let finalAtk = (baseAtk + equipmentAtk) * globalMult;
  let finalDef = (baseDef + equipmentDef) * globalMult;
  let finalHp = (baseHp + equipmentHp) * globalMult;

  // Bonus Hệ phái
  if (player.characterClass === CharacterClass.HeavySentinel) {
    finalDef *= 2.0;
    finalHp *= 3.0;
  } else if (player.characterClass === CharacterClass.ShadowBlade) {
    finalAtk *= 2.5;
  }

  return {
    totalAtk: Math.floor(finalAtk),
    totalDef: Math.floor(finalDef),
    totalHp: Math.floor(finalHp),
    critChance: Math.min(80, (player.characterClass === CharacterClass.ShadowBlade ? 15 : 5) + (stats.dexterity * 0.05)),
    
    // 6 CHỈ SỐ CHIẾN ĐẤU (Giới hạn trần để tránh bất tử)
    dodge: Math.min(75, totalDodge),
    reflect: Math.min(60, totalReflect),
    silence: Math.min(50, totalSilence),
    stun: Math.min(50, totalStun),
    regen: Math.floor(totalRegen + (finalHp * 0.01)), // Hồi phục cơ bản + 1% HP
    lifesteal: Math.min(40, totalLifesteal)
  };
};
