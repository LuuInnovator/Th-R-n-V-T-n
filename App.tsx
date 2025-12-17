
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Rarity, EquipmentType, Blueprint, CharacterClass, Equipment, Zone, Enemy, EternalUpgradeId } from './types';
import { ZONES, INITIAL_BLUEPRINTS, EQUIPMENT_TALENTS, RARITY_MULTIPLIER } from './constants';
import { generateId, randomInt, rollRarity } from './utils';

import { usePlayer, INITIAL_PLAYER } from './hooks/usePlayer';
import { useInventory } from './hooks/useInventory';
import { useGameLog } from './hooks/useGameLog';
import { useBattle } from './hooks/useBattle';
import { useFileSystem } from './hooks/useFileSystem';
import { calculatePlayerStats } from './utils/statCalculator';

import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { InventoryView } from './components/InventoryView';
import { BattleView } from './components/BattleView';
import { CraftingView } from './components/CraftingView';
import { SkillTreeView } from './components/SkillTreeView';
import { RebirthView } from './components/RebirthView';
import { WikiView } from './components/WikiView';
import { SettingsView } from './components/settings/SettingsView';
import { CharacterStatsModal } from './components/CharacterStatsModal';
import { ClassSelectionModal } from './components/ClassSelectionModal';

const SAVE_KEY_GLOBAL = 'infinity_blacksmith_save_v6';

const INITIAL_EQUIPPED: Record<EquipmentType, Equipment | null> = {
  [EquipmentType.Weapon]: null,
  [EquipmentType.Armor]: null,
  [EquipmentType.Accessory]: null,
  [EquipmentType.Helmet]: null,
  [EquipmentType.Gloves]: null,
  [EquipmentType.Boots]: null
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'battle' | 'inventory' | 'craft' | 'skills' | 'rebirth' | 'wiki' | 'settings'>('battle');
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [activeZone, setActiveZone] = useState<Zone>(ZONES[0]);
  const [currentEnemy, setCurrentEnemy] = useState<Enemy | null>(null);
  const [isAutoAttacking, setIsAutoAttacking] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { addLog, logs, clearLogs } = useGameLog();
  const { player, setPlayer, gainExp, updateHp, rebirth, buyEternalUpgrade, getStatMultiplier, selectClass, allocateStat, resetStats, addGold, upgradeSkill, setGameSpeed, upgradeBlueprint, updateMemoryPotential } = usePlayer(addLog);
  const { materials, setMaterials, equipments, setEquipments, equipped, setEquipped, addMaterial, consumeMaterials, addEquipment, removeEquipment, equipItem, handleRebirth: performInventoryRebirth } = useInventory(addLog);
  
  const { exportSaveFile, importSaveFile } = useFileSystem(setPlayer, addLog);

  const saveGame = useCallback(() => {
    try {
      const saveData = { player, materials, equipments, equipped };
      localStorage.setItem(SAVE_KEY_GLOBAL, JSON.stringify(saveData));
    } catch (e) {
      console.error("Save error:", e);
    }
  }, [player, materials, equipments, equipped]);

  useEffect(() => {
    const saved = localStorage.getItem(SAVE_KEY_GLOBAL);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data && data.player) {
            setPlayer(prev => ({
                ...INITIAL_PLAYER,
                ...data.player,
                stats: { ...INITIAL_PLAYER.stats, ...(data.player.stats || {}) },
                skills: { ...data.player.skills || {} },
                eternalUpgrades: { ...data.player.eternalUpgrades || {} },
                blueprintLevels: { ...data.player.blueprintLevels || {} }
            }));
            if (data.materials) setMaterials(data.materials);
            if (data.equipments) setEquipments(data.equipments);
            if (data.equipped) setEquipped({ ...INITIAL_EQUIPPED, ...data.equipped });
        }
      } catch (e) {
        console.error("Load Error:", e);
        localStorage.removeItem(SAVE_KEY_GLOBAL);
      }
    }
    setIsLoaded(true);
  }, []);

  const calculatedStats = useMemo(() => {
      return calculatePlayerStats(player, equipped, getStatMultiplier);
  }, [player, equipped, getStatMultiplier]);

  const { handleAttack, handleExplore } = useBattle(
    player, calculatedStats, activeZone, currentEnemy, setCurrentEnemy, 
    updateHp, gainExp, addGold, addMaterial, addLog, 
    isAutoAttacking, player.gameSpeed || 1
  );

  useEffect(() => {
    let interval: any;
    if (isAutoAttacking && isLoaded) {
      if (currentEnemy) {
        interval = setInterval(handleAttack, 1000 / (player.gameSpeed || 1));
      } else {
        interval = setTimeout(handleExplore, 500 / (player.gameSpeed || 1));
      }
    }
    return () => { clearInterval(interval); clearTimeout(interval); };
  }, [isAutoAttacking, currentEnemy, handleAttack, handleExplore, player.gameSpeed, isLoaded]);

  const onRebirthClick = () => {
    const epReward = player.level * 25; // Tăng thưởng EP
    performInventoryRebirth((player.eternalUpgrades[EternalUpgradeId.ResourceRetention] || 0) * 10, updateMemoryPotential);
    rebirth(epReward);
    addLog(`✨ Tái sinh thành công! Bạn cảm thấy một nguồn sức mạnh cổ xưa chảy trong huyết quản...`);
  };

  const handleCraft = (bp: Blueprint, overheat: boolean) => {
    consumeMaterials(bp.requiredMaterials);
    if (overheat && Math.random() < 0.7) {
        addLog(`🔥 THẤT BẠI! Sức nóng lò rèn đã thiêu rụi mọi thứ...`);
        return;
    }

    const evolLevel = player.blueprintLevels[bp.id] || 0;
    const evolBonus = evolLevel * 0.5; // Tăng bonus tiến hóa
    const memoryBonus = bp.id === 'bp_legacy' ? player.memoryGemPotential : 0;
    
    const finalRarity = rollRarity((player.skills['al_luck'] || 0) * 0.02 + (overheat ? 0.4 : 0));
    const rarityMult = RARITY_MULTIPLIER[finalRarity];
    const overheatMult = overheat ? 4.0 : 1.0; // Tăng mạnh bonus overheat
    
    const baseAtkRoll = bp.baseStats.maxAtk > 0 ? randomInt(bp.baseStats.minAtk, bp.baseStats.maxAtk) : 0;
    const baseDefRoll = bp.baseStats.maxDef > 0 ? randomInt(bp.baseStats.minDef, bp.baseStats.maxDef) : 0;
    const baseHpRoll = (bp.baseStats.maxHp || 0) > 0 ? randomInt(bp.baseStats.minHp || 0, bp.baseStats.maxHp || 0) : 0;

    const itemAtk = baseAtkRoll > 0 ? Math.floor((baseAtkRoll * rarityMult * overheatMult) * (1 + evolBonus) + memoryBonus) : 0;
    const itemDef = baseDefRoll > 0 ? Math.floor((baseDefRoll * rarityMult * overheatMult) * (1 + evolBonus)) : 0;
    const itemHp = baseHpRoll > 0 ? Math.floor((baseHpRoll * rarityMult * overheatMult) * (1 + evolBonus)) : 0;

    const item: Equipment = {
        id: generateId(),
        name: bp.name + (evolLevel > 0 ? ` (+${evolLevel})` : ""),
        type: bp.resultType as EquipmentType,
        rarity: finalRarity,
        stats: { attack: itemAtk, defense: itemDef, hpBonus: itemHp },
        value: Math.floor(100 * rarityMult), 
        isEquipped: false, sockets: 1, socketedGems: [], 
        talent: (finalRarity === Rarity.Legendary || finalRarity === Rarity.Mythic || finalRarity === Rarity.Cosmic) 
                 ? EQUIPMENT_TALENTS[randomInt(0, EQUIPMENT_TALENTS.length - 1)] : undefined
    };

    addEquipment(item);
  };

  if (!isLoaded) return <div className="bg-black h-screen w-screen flex items-center justify-center text-blue-500">Đang khởi tạo...</div>;

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
        {player.characterClass === CharacterClass.None && <ClassSelectionModal onSelect={selectClass} />}
        <Sidebar player={player} activeTab={activeTab} setActiveTab={setActiveTab} setShowStatsModal={setShowStatsModal} />
        <main className="flex-1 flex flex-col overflow-hidden relative">
            <Header activeTab={activeTab} getTabLabel={(id) => id} player={player} onSetGameSpeed={setGameSpeed} />
            <div className="flex-1 overflow-hidden">
                {activeTab === 'battle' && (
                    <BattleView 
                        zones={ZONES} activeZone={activeZone} onSelectZone={setActiveZone} 
                        player={{...player, maxHp: calculatedStats.totalHp}} currentEnemy={currentEnemy} 
                        onExplore={handleExplore} onAttack={handleAttack} 
                        isAutoAttacking={isAutoAttacking} onToggleAutoAttack={() => setIsAutoAttacking(!isAutoAttacking)}
                        logs={logs} onClearLogs={clearLogs} 
                    />
                )}
                {activeTab === 'inventory' && (
                    <InventoryView 
                        equipments={equipments} equipped={equipped} 
                        onEquip={equipItem} onSell={(item) => { removeEquipment(item.id); addGold(item.value); }} 
                        player={player} onSocketGem={() => {}} onAddSocket={() => {}} onEnchant={() => {}} 
                        materials={materials} 
                    />
                )}
                {activeTab === 'craft' && (
                    <CraftingView 
                        blueprints={INITIAL_BLUEPRINTS.map(bp => ({ ...bp, unlocked: true, evolutionLevel: player.blueprintLevels[bp.id] || 0 }))} 
                        materials={materials} 
                        onCraft={handleCraft} 
                        craftingSkill={1} 
                        onUpgradeBlueprint={upgradeBlueprint}
                        eternalPoints={player.eternalPoints}
                        player={player}
                    />
                )}
                {activeTab === 'skills' && <SkillTreeView player={player} onUpgrade={upgradeSkill} />}
                {activeTab === 'rebirth' && (
                    <RebirthView 
                        player={player} 
                        onRebirth={onRebirthClick} 
                        canRebirth={player.level >= 50} 
                        onBuyUpgrade={buyEternalUpgrade} 
                    />
                )}
                {activeTab === 'settings' && (
                    <SettingsView 
                      onSave={saveGame} 
                      onLoad={() => window.location.reload()} 
                      onReset={() => { localStorage.clear(); window.location.reload(); }} 
                      onExportFile={() => exportSaveFile(player)}
                      onImportFile={importSaveFile}
                    />
                )}
                {activeTab === 'wiki' && <WikiView zones={ZONES} blueprints={INITIAL_BLUEPRINTS} />}
            </div>
        </main>
        {showStatsModal && (
            <CharacterStatsModal 
                player={player} equipped={equipped} onClose={() => setShowStatsModal(false)} 
                getStatMultiplier={getStatMultiplier} onAllocate={allocateStat} onRespec={resetStats}
            />
        )}
    </div>
  );
}
