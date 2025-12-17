
import { Player, Equipment, EquipmentType, SetId, ElementType, EnchantmentType, GemType, GemTier } from '../types';
import { SETS, GEM_STATS, ENCHANT_STATS } from '../constants';

export const calculateEffectiveStat = (rawStat: number): number => {
  const SOFT_CAP = 50;
  if (rawStat <= SOFT_CAP) return rawStat;
  return SOFT_CAP + (rawStat - SOFT_CAP) * 0.5;
};

export interface StatMilestone {
  stat: 'strength' | 'dexterity' | 'intelligence' | 'vitality' | 'luck';
  threshold: number;
  name: string;
  description: string;
}

export const MILESTONES: StatMilestone[] = [
  { stat: 'strength', threshold: 20, name: 'Lực Sĩ Tập Sự', description: 'Tăng vĩnh viễn 5% Sát thương Vật lý' },
  { stat: 'strength', threshold: 50, name: 'Thần Lực Vô Song', description: 'Đòn đánh có khả năng gây choáng nhẹ' },
  { stat: 'dexterity', threshold: 20, name: 'Nhanh Nhẹn', description: 'Tăng 5% Tốc độ đánh và giảm hồi chiêu' },
  { stat: 'dexterity', threshold: 50, name: 'Bóng Ma', description: 'Có tỷ lệ né tránh hoàn toàn đòn đánh đầu tiên' },
  { stat: 'intelligence', threshold: 20, name: 'Học Giả Giả Kim', description: 'Tăng 10% hiệu quả hồi máu' },
  { stat: 'intelligence', threshold: 50, name: 'Pháp Sư Tối Thượng', description: 'Giảm 15% thời gian hồi chiêu' },
  { stat: 'vitality', threshold: 20, name: 'Da Sắt Thịt Đồng', description: 'Tăng 5% tổng chỉ số Phòng thủ' },
  { stat: 'vitality', threshold: 50, name: 'Cơ Thể Bất Tử', description: 'Tự động hồi 1% Máu tối đa mỗi giây' },
  { stat: 'luck', threshold: 20, name: 'Vận May Tìm Đến', description: 'Tăng 5% Tỷ lệ rơi đồ từ quái vật' },
  { stat: 'luck', threshold: 50, name: 'Vận Mệnh Định Sẵn', description: 'Tăng mạnh Sát thương Chí mạng' },
];

export const calculatePlayerStats = (
  player: Player, 
  equipped: Record<EquipmentType, Equipment | null>,
  getStatMultiplier: (val: number) => number 
) => {
  const strEff = calculateEffectiveStat(player.stats.strength);
  const dexEff = calculateEffectiveStat(player.stats.dexterity);
  const intEff = calculateEffectiveStat(player.stats.intelligence);
  const vitEff = calculateEffectiveStat(player.stats.vitality);
  const lukEff = calculateEffectiveStat(player.stats.luck);

  let baseAtk = player.attack + (strEff * 2); 
  let baseDef = player.defense + (vitEff * 1); 
  let maxHp = player.maxHp + (vitEff * 10);    
  
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

      if (item.enchantment === EnchantmentType.Sharpness) itemAtk *= 1.15;
      if (item.enchantment === EnchantmentType.Protection) itemDef *= 1.15;

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

  totalAtk = getStatMultiplier(totalAtk);
  totalDef = getStatMultiplier(totalDef);
  totalHp = getStatMultiplier(totalHp);

  let critChance = 5 + (dexEff * 0.2) + (player.skills['wp_crit'] || 0);
  let critDamage = 150 + (lukEff * 0.5);
  let dropRateBonus = (lukEff * 0.001);
  let cooldownReduction = Math.min(0.5, dexEff * 0.005); 

  if ((activeSets[SetId.PrimalHunter] || 0) >= 6) {
      critChance += 30;
      critDamage += 30;
  }
  if ((activeSets[SetId.InfinityChrono] || 0) >= 6) {
      totalAtk *= 1.05;
  }
  
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
