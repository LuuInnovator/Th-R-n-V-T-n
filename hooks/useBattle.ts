
import { useCallback, Dispatch, SetStateAction } from 'react';
import { Enemy, Player, Equipment, EternalUpgradeId, Rarity, MutationType, MonsterAbility } from '../types';
import { ENEMIES_DB, EQUIPMENT_TALENTS } from '../constants';
import { randomInt, generateId, rollRarity } from '../utils';

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
    
    // Lọc quái vật dựa trên Rebirth
    const availableEnemies = zoneEnemies.filter(e => {
        const minRB = e.minRebirth || 0;
        // Nếu người chơi đã Rebirth, ưu tiên các biến thể RebirthVariant (Slime Axit, Sói Ảnh Hệ...)
        if (player.rebirthCount > 0 && e.mutation === MutationType.RebirthVariant) {
            return player.rebirthCount >= minRB;
        }
        // Nếu là Zone đặc biệt (Zone 6, 7), kiểm tra điều kiện Rebirth
        if (activeZone.minRebirth > 0) {
            return player.rebirthCount >= activeZone.minRebirth;
        }
        // Mặc định: Trả về quái bình thường
        return !e.mutation || e.mutation === MutationType.None;
    });

    const finalPool = availableEnemies.length > 0 ? availableEnemies : zoneEnemies.filter(e => !e.mutation || e.mutation === MutationType.None);
    
    if (finalPool.length === 0) {
        addLog(`⚠️ Khu vực này quá nguy hiểm cho tu vi hiện tại của bạn!`);
        return;
    }
    
    const base = finalPool[randomInt(0, finalPool.length - 1)];
    let enemy: Enemy = { ...base };
    enemy.hp = enemy.maxHp;
    setCurrentEnemy(enemy);
    addLog(`🔍 Phát hiện ${enemy.name}! ${enemy.mutation === MutationType.RebirthVariant ? '🔥 BIẾN DỊ 🔥' : ''}`);
  }, [activeZone, player.rebirthCount, addLog, setCurrentEnemy]);

  const handleAttack = useCallback(() => {
    if (!currentEnemy) return;

    let playerAtk = calculatedStats.totalAtk;
    const playerDamage = Math.max(1, Math.floor(playerAtk - currentEnemy.defense));
    const isCrit = Math.random() < (calculatedStats.critChance / 100);
    const finalDamage = isCrit ? Math.floor(playerDamage * (calculatedStats.critDamage / 100)) : playerDamage;

    const newEnemyHp = Math.max(0, currentEnemy.hp - finalDamage);

    if (newEnemyHp <= 0) {
      addLog(`⚔️ Hạ gục ${currentEnemy.name}!`);
      updateHp(calculatedStats.totalHp);

      gainExp(currentEnemy.expReward);
      addGold(currentEnemy.goldReward);

      currentEnemy.dropTable.forEach(drop => {
        if (Math.random() < (drop.chance + calculatedStats.dropRateBonus)) {
          addMaterial(drop.materialType, randomInt(drop.minQty, drop.maxQty));
        }
      });

      setCurrentEnemy(null);
      if (isAutoAttacking) {
        setTimeout(handleExplore, 400 / gameSpeed);
      }
    } else {
      setCurrentEnemy({ ...currentEnemy, hp: newEnemyHp });

      // Né đòn
      const dodgeChance = (player.skills['sb_dodge'] || 0) * 0.02;
      if (Math.random() < dodgeChance) {
        addLog("💨 Bạn đã né đòn!");
        return;
      }

      let enemyDamage = Math.max(1, currentEnemy.attack - calculatedStats.totalDef);
      
      // Hiệu ứng đặc biệt của quái
      if (currentEnemy.abilities?.includes(MonsterAbility.ArmorBreak)) {
          enemyDamage = Math.floor(enemyDamage * 1.3); // Axit phá giáp +30%
      }

      if (currentEnemy.abilities?.includes(MonsterAbility.Reflect)) {
          const reflected = Math.floor(finalDamage * 0.1);
          updateHp(player.hp - reflected);
          addLog(`🛡️ Phản đòn: Bạn nhận ${reflected} sát thương!`);
      }

      const newPlayerHp = player.hp - enemyDamage;
      
      if (newPlayerHp <= 0) {
        addLog(`💀 Bạn gục ngã... Hồi sinh tại Rừng Khởi Nguyên.`);
        updateHp(calculatedStats.totalHp);
        setCurrentEnemy(null);
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
