
import { useState, useCallback } from 'react';
import { Player, Skill } from '../types';

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
  skills: {}
};

export const usePlayer = (addLog: (msg: string) => void) => {
  const [player, setPlayer] = useState<Player>(INITIAL_PLAYER);

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
    setPlayer(p => ({ ...p, hp: Math.min(Math.max(0, newHp), p.maxHp) }));
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

  const rebirth = useCallback((eternalPointsReward: number) => {
    setPlayer(prev => ({
      ...INITIAL_PLAYER,
      eternalPoints: prev.eternalPoints + eternalPointsReward,
      rebirthCount: prev.rebirthCount + 1,
      skills: prev.skills, // Giữ lại kỹ năng sau khi Rebirth
      skillPoints: prev.skillPoints, // Giữ lại SP dư (tùy chọn design, ở đây giữ lại)
      // Bonus chỉ số cơ bản sau mỗi lần rebirth
      attack: INITIAL_PLAYER.attack + (prev.rebirthCount + 1) * 5,
      defense: INITIAL_PLAYER.defense + (prev.rebirthCount + 1) * 2
    }));
  }, []);

  const setFullHp = useCallback(() => {
    setPlayer(p => ({ ...p, hp: p.maxHp }));
  }, []);

  return { player, setPlayer, gainExp, updateHp, addGold, rebirth, setFullHp, upgradeSkill };
};
