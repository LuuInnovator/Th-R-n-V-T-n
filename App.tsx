
/* ... (Imports remain same) ... */
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Zone, Enemy, Blueprint, EquipmentType, Equipment, SetId, EternalUpgradeId, ElementType, MaterialType, Rarity, CharacterClass, GemType, GemTier, EnchantmentType } from './types';
import { ZONES, ENEMIES_DB, INITIAL_BLUEPRINTS, RARITY_MULTIPLIER, GEM_STATS, ENCHANT_STATS } from './constants';
import { randomInt, rollRarity, generateId, formatNumber } from './utils';

// Hooks
import { usePlayer, INITIAL_PLAYER } from './hooks/usePlayer'; // Import INITIAL_PLAYER
import { useInventory } from './hooks/useInventory';
import { useGameLog } from './hooks/useGameLog';
import { calculatePlayerStats } from './utils/statCalculator'; 

// Components
import { InventoryView } from './components/InventoryView';
import { BattleView } from './components/BattleView';
import { CraftingView } from './components/CraftingView';
import { RebirthView } from './components/RebirthView';
import { SkillTreeView } from './components/SkillTreeView';
import { CharacterStatsModal } from './components/CharacterStatsModal'; 
import { ClassSelectionModal } from './components/ClassSelectionModal';
import { GuildView } from './components/GuildView'; 
import { WikiView } from './components/WikiView'; 
import { User, Shield, Sword, Hammer, RefreshCw, Save, Upload, Zap, BarChart2, ShoppingBag, Book, Store } from 'lucide-react'; 

export default function App() {
  const [activeTab, setActiveTab] = useState<'battle' | 'craft' | 'inventory' | 'rebirth' | 'skills' | 'guild' | 'wiki'>('battle');
  const [showStatsModal, setShowStatsModal] = useState(false);
  
  const { logs, addLog, clearLogs } = useGameLog();
  const { 
      player, setPlayer, gainExp, updateHp, addGold, rebirth, setFullHp, upgradeSkill, buyEternalUpgrade, getStatMultiplier, selectClass, addGem, removeGem, addGuildFame, unlockGuildBlueprint,
      allocateStat, resetStats 
  } = usePlayer(addLog);
  const { 
    materials, equipments, equipped, 
    addMaterial, consumeMaterials, addEquipment, removeEquipment, updateEquipment, equipItem, resetInventory, loadInventory, upgradeMaterial 
  } = useInventory(addLog);

  const [currentZone, setCurrentZone] = useState<Zone>(ZONES[0]);
  const [currentEnemy, setCurrentEnemy] = useState<Enemy | null>(null);
  const [isAutoAttacking, setIsAutoAttacking] = useState(false);
  const [hasRevivedInBattle, setHasRevivedInBattle] = useState(false);
  
  // State mới cho Boss Timekeeper
  const [bossPhase, setBossPhase] = useState<number>(0);
  const [rustStacks, setRustStacks] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Use calculatePlayerStats helper for centralized logic
  const calculatedStats = useMemo(() => calculatePlayerStats(player, equipped, getStatMultiplier), [player, equipped, getStatMultiplier]);

  const getActiveSets = useCallback(() => {
    return calculatedStats.activeSets;
  }, [calculatedStats]);

  const dropRateBonus = useMemo(() => {
    return calculatedStats.dropRateBonus;
  }, [calculatedStats]);


  // --- GUILD HANDLERS ---
  const handleUnlockBlueprint = (bp: Blueprint) => {
      if ((bp.guildFameCost || 0) > player.guild.fame) {
          addLog("❌ Không đủ Uy Tín Cửa Hàng!");
          return;
      }
      unlockGuildBlueprint(bp.id, bp.guildFameCost || 0);
      addLog(`📖 Đã mở khóa bản vẽ Đặc Biệt: ${bp.name}`);
  };

  const handleTradeItem = (item: Equipment) => {
      let fameGain = 0;
      if (item.rarity === Rarity.Rare) fameGain = 10;
      if (item.rarity === Rarity.Epic) fameGain = 50;
      if (item.rarity === Rarity.Legendary) fameGain = 250;
      if (item.rarity === Rarity.Mythic) fameGain = 1000;

      removeEquipment(item.id);
      addGuildFame(fameGain);
      addLog(`🤝 Đã đổi ${item.name} lấy ${fameGain} Uy Tín.`);
  };

  // --- ITEM UPGRADE HANDLERS (Giữ nguyên) ---
  const handleSocketGem = (gemKey: string, item: Equipment) => {
      const [typeStr, tierStr] = gemKey.split('_');
      const type = typeStr as GemType;
      const tier = parseInt(tierStr) as GemTier;

      if (item.socketedGems.length >= item.sockets) {
          addLog("❌ Trang bị không còn lỗ trống!");
          return;
      }

      removeGem(gemKey, 1);
      const newItem: Equipment = { ...item, socketedGems: [...item.socketedGems, { type, tier }] };
      updateEquipment(newItem);
      addLog(`💎 Đã khảm ${type} vào ${item.name}`);
  };

  const handleEnchant = (type: EnchantmentType, item: Equipment) => {
      const scrolls = materials.find(m => m.type === MaterialType.EnchantScroll);
      if (!scrolls || scrolls.quantity < 1) {
          addLog("❌ Cần Giấy Phép Thuật để phù phép!");
          return;
      }
      consumeMaterials([{ type: MaterialType.EnchantScroll, amount: 1 }]);
      const newItem: Equipment = { ...item, enchantment: type };
      updateEquipment(newItem);
      addLog(`✨ Đã phù phép ${type} lên ${item.name}`);
  };

  const handleAddSocket = (item: Equipment) => {
      if (item.sockets >= 3) return;
      if (player.gold < 500) {
          addLog("❌ Không đủ 500 Vàng!");
          return;
      }
      addGold(-500);
      const newItem = { ...item, sockets: item.sockets + 1 };
      updateEquipment(newItem);
      addLog(`🔨 Đã đục thêm lỗ cho ${item.name}`);
  };

  // --- BATTLE LOGIC ---
  const canEnterZone = (zone: Zone) => !zone.reqRebirth || player.rebirthCount >= zone.reqRebirth;

  const handleSelectZone = (zone: Zone) => {
      if (!canEnterZone(zone)) {
          addLog(`⛔ Khu vực này yêu cầu Tái sinh ${zone.reqRebirth} lần!`);
          return;
      }
      setCurrentZone(zone);
      setCurrentEnemy(null);
      setIsAutoAttacking(false);
      setBossPhase(0);
      setRustStacks(0);
  };

  const handleExplore = useCallback(() => {
    const enemiesInZone = ENEMIES_DB[currentZone.id];
    
    if (enemiesInZone && enemiesInZone.length > 0) {
      const bosses = enemiesInZone.filter(e => e.isBoss);
      const normalMobs = enemiesInZone.filter(e => !e.isBoss);
      let selectedEnemy: Enemy;

      if (bosses.length > 0 && normalMobs.length > 0) {
          if (Math.random() < 0.05) { 
              selectedEnemy = bosses[randomInt(0, bosses.length - 1)];
          } else {
              selectedEnemy = normalMobs[randomInt(0, normalMobs.length - 1)];
          }
      } else {
          selectedEnemy = enemiesInZone[randomInt(0, enemiesInZone.length - 1)];
      }

      setCurrentEnemy({ ...selectedEnemy });
      setHasRevivedInBattle(false);
      setBossPhase(0);
      setRustStacks(0);
      addLog(`⚔️ Bạn đã tìm thấy ${selectedEnemy.name}!`);
    } else {
      addLog("Khu vực này có vẻ trống trải...");
      setIsAutoAttacking(false);
    }
  }, [currentZone.id, addLog]);

  const handleAttack = useCallback(() => {
    if (!currentEnemy) return;
    const { totalAtk, totalDef, weaponElement, activeSets, critChance, critDamage, dropRateBonus, totalHp } = calculatedStats;

    const forgeSpiritCount = activeSets[SetId.ForgeSpirit] || 0;
    const primalHunterCount = activeSets[SetId.PrimalHunter] || 0;
    const dragonfireCount = activeSets[SetId.DragonfireKeeper] || 0;

    let elementMult = 1.0;
    const wElement = weaponElement as ElementType;
    if (wElement === ElementType.Ice && currentEnemy.element === ElementType.Fire) elementMult = 1.5;
    if (wElement === ElementType.Fire && currentEnemy.element === ElementType.Ice) elementMult = 1.5;
    if (wElement === currentEnemy.element && wElement !== ElementType.Physical) elementMult = 0.5;

    let lifeSteal = 0;
    Object.values(equipped).forEach(i => { if (i?.enchantment === EnchantmentType.Vampirism) lifeSteal += 0.05; });

    let damageMultiplier = 1;
    if (primalHunterCount >= 2 && currentEnemy.isBoss) damageMultiplier += 0.15;
    const ignoreDefense = forgeSpiritCount >= 4 ? 0.2 : 0;
    
    const isCrit = Math.random() < (critChance / 100);
    const finalCritMult = critDamage / 100;

    // --- TIMEKEEPER BOSS MECHANICS ---
    let effectiveDef = totalDef;
    if (currentEnemy.id === 'e5_boss') {
        const hpPercent = (currentEnemy.hp / currentEnemy.maxHp) * 100;
        
        if (hpPercent > 60) {
            setBossPhase(1);
            if (rustStacks < 5) {
                const potion = materials.find(m => m.type === MaterialType.AntiRustPotion && m.quantity > 0);
                if (potion) {
                     addLog("🧪 Đã dùng Thuốc Giải Rỉ Sét! Ngăn chặn ăn mòn.");
                     consumeMaterials([{ type: MaterialType.AntiRustPotion, amount: 1 }]);
                } else {
                     setRustStacks(prev => prev + 1);
                     addLog(`⚠️ Bị dính Rỉ Sét! Giáp giảm ${10 * (rustStacks + 1)}%`);
                }
            }
            effectiveDef = Math.floor(effectiveDef * (1 - (rustStacks * 0.1)));
        } 
        else if (hpPercent > 30) {
            setBossPhase(2);
            if (Math.random() < 0.3) { 
                const decoy = materials.find(m => m.type === MaterialType.DecoyItem && m.quantity > 0);
                if (decoy) {
                    addLog("🎭 Boss ăn phải Vật Phẩm Mồi!");
                    consumeMaterials([{ type: MaterialType.DecoyItem, amount: 1 }]);
                } else {
                    addLog("🧛 Boss hút Nguyên Liệu của bạn để hồi máu!");
                    const stealable = materials.find(m => m.quantity > 0 && m.type !== MaterialType.DecoyItem);
                    if (stealable) {
                        consumeMaterials([{ type: stealable.type, amount: 1 }]);
                        const healAmt = Math.floor(currentEnemy.maxHp * 0.05);
                        currentEnemy.hp = Math.min(currentEnemy.maxHp, currentEnemy.hp + healAmt);
                        addLog(`Boss hồi phục ${healAmt} HP từ ${stealable.name}!`);
                    }
                }
            }
        }
        else {
             setBossPhase(3);
             if (wElement !== ElementType.Physical) {
                 addLog("⚡ Phá vỡ phòng thủ nguyên tố của Boss!");
             } else {
                 damageMultiplier *= 0.3;
                 addLog("🛡️ Boss đang ở trạng thái Phân Thân! Kháng vật lý cực cao.");
             }
        }
    }

    const effectiveEnemyDef = currentEnemy.defense * (1 - ignoreDefense);
    const rawDmg = Math.max(1, (totalAtk - effectiveEnemyDef));
    const finalDmg = Math.floor(rawDmg * damageMultiplier * elementMult * (isCrit ? finalCritMult : 1));
    
    if (elementMult > 1) addLog("❄️ Khắc hệ! Sát thương tăng 50%.");

    let newEnemyHp = currentEnemy.hp - finalDmg;
    addLog(`Bạn chém ${currentEnemy.name} gây ${finalDmg} sát thương! ${isCrit ? '(CHÍ MẠNG!)' : ''}`);

    if (lifeSteal > 0) {
        const heal = Math.ceil(finalDmg * lifeSteal);
        updateHp(player.hp + heal);
    }

    if ((activeSets[SetId.InfinityChrono] || 0) >= 4 && player.hp < player.maxHp * 0.2) {
        if (Math.random() < 0.1) {
             updateHp(player.maxHp);
             addLog("⏳ QUAY NGƯỢC! HP đã trở về trạng thái đầy đủ.");
        }
    }

    if (newEnemyHp <= 0) {
      addLog(`💀 Đã tiêu diệt ${currentEnemy.name}!`);
      addLog(`+${currentEnemy.expReward} EXP, +${currentEnemy.goldReward} Vàng`);
      gainExp(currentEnemy.expReward);
      addGold(currentEnemy.goldReward);

      // --- HỒI ĐẦY MÁU SAU CHIẾN THẮNG ---
      setFullHp(totalHp);
      addLog("💚 Đã hồi phục toàn bộ HP sau trận chiến!");
      
      currentEnemy.dropTable.forEach(drop => {
        let specificBonus = 0;
        if (player.characterClass === CharacterClass.AlchemistMage && (drop.materialType === MaterialType.SoulDust || drop.materialType === MaterialType.Essence)) {
            specificBonus = 0.15;
        }

        if (Math.random() <= drop.chance + dropRateBonus + specificBonus) {
          const qty = randomInt(drop.minQty, drop.maxQty);
          const rarityBonus = player.rebirthCount * 0.05 + (activeSets[SetId.ForgeSpirit] >= 2 ? 0.05 : 0);
          
          if (drop.materialType === MaterialType.Gem) {
               const randomType = Math.random() > 0.5 ? GemType.Ruby : (Math.random() > 0.5 ? GemType.Sapphire : GemType.Topaz);
               addGem(`${randomType}_1`, qty);
               addLog(`Nhận được: +${qty} ${randomType} (Sơ cấp)`);
          } else {
             addMaterial(drop.materialType, qty, rollRarity(rarityBonus));
          }
        }
      });
      setCurrentEnemy(null);
      setBossPhase(0);
      setRustStacks(0);
    } else {
      let incomingDmg = currentEnemy.attack;
      if (dragonfireCount >= 2 && currentEnemy.element === ElementType.Fire) incomingDmg *= 0.7;

      if (currentEnemy.id === 'e5_boss' && bossPhase === 3) incomingDmg *= 1.5;

      let dmgToPlayer = incomingDmg - effectiveDef;
      if (dmgToPlayer <= 0) {
        const hitChance = 0.1;
        if (Math.random() < hitChance) {
             dmgToPlayer = 1;
             addLog(`🛡️ ${currentEnemy.name} tấn công sượt qua! (1 sát thương)`);
        } else {
             dmgToPlayer = 0;
             addLog(`🛡️ Lớp giáp quá cứng! ${currentEnemy.name} không thể gây sát thương.`);
        }
      } else {
         addLog(`${currentEnemy.name} tấn công xuyên giáp gây ${Math.floor(dmgToPlayer)} sát thương!`);
      }

      let newPlayerHp = player.hp - dmgToPlayer;
      if (dragonfireCount >= 4 && dmgToPlayer > 0) {
          const reflectDmg = Math.max(1, Math.floor(dmgToPlayer * 0.2));
          newEnemyHp -= reflectDmg;
          addLog(`🛡️ Giáp phản lại ${reflectDmg} sát thương!`);
      }
      if (newPlayerHp <= 0 && forgeSpiritCount >= 6 && !hasRevivedInBattle) {
        newPlayerHp = Math.floor(totalHp * 0.5); // Sửa: Dùng totalHp thay vì player.maxHp (vì totalHp mới là thực tế)
        setHasRevivedInBattle(true);
        addLog("✨ Tinh Thần Lò Rèn trỗi dậy! Bạn đã được hồi sinh!");
      }
      if (newPlayerHp <= 0) {
        updateHp(0);
        addLog("☠️ BẠN ĐÃ BỊ ĐÁNH BẠI! Hồi sinh tại thị trấn...");
        // SỬA LỖI: Hồi sinh bằng đúng tổng HP thực tế thay vì con số hardcode
        setFullHp(totalHp); 
        setCurrentEnemy(null);
        setIsAutoAttacking(false);
        setBossPhase(0);
        setRustStacks(0);
      } else {
        updateHp(newPlayerHp);
        setCurrentEnemy({ ...currentEnemy, hp: newEnemyHp });
      }
    }
  }, [currentEnemy, player, equipped, addLog, gainExp, addGold, addMaterial, updateHp, setFullHp, hasRevivedInBattle, addGem, materials, consumeMaterials, bossPhase, rustStacks, calculatedStats]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isAutoAttacking && player.hp > 0) {
      const { cooldownReduction } = calculatedStats;
      const baseSpeed = 1000;
      const attackSpeed = baseSpeed * (1 - cooldownReduction);
      
      if (currentEnemy) timer = setTimeout(() => handleAttack(), attackSpeed);
      else timer = setTimeout(() => handleExplore(), 1500);
    }
    return () => clearTimeout(timer);
  }, [isAutoAttacking, currentEnemy, player.hp, handleAttack, handleExplore, calculatedStats]);

  /* ... (Save/Load functions) ... */
  const saveGame = useCallback(() => {
    const saveData = {
      player, materials, equipments, equipped, currentZoneId: currentZone.id, timestamp: Date.now()
    };
    localStorage.setItem('eternal_blacksmith_save', JSON.stringify(saveData));
    return saveData;
  }, [player, materials, equipments, equipped, currentZone.id]);

  const applySaveData = (saveData: any) => {
      // MIGRATION LOGIC: Merge dữ liệu cũ với cấu trúc mới để tránh lỗi
      // Nếu saveData.player thiếu field nào (ví dụ stats, gemInventory), nó sẽ lấy từ INITIAL_PLAYER
      const safePlayer = { 
          ...INITIAL_PLAYER, 
          ...saveData.player,
          // Merge stats object cẩn thận vì nó là object lồng nhau
          stats: { ...INITIAL_PLAYER.stats, ...(saveData.player?.stats || {}) },
          // Merge guild object
          guild: { ...INITIAL_PLAYER.guild, ...(saveData.player?.guild || {}) },
          // Các field khác nếu thiếu thì lấy từ INITIAL_PLAYER
          gemInventory: saveData.player?.gemInventory || INITIAL_PLAYER.gemInventory,
          skills: saveData.player?.skills || INITIAL_PLAYER.skills,
          eternalUpgrades: saveData.player?.eternalUpgrades || INITIAL_PLAYER.eternalUpgrades
      };

      // Vệ sinh Equipments (Thêm sockets/gems cho item cũ chưa có)
      const safeEquipments = (saveData.equipments || []).map((item: any) => ({
          ...item,
          sockets: item.sockets ?? 0,
          socketedGems: item.socketedGems || [],
          enchantment: item.enchantment || EnchantmentType.None
      }));

      // Vệ sinh Equipped items
      const safeEquipped: any = {};
      Object.keys(EquipmentType).forEach(key => {
          // @ts-ignore
          const type = EquipmentType[key];
          const eqItem = saveData.equipped?.[type];
          if (eqItem) {
              safeEquipped[type] = {
                  ...eqItem,
                  sockets: eqItem.sockets ?? 0,
                  socketedGems: eqItem.socketedGems || [],
                  enchantment: eqItem.enchantment || EnchantmentType.None
              };
          } else {
              safeEquipped[type] = null;
          }
      });

      setPlayer(safePlayer);
      loadInventory(saveData.materials || [], safeEquipments, safeEquipped);
      const savedZone = ZONES.find(z => z.id === saveData.currentZoneId);
      if (savedZone) setCurrentZone(savedZone);
      else setCurrentZone(ZONES[0]);

      setIsAutoAttacking(false);
      setCurrentEnemy(null);
      clearLogs();
  };

  const handleSaveAndExport = () => {
    const saveData = saveGame(); 
    addLog("💾 Đã lưu dữ liệu!");
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(saveData));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `VuaThoRen_Save_Lv${player.level}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImportFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
        fileReader.readAsText(event.target.files[0], "UTF-8");
        fileReader.onload = (e) => {
            if (e.target?.result) {
                try {
                    const parsedData = JSON.parse(e.target.result as string);
                    applySaveData(parsedData);
                    addLog("📂 Đã tải và đồng bộ dữ liệu thành công!");
                } catch (error) {
                    console.error(error);
                    addLog("❌ File lỗi hoặc không tương thích!");
                }
            }
        };
    }
  };

  // Auto Save Timer
  useEffect(() => {
    const autoSaveTimer = setInterval(() => saveGame(), 30000);
    return () => clearInterval(autoSaveTimer);
  }, [saveGame]);

  // BEFORE UNLOAD WARNING (VIETNAMESE)
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        const message = "Những thay đổi của bạn có thể chưa được lưu. Bạn có chắc chắn muốn rời đi?";
        e.returnValue = message; 
        return message;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleCraft = (bp: Blueprint, useOverheat: boolean) => {
    // 1. Tiêu thụ nguyên liệu (trước khi roll)
    const refundChance = (player.skills['al_efficiency'] || 0) * 0.05;
    if (Math.random() > refundChance) consumeMaterials(bp.requiredMaterials);
    else addLog("⚗️ Luyện kim thuật: Đã tiết kiệm nguyên liệu!");

    if (bp.resultType === 'MATERIAL') {
        addMaterial(bp.resultMaterial!, 1, Rarity.Common);
        addLog(`Chế tạo thành công: ${bp.name}`);
        return;
    }

    let rarity: Rarity = Rarity.Common;
    const overheatMult = useOverheat ? 2.5 : 1.0; 

    // 2. Logic Overheat (Thất bại 75% cứng)
    if (useOverheat) {
        const talentSafety = (player.eternalUpgrades[EternalUpgradeId.LearnFromFailure] || 0) * 0.02;
        const skillSafety = (player.skills['en_overheat'] || 0) * 0.05;
        // Mặc định thất bại 75%, giảm xuống nếu có skill (nhưng không giảm quá nhiều để giữ độ khó)
        const failChance = Math.max(0.50, 0.75 - skillSafety - talentSafety); 

        if (Math.random() < failChance) {
            addLog("🔥 LÒ RÈN NỔ TUNG! Quá nhiệt thất bại và mất nguyên liệu.");
            return;
        } else {
             // Nếu thành công trong Overheat, CHẮC CHẮN ra đồ xịn (Epic trở lên)
             const roll = Math.random();
             if (roll > 0.80) rarity = Rarity.Mythic; // 20% trong nhóm thành công (5% tổng)
             else if (roll > 0.40) rarity = Rarity.Legendary; // 40% trong nhóm thành công (10% tổng)
             else rarity = Rarity.Epic; // 40% trong nhóm thành công (10% tổng)
             
             addLog("🔥 RÈN CỰC HẠN THÀNH CÔNG! Sức mạnh bùng nổ!");
        }
    } else {
        // 3. Logic Normal (Roll bình thường)
        const rarityBonus = (player.rebirthCount * 0.05); // Bonus nhỏ từ rebirth
        const roll = Math.random() + rarityBonus;
        
        if (roll > 0.99) rarity = Rarity.Mythic;
        else if (roll > 0.95) rarity = Rarity.Legendary;
        else if (roll > 0.85) rarity = Rarity.Epic;
        else if (roll > 0.60) rarity = Rarity.Rare;
        else rarity = Rarity.Common;
    }

    const multiplier = RARITY_MULTIPLIER[rarity];
    
    const atkBase = bp.baseStats.maxAtk > 0 ? randomInt(bp.baseStats.minAtk, bp.baseStats.maxAtk) : 0;
    const defBase = bp.baseStats.maxDef > 0 ? randomInt(bp.baseStats.minDef, bp.baseStats.maxDef) : 0;

    const finalAtk = Math.floor(atkBase * multiplier * overheatMult);
    const finalDef = Math.floor(defBase * multiplier * overheatMult);

    let sockets = 0;
    const socketRoll = Math.random();
    if (socketRoll > 0.9) sockets = 3;
    else if (socketRoll > 0.7) sockets = 2;
    else if (socketRoll > 0.4) sockets = 1;

    const newItem: Equipment = {
      id: generateId(),
      name: `${bp.name} ${rarity}`,
      type: bp.resultType as EquipmentType,
      rarity: rarity,
      element: bp.element,
      isEquipped: false,
      value: (finalAtk + finalDef) * 10,
      stats: { attack: finalAtk, defense: finalDef },
      setId: bp.setId,
      sockets: sockets,
      socketedGems: []
    };

    addEquipment(newItem);
  };

  const handleSell = (item: Equipment) => {
    removeEquipment(item.id);
    addGold(item.value);
    addLog(`💰 Đã bán ${item.name} với giá ${item.value} vàng`);
  };

  const handleRebirth = () => {
    if (player.level < 50) return;
    const earnedPoints = player.level * 10;
    const solidFoundationLevel = player.eternalUpgrades[EternalUpgradeId.SolidFoundation] || 0;
    const keepAmount = solidFoundationLevel * 20;

    let savedMats: any[] = [];
    if (keepAmount > 0) {
        savedMats = materials.filter(m => m.type === MaterialType.Ore || m.type === MaterialType.Wood)
            .map(m => ({ ...m, quantity: Math.min(m.quantity, keepAmount) }));
        if(savedMats.length > 0) addLog(`🏗️ Nền Tảng Vững Chắc: Giữ lại ${keepAmount} nguyên liệu cơ bản.`);
    }

    rebirth(earnedPoints);
    resetInventory();
    savedMats.forEach(m => addMaterial(m.type, m.quantity, m.rarity));
    clearLogs();
    setCurrentEnemy(null);
    setCurrentZone(ZONES[0]);
    setIsAutoAttacking(false);
    setTimeout(() => saveGame(), 500);
    addLog(`✨ TÁI SINH THÀNH CÔNG! Nhận ${earnedPoints} Điểm Vĩnh Cửu.`);
    setActiveTab('battle');
  };

  const SidebarButton = ({ id, icon: Icon, label, colorClass = "text-slate-400" }: any) => (
    <button onClick={() => setActiveTab(id)} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group relative overflow-hidden ${activeTab === id ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'hover:bg-slate-800 ' + colorClass}`}>
      <div className={`relative z-10 flex items-center gap-3`}>
        <Icon size={20} className={activeTab === id ? 'animate-pulse' : ''} />
        <span className="font-bold">{label}</span>
      </div>
      {activeTab === id && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 animate-slide-up" />}
    </button>
  );

  return (
    <div className="flex h-screen overflow-hidden backdrop-blur-sm">
      {player.characterClass === CharacterClass.None && <ClassSelectionModal onSelect={selectClass} />}
      {showStatsModal && (
          <CharacterStatsModal 
            player={player} 
            equipped={equipped} 
            onClose={() => setShowStatsModal(false)} 
            getStatMultiplier={getStatMultiplier}
            onAllocate={allocateStat} // Pass new handlers
            onRespec={resetStats}
          />
      )}

      <aside className="w-72 bg-slate-950/90 border-r border-slate-800 flex flex-col z-20 shadow-2xl hidden lg:flex">
        <div className="p-6 border-b border-slate-800/50 bg-gradient-to-b from-slate-900 to-slate-950">
          <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-orange-400 to-red-500 mb-6 drop-shadow-sm">THỢ RÈN VÔ TẬN</h1>
          <div className="space-y-4">
            <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800 cursor-pointer hover:border-blue-500/50 transition-colors" onClick={() => setShowStatsModal(true)}>
                <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">LV.{player.level} {player.rebirthCount > 0 && <span className="text-purple-400">(RB {player.rebirthCount})</span>}</span>
                    <span className="text-slate-500">{player.currentExp}/{player.maxExp} EXP</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-2">
                    <div className="bg-blue-500 h-full transition-all duration-500" style={{ width: `${(player.currentExp / player.maxExp) * 100}%` }}></div>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-blue-400 font-bold mt-1">
                    <BarChart2 size={12} /> {player.characterClass}
                </div>
                {/* Stat Point Indicator */}
                {player.statPoints > 0 && (
                    <div className="mt-2 text-center text-xs font-bold text-yellow-400 animate-pulse bg-yellow-900/20 rounded py-1 border border-yellow-700/50">
                        + {player.statPoints} Điểm Tiềm Năng
                    </div>
                )}
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-slate-900/50 p-2 rounded border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-500 uppercase">HP</div>
                    <div className="font-bold text-red-400">{formatNumber(calculatedStats.totalHp)}</div> {/* Use calculated HP here */}
                </div>
                <div className="bg-slate-900/50 p-2 rounded border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-500 uppercase">Vàng</div>
                    <div className="font-bold text-yellow-400">{formatNumber(player.gold)}</div>
                </div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <SidebarButton id="battle" icon={Sword} label="Chiến Đấu" />
          <SidebarButton id="wiki" icon={Book} label="Từ Điển" colorClass="text-green-400 hover:text-green-300" />
          <SidebarButton id="inventory" icon={User} label="Túi Đồ" />
          <SidebarButton id="craft" icon={Hammer} label="Chế Tạo" />
          <SidebarButton id="skills" icon={Zap} label="Kỹ Năng" />
          <SidebarButton id="guild" icon={Store} label="Cửa Hàng" colorClass="text-amber-400 hover:text-amber-300" />
          <div className="my-4 border-t border-slate-800/50 mx-2"></div>
          <SidebarButton id="rebirth" icon={RefreshCw} label="Tái Sinh" colorClass="text-purple-400 hover:text-purple-300" />
        </nav>
      </aside>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-950 border-t border-slate-800 flex justify-around p-2 z-50 safe-area-bottom">
        <button onClick={() => setActiveTab('battle')} className={`p-2 flex flex-col items-center ${activeTab === 'battle' ? 'text-blue-500' : 'text-slate-500'}`}><Sword size={20} /><span className="text-[9px] font-bold mt-1">Chiến Đấu</span></button>
        <button onClick={() => setActiveTab('wiki')} className={`p-2 flex flex-col items-center ${activeTab === 'wiki' ? 'text-green-500' : 'text-slate-500'}`}><Book size={20} /><span className="text-[9px] font-bold mt-1">Từ Điển</span></button>
        <button onClick={() => setActiveTab('inventory')} className={`p-2 flex flex-col items-center ${activeTab === 'inventory' ? 'text-blue-500' : 'text-slate-500'}`}><User size={20} /><span className="text-[9px] font-bold mt-1">Túi Đồ</span></button>
        <button onClick={() => setActiveTab('craft')} className={`p-2 flex flex-col items-center ${activeTab === 'craft' ? 'text-blue-500' : 'text-slate-500'}`}><Hammer size={20} /><span className="text-[9px] font-bold mt-1">Chế Tạo</span></button>
         <button onClick={() => setActiveTab('guild')} className={`p-2 flex flex-col items-center ${activeTab === 'guild' ? 'text-amber-500' : 'text-slate-500'}`}><Store size={20} /><span className="text-[9px] font-bold mt-1">Cửa Hàng</span></button>
      </div>

      <main className="flex-1 flex flex-col overflow-hidden relative z-10 pb-16 lg:pb-0">
        <header className="bg-slate-900/80 backdrop-blur-md p-4 border-b border-white/5 flex justify-between items-center sticky top-0 z-30">
          <div className="flex items-center gap-2">
             <div onClick={() => setShowStatsModal(true)} className="lg:hidden bg-slate-800 p-1.5 rounded border border-slate-700 relative">
                <BarChart2 size={16} className="text-blue-400" />
                {player.statPoints > 0 && <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>}
             </div>
             <h2 className="text-lg font-bold text-slate-200 tracking-wide flex items-center gap-2">
                {activeTab === 'battle' && <><span className="text-blue-500">◈</span> THÁM HIỂM</>}
                {activeTab === 'wiki' && <><span className="text-green-500">◈</span> TỪ ĐIỂN SINH VẬT</>}
                {activeTab === 'inventory' && <><span className="text-green-500">◈</span> KHO ĐỒ</>}
                {activeTab === 'craft' && <><span className="text-amber-500">◈</span> XƯỞNG RÈN</>}
                {activeTab === 'skills' && <><span className="text-red-500">◈</span> CÂY KỸ NĂNG</>}
                {activeTab === 'guild' && <><span className="text-amber-500">◈</span> CỬA HÀNG & HỘI</>}
                {activeTab === 'rebirth' && <><span className="text-purple-500">◈</span> CỔNG TÁI SINH</>}
            </h2>
          </div>
          <div className="flex items-center bg-slate-800/80 p-1 rounded-lg border border-slate-700 backdrop-blur-sm">
            <button onClick={handleSaveAndExport} className="flex items-center gap-2 px-3 lg:px-4 py-1.5 text-sm font-bold text-slate-200 hover:text-white hover:bg-slate-700 rounded transition-colors"><Save size={16} /> <span className="hidden lg:inline">Lưu</span></button>
            <div className="w-px h-5 bg-slate-600 mx-1"></div>
            <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-3 lg:px-4 py-1.5 text-sm font-bold text-slate-200 hover:text-white hover:bg-slate-700 rounded transition-colors"><Upload size={16} /> <span className="hidden lg:inline">Tải</span></button>
            <input type="file" ref={fileInputRef} onChange={handleImportFile} accept=".json" className="hidden" />
          </div>
        </header>

        <div className="flex-1 overflow-hidden relative">
          {activeTab === 'battle' && (
            <BattleView 
              zones={ZONES} 
              activeZone={currentZone} 
              onSelectZone={handleSelectZone} 
              player={{...player, maxHp: calculatedStats.totalHp}} // Hack: pass calculated totalHp as maxHp for UI bar
              currentEnemy={currentEnemy} 
              onExplore={handleExplore} 
              onAttack={handleAttack} 
              logs={logs} 
              onClearLogs={clearLogs} 
              isAutoAttacking={isAutoAttacking} 
              onToggleAutoAttack={() => setIsAutoAttacking(!isAutoAttacking)}
              decoyCount={materials.find(m => m.type === MaterialType.DecoyItem)?.quantity || 0}
              blueprints={[...INITIAL_BLUEPRINTS].filter(bp => !bp.isGuildBlueprint || player.guild.blueprints.includes(bp.id))}
              dropRateBonus={dropRateBonus} 
            />
          )}

          {activeTab === 'wiki' && (
             <WikiView zones={ZONES} blueprints={INITIAL_BLUEPRINTS} />
          )}
          
          {activeTab === 'inventory' && (
            <InventoryView 
              equipments={equipments} 
              equipped={equipped} 
              onEquip={equipItem} 
              onSell={handleSell} 
              player={player} 
              onSocketGem={handleSocketGem} 
              onAddSocket={handleAddSocket} 
              onEnchant={handleEnchant}
              materials={materials} 
              onUpgradeMaterial={upgradeMaterial}
            />
          )}

          {activeTab === 'craft' && (
            <CraftingView blueprints={[...INITIAL_BLUEPRINTS].filter(bp => !bp.isGuildBlueprint || player.guild.blueprints.includes(bp.id))} materials={materials} onCraft={handleCraft} craftingSkill={1 + player.rebirthCount} />
          )}

          {activeTab === 'skills' && (
            <SkillTreeView player={player} onUpgrade={upgradeSkill} />
          )}

          {activeTab === 'guild' && (
            <GuildView 
                player={player} 
                guildBlueprints={INITIAL_BLUEPRINTS.filter(bp => bp.isGuildBlueprint)} 
                onUnlockBlueprint={handleUnlockBlueprint}
                onTradeItem={handleTradeItem}
                inventory={equipments}
            />
          )}

          {activeTab === 'rebirth' && (
            <RebirthView player={player} onRebirth={handleRebirth} canRebirth={player.level >= 50} onBuyUpgrade={buyEternalUpgrade} />
          )}
        </div>
      </main>
    </div>
  );
}
