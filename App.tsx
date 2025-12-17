
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Rarity, EquipmentType, ElementType, MaterialType, Blueprint, CharacterClass, Equipment, Zone, Enemy, MutationType, MonsterAbility } from './types';
import { ZONES, ENEMIES_DB, INITIAL_BLUEPRINTS, RARITY_MULTIPLIER } from './constants';
import { generateId, randomInt, formatNumber } from './utils';

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

import { Sword, User, Hammer, Zap, RefreshCw, Book, Store, Save, Plus, Sparkles, Heart, Ghost, Skull } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'battle' | 'inventory' | 'craft' | 'skills' | 'rebirth' | 'guild' | 'wiki' | 'settings'>('battle');
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [activeZone, setActiveZone] = useState<Zone>(ZONES[0]);
  const [currentEnemy, setCurrentEnemy] = useState<Enemy | null>(null);
  const [isAutoAttacking, setIsAutoAttacking] = useState(false);

  const { addLog, logs, clearLogs } = useGameLog();
  const { player, setPlayer, gainExp, updateHp, rebirth, buyEternalUpgrade, getStatMultiplier, selectClass, allocateStat, resetStats, addGold, upgradeSkill } = usePlayer(addLog);
  const { materials, equipments, equipped, addMaterial, consumeMaterials, addEquipment, removeEquipment, equipItem } = useInventory(addLog);

  const calculatedStats = useMemo(() => calculatePlayerStats(player, equipped, getStatMultiplier), [player, equipped, getStatMultiplier]);

  const handleExplore = useCallback(() => {
    // Lọc quái vật theo Zone hiện tại
    const zoneEnemies = ENEMIES_DB[activeZone.id] || [];
    if (zoneEnemies.length === 0) return;

    const base = zoneEnemies[randomInt(0, zoneEnemies.length - 1)];
    let enemy: Enemy = { ...base };

    // --- LOGIC TIẾN HÓA THEO REBIRTH ---
    let statsMult = 1.0;
    let namePrefix = "";
    
    // RB 1+: Hệ thống hậu tố (+20% Stats)
    if (player.rebirthCount >= 1) {
        statsMult *= 1.2;
        const suffixes = ["Rực Lửa", "Độc Tố", "Cuồng Nộ", "Nhanh Nhẹn"];
        const suffix = suffixes[randomInt(0, suffixes.length - 1)];
        namePrefix = `[${suffix}] `;
        if (suffix === "Rực Lửa") enemy.element = ElementType.Fire;
        if (suffix === "Độc Tố") enemy.element = ElementType.Acid;
    }

    // RB 3+: Thủ lĩnh Elite (5% chance)
    if (player.rebirthCount >= 3 && Math.random() < 0.05) {
        statsMult *= 3.0;
        namePrefix = "👑 THỦ LĨNH: " + namePrefix;
        enemy.isBoss = true;
        enemy.abilities = [...(enemy.abilities || []), MonsterAbility.ArmorBreak];
        addLog(`⚠️ CẢNH BÁO: Một quái vật Thủ Lĩnh khổng lồ đã xuất hiện!`);
    }

    // RB 5+: Mirror World (Đảo ngược chỉ số nếu ở map z6)
    if (player.rebirthCount >= 5 && activeZone.id === 'z6') {
        namePrefix = "🌀 [ĐẢO NGƯỢC] " + namePrefix;
        // Logic Mirror: Quái càng lv thấp ở map này càng mạnh
        statsMult *= (100 / (enemy.level || 1)) * 0.5;
    }

    // Áp dụng các chỉ số sau tiến hóa
    enemy.maxHp = Math.floor(enemy.maxHp * statsMult);
    enemy.hp = enemy.maxHp;
    enemy.attack = Math.floor(enemy.attack * statsMult);
    enemy.defense = Math.floor(enemy.defense * statsMult);
    enemy.name = namePrefix + enemy.name;
    
    // Drop rate tăng theo Rebirth
    enemy.expReward = Math.floor(enemy.expReward * (1 + player.rebirthCount * 0.5));
    enemy.goldReward = Math.floor(enemy.goldReward * (1 + player.rebirthCount * 0.3));

    setCurrentEnemy(enemy);
    addLog(`🔍 Bạn bắt gặp ${enemy.name} (Lv.${enemy.level})!`);
  }, [activeZone, addLog, player.rebirthCount]);

  const handleAttack = useCallback(() => {
    if (!currentEnemy) return;

    // RB 10 check: Quái Vô Định chỉ nhận sát thương từ vũ khí Hư Không
    if (currentEnemy.mutation === MutationType.Void) {
        const weapon = equipped[EquipmentType.Weapon];
        if (!weapon || !weapon.name.includes("Hư Không")) {
            addLog("❌ VÔ HIỆU: Vũ khí thường không thể chạm vào thực thể Vô Định!");
            updateHp(player.hp - currentEnemy.attack);
            return;
        }
    }

    const playerDamage = Math.max(1, calculatedStats.totalAtk - currentEnemy.defense);
    const isCrit = Math.random() < (calculatedStats.critChance / 100);
    const finalDamage = isCrit ? Math.floor(playerDamage * (calculatedStats.critDamage / 100)) : playerDamage;
    
    const newEnemyHp = Math.max(0, currentEnemy.hp - finalDamage);
    
    if (newEnemyHp <= 0) {
      addLog(`⚔️ [HẠ GỤC] ${currentEnemy.name} đã tan biến!`);
      gainExp(currentEnemy.expReward);
      addGold(currentEnemy.goldReward);
      
      // Hồi máu hoàn toàn
      updateHp(calculatedStats.totalHp);
      addLog(`💚 Linh hồn thợ rèn được gột rửa: Hồi phục hoàn toàn!`);

      // Drop items
      currentEnemy.dropTable.forEach(drop => {
        if (Math.random() < (drop.chance + calculatedStats.dropRateBonus)) {
          addMaterial(drop.materialType, randomInt(drop.minQty, drop.maxQty));
        }
      });
      setCurrentEnemy(null);
      if (isAutoAttacking) setTimeout(handleExplore, 500);
    } else {
      let enemyDamage = Math.max(1, currentEnemy.attack - calculatedStats.totalDef);
      setCurrentEnemy({ ...currentEnemy, hp: newEnemyHp });

      const newPlayerHp = Math.max(0, player.hp - enemyDamage);
      
      if (newPlayerHp <= 0) {
        addLog(`💀 [GỤC NGÃ] Sức mạnh của ${currentEnemy.name} quá lớn...`);
        updateHp(calculatedStats.totalHp);
        addLog(`✨ Phép màu thợ rèn: Bạn được hồi sinh để rèn luyện thêm!`);
        setCurrentEnemy(null);
        setIsAutoAttacking(false);
      } else {
        updateHp(newPlayerHp);
      }
    }
  }, [currentEnemy, calculatedStats, gainExp, addGold, addMaterial, updateHp, player.hp, handleExplore, isAutoAttacking, addLog, equipped]);

  useEffect(() => {
    let interval: any;
    if (isAutoAttacking && currentEnemy) {
      interval = setInterval(handleAttack, 1000 - (calculatedStats.cooldownReduction * 1000));
    } else if (isAutoAttacking && !currentEnemy) {
      handleExplore();
    }
    return () => clearInterval(interval);
  }, [isAutoAttacking, currentEnemy, handleAttack, handleExplore, calculatedStats.cooldownReduction]);

  // Lọc khu vực hiển thị dựa trên mốc Rebirth
  const availableZones = useMemo(() => {
      return ZONES.filter(z => {
          if (z.id === 'z5') return player.rebirthCount >= 1;
          if (z.id === 'z6') return player.rebirthCount >= 5;
          if (z.id === 'z7') return player.rebirthCount >= 10;
          return true;
      });
  }, [player.rebirthCount]);

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
        {player.characterClass === CharacterClass.None && <ClassSelectionModal onSelect={selectClass} />}
        
        {/* Sidebar */}
        <aside className="w-20 md:w-64 glass-card border-r border-slate-800 flex flex-col shrink-0 z-20 shadow-2xl">
            <div className="p-4 md:p-8 border-b border-slate-800/50 bg-slate-900/40 text-center">
                <h1 className="hidden md:block text-2xl font-black bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent uppercase tracking-tighter mb-6">THỢ RÈN VÔ TẬN</h1>
                <div className="bg-slate-950/40 p-4 rounded-3xl border border-white/5 shadow-inner">
                    <div className="flex justify-between items-center mb-2 px-1 text-[10px] font-black uppercase tracking-widest">
                        <span className="text-slate-500">Lv.{player.level}</span>
                        <span className="text-purple-400">RB.{player.rebirthCount}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden mb-4 border border-white/5">
                        <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_12px_rgba(6,182,212,0.6)] transition-all duration-700" style={{ width: `${(player.currentExp / player.maxExp) * 100}%` }}></div>
                    </div>
                    <button onClick={() => setShowStatsModal(true)} className="w-full py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-black uppercase flex items-center justify-center gap-2 transition-all group">
                        <Plus size={14} className="group-hover:rotate-90 transition-transform" /> <span className="hidden md:inline">Xem Chỉ Số</span>
                    </button>
                </div>
            </div>

            <nav className="flex-1 p-3 space-y-2 overflow-y-auto scrollbar-hide">
                {[
                    { id: 'battle', label: 'Viễn Chinh', icon: Sword, color: 'text-cyan-400' },
                    { id: 'inventory', label: 'Hành Trang', icon: User, color: 'text-blue-400' },
                    { id: 'craft', label: 'Lò Rèn Cổ', icon: Hammer, color: 'text-purple-400' },
                    { id: 'skills', label: 'Bí Kỹ', icon: Zap, color: 'text-amber-400' },
                    { id: 'guild', label: 'Thương Hội', icon: Store, color: 'text-emerald-400' },
                    { id: 'rebirth', label: 'Tái Sinh', icon: RefreshCw, color: 'text-rose-400' },
                    { id: 'wiki', label: 'Cổ Thư', icon: Book, color: 'text-slate-400' },
                ].map(item => (
                    <button key={item.id} onClick={() => setActiveTab(item.id as any)} className={`w-full flex items-center justify-center md:justify-start gap-4 px-4 py-4 rounded-2xl transition-all duration-300 relative group ${activeTab === item.id ? 'bg-white/10 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>
                        {activeTab === item.id && <div className="absolute left-0 top-2 bottom-2 w-1 bg-cyan-500 rounded-full shadow-[0_0_10px_#06b6d4]"></div>}
                        <item.icon size={22} className={activeTab === item.id ? item.color : 'text-slate-600 group-hover:text-slate-400'} />
                        <span className="hidden md:inline font-bold text-xs uppercase tracking-widest">{item.label}</span>
                    </button>
                ))}
            </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
            <header className="h-20 glass-card border-b border-white/5 flex items-center justify-between px-10 backdrop-blur-3xl z-10 shrink-0">
                <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Trạng Thái</span>
                    <span className="text-xl font-black text-white uppercase tracking-tighter">{activeTab}</span>
                </div>
                
                <div className="flex gap-10 items-center">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Sinh Lực</span>
                        <div className="text-lg font-black text-rose-500 flex items-center gap-2 drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]">
                            <Heart size={18} fill="currentColor" /> {formatNumber(player.hp)}
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Vàng</span>
                        <div className="text-lg font-black text-amber-400 flex items-center gap-2">
                            <Store size={18} className="text-amber-500" /> {formatNumber(player.gold)}
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex-1 overflow-hidden relative">
                {activeTab === 'battle' && (
                    <BattleView 
                        zones={availableZones} activeZone={activeZone} onSelectZone={setActiveZone} 
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
                    <CraftingView blueprints={INITIAL_BLUEPRINTS} materials={materials} onCraft={() => {}} craftingSkill={1} />
                )}
                {activeTab === 'skills' && <SkillTreeView player={player} onUpgrade={upgradeSkill} />}
                {activeTab === 'rebirth' && <RebirthView player={player} onRebirth={() => rebirth(player.level * 10)} canRebirth={player.level >= 50} onBuyUpgrade={buyEternalUpgrade} />}
                {activeTab === 'guild' && <GuildView player={player} />}
                {activeTab === 'wiki' && <WikiView zones={ZONES} blueprints={INITIAL_BLUEPRINTS} />}
                
                {activeTab === 'settings' && (
                    <div className="p-10 flex flex-col items-center">
                        <Card className="max-w-md w-full p-8 border-green-500/20">
                            <h3 className="text-xl font-black mb-6 flex items-center gap-3 text-green-400"><Save/> Lưu Trữ Ký Ức</h3>
                            <Button fullWidth onClick={() => addLog("💾 Đã lưu dữ liệu vĩnh hằng!")}>Lưu Game</Button>
                        </Card>
                    </div>
                )}
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
