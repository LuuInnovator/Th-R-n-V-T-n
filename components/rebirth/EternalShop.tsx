
import React from 'react';
import { Lock, Unlock } from 'lucide-react';
import { Card } from '../Card';
import { Button } from '../Button';
import { ETERNAL_UPGRADES } from '../../constants';
import { Player, EternalUpgrade } from '../../types';
import { formatNumber } from '../../utils';

interface EternalShopProps {
  player: Player;
  onBuyUpgrade: (upgrade: EternalUpgrade) => void;
}

export const EternalShop: React.FC<EternalShopProps> = ({ player, onBuyUpgrade }) => {
  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800 mb-6 flex justify-between items-center sticky top-0 z-10 backdrop-blur-xl shrink-0">
        <div className="flex flex-col">
          <h3 className="text-xl font-black text-amber-500 uppercase tracking-tighter">Thiên Phú Vĩnh Cửu</h3>
          <span className="text-[10px] text-slate-500 font-bold">Nâng cấp tồn tại vĩnh viễn qua mọi kiếp luân hồi</span>
        </div>
        <div className="text-right">
          <div className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Điểm EP Hiện Có</div>
          <div className="text-3xl font-black text-purple-400 tabular-nums">{formatNumber(player.eternalPoints)}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-10">
        {ETERNAL_UPGRADES.map(upgrade => {
          const currentLevel = player.eternalUpgrades[upgrade.id] || 0;
          const isMax = currentLevel >= upgrade.maxLevel;
          const cost = Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, currentLevel));
          const canBuy = !isMax && player.eternalPoints >= cost;

          return (
            <Card key={upgrade.id} className={`relative group transition-all duration-300 border-slate-800 ${isMax ? 'bg-amber-500/5' : 'bg-slate-900/40'}`}>
               <div className="flex justify-between items-start mb-4">
                   <div className="flex items-center gap-3">
                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isMax ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-500 group-hover:bg-slate-700'}`}>
                           {isMax ? <Lock size={20} /> : <Unlock size={20} />}
                       </div>
                       <div>
                           <h4 className="font-black text-slate-200 uppercase text-xs tracking-tight">{upgrade.name}</h4>
                           <div className="text-[10px] font-mono text-purple-400 font-bold">Cấp {currentLevel} / {upgrade.maxLevel}</div>
                       </div>
                   </div>
               </div>
               <p className="text-[11px] text-slate-400 mb-6 leading-relaxed h-8">{upgrade.description}</p>
               <div className="mt-auto">
                   <Button 
                       size="sm" 
                       fullWidth
                       variant={canBuy ? 'primary' : 'outline'} 
                       disabled={!canBuy}
                       onClick={() => onBuyUpgrade(upgrade)}
                       className="font-black text-[10px] tracking-widest"
                   >
                       {isMax ? 'ĐÃ ĐẠT TỐI ĐA' : `NÂNG CẤP (${formatNumber(cost)} EP)`}
                   </Button>
               </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
