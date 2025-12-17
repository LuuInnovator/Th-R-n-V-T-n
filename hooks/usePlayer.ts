
import { useState, useCallback } from 'react';
import { Player, Skill, EternalUpgrade, EternalUpgradeId, CharacterClass, Guild } from '../types';

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
  guild: { name: 'Thợ Rèn Lang Thang', level: 1, fame: 0, blueprints: [] },
  statPoints: 5, 
  stats: { strength: 1, dexterity: 1, intelligence: 1, vitality: 1, luck: 1 },
  blueprintLevels: {},
  gameSpeed: 1,
  memoryGemPotential: 0
};

export const usePlayer = (addLog: (msg: string) => void) => {
  const [player, setPlayer] = useState<Player>(INITIAL_PLAYER);

  const setGameSpeed = useCallback((speed: number) => {
    setPlayer(p => ({ ...p, gameSpeed: speed }));
    addLog(`⏩ Tốc độ trò chơi: x${speed}`);
  }, [addLog]);

  const upgradeBlueprint = useCallback((bpId: string, cost: number) => {
    setPlayer(prev => {
      if (prev.eternalPoints < cost) return prev;
      const currentLevel = prev.blueprintLevels[bpId] || 0;
      return {
        ...prev,
        eternalPoints: prev.eternalPoints - cost,
        blueprintLevels: { ...prev.blueprintLevels, [bpId]: currentLevel + 1 }
      };
    });
    addLog(`📘 Bản vẽ nâng lên cấp ${(player.blueprintLevels[bpId] || 0) + 1}!`);
  }, [player.blueprintLevels, addLog]);

  const updateMemoryPotential = useCallback((potential: number) => {
    setPlayer(p => ({ ...p, memoryGemPotential: p.memoryGemPotential + potential }));
  }, []);

  const getStatMultiplier = useCallback((base: number) => {
    let multiplier = 1.0;
    const latentPowerLevel = player.eternalUpgrades[EternalUpgradeId.LatentPower] || 0;
    multiplier += latentPowerLevel * 0.3; // Tăng hiệu quả latent power
    return Math.floor(base * multiplier);
  }, [player.eternalUpgrades]);

  const gainExp = useCallback((amount: number) => {
    setPlayer(prev => {
      if (prev.level >= 150) return prev; // Nâng level cap lên 150
      let newExp = prev.currentExp + amount;
      let newLevel = prev.level;
      let newMaxExp = prev.maxExp;
      let newSP = prev.skillPoints;
      let newStatPoints = prev.statPoints;
      let leveledUp = false;

      while (newExp >= newMaxExp && newLevel < 150) {
        newExp -= newMaxExp;
        newLevel++;
        newMaxExp = Math.floor(newMaxExp * 1.45);
        newSP += 2; 
        newStatPoints += 5;
        leveledUp = true;
      }
      if (leveledUp) addLog(`🎉 LÊN CẤP ${newLevel}!`);
      return { ...prev, currentExp: newExp, level: newLevel, maxExp: newMaxExp, skillPoints: newSP, statPoints: newStatPoints };
    });
  }, [addLog]);

  const updateHp = useCallback((newHp: number) => {
    setPlayer(p => ({ ...p, hp: Math.max(0, newHp) })); 
  }, []);

  const addGold = useCallback((amount: number) => {
    setPlayer(p => ({ ...p, gold: p.gold + amount }));
  }, []);

  const rebirth = useCallback((eternalPointsReward: number) => {
    setPlayer(prev => {
        const savedUpgrades = prev.eternalUpgrades;
        const savedPoints = prev.eternalPoints;
        const savedRebirthCount = prev.rebirthCount + 1;
        const savedClass = prev.characterClass; 
        const savedBpLevels = prev.blueprintLevels;
        const savedSkills = prev.skills;

        return {
          ...INITIAL_PLAYER,
          characterClass: savedClass,
          eternalPoints: savedPoints + eternalPointsReward,
          rebirthCount: savedRebirthCount,
          eternalUpgrades: savedUpgrades,
          blueprintLevels: savedBpLevels,
          skills: savedSkills, 
          statPoints: 10 + (savedRebirthCount * 10),
          memoryGemPotential: 0
        };
    });
  }, []);

  const upgradeSkill = useCallback((skill: Skill) => {
    setPlayer(prev => {
      if (prev.level < skill.reqLevel) {
          addLog(`❌ Cần Cấp ${skill.reqLevel} để mở khóa!`);
          return prev;
      }
      const currentLevel = prev.skills[skill.id] || 0;
      if (currentLevel >= skill.maxLevel || prev.skillPoints < skill.cost) return prev;
      
      addLog(`✨ Lĩnh hội Bí Kỹ: ${skill.name}`);
      return { 
        ...prev, 
        skillPoints: prev.skillPoints - skill.cost, 
        skills: { ...prev.skills, [skill.id]: currentLevel + 1 } 
      };
    });
  }, [addLog]);

  const buyEternalUpgrade = useCallback((upgrade: EternalUpgrade) => {
    setPlayer(prev => {
      const currentLevel = prev.eternalUpgrades[upgrade.id] || 0;
      if (currentLevel >= upgrade.maxLevel) return prev;
      const cost = Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, currentLevel));
      if (prev.eternalPoints < cost) return prev;
      return { ...prev, eternalPoints: prev.eternalPoints - cost, eternalUpgrades: { ...prev.eternalUpgrades, [upgrade.id]: currentLevel + 1 } };
    });
  }, []);

  const selectClass = useCallback((cls: CharacterClass) => {
      setPlayer(prev => ({ ...prev, characterClass: cls }));
      addLog(`✨ Thức tỉnh sức mạnh: ${cls}`);
  }, [addLog]);

  const allocateStat = useCallback((statName: keyof Player['stats'], amount: number = 1) => {
      setPlayer(prev => {
          if (prev.statPoints < amount) return prev;
          return { ...prev, statPoints: prev.statPoints - amount, stats: { ...prev.stats, [statName]: prev.stats[statName] + amount } };
      });
  }, []);

  const resetStats = useCallback(() => {
      setPlayer(prev => ({ ...prev, statPoints: prev.statPoints + 10, stats: { strength: 1, dexterity: 1, intelligence: 1, vitality: 1, luck: 1 } }));
  }, []);

  return { 
      player, setPlayer, gainExp, updateHp, addGold, rebirth, upgradeSkill, buyEternalUpgrade, getStatMultiplier, selectClass, allocateStat, resetStats, setGameSpeed, upgradeBlueprint, updateMemoryPotential
  };
};
