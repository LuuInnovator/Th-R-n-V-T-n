
import React, { useState } from 'react';
import { Player, Blueprint, Equipment, Rarity } from '../types';
import { Button } from './Button';
import { Card } from './Card';
import { ShoppingBag, Star, RefreshCcw, Lock, Check, Store } from 'lucide-react';
import { RARITY_COLOR } from '../constants';

interface GuildViewProps {
  player: Player;
  guildBlueprints: Blueprint[];
  onUnlockBlueprint: (bp: Blueprint) => void;
  onTradeItem: (item: Equipment) => void;
  inventory: Equipment[];
}

export const GuildView: React.FC<GuildViewProps> = ({ 
    player, guildBlueprints, onUnlockBlueprint, onTradeItem, inventory 
}) => {
  const [tab, setTab] = useState<'library' | 'trader'>('library');

  // Filter items tradeable (Rare or higher)
  const tradeableItems = inventory.filter(i => 
      !i.isEquipped && 
      (i.rarity === Rarity.Rare || i.rarity === Rarity.Epic || i.rarity === Rarity.Legendary || i.rarity === Rarity.Mythic)
  );

  return (
    <div className="h-full p-4 max-w-7xl mx-auto w-full flex flex-col gap-6">
        <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-600/30 flex items-center justify-between shrink-0">
             <div className="flex items-center gap-4">
                 <div className="bg-amber-600 p-3 rounded-full shadow-lg shadow-amber-900/50">
                     <Store className="text-white" size={24} />
                 </div>
                 <div>
                     <h2 className="text-2xl font-bold text-slate-100">Cửa Hàng Thương Hội</h2>
                     <div className="text-slate-400 text-sm">Cấp {player.guild.level} • Hạng: Khách VIP</div>
                 </div>
             </div>
             <div className="text-right bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
                 <div className="text-xs text-slate-500 uppercase font-bold mb-1">Điểm Uy Tín</div>
                 <div className="text-xl font-black text-amber-500 flex items-center justify-end gap-1">
                     <Star size={16} fill="currentColor" /> {player.guild.fame}
                 </div>
             </div>
        </div>

        <div className="flex gap-4 border-b border-slate-700 pb-1">
             <button 
                onClick={() => setTab('library')}
                className={`flex items-center gap-2 px-4 py-2 font-bold transition-all border-b-2 ${tab === 'library' ? 'border-amber-500 text-amber-500' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
             >
                 <ShoppingBag size={18} /> Hàng Độc Quyền
             </button>
             <button 
                onClick={() => setTab('trader')}
                className={`flex items-center gap-2 px-4 py-2 font-bold transition-all border-b-2 ${tab === 'trader' ? 'border-green-500 text-green-500' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
             >
                 <RefreshCcw size={18} /> Thu Mua Vật Phẩm
             </button>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin">
            {tab === 'library' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {guildBlueprints.map(bp => {
                        const isUnlocked = player.guild.blueprints.includes(bp.id);
                        const canAfford = player.guild.fame >= (bp.guildFameCost || 0);

                        return (
                            <Card key={bp.id} className={`relative ${isUnlocked ? 'border-amber-500/50 bg-amber-900/10' : 'opacity-80'}`}>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-slate-200">{bp.name}</h3>
                                    {isUnlocked ? <Check size={20} className="text-green-500" /> : <Lock size={18} className="text-slate-500" />}
                                </div>
                                <div className="text-xs text-slate-400 mb-4 h-10">{bp.requiredMaterials.map(r => r.type).join(', ')}</div>
                                
                                <div className="mt-auto flex items-center justify-between">
                                    <div className="text-amber-500 font-bold text-sm">
                                        {bp.guildFameCost} Uy Tín
                                    </div>
                                    <Button 
                                        size="sm" 
                                        disabled={isUnlocked || !canAfford}
                                        onClick={() => onUnlockBlueprint(bp)}
                                        className={isUnlocked ? 'invisible' : ''}
                                    >
                                        Mua Bản Vẽ
                                    </Button>
                                </div>
                            </Card>
                        );
                    })}
                    {guildBlueprints.length === 0 && <div className="text-slate-500 italic">Cửa hàng đang nhập kho...</div>}
                </div>
            )}

            {tab === 'trader' && (
                <div className="flex flex-col md:flex-row gap-6 h-full">
                    <div className="w-full md:w-1/3 bg-slate-900/50 p-6 rounded-xl border border-slate-700 text-center">
                        <div className="mb-6">
                            <div className="w-24 h-24 bg-slate-800 rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-slate-600">
                                <span className="text-4xl">👳‍♂️</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-200">Chủ Cửa Hàng</h3>
                            <p className="text-sm text-slate-400 mt-2">
                                "Ta thu mua những món đồ hiếm (Rare+). Đổi lại, ta sẽ cho ngươi điểm Uy Tín để mua các bản vẽ độc quyền."
                            </p>
                        </div>
                        <div className="text-left text-sm space-y-2 bg-slate-950 p-4 rounded-lg">
                            <div className="flex justify-between text-blue-400"><span>Đồ Hiếm (Rare)</span> <span>+10 Uy Tín</span></div>
                            <div className="flex justify-between text-purple-400"><span>Đồ Sử Thi (Epic)</span> <span>+50 Uy Tín</span></div>
                            <div className="flex justify-between text-yellow-400"><span>Huyền Thoại (Legend)</span> <span>+250 Uy Tín</span></div>
                        </div>
                    </div>

                    <div className="w-full md:w-2/3 grid grid-cols-2 sm:grid-cols-3 gap-3 overflow-y-auto content-start">
                        {tradeableItems.map(item => (
                            <button 
                                key={item.id}
                                onClick={() => onTradeItem(item)}
                                className="bg-slate-800 p-3 rounded-lg border border-slate-700 hover:border-green-500 hover:bg-slate-700 transition-all text-left group relative overflow-hidden"
                            >
                                <div className={`text-xs font-bold ${RARITY_COLOR[item.rarity]} mb-1 truncate`}>{item.name}</div>
                                <div className="text-[10px] text-slate-500">{item.type}</div>
                                <div className="mt-2 text-xs font-bold text-green-500 opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-2 right-2">
                                    ĐỔI
                                </div>
                            </button>
                        ))}
                        {tradeableItems.length === 0 && (
                            <div className="col-span-full text-center text-slate-500 py-10 italic border-2 border-dashed border-slate-800 rounded-xl">
                                Không có trang bị Rare+ nào trong kho để đổi.
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};
