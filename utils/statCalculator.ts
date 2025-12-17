
import { Player, Equipment, EquipmentType, SetId, ElementType, EnchantmentType, GemType, GemTier, EternalUpgradeId, CharacterClass } from '../types';
import { SETS, GEM_STATS, ENCHANT_STATS } from '../constants';

export const calculateEffectiveStat = (rawStat: number): number => {
  const stat = rawStat || 0;
  const SOFT_CAP = 100; 
  if (stat <= SOFT_CAP) return stat;
  return SOFT_CAP + (stat - SOFT_CAP) * 0.7; 
};

export const calculatePlayerStats = (
  player: Player, 
  equipped: Record<EquipmentType, Equipment | null>,
  getStatMultiplier: (val: number) => number 
) => {
  const safePlayer = player || { stats: { strength: 1, dexterity: 1, intelligence: 1, vitality: 1, luck: 1 }, attack: 10, defense: 5, maxHp: 100, rebirthCount: 0, skills: {}, eternalUpgrades: {}, characterClass: CharacterClass.None };
  
  const stats = {
      strength: safePlayer.stats?.strength || 1,
      dexterity: safePlayer.stats?.dexterity || 1,
      intelligence: safePlayer.stats?.intelligence || 1,
      vitality: safePlayer.stats?.vitality || 1,
      luck: safePlayer.stats?.luck || 1,
  };
  
  const strEff = calculateEffectiveStat(stats.strength);
  const vitEff = calculateEffectiveStat(stats.vitality);

  // SCALING CÂN BẰNG: +25% chỉ số gốc mỗi lần tái sinh (Tuyến tính)
  const rebirthMult = 1 + (safePlayer.rebirthCount * 0.25); 
  
  let baseAtk = ((safePlayer.attack || 10) + (strEff * 10)) * rebirthMult; 
  let baseDef = ((safePlayer.defense || 5) + (vitEff * 5)) * rebirthMult; 
  let maxHp = ((safePlayer.maxHp || 100) + (vitEff * 100)) * rebirthMult;    
  
  let totalAtk = baseAtk;
  let totalDef = baseDef;
  let totalHp = maxHp;

  // Hệ số Godly Forging: Nhân chỉ số trang bị
  const forgingLevel = safePlayer.eternalUpgrades[EternalUpgradeId.GodlyForging] || 0;
  const forgingMult = 1 + (safePlayer.rebirthCount * (forgingLevel * 0.1)); 

  const safeEquipped = equipped || {};

  (Object.values(safeEquipped) as (Equipment | null)[]).forEach(item => {
    if (item && item.stats) {
      let itemAtk = (item.stats.attack || 0) * forgingMult;
      let itemDef = (item.stats.defense || 0) * forgingMult;
      let itemHp = (item.stats.hpBonus || 0) * forgingMult;

      if (item.enchantment === EnchantmentType.Sharpness) itemAtk *= 1.3;
      if (item.enchantment === EnchantmentType.Protection) itemDef *= 1.3;

      item.socketedGems?.forEach(gem => {
          const gemStat = (GEM_STATS[gem.type]?.[gem.tier] || 0) * forgingMult;
          if (gem.type === GemType.Ruby) itemAtk += gemStat;
          if (gem.type === GemType.Sapphire) itemDef += gemStat;
          if (gem.type === GemType.Topaz) itemHp += gemStat;
      });

      totalAtk += itemAtk;
      totalDef += itemDef;
      totalHp += itemHp;
    }
  });

  // EP Upgrade: Latent Power
  if (typeof getStatMultiplier === 'function') {
    totalAtk = getStatMultiplier(totalAtk);
    totalDef = getStatMultiplier(totalDef);
    totalHp = getStatMultiplier(totalHp);
  }

  // Eternal Blood Bonus
  const bloodLevel = safePlayer.eternalUpgrades[EternalUpgradeId.EternalBlood] || 0;
  totalHp *= (1 + (safePlayer.rebirthCount * (bloodLevel * 0.05)));

  // Add explicit typing to return objects to assist TS inference in components
  return {
    totalAtk: Math.floor(totalAtk),
    totalDef: Math.floor(totalDef),
    totalHp: Math.floor(totalHp),
    critChance: 10 + (calculateEffectiveStat(stats.dexterity) * 0.5),
    critDamage: 200 + (calculateEffectiveStat(stats.luck) * 1.5),
    dropRateBonus: calculateEffectiveStat(stats.luck) * 0.005,
    cooldownReduction: Math.min(0.6, calculateEffectiveStat(stats.dexterity) * 0.01),
    weaponElement: ElementType.Physical,
    activeSets: {} as Record<string, number>,
    activeMilestones: [] as { name: string; description: string }[]
  };
};
