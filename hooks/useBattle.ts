
import { useCallback, Dispatch, SetStateAction } from 'react';
import { Enemy, Player, Equipment, EternalUpgradeId, Rarity } from '../types';
import { ENEMIES_DB, EQUIPMENT_TALENTS } from '../constants';
import { randomInt, generateId, rollRarity } from '../utils';

export const useBattle = (
  player: Player,
  calculatedStats: any,
  activeZone: any,
  currentEnemy: Enemy | null,
  // Fix: Use Dispatch and SetStateAction from react to support functional updates for the enemy state
  setCurrentEnemy: Dispatch<SetStateAction<Enemy | null>>,
  updateHp: (hp: number) => void,
  gainExp: (exp: number) => void,
  addGold: (gold: number) => void,
  addMaterial: (type: any, qty: number) => void,
  addLog: (msg: string) => void,
  isAutoAttacking: boolean,
  gameSpeed: number
) => {
  const handleExplore = useCallback(() => {
    const zoneEnemies = ENEMIES_DB[activeZone.id] || [];
    if (zoneEnemies.length === 0) return;
    const base = zoneEnemies[randomInt(0, zoneEnemies.length - 1)];
    let enemy: Enemy = { ...base };
    enemy.hp = enemy.maxHp;
    setCurrentEnemy(enemy);
    addLog(`🔍 Phát hiện ${enemy.name}!`);
  }, [activeZone, addLog, setCurrentEnemy]);

  const handleAttack = useCallback(() => {
    if (!currentEnemy) return;

    // --- LOGIC TẤN CÔNG (BÍ KỸ) ---
    let playerAtk = calculatedStats.totalAtk;
    const executeBonus = (player.skills['sb_execute'] || 0) * 0.1;
    if (executeBonus > 0 && (currentEnemy.hp / currentEnemy.maxHp) < 0.3) {
      playerAtk *= (1 + executeBonus);
    }

    const playerDamage = Math.max(1, Math.floor(playerAtk - currentEnemy.defense));
    const isCrit = Math.random() < (calculatedStats.critChance / 100);
    const finalDamage = isCrit ? Math.floor(playerDamage * (calculatedStats.critDamage / 100)) : playerDamage;

    const newEnemyHp = Math.max(0, currentEnemy.hp - finalDamage);

    if (newEnemyHp <= 0) {
      addLog(`⚔️ Hạ gục ${currentEnemy.name}!`);
      
      // HỒI MÁU TỰ ĐỘNG KHI THẮNG
      updateHp(calculatedStats.totalHp);

      const goldBonus = (player.skills['am_transmute'] || 0) * 0.05;
      gainExp(currentEnemy.expReward);
      addGold(Math.floor(currentEnemy.goldReward * (1 + goldBonus)));

      currentEnemy.dropTable.forEach(drop => {
        if (Math.random() < (drop.chance + calculatedStats.dropRateBonus)) {
          addMaterial(drop.materialType, randomInt(drop.minQty, drop.maxQty));
        }
      });

      setCurrentEnemy(null);
      // Tiếp tục auto nếu đang bật
      if (isAutoAttacking) {
        setTimeout(handleExplore, 400 / gameSpeed);
      }
    } else {
      setCurrentEnemy({ ...currentEnemy, hp: newEnemyHp });

      // --- LOGIC PHÒNG THỦ (BÍ KỸ) ---
      const dodgeChance = (player.skills['sb_dodge'] || 0) * 0.02;
      if (Math.random() < dodgeChance) {
        addLog("💨 Bạn đã né đòn!");
        return;
      }

      let enemyDamage = Math.max(1, currentEnemy.attack - calculatedStats.totalDef);
      const reflectChance = (player.skills['hs_reflect'] || 0) * 0.05;
      if (Math.random() < reflectChance) {
        const reflected = Math.floor(enemyDamage * 0.5);
        // Fix: Now correctly using functional update supported by Dispatch<SetStateAction<...>>
        setCurrentEnemy(prev => prev ? { ...prev, hp: Math.max(0, prev.hp - reflected) } : null);
        addLog(`🛡️ Phản đòn: ${reflected}!`);
      }

      const newPlayerHp = player.hp - enemyDamage;
      
      if (newPlayerHp <= 0) {
        addLog(`💀 Bạn gục ngã... Hồi sinh ngay lập tức!`);
        // HỒI MÁU TỰ ĐỘNG KHI CHẾT
        updateHp(calculatedStats.totalHp);
        setCurrentEnemy(null);
        // DUY TRÌ AUTO FARM KỂ CẢ KHI CHẾT
        if (isAutoAttacking) {
          setTimeout(handleExplore, 600 / gameSpeed);
        }
      } else {
        updateHp(newPlayerHp);
      }
    }
  }, [currentEnemy, calculatedStats, player, updateHp, gainExp, addGold, addMaterial, addLog, isAutoAttacking, handleExplore, gameSpeed, setCurrentEnemy]);

  return { handleAttack, handleExplore };
};
