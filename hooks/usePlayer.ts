
import { useState, useCallback } from 'react';
import { Player, Skill, EternalUpgrade, EternalUpgradeId, CharacterClass, Guild } from '../types';

const INITIAL_GUILD: Guild = {
    name: 'Thợ Rèn Lang Thang',
    level: 1,
    fame: 0,
    blueprints: []
};

export const INITIAL_PLAYER: Player = {
  characterClass: CharacterClass.None,
  level: 1,
  currentExp: 0,
  maxExp: 100,
  hp: 100,
  maxHp: 100,
  attack: 10,
  defense: 5,
  gold: 0,
  eternalPoints: 0,
  rebirthCount: 0,
  skillPoints: 0,
  skills: {},
  eternalUpgrades: {},
  gemInventory: {}, 
  guild: INITIAL_GUILD,
  
  // Stats Allocation System
  statPoints: 5, // Tặng 5 điểm ban đầu
  stats: {
      strength: 1,
      dexterity: 1,
      intelligence: 1,
      vitality: 1,
      luck: 1
  }
};

export const usePlayer = (addLog: (msg: string) => void) => {
  const [player, setPlayer] = useState<Player>(INITIAL_PLAYER);

  // Tính toán chỉ số thực tế sau khi áp dụng nâng cấp vĩnh hằng và Class
  const getStatMultiplier = useCallback((base: number) => {
    let multiplier = 1.0;
    
    // 1. Eternal Upgrade: Latent Power
    const latentPowerLevel = player.eternalUpgrades[EternalUpgradeId.LatentPower] || 0;
    multiplier += latentPowerLevel * 0.05;
    
    return Math.floor(base * multiplier);
  }, [player.eternalUpgrades]);

  // Hàm chọn Class
  const selectClass = useCallback((cls: CharacterClass) => {
      setPlayer(prev => {
          // Bonus stats based on class
          const newStats = { ...prev.stats };
          if (cls === CharacterClass.HeavySentinel) { newStats.strength += 5; newStats.vitality += 5; }
          if (cls === CharacterClass.ShadowBlade) { newStats.dexterity += 5; newStats.luck += 5; }
          if (cls === CharacterClass.AlchemistMage) { newStats.intelligence += 5; newStats.luck += 5; }

          return {
            ...prev,
            characterClass: cls,
            stats: newStats,
            attack: cls === CharacterClass.ShadowBlade ? prev.attack + 5 : prev.attack,
            defense: cls === CharacterClass.HeavySentinel ? prev.defense + 5 : prev.defense,
            maxHp: cls === CharacterClass.AlchemistMage ? prev.maxHp + 20 : prev.maxHp,
            hp: cls === CharacterClass.AlchemistMage ? prev.maxHp + 20 : prev.hp
        };
      });
      addLog(`✨ Bạn đã chọn lớp nhân vật: ${cls}`);
  }, [addLog]);

  const gainExp = useCallback((amount: number) => {
    setPlayer(prev => {
      // GIỚI HẠN LEVEL 90
      if (prev.level >= 90) {
          return prev; // Không nhận thêm exp hoặc lên cấp nếu đã max
      }

      let newExp = prev.currentExp + amount;
      let newLevel = prev.level;
      let newMaxHp = prev.maxHp;
      let newAtk = prev.attack;
      let newDef = prev.defense;
      let newMaxExp = prev.maxExp;
      let newSP = prev.skillPoints;
      let newStatPoints = prev.statPoints;
      let leveledUp = false;

      while (newExp >= newMaxExp && newLevel < 90) { // Check max level inside loop
        newExp -= newMaxExp;
        newLevel++;
        newMaxExp = Math.floor(newMaxExp * 1.5);
        newMaxHp += 10; // Giảm lượng HP cộng cứng để ưu tiên cộng qua Vitality
        newAtk += 1;    // Giảm ATK cứng để ưu tiên Strength
        newDef += 1;
        newSP += 1; 
        newStatPoints += 3; // +3 điểm tiềm năng mỗi cấp
        leveledUp = true;
      }

      if (leveledUp) {
        addLog(`🎉 LÊN CẤP ${newLevel}! (+3 Điểm Tiềm Năng, +1 SP)`);
        if (newLevel === 90) {
            addLog("🏆 BẠN ĐÃ ĐẠT CẤP ĐỘ TỐI ĐA (90)!");
        }
      }

      return {
        ...prev,
        currentExp: newExp,
        level: newLevel,
        maxExp: newMaxExp,
        maxHp: newMaxHp,
        hp: newMaxHp, // Hồi đầy máu khi lên cấp
        attack: newAtk,
        defense: newDef,
        skillPoints: newSP,
        statPoints: newStatPoints
      };
    });
  }, [addLog]);

  const allocateStat = useCallback((statName: keyof Player['stats'], amount: number = 1) => {
      setPlayer(prev => {
          if (prev.statPoints < amount) return prev;
          
          // GIỚI HẠN CHỈ SỐ 90
          if (prev.stats[statName] >= 90) {
              addLog(`⚠️ Chỉ số ${statName} đã đạt giới hạn tối đa (90)!`);
              return prev;
          }

          return {
              ...prev,
              statPoints: prev.statPoints - amount,
              stats: {
                  ...prev.stats,
                  [statName]: prev.stats[statName] + amount
              }
          };
      });
  }, [addLog]);

  const resetStats = useCallback(() => {
      setPlayer(prev => {
          // Tính tổng điểm đã cộng (trừ đi 1 điểm gốc mỗi dòng)
          const totalSpent = (prev.stats.strength - 1) + 
                             (prev.stats.dexterity - 1) + 
                             (prev.stats.intelligence - 1) + 
                             (prev.stats.vitality - 1) + 
                             (prev.stats.luck - 1);
          
          const refundedPoints = prev.statPoints + totalSpent;
          
          // Cost: Miễn phí dưới cấp 10, sau đó tốn vàng
          const cost = prev.level <= 10 ? 0 : prev.level * 100;
          
          if (prev.level > 10 && prev.gold < cost) {
              addLog(`❌ Cần ${cost} Vàng để Tẩy Điểm!`);
              return prev;
          }

          if (cost > 0) addLog(`💸 Đã dùng ${cost} Vàng để Tẩy Điểm.`);
          addLog("🔄 Đã đặt lại toàn bộ chỉ số!");

          return {
              ...prev,
              gold: prev.gold - cost,
              statPoints: refundedPoints,
              stats: {
                  strength: 1,
                  dexterity: 1,
                  intelligence: 1,
                  vitality: 1,
                  luck: 1
              }
          };
      });
  }, [addLog]);

  const updateHp = useCallback((newHp: number) => {
    setPlayer(p => ({ ...p, hp: Math.max(0, newHp) })); 
  }, []);

  const addGold = useCallback((amount: number) => {
    setPlayer(p => ({ ...p, gold: p.gold + amount }));
  }, []);

  const upgradeSkill = useCallback((skill: Skill) => {
    setPlayer(prev => {
      const currentLevel = prev.skills[skill.id] || 0;
      if (currentLevel >= skill.maxLevel) return prev;
      if (prev.skillPoints < skill.cost) return prev;

      addLog(`🆙 Đã nâng cấp kỹ năng: ${skill.name} lên cấp ${currentLevel + 1}`);
      return {
        ...prev,
        skillPoints: prev.skillPoints - skill.cost,
        skills: {
          ...prev.skills,
          [skill.id]: currentLevel + 1
        }
      };
    });
  }, [addLog]);

  const buyEternalUpgrade = useCallback((upgrade: EternalUpgrade) => {
    setPlayer(prev => {
      const currentLevel = prev.eternalUpgrades[upgrade.id] || 0;
      if (currentLevel >= upgrade.maxLevel) return prev;
      const cost = Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, currentLevel));
      
      if (prev.eternalPoints < cost) {
          addLog("❌ Không đủ Điểm Vĩnh Cửu!");
          return prev;
      }

      addLog(`✨ Đã mở khóa thiên phú: ${upgrade.name} (Cấp ${currentLevel + 1})`);
      return {
        ...prev,
        eternalPoints: prev.eternalPoints - cost,
        eternalUpgrades: {
            ...prev.eternalUpgrades,
            [upgrade.id]: currentLevel + 1
        }
      };
    });
  }, [addLog]);

  const rebirth = useCallback((eternalPointsReward: number) => {
    setPlayer(prev => {
        const savedUpgrades = prev.eternalUpgrades;
        const savedPoints = prev.eternalPoints;
        const savedRebirthCount = prev.rebirthCount + 1;
        const savedClass = prev.characterClass; 
        const savedGuild = prev.guild; 
        
        // Base stats sau Rebirth
        const baseAttack = INITIAL_PLAYER.attack + (savedRebirthCount * 5);
        const baseDefense = INITIAL_PLAYER.defense + (savedRebirthCount * 2);
        
        return {
          ...INITIAL_PLAYER,
          characterClass: savedClass,
          eternalPoints: savedPoints + eternalPointsReward,
          rebirthCount: savedRebirthCount,
          eternalUpgrades: savedUpgrades,
          attack: baseAttack,
          defense: baseDefense,
          guild: savedGuild,
          // Reset stats allocation
          statPoints: 5 + (savedRebirthCount * 5), // Bonus start points for rebirth
          stats: INITIAL_PLAYER.stats
        };
    });
  }, []);

  // Update: Nhận vào giá trị cụ thể để set máu (thường là Max HP tính toán được)
  const setFullHp = useCallback((amount: number) => {
      setPlayer(p => ({ ...p, hp: amount }));
  }, []);

  // Gem Helpers
  const addGem = useCallback((key: string, qty: number) => {
    setPlayer(prev => ({
      ...prev,
      gemInventory: {
        ...prev.gemInventory,
        [key]: (prev.gemInventory[key] || 0) + qty
      }
    }));
  }, []);

  const removeGem = useCallback((key: string, qty: number) => {
     setPlayer(prev => {
         const current = prev.gemInventory[key] || 0;
         if (current < qty) return prev;
         return {
             ...prev,
             gemInventory: {
                 ...prev.gemInventory,
                 [key]: current - qty
             }
         };
     });
  }, []);

  // Guild Helpers
  const addGuildFame = useCallback((amount: number) => {
      setPlayer(prev => ({
          ...prev,
          guild: { ...prev.guild, fame: prev.guild.fame + amount }
      }));
  }, []);

  const unlockGuildBlueprint = useCallback((bpId: string, cost: number) => {
      setPlayer(prev => {
          if (prev.guild.fame < cost) return prev;
          if (prev.guild.blueprints.includes(bpId)) return prev;
          return {
              ...prev,
              guild: {
                  ...prev.guild,
                  fame: prev.guild.fame - cost,
                  blueprints: [...prev.guild.blueprints, bpId]
              }
          };
      });
  }, []);

  return { 
      player, setPlayer, gainExp, updateHp, addGold, rebirth, setFullHp, upgradeSkill, buyEternalUpgrade, getStatMultiplier, selectClass, addGem, removeGem, addGuildFame, unlockGuildBlueprint,
      allocateStat, resetStats
  };
};
