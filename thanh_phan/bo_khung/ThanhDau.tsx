
import React from 'react';
import { FastForward, Coins, LayoutGrid, ShieldCheck } from 'lucide-react';
import { Player } from '../../kieu_du_lieu';
import { dinh_dang_so } from '../../tien_ich/tinh_toan';

interface Props {
  activeTab: string;
  getTabLabel: (id: string) => string;
  player: Player;
  onSetGameSpeed: (speed: number) => void;
}

export const ThanhDau: React.FC<Props> = ({ activeTab, player, onSetGameSpeed }) => {
  const nhanTiengViet: Record<string, string> = {
    'chien_dau': 'CHIẾN ĐẤU',
    'hanh_trang': 'HÀNH TRANG',
    'lo_ren': 'LÒ RÈN',
    'bi_ky': 'BÍ PHÁP',
    'luan_hoi': 'LUÂN HỒI',
    'co_thu': 'CỔ THƯ',
    'cai_dat': 'HỆ THỐNG'
  };

  const currentLabel = nhanTiengViet[activeTab] || activeTab.toUpperCase();

  return (
    <header className="h-20 glass-card border-b border-white/5 flex items-center justify-between px-8 backdrop-blur-3xl z-40 shrink-0 relative overflow-hidden">
      {/* Tia sáng trang trí phía trên */}
      <div className="absolute top-0 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
      
      <div className="flex items-center gap-5">
        <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-blue-400 shadow-lg">
            <LayoutGrid size={20} />
        </div>
        <div className="flex flex-col">
          <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.4em] leading-none mb-1">TRẠM TRUY CẬP</span>
          <span className="text-2xl font-black text-white uppercase italic tracking-tighter drop-shadow-md">
            {currentLabel}
          </span>
        </div>
      </div>

      <div className="flex gap-8 items-center">
        {/* Tốc độ game */}
        <div className="hidden md:flex items-center bg-slate-950/60 rounded-xl p-1 border border-white/5">
          {[1, 2, 3, 4, 5].map(s => (
            <button
              key={s}
              onClick={() => onSetGameSpeed(s)}
              className={`px-3 py-1 rounded-lg text-[9px] font-black transition-all ${player.gameSpeed === s ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
            >
              {s}x
            </button>
          ))}
        </div>

        {/* Ngân lượng - Gọn gàng hơn */}
        <div className="flex items-center gap-3 bg-slate-900/40 px-4 py-2 rounded-xl border border-white/5">
          <div className="flex flex-col items-end">
            <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest">NGÂN LƯỢNG</span>
            <span className="text-lg font-black text-amber-400 tabular-nums leading-none">
              {dinh_dang_so(player.gold)}
            </span>
          </div>
          <div className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-500 border border-amber-500/20">
             <Coins size={16} />
          </div>
        </div>
      </div>
    </header>
  );
};
