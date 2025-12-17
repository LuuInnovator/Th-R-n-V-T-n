
import React, { useState } from 'react';
import { Player, EternalUpgrade } from '../types';
import { ShoppingBag, RefreshCw } from 'lucide-react';
import { RebirthAction } from './rebirth/RebirthAction';
import { EternalShop } from './rebirth/EternalShop';

interface RebirthViewProps {
  player: Player;
  onRebirth: () => void;
  canRebirth: boolean;
  onBuyUpgrade: (upgrade: EternalUpgrade) => void;
}

export const RebirthView: React.FC<RebirthViewProps> = ({ player, onRebirth, canRebirth, onBuyUpgrade }) => {
  const [tab, setTab] = useState<'action' | 'shop'>('action');

  return (
    <div className="h-full max-w-5xl mx-auto w-full p-4 flex flex-col gap-6 overflow-hidden">
      <div className="flex justify-center p-1 bg-slate-900 rounded-2xl border border-slate-800 shrink-0 w-fit mx-auto">
        <button 
          onClick={() => setTab('action')}
          className={`px-8 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2 ${tab === 'action' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <RefreshCw size={14} /> Cổng Tái Sinh
        </button>
        <button 
          onClick={() => setTab('shop')}
          className={`px-8 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2 ${tab === 'shop' ? 'bg-amber-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <ShoppingBag size={14} /> Cửa Hàng EP
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin pr-2">
        {tab === 'action' ? (
          <RebirthAction player={player} onRebirth={onRebirth} canRebirth={canRebirth} />
        ) : (
          <EternalShop player={player} onBuyUpgrade={onBuyUpgrade} />
        )}
      </div>
    </div>
  );
};
