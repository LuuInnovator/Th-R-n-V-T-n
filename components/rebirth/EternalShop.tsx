
import React from 'react';
import { Gem, Sparkles } from 'lucide-react';
import { ETERNAL_UPGRADES } from '../../constants';
import { Player, EternalUpgrade } from '../../types';
import { formatNumber } from '../../utils';
import { EternalUpgradeCard } from './EternalUpgradeCard';

interface EternalShopProps {
  player: Player;
  onBuyUpgrade: (upgrade: EternalUpgrade) => void;
}

export const EternalShop: React.FC<EternalShopProps> = ({ player, onBuyUpgrade }) => {
  return (
    <div className="h-full flex flex-col bg-slate-950 overflow-hidden animate-fade-in">
      {/* Header đồng bộ style Bí Kỹ */}
      <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800 mb-8 flex flex-col md:flex-row justify-between items-center sticky top-0 z-10 backdrop-blur-xl shrink-0 gap-6">
        <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center border border-white/10 shadow-lg shadow-amber-900/20">
                <Sparkles size={32} className="text-slate-950" />
            </div>
            <div className="flex flex-col">
                <h3 className="text-2xl font-black text-amber-500 uppercase tracking-tighter italic leading-none">Thiên Phú Vĩnh Cửu</h3>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-2">Dấu ấn thợ rèn không bao giờ phai nhạt</span>
            </div>
        </div>

        <div className="bg-slate-950 px-8 py-4 rounded-3xl border border-slate-800 flex flex-col items-center justify-center min-w-[220px] shadow-inner">
          <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mb-1">Tinh Hoa Luân Hồi</span>
          <div className="text-3xl font-black text-purple-400 tabular-nums drop-shadow-[0_0_15px_rgba(168,85,247,0.3)] flex items-center gap-2">
            {formatNumber(player.eternalPoints)} <span className="text-xs text-slate-600 font-bold">EP</span>
          </div>
        </div>
      </div>

      {/* Grid 2 cột đồng bộ style Bí Kỹ */}
      <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-20">
            {ETERNAL_UPGRADES.map(upgrade => (
                <EternalUpgradeCard 
                    key={upgrade.id}
                    upgrade={upgrade}
                    currentLevel={player.eternalUpgrades[upgrade.id] || 0}
                    eternalPoints={player.eternalPoints}
                    onBuy={onBuyUpgrade}
                />
            ))}
        </div>
        
        {/* Empty state / Hint */}
        <div className="bg-slate-900/20 border border-dashed border-slate-800 p-12 rounded-3xl text-center mb-10">
            <Gem size={40} className="mx-auto text-slate-800 mb-4" />
            <p className="text-xs text-slate-600 font-black uppercase tracking-[0.3em]">Mỗi điểm EP là kết tinh của một kiếp tu hành</p>
        </div>
      </div>
    </div>
  );
};
