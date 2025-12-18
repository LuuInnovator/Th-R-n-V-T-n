
import { Player, Equipment, EquipmentType, CharacterClass, EternalUpgradeId } from '../kieu_du_lieu';

export const tinh_toan_chi_so_nhan_vat = (
  player: Player, 
  equipped: Record<EquipmentType, Equipment | null>,
  getStatMultiplier: (val: number) => number 
) => {
  const stats = player.stats || { strength: 1, dexterity: 1, intelligence: 1, vitality: 1, luck: 1 };
  const rebirthCount = player.rebirthCount || 0;
  
  // Nâng cấp vĩnh viễn: Bậc Thầy Đúc Rèn (+5% stats đồ chế tạo)
  const craftMasterLevel = player.eternalUpgrades['nc_bac_thay_duc_ren'] || 0;
  const craftBonus = 1 + (craftMasterLevel * 0.05);

  // Nâng cấp vĩnh viễn: Thể Chất Vô Định (Máu & Thủ)
  const physiqueLevel = player.eternalUpgrades['nc_the_chat_vo_dinh'] || 0;
  const physiqueBonus = 1 + (physiqueLevel * 0.1);

  let baseAtk = 1 + stats.strength * 15;
  let baseDef = 0 + stats.vitality * 4;
  let baseHp = 20 + stats.vitality * 120;

  let equipmentAtk = 0;
  let equipmentDef = 0;
  let equipmentHp = 0;

  const forgingLevel = player.eternalUpgrades[EternalUpgradeId.GodlyForging] || 0;
  const forgingMult = 1 + (rebirthCount * (forgingLevel * 0.05));

  Object.values(equipped).forEach(item => {
    if (item) {
      // LOGIC LEGACY GEAR: Khóa sức mạnh nếu Level người chơi thấp hơn yêu cầu
      // Sức mạnh sẽ mở dần theo tỷ lệ (Level hiện tại / Level yêu cầu)
      let powerScale = 1.0;
      if (player.level < item.reqLevel) {
          powerScale = player.level / item.reqLevel;
      }

      equipmentAtk += (item.stats.attack || 0) * forgingMult * craftBonus * powerScale;
      equipmentDef += (item.stats.defense || 0) * forgingMult * craftBonus * powerScale;
      equipmentHp += (item.stats.hpBonus || 0) * forgingMult * craftBonus * powerScale;
    }
  });

  let totalAtk = baseAtk + equipmentAtk;
  let totalDef = (baseDef + equipmentDef) * physiqueBonus;
  let totalHp = (baseHp + equipmentHp) * physiqueBonus;

  // Hệ số Phái
  if (player.characterClass === CharacterClass.HeavySentinel) {
    totalDef *= 2.0;
    totalHp *= 3.0;
  } else if (player.characterClass === CharacterClass.ShadowBlade) {
    totalAtk *= 2.5;
  }

  // Thiên Phú Luân Hồi
  const talents = player.rebirthTalents || [];
  talents.forEach(t => {
      if (t === 'tp_atk') totalAtk *= 1.1;
      if (t === 'tp_gold') { /* Xử lý ở logic chiến đấu nhặt vàng */ }
  });

  const memoryMult = 1 + (player.memoryGemPotential * 0.01);
  totalAtk *= memoryMult;
  totalDef *= memoryMult;
  totalHp *= memoryMult;

  return {
    totalAtk: Math.floor(totalAtk),
    totalDef: Math.floor(totalDef),
    totalHp: Math.floor(totalHp),
    critChance: (player.characterClass === CharacterClass.ShadowBlade ? 10 : 2) + (stats.dexterity * 0.05),
    critDamage: 120 + (stats.luck * 0.5),
    dropRateBonus: (player.characterClass === CharacterClass.AlchemistMage ? 0.5 : 0) + (stats.luck * 0.002) + (rebirthCount * 0.02) // Mắt thần cổ thư mặc định
  };
};
