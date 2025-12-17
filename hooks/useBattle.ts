
import { useCallback, Dispatch, SetStateAction } from 'react';
import { Enemy, Player, Equipment, EternalUpgradeId, Rarity, MutationType, MonsterAbility } from '../types';
import { ENEMIES_DB } from '../constants';
import { randomInt } from '../utils';

export const useBattle = (
  player: Player,
  calculatedStats: any,
  activeZone: any,
  currentEnemy: Enemy | null,
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
    let zoneEnemies = ENEMIES_DB[activeZone.id] || [];
    if (zoneEnemies.length === 0) {
        addLog(`⚠️ Khu vực ${activeZone.name} chưa có quái vật xuất hiện.`);
        return;
    }

    const availableEnemies = zoneEnemies.filter(e => {
        const minRB = e.minRebirth || 0;
        return player.rebirthCount >= minRB;
    });

    const finalPool = availableEnemies.length > 0 ? availableEnemies : zoneEnemies;
    const base = finalPool[randomInt(0, finalPool.length - 1)];
    if (!base) return;

    let enemy: Enemy = { ...base };
    enemy.hp = enemy.maxHp;
    setCurrentEnemy(enemy);
    addLog(`🔍 Gặp ${enemy.name}${enemy.isBoss ? ' (BOSS)' : ''}!`);
  }, [activeZone, player.rebirthCount, addLog, setCurrentEnemy]);

  const handleAttack = useCallback(() => {
    if (!currentEnemy) return;

    // Tính sát thương người chơi
    let playerDamage = Math.max(1, Math.floor(calculatedStats.totalAtk - currentEnemy.defense));
    const isCrit = Math.random() < (calculatedStats.critChance / 100);
    if (isCrit) playerDamage = Math.floor(playerDamage * (calculatedStats.critDamage / 100));

    const newEnemyHp = Math.max(0, currentEnemy.hp - playerDamage);

    if (newEnemyHp <= 0) {
      addLog(`⚔️ Hạ gục ${currentEnemy.name}!`);
      if (!isAutoAttacking) updateHp(calculatedStats.totalHp);

      gainExp(currentEnemy.expReward);
      addGold(currentEnemy.goldReward);

      currentEnemy.dropTable.forEach(drop => {
        const luckBonus = (player.skills['al_luck'] || 0) * 0.01 + (calculatedStats.dropRateBonus || 0);
        if (Math.random() < (drop.chance + luckBonus)) {
          addMaterial(drop.materialType, randomInt(drop.minQty, drop.maxQty));
        }
      });

      setCurrentEnemy(null);
      if (isAutoAttacking) setTimeout(handleExplore, 400 / gameSpeed);
    } else {
      setCurrentEnemy({ ...currentEnemy, hp: newEnemyHp });

      // Người chơi né đòn
      const dodgeChance = (calculatedStats.cooldownReduction || 0) * 0.5;
      if (Math.random() < dodgeChance) {
        addLog("💨 Bạn đã né được đòn!");
        return;
      }

      // Quái vật tấn công
      let enemyDamage = Math.max(1, currentEnemy.attack - calculatedStats.totalDef);
      if (currentEnemy.abilities?.includes(MonsterAbility.ArmorBreak)) enemyDamage *= 1.4;

      const newPlayerHp = player.hp - enemyDamage;
      if (newPlayerHp <= 0) {
        addLog(`💀 Bạn đã tử trận! Trở về thành trấn...`);
        updateHp(calculatedStats.totalHp);
        setCurrentEnemy(null);
        if (isAutoAttacking) setTimeout(handleExplore, 1000 / gameSpeed);
      } else {
        updateHp(newPlayerHp);
        // Hút máu nếu có thiên phú
        if (calculatedStats.lifeSteal) {
             const heal = Math.floor(playerDamage * 0.1);
             updateHp(Math.min(calculatedStats.totalHp, player.hp + heal));
        }
      }
    }
  }, [currentEnemy, calculatedStats, player, updateHp, gainExp, addGold, addMaterial, addLog, isAutoAttacking, handleExplore, gameSpeed, setCurrentEnemy]);

  return { handleAttack, handleExplore };
};
