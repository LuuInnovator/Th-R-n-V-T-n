
import { Player, Equipment, EquipmentType, CharacterClass, EternalUpgradeId } from '../kieu_du_lieu';

export const tinh_toan_chi_so_nhan_vat = (
  player: Player, 
  equipped: Record<EquipmentType, Equipment | null>,
  getStatMultiplier: (val: number) => number 
) => {
  const stats = player.stats || { strength: 1, dexterity: 1, intelligence: 1, vitality: 1, luck: 1 };
  
  // 1. Chỉ số từ điểm tiềm năng (Giảm cực thấp chỉ số gốc tự động tăng)
  // Sức mạnh điểm cộng giờ quan trọng hơn: 1 STR = 15 Công
  let baseAtk = 1 + stats.strength * 15;
  let baseDef = 0 + stats.vitality * 4;
  let baseHp = 20 + stats.vitality * 120; // 1 Vit = 120 Máu

  // 2. Chỉ số từ trang bị
  let equipmentAtk = 0;
  let equipmentDef = 0;
  let equipmentHp = 0;

  const forgingLevel = player.eternalUpgrades[EternalUpgradeId.GodlyForging] || 0;
  const forgingMult = 1 + (player.rebirthCount * (forgingLevel * 0.05));

  Object.values(equipped).forEach(item => {
    if (item) {
      equipmentAtk += (item.stats.attack || 0) * forgingMult;
      equipmentDef += (item.stats.defense || 0) * forgingMult;
      equipmentHp += (item.stats.hpBonus || 0) * forgingMult;
    }
  });

  let totalAtk = baseAtk + equipmentAtk;
  let totalDef = baseDef + equipmentDef;
  let totalHp = baseHp + equipmentHp;

  // 3. Hệ số Phái
  if (player.characterClass === CharacterClass.HeavySentinel) {
    totalDef *= 2.0;
    totalHp *= 3.0;
  } else if (player.characterClass === CharacterClass.ShadowBlade) {
    totalAtk *= 2.5;
  }

  // 4. Thiên Phú Luân Hồi
  const talents = player.rebirthTalents || [];
  let talentAtkMult = 1;
  talents.forEach(t => {
      if (t === 'tp_atk') talentAtkMult += 0.1;
  });
  totalAtk *= talentAtkMult;

  // 5. Ký Ức
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
    dropRateBonus: (player.characterClass === CharacterClass.AlchemistMage ? 0.5 : 0) + (stats.luck * 0.002)
  };
};
