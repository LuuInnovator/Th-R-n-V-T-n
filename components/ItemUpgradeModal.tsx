
import React, { useState } from 'react';
import { Equipment, GemType, GemTier, EnchantmentType, Player, MaterialType } from '../types';
import { GEM_STATS, ENCHANT_STATS } from '../constants';
import { Button } from './Button';
import { X, Hammer, Gem, Sparkles, ArrowRight, Trash2, Shield, Sword, Heart } from 'lucide-react';
import { Card } from './Card';

interface ItemUpgradeModalProps {
  item: Equipment;
  player: Player;
  onClose: () => void;
  onSocketGem: (gemKey: string) => void;
  onEnchant: (type: EnchantmentType) => void;
  onAddSocket: () => void; // Thêm lỗ (cần búa đục lỗ hoặc nguyên liệu - tạm thời free hoặc tốn vàng)
}

export const ItemUpgradeModal: React.FC<ItemUpgradeModalProps> = ({ 
    item, player, onClose, onSocketGem, onEnchant, onAddSocket 
}) => {
  const [tab, setTab] = useState<'socket' | 'enchant'>('socket');

  // Helper để lấy số lượng gem trong kho
  const getGemCount = (type: GemType, tier: GemTier) => {
      const key = `${type}_${tier}`;
      return player.gemInventory[key] || 0;
  };

  const gemIcons = {
      [GemType.Ruby]: Sword,
      [GemType.Sapphire]: Shield,
      [GemType.Topaz]: Heart
  };

  const gemColors = {
      [GemType.Ruby]: 'text-red-500',
      [GemType.Sapphire]: 'text-blue-500',
      [GemType.Topaz]: 'text-yellow-500'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-950 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-3">
             <div className="bg-slate-800 p-2 rounded-lg border border-slate-700">
                <Hammer size={24} className="text-amber-500" />
             </div>
             <div>
                <h2 className="text-xl font-bold text-slate-100">{item.name}</h2>
                <div className="text-xs text-slate-500 uppercase">Nâng cấp trang bị</div>
             </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
            <X size={24} className="text-slate-400 hover:text-white" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-800">
            <button 
                onClick={() => setTab('socket')}
                className={`flex-1 py-3 font-bold text-sm flex items-center justify-center gap-2 transition-colors ${tab === 'socket' ? 'bg-slate-800 text-blue-400 border-b-2 border-blue-500' : 'text-slate-500 hover:text-slate-300'}`}
            >
                <Gem size={16} /> KHẢM NGỌC ({item.socketedGems.length}/{item.sockets})
            </button>
            <button 
                onClick={() => setTab('enchant')}
                className={`flex-1 py-3 font-bold text-sm flex items-center justify-center gap-2 transition-colors ${tab === 'enchant' ? 'bg-slate-800 text-purple-400 border-b-2 border-purple-500' : 'text-slate-500 hover:text-slate-300'}`}
            >
                <Sparkles size={16} /> PHÙ PHÉP
            </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
            {tab === 'socket' && (
                <div className="space-y-6">
                    {/* Current Sockets */}
                    <div className="flex justify-center gap-4">
                        {Array.from({ length: 3 }).map((_, i) => {
                            const socketed = item.socketedGems[i];
                            const isLocked = i >= item.sockets;
                            
                            return (
                                <div key={i} className={`w-16 h-16 rounded-full border-2 flex items-center justify-center relative ${
                                    isLocked ? 'border-slate-700 bg-slate-800/50' : 
                                    socketed ? 'border-amber-500/50 bg-amber-900/10' : 'border-slate-600 border-dashed bg-slate-900'
                                }`}>
                                    {isLocked ? (
                                        <div className="text-slate-600 text-xs text-center px-1">Khóa</div>
                                    ) : socketed ? (
                                        <div className="flex flex-col items-center">
                                            {React.createElement(gemIcons[socketed.type], { size: 20, className: gemColors[socketed.type] })}
                                            <span className={`text-[10px] font-bold ${gemColors[socketed.type]}`}>T{socketed.tier}</span>
                                        </div>
                                    ) : (
                                        <div className="text-slate-600 text-xs">Trống</div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div className="text-center">
                         {item.sockets < 3 && (
                             <Button size="sm" onClick={onAddSocket} className="mx-auto bg-slate-700 hover:bg-slate-600">
                                 <Hammer size={14} /> Đục thêm lỗ (500 Vàng)
                             </Button>
                         )}
                    </div>

                    {/* Available Gems */}
                    <div>
                        <h3 className="font-bold text-slate-300 mb-3 border-b border-slate-700 pb-1">Ngọc Trong Kho</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                             {Object.values(GemType).map(type => (
                                 Object.values(GemTier).filter(t => typeof t === 'number').map(tier => {
                                     const count = getGemCount(type, tier as GemTier);
                                     if (count <= 0) return null;
                                     const statVal = GEM_STATS[type][tier as GemTier];
                                     const Icon = gemIcons[type];

                                     return (
                                         <div key={`${type}_${tier}`} className="flex items-center justify-between bg-slate-800 p-2 rounded border border-slate-700">
                                             <div className="flex items-center gap-2">
                                                 <Icon size={16} className={gemColors[type]} />
                                                 <div>
                                                     <div className={`text-xs font-bold ${gemColors[type]}`}>{type} T{tier}</div>
                                                     <div className="text-[10px] text-slate-400">
                                                         +{statVal} {type === GemType.Ruby ? 'ATK' : type === GemType.Sapphire ? 'DEF' : 'HP'}
                                                     </div>
                                                 </div>
                                             </div>
                                             <Button 
                                                size="xs" 
                                                disabled={item.socketedGems.length >= item.sockets}
                                                onClick={() => onSocketGem(`${type}_${tier}`)}
                                            >
                                                Khảm
                                            </Button>
                                         </div>
                                     );
                                 })
                             ))}
                             {Object.keys(player.gemInventory).length === 0 && (
                                 <div className="text-slate-500 text-sm italic col-span-2 text-center">Bạn không có ngọc nào.</div>
                             )}
                        </div>
                    </div>
                </div>
            )}

            {tab === 'enchant' && (
                <div className="space-y-6">
                    <div className="bg-purple-900/20 p-6 rounded-xl border border-purple-500/30 text-center">
                        <div className="text-slate-400 text-sm uppercase mb-2">Phù Phép Hiện Tại</div>
                        {item.enchantment ? (
                             <div>
                                 <div className="text-2xl font-bold text-purple-400 mb-1">{item.enchantment}</div>
                                 <div className="text-purple-300/70 text-sm">{ENCHANT_STATS[item.enchantment]?.desc}</div>
                             </div>
                        ) : (
                            <div className="text-slate-500 italic">Chưa có phù phép</div>
                        )}
                    </div>

                    <div>
                        <h3 className="font-bold text-slate-300 mb-3 border-b border-slate-700 pb-1">Chọn Phù Phép Mới</h3>
                        <div className="space-y-2">
                            {Object.values(EnchantmentType).filter(e => e !== EnchantmentType.None).map(ench => (
                                <button 
                                    key={ench}
                                    onClick={() => onEnchant(ench)}
                                    className="w-full flex items-center justify-between bg-slate-800 hover:bg-slate-700 p-3 rounded-lg border border-slate-700 transition-colors group"
                                >
                                    <div className="flex items-center gap-3">
                                        <Sparkles size={18} className="text-purple-500 group-hover:animate-spin" />
                                        <div className="text-left">
                                            <div className="font-bold text-slate-200">{ench}</div>
                                            <div className="text-xs text-slate-400">{ENCHANT_STATS[ench].desc}</div>
                                        </div>
                                    </div>
                                    <div className="bg-slate-900 px-3 py-1 rounded text-xs font-mono text-slate-500 group-hover:text-white">
                                        1 Giấy Phép
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
