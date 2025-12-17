
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Rarity, EquipmentType, ElementType, MaterialType, Blueprint, CharacterClass, Equipment, Zone, Enemy, MutationType, MonsterAbility, EternalUpgradeId, SetId } from './types';
import { ZONES, ENEMIES_DB, INITIAL_BLUEPRINTS, RARITY_MULTIPLIER, EQUIPMENT_TALENTS } from './constants';
import { generateId, randomInt, formatNumber, rollRarity } from './utils';

import { usePlayer } from './hooks/usePlayer';
import { useInventory } from './hooks/useInventory';
import { useGameLog } from './hooks/useGameLog';
import { calculatePlayerStats } from './utils/statCalculator';

import { InventoryView } from './components/InventoryView';
import { BattleView } from './components/BattleView';
import { CraftingView } from './components/CraftingView';
import { SkillTreeView } from './components/SkillTreeView';
import { RebirthView } from './components/RebirthView';
import { GuildView } from './components/GuildView';
import { WikiView } from './components/WikiView';
import { CharacterStatsModal } from './components/CharacterStatsModal';
import { ClassSelectionModal } from './components/ClassSelectionModal';
import { Button } from './components/Button';
import { Card } from './components/Card';

import { Sword, User, Hammer, Zap, RefreshCw, Book, Store, Save, Settings, FastForward, FolderDown, Trash2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'battle' | 'inventory' | 'craft' | 'skills' | 'rebirth' | 'guild' | 'wiki' | 'settings'>('battle');
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [activeZone, setActiveZone] = useState<Zone>(ZONES[0]);
  const [currentEnemy, setCurrentEnemy] = useState<Enemy | null>(null);
  const [isAutoAttacking, setIsAutoAttacking] = useState(false);

  const { addLog, logs, clearLogs } = useGameLog();
  const { player, gainExp, updateHp, rebirth, buyEternalUpgrade, getStatMultiplier, selectClass, allocateStat, resetStats, addGold, upgradeSkill, setGameSpeed, upgradeBlueprint, updateMemoryPotential, saveGame, loadGame } = usePlayer(addLog);
  const { materials, equipments, equipped, addMaterial, consumeMaterials, addEquipment, removeEquipment, equipItem, handleRebirth: performInventoryRebirth } = useInventory(addLog);

  const calculatedStats = useMemo(() => calculatePlayerStats(player, equipped, getStatMultiplier), [player, equipped, getStatMultiplier]);

  const handleExplore = useCallback(() => {
    const zoneEnemies = ENEMIES_DB[activeZone.id] || [];
    if (zoneEnemies.length === 0) return;
    const base = zoneEnemies[randomInt(0, zoneEnemies.length - 1)];
    let enemy: Enemy = { ...base };
    enemy.hp = enemy.maxHp;
    setCurrentEnemy(enemy);
    addLog(`🔍 Phát hiện ${enemy.name}!`);
  }, [activeZone, addLog]);

  const handleAttack = useCallback(() => {
    if (!currentEnemy) return;
    
    // logic Bí kỹ công
    let playerAtk = calculatedStats.totalAtk;
    const executeBonus = (player.skills['sb_execute'] || 0) * 0.1;
    if (executeBonus > 0 && (currentEnemy.hp / currentEnemy.maxHp) < 0.3) playerAtk *= (1 + executeBonus);

    const playerDamage = Math.max(1, Math.floor(playerAtk - currentEnemy.defense));
    const isCrit = Math.random() < (calculatedStats.critChance / 100);
    const finalDamage = isCrit ? Math.floor(playerDamage * (calculatedStats.critDamage / 100)) : playerDamage;
    
    const newEnemyHp = Math.max(0, currentEnemy.hp - finalDamage);
    
    if (newEnemyHp <= 0) {
      addLog(`⚔️ Hạ gục ${currentEnemy.name}!`);
      const goldBonus = (player.skills['am_transmute'] || 0) * 0.05;
      gainExp(currentEnemy.expReward);
      addGold(Math.floor(currentEnemy.goldReward * (1 + goldBonus)));
      
      currentEnemy.dropTable.forEach(drop => {
        if (Math.random() < (drop.chance + calculatedStats.dropRateBonus)) {
          addMaterial(drop.materialType, randomInt(drop.minQty, drop.maxQty));
        }
      });
      setCurrentEnemy(null);
      if (isAutoAttacking) setTimeout(handleExplore, 400 / player.gameSpeed);
    } else {
      setCurrentEnemy({ ...currentEnemy, hp: newEnemyHp });
      
      // logic Bí kỹ thủ/né
      const dodgeChance = (player.skills['sb_dodge'] || 0) * 0.02;
      if (Math.random() < dodgeChance) {
          addLog("💨 Bạn đã né đòn!");
          return;
      }

      let enemyDamage = Math.max(1, currentEnemy.attack - calculatedStats.totalDef);
      const reflectChance = (player.skills['hs_reflect'] || 0) * 0.05;
      if (Math.random() < reflectChance) {
          const reflected = Math.floor(enemyDamage * 0.5);
          setCurrentEnemy(prev => prev ? { ...prev, hp: Math.max(0, prev.hp - reflected) } : null);
          addLog(`🛡️ Phản đòn: ${reflected}!`);
      }

      updateHp(Math.max(0, player.hp - enemyDamage));
      if (player.hp <= 0) {
        addLog(`💀 Bạn gục ngã...`);
        setIsAutoAttacking(false);
        updateHp(calculatedStats.totalHp);
      }
    }
  }, [currentEnemy, calculatedStats, gainExp, addGold, addMaterial, updateHp, player.hp, handleExplore, isAutoAttacking, addLog, player.gameSpeed, player.skills]);

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

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
        {player.characterClass === CharacterClass.None && <ClassSelectionModal onSelect={selectClass} />}
        
        <aside className="w-20 md:w-64 glass-card border-r border-white/5 flex flex-col shrink-0 z-20">
            <div className="p-4 md:p-8 border-b border-white/5 bg-slate-900/40 text-center">
                <h1 className="hidden md:block text-2xl font-black bg-gradient-to-br from-cyan-400 to-purple-600 bg-clip-text text-transparent uppercase mb-6">THỢ RÈN VÔ TẬN</h1>
                <div className="bg-slate-950/40 p-4 rounded-3xl border border-white/5">
                    <div className="flex justify-between items-center mb-2 text-[10px] font-black uppercase">
                        <span>Lv.{player.level}</span>
                        <span className="text-purple-400">RB.{player.rebirthCount}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden mb-4">
                        <div className="h-full bg-cyan-500" style={{ width: `${(player.currentExp / player.maxExp) * 100}%` }}></div>
                    </div>
                    <button onClick={() => setShowStatsModal(true)} className="w-full py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black flex items-center justify-center gap-2">
                        <User size={14} /> <span className="hidden md:inline">Nhân Vật</span>
                    </button>
                </div>
            </div>

            <nav className="flex-1 p-3 space-y-2 overflow-y-auto">
                {[
                    { id: 'battle', label: 'Viễn Chinh', icon: Sword, color: 'text-cyan-400' },
                    { id: 'inventory', label: 'Hành Trang', icon: User, color: 'text-blue-400' },
                    { id: 'craft', label: 'Lò Rèn', icon: Hammer, color: 'text-purple-400' },
                    { id: 'skills', label: 'Bí Kỹ', icon: Zap, color: 'text-amber-400' },
                    { id: 'rebirth', label: 'Tái Sinh', icon: RefreshCw, color: 'text-rose-400' },
                    { id: 'wiki', label: 'Cổ Thư', icon: Book, color: 'text-slate-400' },
                    { id: 'settings', label: 'Cài Đặt', icon: Settings, color: 'text-slate-500' },
                ].map(item => (
                    <button key={item.id} onClick={() => setActiveTab(item.id as any)} className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all ${activeTab === item.id ? 'bg-white/10 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>
                        <item.icon size={22} className={activeTab === item.id ? item.color : 'text-slate-600'} />
                        <span className="hidden md:inline font-bold text-xs uppercase tracking-widest">{item.label}</span>
                    </button>
                ))}
            </nav>
        </aside>

        <main className="flex-1 flex flex-col overflow-hidden relative">
            <header className="h-20 glass-card border-b border-white/5 flex items-center justify-between px-10 backdrop-blur-3xl z-10">
                <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Đang Truy Cập</span>
                    <span className="text-xl font-black text-white uppercase">{activeTab === 'battle' ? 'Chiến Trường' : activeTab}</span>
                </div>
                
                <div className="flex gap-6 items-center">
                    <div className="hidden md:flex items-center bg-slate-900 rounded-full px-4 py-2 border border-slate-800 gap-3">
                        <FastForward size={16} className="text-cyan-400" />
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map(s => (
                                <button key={s} onClick={() => setGameSpeed(s)} className={`w-6 h-6 rounded-full text-[10px] font-black ${player.gameSpeed === s ? 'bg-cyan-500 text-slate-950' : 'text-slate-500'}`}>{s}x</button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-black text-slate-500 uppercase">Ngân Lượng</span>
                        <div className="text-lg font-black text-amber-400">{formatNumber(player.gold)}</div>
                    </div>
                </div>
            </header>

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
                        onCraft={(bp, overheat) => {
                            consumeMaterials(bp.requiredMaterials);
                            const evolBonus = (player.blueprintLevels[bp.id] || 0) * 0.25;
                            const memoryBonus = bp.name.includes("Kế Thừa") ? player.memoryGemPotential : 0;
                            const finalRarity = rollRarity((player.skills['gen_luck'] || 0) * 0.01 + (overheat ? 0.2 : 0));
                            
                            let talent;
                            if (finalRarity === Rarity.Legendary || finalRarity === Rarity.Mythic || finalRarity === Rarity.Cosmic) {
                                talent = EQUIPMENT_TALENTS[randomInt(0, EQUIPMENT_TALENTS.length - 1)];
                            }

                            const item: Equipment = {
                                id: generateId(),
                                name: bp.name + (player.blueprintLevels[bp.id] ? ` (+${player.blueprintLevels[bp.id]})` : ""),
                                type: bp.resultType as EquipmentType,
                                rarity: finalRarity,
                                stats: {
                                    attack: bp.baseStats.maxAtk ? Math.floor(bp.baseStats.maxAtk * (1 + evolBonus) + memoryBonus) : 0,
                                    defense: bp.baseStats.maxDef ? Math.floor(bp.baseStats.maxDef * (1 + evolBonus)) : 0
                                },
                                value: 100, isEquipped: false, sockets: 1, socketedGems: [], talent
                            };
                            addEquipment(item);
                        }} 
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
                    <div className="p-10 flex flex-col items-center gap-4">
                        <Card className="max-w-md w-full p-8 border-slate-800 text-center">
                            <h3 className="text-xl font-black mb-6 text-cyan-400">HỆ THỐNG LƯU TRỮ</h3>
                            <div className="grid grid-cols-1 gap-4">
                                <Button fullWidth onClick={saveGame} className="gap-2 bg-blue-600"><Save size={16}/> Lưu Game</Button>
                                <Button fullWidth variant="outline" onClick={loadGame} className="gap-2"><FolderDown size={16}/> Tải Game</Button>
                                <Button fullWidth variant="danger" onClick={() => { localStorage.clear(); window.location.reload(); }} className="gap-2"><Trash2 size={16}/> Xóa Dữ Liệu</Button>
                            </div>
                        </Card>
                    </div>
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
