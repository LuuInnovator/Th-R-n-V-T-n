import { Player, Equipment, EquipmentType, SetId, ElementType, EnchantmentType, GemType, GemTier } from '../types';
import { SETS, GEM_STATS, ENCHANT_STATS } from '../constants';

/**
 * Tính toán Soft Cap:
 * - Dưới 50 điểm: 1 điểm = 1 giá trị hiệu quả
 * - Trên 50 điểm: 1 điểm = 0.5 giá trị hiệu quả (giảm dần sức mạnh)
 */
export const calculateEffectiveStat = (rawStat: number): number => {
  const SOFT_CAP = 50;
  if (rawStat <= SOFT_CAP) return rawStat;
  return SOFT_CAP + (rawStat - SOFT_CAP) * 0.5;
};

// Định nghĩa Milestone (Cột mốc sức mạnh)
export interface StatMilestone {
  stat: 'strength' | 'dexterity' | 'intelligence' | 'vitality' | 'luck';
  threshold: number;
  name: string;
  description: string;
}

export const MILESTONES: StatMilestone[] = [
  { stat: 'strength', threshold: 20, name: 'Lực Sĩ Tập Sự', description: '+5% Sát thương Vật lý' },
  { stat: 'strength', threshold: 50, name: 'Thần Lực', description: 'Đòn đánh có khả năng gây choáng nhẹ' },
  { stat: 'dexterity', threshold: 20, name: 'Nhanh Nhẹn', description: '+5% Tốc độ đánh' },
  { stat: 'dexterity', threshold: 50, name: 'Bóng Ma', description: 'Né tránh đòn tấn công đầu tiên trong trận' },
  { stat: 'intelligence', threshold: 20, name: 'Học Giả', description: '+10% Hiệu quả Hồi máu/Thuốc' },
  { stat: 'intelligence', threshold: 50, name: 'Pháp Sư', description: 'Giảm 15% thời gian hồi chiêu' },
  { stat: 'vitality', threshold: 20, name: 'Da Sắt', description: '+5% Phòng thủ' },
  { stat: 'vitality', threshold: 50, name: 'Bất Tử', description: 'Hồi 1% HP mỗi giây' },
  { stat: 'luck', threshold: 20, name: 'May Mắn', description: '+5% Tỷ lệ rơi đồ' },
  { stat: 'luck', threshold: 50, name: 'Vận Mệnh', description: 'Tăng cực đại Sát thương Chí mạng' },
];

/**
 * Hàm trung tâm tính toán toàn bộ chỉ số nhân vật (Derived Stats)
 * Logic này được tách khỏi Component để tái sử dụng và dễ test.
 */
export const calculatePlayerStats = (
  player: Player, 
  equipped: Record<EquipmentType, Equipment | null>,
  getStatMultiplier: (val: number) => number // Hàm nhân từ Eternal Upgrade
) => {
  // 1. Lấy chỉ số cơ bản sau khi áp dụng Soft Cap
  const strEff = calculateEffectiveStat(player.stats.strength);
  const dexEff = calculateEffectiveStat(player.stats.dexterity);
  const intEff = calculateEffectiveStat(player.stats.intelligence);
  const vitEff = calculateEffectiveStat(player.stats.vitality);
  const lukEff = calculateEffectiveStat(player.stats.luck);

  // 2. Tính chỉ số cơ bản từ Stats Allocation
  let baseAtk = player.attack + (strEff * 2); // 1 STR = 2 ATK
  let baseDef = player.defense + (vitEff * 1); // 1 VIT = 1 DEF
  let maxHp = player.maxHp + (vitEff * 10);    // 1 VIT = 10 HP
  
  // 3. Cộng chỉ số từ Trang bị, Ngọc, Phù phép
  let totalAtk = baseAtk;
  let totalDef = baseDef;
  let totalHp = maxHp;
  let weaponElement: ElementType = ElementType.Physical;

  const activeSets: Record<SetId, number> = {} as any;

  Object.values(equipped).forEach(item => {
    if (item) {
      if (item.setId) activeSets[item.setId] = (activeSets[item.setId] || 0) + 1;

      let itemAtk = item.stats.attack || 0;
      let itemDef = item.stats.defense || 0;
      let itemHp = item.stats.hpBonus || 0;

      // Enchantment logic
      if (item.enchantment === EnchantmentType.Sharpness) itemAtk *= 1.15;
      if (item.enchantment === EnchantmentType.Protection) itemDef *= 1.15;

      // Gem logic
      item.socketedGems.forEach(gem => {
          const stats = GEM_STATS[gem.type][gem.tier];
          if (gem.type === GemType.Ruby) itemAtk += stats;
          if (gem.type === GemType.Sapphire) itemDef += stats;
          if (gem.type === GemType.Topaz) itemHp += stats;
      });

      totalAtk += itemAtk;
      totalDef += itemDef;
      totalHp += itemHp;

      if (item.type === EquipmentType.Weapon && item.element) weaponElement = item.element;
    }
  });

  // 4. Áp dụng các Multiplier từ Eternal Upgrades (thông qua hàm callback)
  totalAtk = getStatMultiplier(totalAtk);
  totalDef = getStatMultiplier(totalDef);
  totalHp = getStatMultiplier(totalHp);

  // 5. Tính chỉ số phụ (Derived Sub-stats)
  // Crit Chance: Base 5% + DEX bonus (0.2% per point) + Skill
  let critChance = 5 + (dexEff * 0.2) + (player.skills['wp_crit'] || 0);
  
  // Crit Damage: Base 150% + LUK bonus (0.5% per point)
  let critDamage = 150 + (lukEff * 0.5);

  // Drop Rate Bonus: LUK bonus (0.1% per point)
  let dropRateBonus = (lukEff * 0.001);

  // Attack Speed Modifier (Cooldown Reduction): DEX bonus
  let cooldownReduction = Math.min(0.5, dexEff * 0.005); // Max 50% reduction from DEX

  // 6. Set Bonuses Logic
  if ((activeSets[SetId.PrimalHunter] || 0) >= 6) {
      critChance += 30;
      critDamage += 30;
  }
  if ((activeSets[SetId.InfinityChrono] || 0) >= 6) {
      totalAtk *= 1.05;
  }

  // 7. Class Bonuses (Hardcoded simple logic matching usePlayer)
  // Logic này nên được đồng bộ, ở đây ta chỉ tính hiển thị
  
  return {
    totalAtk: Math.floor(totalAtk),
    totalDef: Math.floor(totalDef),
    totalHp: Math.floor(totalHp),
    critChance: parseFloat(critChance.toFixed(1)),
    critDamage: parseFloat(critDamage.toFixed(1)),
    dropRateBonus: parseFloat(dropRateBonus.toFixed(3)),
    cooldownReduction,
    weaponElement,
    activeSets,
    activeMilestones: MILESTONES.filter(m => player.stats[m.stat] >= m.threshold)
  };
};