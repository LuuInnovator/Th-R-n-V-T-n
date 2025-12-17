
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
  legacyGearNames: [],
  
  // Stats Allocation System
  statPoints: 5, 
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

  const getStatMultiplier = useCallback((base: number) => {
    let multiplier = 1.0;
    const latentPowerLevel = player.eternalUpgrades[EternalUpgradeId.LatentPower] || 0;
    multiplier += latentPowerLevel * 0.05;
    return Math.floor(base * multiplier);
  }, [player.eternalUpgrades]);

  const selectClass = useCallback((cls: CharacterClass) => {
      setPlayer(prev => {
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
      if (prev.level >= 90) return prev;

      let newExp = prev.currentExp + amount;
      let newLevel = prev.level;
      let newMaxHp = prev.maxHp;
      let newAtk = prev.attack;
      let newDef = prev.defense;
      let newMaxExp = prev.maxExp;
      let newSP = prev.skillPoints;
      let newStatPoints = prev.statPoints;
      let leveledUp = false;

      while (newExp >= newMaxExp && newLevel < 90) {
        newExp -= newMaxExp;
        newLevel++;
        newMaxExp = Math.floor(newMaxExp * 1.5);
        newMaxHp += 10;
        newAtk += 1;
        newDef += 1;
        newSP += 1; 
        newStatPoints += 3;
        leveledUp = true;
      }

      if (leveledUp) {
        addLog(`🎉 LÊN CẤP ${newLevel}! (+3 Điểm Tiềm Năng, +1 SP)`);
      }

      return {
        ...prev,
        currentExp: newExp,
        level: newLevel,
        maxExp: newMaxExp,
        maxHp: newMaxHp,
        hp: newMaxHp,
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
          if (prev.stats[statName] >= 90) return prev;
          return {
              ...prev,
              statPoints: prev.statPoints - amount,
              stats: {
                  ...prev.stats,
                  [statName]: prev.stats[statName] + amount
              }
          };
      });
  }, []);

  const resetStats = useCallback(() => {
      setPlayer(prev => {
          const totalSpent = (prev.stats.strength - 1) + 
                             (prev.stats.dexterity - 1) + 
                             (prev.stats.intelligence - 1) + 
                             (prev.stats.vitality - 1) + 
                             (prev.stats.luck - 1);
          const refundedPoints = prev.statPoints + totalSpent;
          const cost = prev.level <= 10 ? 0 : prev.level * 100;
          if (prev.level > 10 && prev.gold < cost) return prev;
          return {
              ...prev,
              gold: prev.gold - cost,
              statPoints: refundedPoints,
              stats: { strength: 1, dexterity: 1, intelligence: 1, vitality: 1, luck: 1 }
          };
      });
  }, []);

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
      return {
        ...prev,
        skillPoints: prev.skillPoints - skill.cost,
        skills: { ...prev.skills, [skill.id]: currentLevel + 1 }
      };
    });
  }, []);

  const buyEternalUpgrade = useCallback((upgrade: EternalUpgrade) => {
    setPlayer(prev => {
      const currentLevel = prev.eternalUpgrades[upgrade.id] || 0;
      if (currentLevel >= upgrade.maxLevel) return prev;
      const cost = Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, currentLevel));
      if (prev.eternalPoints < cost) return prev;
      return {
        ...prev,
        eternalPoints: prev.eternalPoints - cost,
        eternalUpgrades: { ...prev.eternalUpgrades, [upgrade.id]: currentLevel + 1 }
      };
    });
  }, []);

  const rebirth = useCallback((eternalPointsReward: number) => {
    setPlayer(prev => {
        const savedUpgrades = prev.eternalUpgrades;
        const savedPoints = prev.eternalPoints;
        const savedRebirthCount = prev.rebirthCount + 1;
        const savedClass = prev.characterClass; 
        const savedGuild = prev.guild; 
        const savedLegacy = prev.legacyGearNames;

        return {
          ...INITIAL_PLAYER,
          characterClass: savedClass,
          eternalPoints: savedPoints + eternalPointsReward,
          rebirthCount: savedRebirthCount,
          eternalUpgrades: savedUpgrades,
          guild: savedGuild,
          legacyGearNames: savedLegacy,
          statPoints: 5 + (savedRebirthCount * 5),
          stats: INITIAL_PLAYER.stats
        };
    });
  }, []);

  return { 
      player, setPlayer, gainExp, updateHp, addGold, rebirth, upgradeSkill, buyEternalUpgrade, getStatMultiplier, selectClass, allocateStat, resetStats
  };
};
