
import React from 'react';
import { FastForward, Coins } from 'lucide-react';
import { Player } from '../../kieu_du_lieu';
import { dinh_dang_so } from '../../tien_ich/tinh_toan';

interface Props {
  activeTab: string;
  getTabLabel: (id: string) => string;
  player: Player;
  onSetGameSpeed: (speed: number) => void;
}

export const ThanhDau: React.FC<Props> = ({ activeTab, getTabLabel, player, onSetGameSpeed }) => {
  return (
    <header className="h-20 glass-card border-b border-white/5 flex items-center justify-between px-10 backdrop-blur-3xl z-10 shrink-0">
      <div className="flex flex-col">
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Đang Truy Cập</span>
        <span className="text-xl font-black text-white uppercase">{getTabLabel(activeTab)}</span>
      </div>

      <div className="flex gap-6 items-center">
        <div className="hidden md:flex items-center bg-slate-900 rounded-full px-4 py-2 border border-slate-800 gap-3 shadow-inner">
          <FastForward size={16} className="text-cyan-400" />
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(s => (
              <button
                key={s}
                onClick={() => onSetGameSpeed(s)}
                className={`w-6 h-6 rounded-full text-[10px] font-black transition-all ${player.gameSpeed === s ? 'bg-cyan-500 text-slate-950' : 'text-slate-500 hover:text-white'}`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Ngân Lượng</span>
          <div className="text-lg font-black text-amber-400 flex items-center gap-1">
            <Coins size={16} /> {dinh_dang_so(player.gold)}
          </div>
        </div>
      </div>
    </header>
  );
};
