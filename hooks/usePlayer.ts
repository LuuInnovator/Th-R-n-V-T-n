import { useState, useCallback } from 'react';
import { Player } from '../types';

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
  rebirthCount: 0
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
      let leveledUp = false;

      while (newExp >= newMaxExp) {
        newExp -= newMaxExp;
        newLevel++;
        newMaxExp = Math.floor(newMaxExp * 1.5);
        newMaxHp += 20;
        newAtk += 2;
        newDef += 1;
        leveledUp = true;
      }

      if (leveledUp) {
        addLog(`🎉 CHÚC MỪNG! Bạn đã lên cấp ${newLevel}! (HP +20, ATK +2, DEF +1)`);
      }

      return {
        ...prev,
        currentExp: newExp,
        level: newLevel,
        maxExp: newMaxExp,
        maxHp: newMaxHp,
        hp: newMaxHp, // Hồi đầy máu khi lên cấp
        attack: newAtk,
        defense: newDef
      };
    });
  }, [addLog]);

  const updateHp = useCallback((newHp: number) => {
    setPlayer(p => ({ ...p, hp: Math.min(Math.max(0, newHp), p.maxHp) }));
  }, []);

  const addGold = useCallback((amount: number) => {
    setPlayer(p => ({ ...p, gold: p.gold + amount }));
  }, []);

  const rebirth = useCallback((eternalPointsReward: number) => {
    setPlayer(prev => ({
      ...INITIAL_PLAYER,
      eternalPoints: prev.eternalPoints + eternalPointsReward,
      rebirthCount: prev.rebirthCount + 1,
      // Bonus chỉ số cơ bản sau mỗi lần rebirth
      attack: INITIAL_PLAYER.attack + (prev.rebirthCount + 1) * 5,
      defense: INITIAL_PLAYER.defense + (prev.rebirthCount + 1) * 2
    }));
  }, []);

  const setFullHp = useCallback(() => {
    setPlayer(p => ({ ...p, hp: p.maxHp }));
  }, []);

  return { player, setPlayer, gainExp, updateHp, addGold, rebirth, setFullHp };
};