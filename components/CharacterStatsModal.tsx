import React from 'react';
import { Player, Equipment, EquipmentType, SetId, ElementType, EternalUpgradeId, GemType, EnchantmentType } from '../types';
import { SETS, GEM_STATS, ENCHANT_STATS } from '../constants';
import { X, Shield, Sword, Zap, Activity, Flame, Snowflake } from 'lucide-react';
import { Button } from './Button';
import { formatNumber } from '../utils';

interface CharacterStatsModalProps {
  player: Player;
  equipped: Record<EquipmentType, Equipment | null>;
  onClose: () => void;
  getStatMultiplier: (base: number) => number;
}

export const CharacterStatsModal: React.FC<CharacterStatsModalProps> = ({ 
  player, 
  equipped, 
  onClose,
  getStatMultiplier
}) => {
  // --- TÍNH TOÁN CHỈ SỐ ---
  let totalAtk = getStatMultiplier(player.attack);
  let totalDef = getStatMultiplier(player.defense);
  let totalHp = getStatMultiplier(player.maxHp);
  
  // 1. Từ Trang bị (Tính cả Ngọc & Phù phép)
  let weaponElement = ElementType.Physical;
  
  Object.values(equipped).forEach(item => {
    if(item) {
        // FIX: Sử dụng ?. để tránh lỗi nếu stats bị thiếu trong dữ liệu cũ
        let itemAtk = item.stats?.attack || 0;
        let itemDef = item.stats?.defense || 0;

        // FIX: Gán vào biến const để TypeScript hiểu đã kiểm tra undefined
        const enchantment = item.enchantment;

        // Xử lý Phù phép (Enchantment)
        if (enchantment && ENCHANT_STATS[enchantment]) {
            if (enchantment === EnchantmentType.Sharpness) {
                 const bonus = ENCHANT_STATS[enchantment].multAtk || 0;
                 itemAtk *= (1 + bonus);
            }
            if (enchantment === EnchantmentType.Protection) {
                 const bonus = ENCHANT_STATS[enchantment].multDef || 0;
                 itemDef *= (1 + bonus);
            }
        }

        totalAtk += Math.floor(itemAtk);
        totalDef += Math.floor(itemDef);

        // Xử lý Ngọc (Gems)
        // FIX: Sử dụng ?. để an toàn nếu mảng gem chưa khởi tạo
        if (item.socketedGems && item.socketedGems.length > 0) {
            item.socketedGems.forEach(gem => {
                const stats = GEM_STATS[gem.type]?.[gem.tier] || 0;
                if (gem.type === GemType.Ruby) totalAtk += stats;
                if (gem.type === GemType.Sapphire) totalDef += stats;
                if (gem.type === GemType.Topaz) totalHp += stats;
            });
        }

        // Xác định hệ nguyên tố vũ khí
        if (item.type === EquipmentType.Weapon && item.element) {
            weaponElement = item.element;
        }
    }
  });

  // 2. Từ Kỹ năng
  const weaponMastery = player.skills['wp_mastery'] || 0;
  const armorMastery = player.skills['ar_mastery'] || 0;
  const critSkill = player.skills['wp_crit'] || 0;
  
  totalAtk += weaponMastery * 2;
  totalDef += armorMastery * 2;

  // 3. Từ Set đồ
  const activeSets: Record<SetId, number> = {} as any;
  Object.values(equipped).forEach(item => {
    if (item && item.setId) activeSets[item.setId] = (activeSets[item.setId] || 0) + 1;
  });

  // Infinity Chrono Bonus (Time Lord) - Mock logic giống BattleView
  if ((activeSets[SetId.InfinityChrono] || 0) >= 6) {
      totalAtk = Math.floor(totalAtk * 1.05); // +5% mock
  }

  const primalHunterCount = activeSets[SetId.PrimalHunter] || 0;
  const forgeSpiritCount = activeSets[SetId.ForgeSpirit] || 0;
  const dragonfireCount = activeSets[SetId.DragonfireKeeper] || 0;

  // -- CHỈ SỐ PHỤ --
  // Crit Chance (Cơ bản 5% + Skill + Set)
  let critChance = 5 + critSkill; 
  if (primalHunterCount >= 6) critChance += 30; // Set effect

  // Crit Damage (Cơ bản 150%)
  let critDamage = 150; 
  if (primalHunterCount >= 6) critDamage += 30;

  // Damage Bonus vs Boss
  let bossDmgBonus = 0;
  if (primalHunterCount >= 2) bossDmgBonus += 15;

  // Defense Ignore
  let defIgnore = 0;
  if (forgeSpiritCount >= 4) defIgnore += 20;

  // Elemental Resist
  let fireResist = 0;
  if (dragonfireCount >= 2) fireResist += 30;

  // Thêm chỉ số từ Thiên phú Latent Power
  const latentPowerLevel = player.eternalUpgrades[EternalUpgradeId.LatentPower] || 0;
  const latentBonus = latentPowerLevel * 5;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in safe-area-bottom">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-950 flex justify-between items-center sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
              <Activity className="text-blue-500" /> Hồ Sơ Thợ Rèn
            </h2>
            <div className="text-slate-400 text-sm">Cấp {player.level} • {player.rebirthCount} lần Tái sinh</div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
            <X size={24} className="text-slate-400 hover:text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          
          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-red-900/20 p-4 rounded-xl border border-red-500/30 flex flex-col items-center justify-center text-center">
               <Sword className="text-red-400 mb-2" size={28} />
               <div className="text-slate-400 text-xs uppercase tracking-widest font-bold">Tấn Công</div>
               <div className="text-2xl font-black text-red-200">{formatNumber(totalAtk)}</div>
               <div className="text-[10px] text-red-400/70 mt-1">
                 (Hệ: {weaponElement === ElementType.Physical ? 'Vật Lý' : weaponElement === ElementType.Fire ? 'Lửa' : weaponElement === ElementType.Ice ? 'Băng' : 'Sét'})
               </div>
            </div>

            <div className="bg-blue-900/20 p-4 rounded-xl border border-blue-500/30 flex flex-col items-center justify-center text-center">
               <Shield className="text-blue-400 mb-2" size={28} />
               <div className="text-slate-400 text-xs uppercase tracking-widest font-bold">Phòng Thủ</div>
               <div className="text-2xl font-black text-blue-200">{formatNumber(totalDef)}</div>
               <div className="text-[10px] text-blue-400/70 mt-1">Giảm sát thương vật lý</div>
            </div>

            <div className="bg-green-900/20 p-4 rounded-xl border border-green-500/30 flex flex-col items-center justify-center text-center">
               <Activity className="text-green-400 mb-2" size={28} />
               <div className="text-slate-400 text-xs uppercase tracking-widest font-bold">Sinh Lực (HP)</div>
               <div className="text-2xl font-black text-green-200">{formatNumber(totalHp)}</div>
            </div>
          </div>

          {/* Detailed Stats */}
          <div>
            <h3 className="text-lg font-bold text-amber-500 mb-4 border-b border-slate-800 pb-2">Chỉ Số Chiến Đấu</h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                <div className="flex justify-between items-center border-b border-slate-800/50 pb-2">
                    <span className="text-slate-400 flex items-center gap-2"><Zap size={14} /> Tỷ lệ Chí Mạng</span>
                    <span className="font-bold text-yellow-400">{critChance}%</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-800/50 pb-2">
                    <span className="text-slate-400">Sát thương Chí Mạng</span>
                    <span className="font-bold text-yellow-400">{critDamage}%</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-800/50 pb-2">
                    <span className="text-slate-400">Sát thương lên Boss</span>
                    <span className="font-bold text-purple-400">+{bossDmgBonus}%</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-800/50 pb-2">
                    <span className="text-slate-400">Xuyên Giáp</span>
                    <span className="font-bold text-purple-400">{defIgnore}%</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-800/50 pb-2">
                    <span className="text-slate-400 flex items-center gap-2"><Flame size={14} /> Kháng Lửa</span>
                    <span className="font-bold text-red-400">{fireResist}%</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-800/50 pb-2">
                    <span className="text-slate-400 flex items-center gap-2"><Snowflake size={14} /> Kháng Băng</span>
                    <span className="font-bold text-blue-400">0%</span>
                </div>
            </div>
          </div>

           {/* Passive Bonus */}
           <div>
            <h3 className="text-lg font-bold text-purple-500 mb-4 border-b border-slate-800 pb-2">Nguồn Gốc Sức Mạnh</h3>
            <div className="space-y-2 text-sm text-slate-400">
                <div className="flex justify-between">
                    <span>Sức Mạnh Tiềm Ẩn (Thiên Phú):</span>
                    <span className="text-green-400 font-bold">+{latentBonus}% All Stats</span>
                </div>
                {/* Liệt kê các bộ đang kích hoạt */}
                {Object.keys(activeSets).length > 0 && (
                    <div className="mt-2 pt-2 border-t border-slate-800">
                        <div className="mb-1 text-slate-500 font-mono text-xs">BỘ TRANG BỊ ĐANG KÍCH HOẠT:</div>
                        {Object.keys(activeSets).map((setId) => {
                             const setInfo = SETS[setId as SetId];
                             return (
                                <div key={setId} className="text-yellow-500 font-bold">
                                    {setInfo ? setInfo.name : setId} ({activeSets[setId as SetId]}/6)
                                </div>
                             );
                        })}
                    </div>
                )}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50 flex justify-end">
            <Button variant="outline" onClick={onClose}>Đóng</Button>
        </div>
      </div>
    </div>
  );
};