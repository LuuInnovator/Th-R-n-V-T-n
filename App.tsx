
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Rarity, EquipmentType, Blueprint, CharacterClass, Equipment, Zone, Enemy, EternalUpgradeId } from './types';
import { ZONES, INITIAL_BLUEPRINTS, EQUIPMENT_TALENTS } from './constants';
import { generateId, randomInt, rollRarity } from './utils';

import { usePlayer } from './hooks/usePlayer';
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

export default function App() {
  const [activeTab, setActiveTab] = useState<'battle' | 'inventory' | 'craft' | 'skills' | 'rebirth' | 'wiki' | 'settings'>('battle');
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [activeZone, setActiveZone] = useState<Zone>(ZONES[0]);
  const [currentEnemy, setCurrentEnemy] = useState<Enemy | null>(null);
  const [isAutoAttacking, setIsAutoAttacking] = useState(false);

  const { addLog, logs, clearLogs } = useGameLog();
  const { player, setPlayer, gainExp, updateHp, rebirth, buyEternalUpgrade, getStatMultiplier, selectClass, allocateStat, resetStats, addGold, upgradeSkill, setGameSpeed, upgradeBlueprint, updateMemoryPotential, saveGame, loadGame } = usePlayer(addLog);
  const { materials, equipments, equipped, addMaterial, consumeMaterials, addEquipment, removeEquipment, equipItem, handleRebirth: performInventoryRebirth } = useInventory(addLog);
  
  const { exportSaveFile, importSaveFile } = useFileSystem(setPlayer, addLog);

  useEffect(() => {
    loadGame();
  }, []);

  const calculatedStats = useMemo(() => calculatePlayerStats(player, equipped, getStatMultiplier), [player, equipped, getStatMultiplier]);

  const { handleAttack, handleExplore } = useBattle(
    player, calculatedStats, activeZone, currentEnemy, setCurrentEnemy, 
    updateHp, gainExp, addGold, addMaterial, addLog, 
    isAutoAttacking, player.gameSpeed
  );

  useEffect(() => {
    let interval: any;
    if (isAutoAttacking && currentEnemy) {
      interval = setInterval(handleAttack, 1000 / player.gameSpeed);
    } else if (isAutoAttacking && !currentEnemy) {
      handleExplore();
    }
    return () => clearInterval(interval);
  }, [isAutoAttacking, currentEnemy, handleAttack, handleExplore, player.gameSpeed]);

  const onRebirthClick = () => {
    const epReward = player.level * 10;
    performInventoryRebirth((player.eternalUpgrades[EternalUpgradeId.ResourceRetention] || 0) * 10, updateMemoryPotential);
    rebirth(epReward);
    addLog(`✨ Tái sinh thành công! +${epReward} EP.`);
  };

  const getTabLabel = (id: string) => {
    switch(id) {
        case 'battle': return 'Viễn Chinh';
        case 'inventory': return 'Hành Trang';
        case 'craft': return 'Lò Rèn';
        case 'skills': return 'Bí Pháp';
        case 'rebirth': return 'Luân Hồi';
        case 'wiki': return 'Cổ Thư';
        case 'settings': return 'Cài Đặt';
        default: return '';
    }
  };

  const handleCraft = (bp: Blueprint, overheat: boolean) => {
    consumeMaterials(bp.requiredMaterials);
    
    // Logic Đốt nhiệt mới: 70% thất bại mất đồ
    if (overheat && Math.random() < 0.7) {
        addLog(`🔥 Lò rèn quá nóng! Trang bị đã bị thiêu rụi hoàn toàn...`);
        return;
    }

    // Nếu là Vật phẩm tiêu hao
    if (bp.resultType === 'VẬT PHẨM') {
        addMaterial(bp.name as any, 1);
        addLog(`🧪 Chế tạo thành công: ${bp.name}`);
        return;
    }

    // Nếu là Trang bị
    const evolBonus = (player.blueprintLevels[bp.id] || 0) * 0.25;
    const memoryBonus = bp.id === 'bp_legacy' ? player.memoryGemPotential : 0;
    const finalRarity = rollRarity((player.skills['gen_luck'] || 0) * 0.01 + (overheat ? 0.4 : 0));
    
    let talent;
    if (finalRarity === Rarity.Legendary || finalRarity === Rarity.Mythic || finalRarity === Rarity.Cosmic) {
        talent = EQUIPMENT_TALENTS[randomInt(0, EQUIPMENT_TALENTS.length - 1)];
    }

    // Nếu đốt nhiệt thành công, chỉ số x2.5
    const overheatMult = overheat ? 2.5 : 1.0;
    const itemAtk = bp.baseStats.maxAtk ? Math.floor((bp.baseStats.maxAtk * (1 + evolBonus) + memoryBonus) * overheatMult) : 0;
    const itemDef = bp.baseStats.maxDef ? Math.floor((bp.baseStats.maxDef * (1 + evolBonus)) * overheatMult) : 0;

    const item: Equipment = {
        id: generateId(),
        name: bp.name + (player.blueprintLevels[bp.id] ? ` (+${player.blueprintLevels[bp.id]})` : ""),
        type: bp.resultType as EquipmentType,
        rarity: finalRarity,
        stats: {
            attack: itemAtk,
            defense: itemDef
        },
        value: 100, isEquipped: false, sockets: 1, socketedGems: [], talent
    };
    addEquipment(item);
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
        {player.characterClass === CharacterClass.None && <ClassSelectionModal onSelect={selectClass} />}
        
        <Sidebar 
          player={player} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          setShowStatsModal={setShowStatsModal} 
        />

        <main className="flex-1 flex flex-col overflow-hidden relative">
            <Header 
              activeTab={activeTab} 
              getTabLabel={getTabLabel} 
              player={player} 
              onSetGameSpeed={setGameSpeed} 
            />

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
                        blueprints={INITIAL_BLUEPRINTS.map(bp => ({ ...bp, evolutionLevel: player.blueprintLevels[bp.id] || 0 }))} 
                        materials={materials} 
                        onCraft={handleCraft} 
                        craftingSkill={1} 
                        onUpgradeBlueprint={upgradeBlueprint}
                        eternalPoints={player.eternalPoints}
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
                      onLoad={loadGame} 
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
