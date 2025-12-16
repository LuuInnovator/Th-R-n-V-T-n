import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Zone, Enemy, Blueprint, EquipmentType, Equipment } from './types';
import { ZONES, ENEMIES_DB, INITIAL_BLUEPRINTS, RARITY_MULTIPLIER } from './constants';
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
import { User, Shield, Sword, Hammer, RefreshCw, Save, Upload } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'battle' | 'craft' | 'inventory' | 'rebirth'>('battle');
  
  // Game State Hooks
  const { logs, addLog, clearLogs } = useGameLog();
  const { player, setPlayer, gainExp, updateHp, addGold, rebirth, setFullHp } = usePlayer(addLog);
  const { 
    materials, equipments, equipped, 
    addMaterial, consumeMaterials, addEquipment, removeEquipment, equipItem, resetInventory, loadInventory 
  } = useInventory(addLog);

  // Local State
  const [currentZone, setCurrentZone] = useState<Zone>(ZONES[0]);
  const [currentEnemy, setCurrentEnemy] = useState<Enemy | null>(null);
  const [isAutoAttacking, setIsAutoAttacking] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // --- ACTIONS ---

  const handleExplore = useCallback(() => {
    const enemiesInZone = ENEMIES_DB[currentZone.id];
    if (enemiesInZone && enemiesInZone.length > 0) {
      const randIdx = randomInt(0, enemiesInZone.length - 1);
      setCurrentEnemy({ ...enemiesInZone[randIdx] });
      addLog(`⚔️ Bạn đã tìm thấy ${enemiesInZone[randIdx].name}!`);
    } else {
      addLog("Khu vực này có vẻ trống trải...");
      setIsAutoAttacking(false); // Dừng auto nếu không có quái
    }
  }, [currentZone.id, addLog]);

  const handleAttack = useCallback(() => {
    if (!currentEnemy) return;

    // Player Attack
    const weaponAtk = equipped[EquipmentType.Weapon]?.stats.attack || 0;
    const armorAtk = equipped[EquipmentType.Armor]?.stats.attack || 0;
    const totalAtk = player.attack + weaponAtk + armorAtk;
    
    // Critical hit chance (base 5%)
    const isCrit = Math.random() < 0.05;
    const finalDmg = Math.max(1, Math.floor((totalAtk - currentEnemy.defense) * (isCrit ? 1.5 : 1)));
    
    let newEnemyHp = currentEnemy.hp - finalDmg;
    addLog(`Bạn chém ${currentEnemy.name} gây ${finalDmg} sát thương! ${isCrit ? '(CHÍ MẠNG!)' : ''}`);

    if (newEnemyHp <= 0) {
      // Victory
      addLog(`💀 Đã tiêu diệt ${currentEnemy.name}!`);
      addLog(`+${currentEnemy.expReward} EXP, +${currentEnemy.goldReward} Vàng`);
      
      gainExp(currentEnemy.expReward);
      addGold(currentEnemy.goldReward);
      
      // Drops
      currentEnemy.dropTable.forEach(drop => {
        if (Math.random() <= drop.chance) {
          const qty = randomInt(drop.minQty, drop.maxQty);
          const rarityBonus = player.rebirthCount * 0.05; 
          addMaterial(drop.materialType, qty, rollRarity(rarityBonus));
        }
      });

      setCurrentEnemy(null);
      // Logic Auto sẽ tiếp tục ở useEffect
    } else {
      // Enemy Counter-attack
      const armorDef = equipped[EquipmentType.Armor]?.stats.defense || 0;
      const weaponDef = equipped[EquipmentType.Weapon]?.stats.defense || 0;
      const totalDef = player.defense + armorDef + weaponDef;
      
      const dmgToPlayer = Math.max(1, currentEnemy.attack - totalDef);
      const newPlayerHp = player.hp - dmgToPlayer;
      
      updateHp(newPlayerHp);
      addLog(`${currentEnemy.name} phản đòn gây ${dmgToPlayer} sát thương!`);
      
      setCurrentEnemy({ ...currentEnemy, hp: newEnemyHp });

      if (newPlayerHp <= 0) {
        addLog("☠️ BẠN ĐÃ BỊ ĐÁNH BẠI! Hồi sinh tại thị trấn...");
        setFullHp();
        setCurrentEnemy(null);
        setIsAutoAttacking(false); // Tắt auto khi chết
      }
    }
  }, [currentEnemy, player, equipped, addLog, gainExp, addGold, addMaterial, updateHp, setFullHp]);

  // --- AUTOMATION & SAVE SYSTEM ---

  // 1. Auto Loop Logic (Find -> Fight -> Find)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    if (isAutoAttacking && player.hp > 0) {
      if (currentEnemy) {
        // Có quái -> Đánh
        timer = setTimeout(() => {
          handleAttack();
        }, 1000); // Tốc độ đánh
      } else {
        // Không có quái -> Tìm
        timer = setTimeout(() => {
          handleExplore();
        }, 1500); // Tốc độ tìm quái
      }
    }

    return () => clearTimeout(timer);
  }, [isAutoAttacking, currentEnemy, player.hp, handleAttack, handleExplore]);

  // 2. Save Game Function (Local Storage)
  const saveGame = useCallback(() => {
    const saveData = {
      player,
      materials,
      equipments,
      equipped,
      currentZoneId: currentZone.id,
      timestamp: Date.now()
    };
    localStorage.setItem('eternal_blacksmith_save', JSON.stringify(saveData));
    return saveData;
  }, [player, materials, equipments, equipped, currentZone.id]);

  // Helper to apply save data (used by both Load and Import)
  const applySaveData = (saveData: any) => {
      setPlayer(saveData.player);
      loadInventory(saveData.materials, saveData.equipments, saveData.equipped);
      const savedZone = ZONES.find(z => z.id === saveData.currentZoneId);
      if (savedZone) setCurrentZone(savedZone);
      setIsAutoAttacking(false);
      setCurrentEnemy(null);
      clearLogs();
  };

  // 3. Export to File (and Save Local)
  const handleSaveAndExport = () => {
    const saveData = saveGame(); // Save to local first
    addLog("💾 Đã lưu dữ liệu!");

    // Then export to file
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(saveData));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `VuaThoRen_Save_Lv${player.level}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  // 4. Import from File
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

  // 5. Auto Save Interval (30s)
  useEffect(() => {
    const autoSaveTimer = setInterval(() => {
      saveGame();
    }, 30000);
    return () => clearInterval(autoSaveTimer);
  }, [saveGame]);


  // --- HANDLERS ---
  const handleCraft = (bp: Blueprint) => {
    consumeMaterials(bp.requiredMaterials);

    const rarity = rollRarity(player.rebirthCount * 0.1); 
    const multiplier = RARITY_MULTIPLIER[rarity];
    
    const atkBase = bp.baseStats.maxAtk > 0 ? randomInt(bp.baseStats.minAtk, bp.baseStats.maxAtk) : 0;
    const defBase = bp.baseStats.maxDef > 0 ? randomInt(bp.baseStats.minDef, bp.baseStats.maxDef) : 0;

    const finalAtk = Math.floor(atkBase * multiplier);
    const finalDef = Math.floor(defBase * multiplier);

    const newItem = {
      id: generateId(),
      name: `${bp.name} ${rarity}`,
      type: bp.resultType,
      rarity: rarity,
      isEquipped: false,
      value: (finalAtk + finalDef) * 10,
      stats: { attack: finalAtk, defense: finalDef }
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
    
    rebirth(earnedPoints);
    resetInventory();
    clearLogs();
    setCurrentEnemy(null);
    setCurrentZone(ZONES[0]);
    setIsAutoAttacking(false);
    saveGame(); 

    addLog(`✨ TÁI SINH THÀNH CÔNG! Nhận ${earnedPoints} Điểm Vĩnh Cửu.`);
    setActiveTab('battle');
  };

  // --- UI COMPONENTS ---
  const SidebarButton = ({ id, icon: Icon, label, colorClass = "text-slate-400" }: any) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group relative overflow-hidden ${
        activeTab === id 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' 
        : 'hover:bg-slate-800 ' + colorClass
      }`}
    >
      <div className={`relative z-10 flex items-center gap-3`}>
        <Icon size={20} className={activeTab === id ? 'animate-pulse' : ''} />
        <span className="font-bold">{label}</span>
      </div>
      {activeTab === id && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 animate-slide-up" />
      )}
    </button>
  );

  return (
    <div className="flex h-screen overflow-hidden backdrop-blur-sm">
      {/* SIDEBAR */}
      <aside className="w-72 bg-slate-950/90 border-r border-slate-800 flex flex-col z-20 shadow-2xl">
        <div className="p-6 border-b border-slate-800/50 bg-gradient-to-b from-slate-900 to-slate-950">
          <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-orange-400 to-red-500 mb-6 drop-shadow-sm">
            THỢ RÈN VÔ TẬN
          </h1>
          
          <div className="space-y-4">
            <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">LV.{player.level}</span>
                    <span className="text-slate-500">{player.currentExp}/{player.maxExp} EXP</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full transition-all duration-500" style={{ width: `${(player.currentExp / player.maxExp) * 100}%` }}></div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-slate-900/50 p-2 rounded border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-500 uppercase">HP</div>
                    <div className="font-bold text-red-400">{player.hp}</div>
                </div>
                <div className="bg-slate-900/50 p-2 rounded border border-slate-800 text-center">
                    <div className="text-[10px] text-slate-500 uppercase">Vàng</div>
                    <div className="font-bold text-yellow-400">{formatNumber(player.gold)}</div>
                </div>
            </div>
             <div className="bg-purple-900/20 p-2 rounded border border-purple-500/20 text-center">
                <div className="text-[10px] text-purple-400 uppercase tracking-widest">Điểm Vĩnh Cửu</div>
                <div className="font-bold text-purple-300 text-lg">{formatNumber(player.eternalPoints)}</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <SidebarButton id="battle" icon={Sword} label="Chiến Đấu" />
          <SidebarButton id="inventory" icon={User} label="Túi Đồ" />
          <SidebarButton id="craft" icon={Hammer} label="Chế Tạo" />
          <div className="my-4 border-t border-slate-800/50 mx-2"></div>
          <SidebarButton id="rebirth" icon={RefreshCw} label="Tái Sinh" colorClass="text-purple-400 hover:text-purple-300" />
        </nav>

        <div className="p-4 text-[10px] text-slate-600 text-center border-t border-slate-800 bg-slate-950">
          Eternal Blacksmith v1.1.7
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-hidden relative z-10">
        <header className="bg-slate-900/80 backdrop-blur-md p-4 border-b border-white/5 flex justify-between items-center sticky top-0 z-30">
          <h2 className="text-lg font-bold text-slate-200 tracking-wide flex items-center gap-2">
            {activeTab === 'battle' && <><span className="text-blue-500">◈</span> THÁM HIỂM</>}
            {activeTab === 'inventory' && <><span className="text-green-500">◈</span> KHO ĐỒ</>}
            {activeTab === 'craft' && <><span className="text-amber-500">◈</span> XƯỞNG RÈN</>}
            {activeTab === 'rebirth' && <><span className="text-purple-500">◈</span> CỔNG TÁI SINH</>}
          </h2>

          {/* New Save/Load Design */}
          <div className="flex items-center bg-slate-800/80 p-1 rounded-lg border border-slate-700 backdrop-blur-sm">
            <button 
                onClick={handleSaveAndExport}
                className="flex items-center gap-2 px-4 py-1.5 text-sm font-bold text-slate-200 hover:text-white hover:bg-slate-700 rounded transition-colors"
                title="Lưu & Tải file về máy"
            >
                <Save size={16} /> Lưu
            </button>
            <div className="w-px h-5 bg-slate-600 mx-1"></div>
            <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-1.5 text-sm font-bold text-slate-200 hover:text-white hover:bg-slate-700 rounded transition-colors"
                title="Chọn file Save từ máy tính"
            >
                <Upload size={16} /> Tải
            </button>
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleImportFile}
              accept=".json"
              className="hidden" 
            />
          </div>
        </header>

        <div className="flex-1 overflow-hidden relative">
          {activeTab === 'battle' && (
            <BattleView 
              zones={ZONES}
              activeZone={currentZone}
              onSelectZone={setCurrentZone}
              player={player}
              currentEnemy={currentEnemy}
              onExplore={handleExplore}
              onAttack={handleAttack}
              logs={logs}
              onClearLogs={clearLogs}
              isAutoAttacking={isAutoAttacking}
              onToggleAutoAttack={() => setIsAutoAttacking(!isAutoAttacking)}
            />
          )}
          
          {activeTab === 'inventory' && (
            <InventoryView 
              materials={materials}
              equipments={equipments}
              equipped={equipped}
              onEquip={equipItem}
              onSell={handleSell}
            />
          )}

          {activeTab === 'craft' && (
            <CraftingView 
              blueprints={INITIAL_BLUEPRINTS}
              materials={materials}
              onCraft={handleCraft}
              craftingSkill={1 + player.rebirthCount}
            />
          )}

          {activeTab === 'rebirth' && (
            <RebirthView 
              player={player}
              onRebirth={handleRebirth}
              canRebirth={player.level >= 50}
            />
          )}
        </div>
      </main>
    </div>
  );
}