
import { useState, useCallback } from 'react';
import { Player, Skill, EternalUpgrade, EternalUpgradeId } from '../types';

const INITIAL_PLAYER: Player = {
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
  eternalUpgrades: {}
};

export const usePlayer = (addLog: (msg: string) => void) => {
  const [player, setPlayer] = useState<Player>(INITIAL_PLAYER);

  // Tính toán chỉ số thực tế sau khi áp dụng nâng cấp vĩnh hằng
  const getStatMultiplier = useCallback((base: number) => {
    const latentPowerLevel = player.eternalUpgrades[EternalUpgradeId.LatentPower] || 0;
    // Mỗi cấp Latent Power tăng 5%
    return Math.floor(base * (1 + latentPowerLevel * 0.05));
  }, [player.eternalUpgrades]);

  const gainExp = useCallback((amount: number) => {
    setPlayer(prev => {
      let newExp = prev.currentExp + amount;
      let newLevel = prev.level;
      let newMaxHp = prev.maxHp;
      let newAtk = prev.attack;
      let newDef = prev.defense;
      let newMaxExp = prev.maxExp;
      let newSP = prev.skillPoints;
      let leveledUp = false;

      while (newExp >= newMaxExp) {
        newExp -= newMaxExp;
        newLevel++;
        newMaxExp = Math.floor(newMaxExp * 1.5);
        newMaxHp += 20;
        newAtk += 2;
        newDef += 1;
        newSP += 1; // +1 SP per level
        leveledUp = true;
      }

      if (leveledUp) {
        addLog(`🎉 CHÚC MỪNG! Bạn đã lên cấp ${newLevel}! (+1 SP, +20 HP)`);
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
        skillPoints: newSP
      };
    });
  }, [addLog]);

  const updateHp = useCallback((newHp: number) => {
    setPlayer(p => ({ ...p, hp: Math.min(Math.max(0, newHp), getStatMultiplier(p.maxHp)) }));
  }, [getStatMultiplier]);

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

      // Tính giá: Base * (Multiplier ^ CurrentLevel)
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
        // Giữ lại Eternal Upgrades & Points
        const savedUpgrades = prev.eternalUpgrades;
        const savedPoints = prev.eternalPoints;
        const savedRebirthCount = prev.rebirthCount + 1;
        
        // Base stats sau Rebirth
        const baseAttack = INITIAL_PLAYER.attack + (savedRebirthCount * 5);
        const baseDefense = INITIAL_PLAYER.defense + (savedRebirthCount * 2);
        
        return {
          ...INITIAL_PLAYER,
          eternalPoints: savedPoints + eternalPointsReward,
          rebirthCount: savedRebirthCount,
          eternalUpgrades: savedUpgrades,
          attack: baseAttack,
          defense: baseDefense
        };
    });
  }, []);

  const setFullHp = useCallback(() => {
    setPlayer(p => ({ ...p, hp: getStatMultiplier(p.maxHp) }));
  }, [getStatMultiplier]);

  return { 
      player, setPlayer, gainExp, updateHp, addGold, rebirth, setFullHp, upgradeSkill, buyEternalUpgrade, getStatMultiplier 
  };
};
