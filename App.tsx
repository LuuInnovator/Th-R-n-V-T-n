
/* ... (Imports remain same) ... */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Zone, Enemy, Blueprint, EquipmentType, Equipment, SetId, EternalUpgradeId, ElementType, MaterialType, Rarity, CharacterClass, GemType, GemTier, EnchantmentType } from './types';
import { ZONES, ENEMIES_DB, INITIAL_BLUEPRINTS, RARITY_MULTIPLIER, GEM_STATS, ENCHANT_STATS } from './constants';
import { randomInt, rollRarity, generateId, formatNumber } from './utils';

// Hooks
import { usePlayer } from './hooks/usePlayer';
import { useInventory } from './hooks/useInventory';
import { useGameLog } from './hooks/useGameLog';

// Components
import { InventoryView } from './components/InventoryView';
import { BattleView } from './components/BattleView';
import { CraftingView } from './components/CraftingView';
import { RebirthView } from './components/RebirthView';
import { SkillTreeView } from './components/SkillTreeView';
import { CharacterStatsModal } from './components/CharacterStatsModal'; 
import { ClassSelectionModal } from './components/ClassSelectionModal';
import { User, Shield, Sword, Hammer, RefreshCw, Save, Upload, Zap, BarChart2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'battle' | 'craft' | 'inventory' | 'rebirth' | 'skills'>('battle');
  const [showStatsModal, setShowStatsModal] = useState(false);
  
  const { logs, addLog, clearLogs } = useGameLog();
  const { 
      player, setPlayer, gainExp, updateHp, addGold, rebirth, setFullHp, upgradeSkill, buyEternalUpgrade, getStatMultiplier, selectClass, addGem, removeGem 
  } = usePlayer(addLog);
  const { 
    materials, equipments, equipped, 
    addMaterial, consumeMaterials, addEquipment, removeEquipment, updateEquipment, equipItem, resetInventory, loadInventory 
  } = useInventory(addLog);

  const [currentZone, setCurrentZone] = useState<Zone>(ZONES[0]);
  const [currentEnemy, setCurrentEnemy] = useState<Enemy | null>(null);
  const [isAutoAttacking, setIsAutoAttacking] = useState(false);
  const [hasRevivedInBattle, setHasRevivedInBattle] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const getActiveSets = useCallback(() => {
    const activeSets: Record<SetId, number> = {} as any;
    Object.values(equipped).forEach(item => {
      if (item && item.setId) activeSets[item.setId] = (activeSets[item.setId] || 0) + 1;
    });
    return activeSets;
  }, [equipped]);

  // --- ITEM UPGRADE HANDLERS ---
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
  const calculateTotalStats = useCallback(() => {
      let totalAtk = getStatMultiplier(player.attack);
      let totalDef = getStatMultiplier(player.defense);
      let totalHp = getStatMultiplier(player.maxHp);

      Object.values(equipped).forEach(item => {
        if(item) {
            let itemAtk = item.stats.attack || 0;
            let itemDef = item.stats.defense || 0;
            if (item.enchantment === EnchantmentType.Sharpness) itemAtk *= (1 + ENCHANT_STATS[item.enchantment].multAtk!);
            if (item.enchantment === EnchantmentType.Protection) itemDef *= (1 + ENCHANT_STATS[item.enchantment].multDef!);

            totalAtk += Math.floor(itemAtk);
            totalDef += Math.floor(itemDef);

            item.socketedGems.forEach(gem => {
                const stats = GEM_STATS[gem.type][gem.tier];
                if (gem.type === GemType.Ruby) totalAtk += stats;
                if (gem.type === GemType.Sapphire) totalDef += stats;
                if (gem.type === GemType.Topaz) totalHp += stats;
            });
        }
      });
      
      const weaponMasteryLevel = player.skills['wp_mastery'] || 0;
      const armorMasteryLevel = player.skills['ar_mastery'] || 0;
      totalAtk += weaponMasteryLevel * 2;
      totalDef += armorMasteryLevel * 2;

      return { totalAtk, totalDef, totalHp };
  }, [player, equipped, getStatMultiplier]);

  const canEnterZone = (zone: Zone) => !zone.reqRebirth || player.rebirthCount >= zone.reqRebirth;

  const handleSelectZone = (zone: Zone) => {
      if (!canEnterZone(zone)) {
          addLog(`⛔ Khu vực này yêu cầu Tái sinh ${zone.reqRebirth} lần!`);
          return;
      }
      setCurrentZone(zone);
      setCurrentEnemy(null);
      setIsAutoAttacking(false);
  };

  const handleExplore = useCallback(() => {
    const enemiesInZone = ENEMIES_DB[currentZone.id];
    if (enemiesInZone && enemiesInZone.length > 0) {
      const randIdx = randomInt(0, enemiesInZone.length - 1);
      setCurrentEnemy({ ...enemiesInZone[randIdx] });
      setHasRevivedInBattle(false);
      addLog(`⚔️ Bạn đã tìm thấy ${enemiesInZone[randIdx].name}!`);
    } else {
      addLog("Khu vực này có vẻ trống trải...");
      setIsAutoAttacking(false);
    }
  }, [currentZone.id, addLog]);

  const handleAttack = useCallback(() => {
    if (!currentEnemy) return;
    const { totalAtk, totalDef } = calculateTotalStats();

    let weaponElement: ElementType = ElementType.Physical;
    const weapon = equipped[EquipmentType.Weapon];
    if (weapon && weapon.element) weaponElement = weapon.element;

    const activeSets = getActiveSets();
    const forgeSpiritCount = activeSets[SetId.ForgeSpirit] || 0;
    const primalHunterCount = activeSets[SetId.PrimalHunter] || 0;
    const dragonfireCount = activeSets[SetId.DragonfireKeeper] || 0;

    let elementMult = 1.0;
    if (weaponElement === ElementType.Ice && currentEnemy.element === ElementType.Fire) elementMult = 1.5;
    if (weaponElement === ElementType.Fire && currentEnemy.element === ElementType.Ice) elementMult = 1.5;
    if (weaponElement === currentEnemy.element && weaponElement !== ElementType.Physical) elementMult = 0.5;

    let lifeSteal = 0;
    Object.values(equipped).forEach(i => { if (i?.enchantment === EnchantmentType.Vampirism) lifeSteal += 0.05; });

    let damageMultiplier = 1;
    if (primalHunterCount >= 2 && currentEnemy.isBoss) damageMultiplier += 0.15;
    const ignoreDefense = forgeSpiritCount >= 4 ? 0.2 : 0;
    const isCrit = Math.random() < 0.05 + (player.skills['wp_crit'] || 0) * 0.01;
    const critMult = 1.5 + (primalHunterCount >= 6 ? 0.3 : 0);

    const effectiveEnemyDef = currentEnemy.defense * (1 - ignoreDefense);
    const rawDmg = Math.max(1, (totalAtk - effectiveEnemyDef));
    const finalDmg = Math.floor(rawDmg * damageMultiplier * elementMult * (isCrit ? critMult : 1));
    
    if (elementMult > 1) addLog("❄️ Khắc hệ! Sát thương tăng 50%.");

    let newEnemyHp = currentEnemy.hp - finalDmg;
    addLog(`Bạn chém ${currentEnemy.name} gây ${finalDmg} sát thương! ${isCrit ? '(CHÍ MẠNG!)' : ''}`);

    if (lifeSteal > 0) {
        const heal = Math.ceil(finalDmg * lifeSteal);
        updateHp(player.hp + heal);
    }

    if (newEnemyHp <= 0) {
      addLog(`💀 Đã tiêu diệt ${currentEnemy.name}!`);
      addLog(`+${currentEnemy.expReward} EXP, +${currentEnemy.goldReward} Vàng`);
      gainExp(currentEnemy.expReward);
      addGold(currentEnemy.goldReward);
      
      const huntersEyeLevel = player.eternalUpgrades[EternalUpgradeId.HuntersEye] || 0;
      let dropRateBonus = huntersEyeLevel * 0.01;
      Object.values(equipped).forEach(i => { if (i?.enchantment === EnchantmentType.Fortune) dropRateBonus += 0.2; });
      if (player.characterClass === CharacterClass.HeavySentinel) dropRateBonus += 0.1;
      
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
    } else {
      let incomingDmg = currentEnemy.attack;
      if (dragonfireCount >= 2 && currentEnemy.element === ElementType.Fire) incomingDmg *= 0.7;

      let dmgToPlayer = incomingDmg - totalDef;
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
        newPlayerHp = Math.floor(player.maxHp * 0.5);
        setHasRevivedInBattle(true);
        addLog("✨ Tinh Thần Lò Rèn trỗi dậy! Bạn đã được hồi sinh!");
      }
      if (newPlayerHp <= 0) {
        updateHp(0);
        addLog("☠️ BẠN ĐÃ BỊ ĐÁNH BẠI! Hồi sinh tại thị trấn...");
        setFullHp();
        setCurrentEnemy(null);
        setIsAutoAttacking(false);
      } else {
        updateHp(newPlayerHp);
        setCurrentEnemy({ ...currentEnemy, hp: newEnemyHp });
      }
    }
  }, [currentEnemy, player, equipped, addLog, gainExp, addGold, addMaterial, updateHp, setFullHp, getActiveSets, hasRevivedInBattle, calculateTotalStats, addGem]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isAutoAttacking && player.hp > 0) {
      const activeSets = getActiveSets();
      let cooldownRed = (activeSets[SetId.PrimalHunter] || 0) >= 4 ? 0.8 : 1; 
      if (player.characterClass === CharacterClass.ShadowBlade) cooldownRed -= 0.1;
      const attackSpeed = 1000 * cooldownRed;
      if (currentEnemy) timer = setTimeout(() => handleAttack(), attackSpeed);
      else timer = setTimeout(() => handleExplore(), 1500);
    }
    return () => clearTimeout(timer);
  }, [isAutoAttacking, currentEnemy, player.hp, handleAttack, handleExplore, getActiveSets, player.characterClass]);

  const saveGame = useCallback(() => {
    const saveData = {
      player, materials, equipments, equipped, currentZoneId: currentZone.id, timestamp: Date.now()
    };
    localStorage.setItem('eternal_blacksmith_save', JSON.stringify(saveData));
    return saveData;
  }, [player, materials, equipments, equipped, currentZone.id]);

  const applySaveData = (saveData: any) => {
      setPlayer(saveData.player);
      loadInventory(saveData.materials, saveData.equipments, saveData.equipped);
      const savedZone = ZONES.find(z => z.id === saveData.currentZoneId);
      if (savedZone) setCurrentZone(savedZone);
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
                    addLog("📂 Đã tải dữ liệu từ file thành công!");
                } catch (error) {
                    addLog("❌ File không hợp lệ!");
                }
            }
        };
    }
  };

  useEffect(() => {
    const autoSaveTimer = setInterval(() => saveGame(), 30000);
    return () => clearInterval(autoSaveTimer);
  }, [saveGame]);

  const handleCraft = (bp: Blueprint, useOverheat: boolean) => {
    // ... (Crafting logic remains largely same, just checking if we need to call handleSocket/Enchant here - NO, separate handlers)
    // COPY PASTE OLD CRAFT LOGIC WITH NEW SOCKET GENERATION
    const refundChance = (player.skills['al_efficiency'] || 0) * 0.05;
    if (Math.random() > refundChance) consumeMaterials(bp.requiredMaterials);
    else addLog("⚗️ Luyện kim thuật: Đã tiết kiệm nguyên liệu!");

    if (bp.resultType === 'MATERIAL') {
        addMaterial(bp.resultMaterial!, 1, Rarity.Common);
        addLog(`Chế tạo thành công: ${bp.name}`);
        return;
    }

    if (useOverheat) {
        const talentSafety = (player.eternalUpgrades[EternalUpgradeId.LearnFromFailure] || 0) * 0.02;
        const skillSafety = (player.skills['en_overheat'] || 0) * 0.05;
        const failChance = Math.max(0.05, 0.30 - skillSafety - talentSafety);
        if (Math.random() < failChance) {
            addLog("🔥 LÒ RÈN QUÁ NHIỆT! Thất bại và mất nguyên liệu.");
            return;
        }
    }

    const rarityBonus = (player.rebirthCount * 0.1) + (useOverheat ? 0.3 : 0);
    const rarity = rollRarity(rarityBonus); 
    const multiplier = RARITY_MULTIPLIER[rarity];
    
    const atkBase = bp.baseStats.maxAtk > 0 ? randomInt(bp.baseStats.minAtk, bp.baseStats.maxAtk) : 0;
    const defBase = bp.baseStats.maxDef > 0 ? randomInt(bp.baseStats.minDef, bp.baseStats.maxDef) : 0;

    const finalAtk = Math.floor(atkBase * multiplier);
    const finalDef = Math.floor(defBase * multiplier);

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
    if (useOverheat) addLog(`🔥 RÈN CỰC HẠN THÀNH CÔNG! Tạo ra ${newItem.name}`);
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
      {showStatsModal && <CharacterStatsModal player={player} equipped={equipped} onClose={() => setShowStatsModal(false)} getStatMultiplier={getStatMultiplier}/>}

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
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-slate-900/50 p-2 rounded border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-500 uppercase">HP</div>
                    <div className="font-bold text-red-400">{getStatMultiplier(player.hp)}</div>
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
          <SidebarButton id="inventory" icon={User} label="Túi Đồ" />
          <SidebarButton id="craft" icon={Hammer} label="Chế Tạo" />
          <SidebarButton id="skills" icon={Zap} label="Kỹ Năng" />
          <div className="my-4 border-t border-slate-800/50 mx-2"></div>
          <SidebarButton id="rebirth" icon={RefreshCw} label="Tái Sinh" colorClass="text-purple-400 hover:text-purple-300" />
        </nav>
      </aside>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-950 border-t border-slate-800 flex justify-around p-2 z-50 safe-area-bottom">
        <button onClick={() => setActiveTab('battle')} className={`p-2 flex flex-col items-center ${activeTab === 'battle' ? 'text-blue-500' : 'text-slate-500'}`}><Sword size={20} /><span className="text-[9px] font-bold mt-1">Chiến Đấu</span></button>
        <button onClick={() => setActiveTab('inventory')} className={`p-2 flex flex-col items-center ${activeTab === 'inventory' ? 'text-blue-500' : 'text-slate-500'}`}><User size={20} /><span className="text-[9px] font-bold mt-1">Túi Đồ</span></button>
        <button onClick={() => setActiveTab('craft')} className={`p-2 flex flex-col items-center ${activeTab === 'craft' ? 'text-blue-500' : 'text-slate-500'}`}><Hammer size={20} /><span className="text-[9px] font-bold mt-1">Chế Tạo</span></button>
        <button onClick={() => setActiveTab('skills')} className={`p-2 flex flex-col items-center ${activeTab === 'skills' ? 'text-blue-500' : 'text-slate-500'}`}><Zap size={20} /><span className="text-[9px] font-bold mt-1">Kỹ Năng</span></button>
        <button onClick={() => setActiveTab('rebirth')} className={`p-2 flex flex-col items-center ${activeTab === 'rebirth' ? 'text-purple-500' : 'text-slate-500'}`}><RefreshCw size={20} /><span className="text-[9px] font-bold mt-1">Tái Sinh</span></button>
      </div>

      <main className="flex-1 flex flex-col overflow-hidden relative z-10 pb-16 lg:pb-0">
        <header className="bg-slate-900/80 backdrop-blur-md p-4 border-b border-white/5 flex justify-between items-center sticky top-0 z-30">
          <div className="flex items-center gap-2">
             <div onClick={() => setShowStatsModal(true)} className="lg:hidden bg-slate-800 p-1.5 rounded border border-slate-700">
                <BarChart2 size={16} className="text-blue-400" />
             </div>
             <h2 className="text-lg font-bold text-slate-200 tracking-wide flex items-center gap-2">
                {activeTab === 'battle' && <><span className="text-blue-500">◈</span> THÁM HIỂM</>}
                {activeTab === 'inventory' && <><span className="text-green-500">◈</span> KHO ĐỒ</>}
                {activeTab === 'craft' && <><span className="text-amber-500">◈</span> XƯỞNG RÈN</>}
                {activeTab === 'skills' && <><span className="text-red-500">◈</span> CÂY KỸ NĂNG</>}
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
            <BattleView zones={ZONES} activeZone={currentZone} onSelectZone={handleSelectZone} player={player} currentEnemy={currentEnemy} onExplore={handleExplore} onAttack={handleAttack} logs={logs} onClearLogs={clearLogs} isAutoAttacking={isAutoAttacking} onToggleAutoAttack={() => setIsAutoAttacking(!isAutoAttacking)} />
          )}
          
          {activeTab === 'inventory' && (
            <InventoryView equipments={equipments} equipped={equipped} onEquip={equipItem} onSell={handleSell} player={player} onSocketGem={handleSocketGem} onAddSocket={handleAddSocket} onEnchant={handleEnchant} />
          )}

          {activeTab === 'craft' && (
            <CraftingView blueprints={INITIAL_BLUEPRINTS} materials={materials} onCraft={handleCraft} craftingSkill={1 + player.rebirthCount} />
          )}

          {activeTab === 'skills' && (
            <SkillTreeView player={player} onUpgrade={upgradeSkill} />
          )}

          {activeTab === 'rebirth' && (
            <RebirthView player={player} onRebirth={handleRebirth} canRebirth={player.level >= 50} onBuyUpgrade={buyEternalUpgrade} />
          )}
        </div>
      </main>
    </div>
  );
}
