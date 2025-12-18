
import React from 'react';
import { User, Sword, Hammer, Zap, RefreshCw, Book, Settings, ChevronRight, Sparkles } from 'lucide-react';
import { Player } from '../../kieu_du_lieu';

interface Props {
  player: Player;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setShowStatsModal: (show: boolean) => void;
}

export const ThanhBen: React.FC<Props> = ({ player, activeTab, setActiveTab, setShowStatsModal }) => {
  const danhMucNav = [
    { id: 'chien_dau', label: 'Viễn Chinh', icon: Sword, color: 'text-cyan-400', bg: 'bg-cyan-500/10', glow: 'shadow-cyan-500/20' },
    { id: 'hanh_trang', label: 'Hành Trang', icon: User, color: 'text-blue-400', bg: 'bg-blue-500/10', glow: 'shadow-blue-500/20' },
    { id: 'lo_ren', label: 'Lò Rèn', icon: Hammer, color: 'text-orange-400', bg: 'bg-orange-500/10', glow: 'shadow-orange-500/20' },
    { id: 'bi_ky', label: 'Bí Pháp', icon: Zap, color: 'text-amber-400', bg: 'bg-amber-500/10', glow: 'shadow-amber-500/20' },
    { id: 'luan_hoi', label: 'Luân Hồi', icon: RefreshCw, color: 'text-rose-400', bg: 'bg-rose-500/10', glow: 'shadow-rose-500/20' },
    { id: 'co_thu', label: 'Cổ Thư', icon: Book, color: 'text-emerald-400', bg: 'bg-emerald-500/10', glow: 'shadow-emerald-500/20' },
    { id: 'cai_dat', label: 'Hệ Thống', icon: Settings, color: 'text-slate-400', bg: 'bg-slate-500/10', glow: 'shadow-slate-500/20' },
  ];

  const expPercent = Math.min(100, (player.currentExp / player.maxExp) * 100);
  const reqRebirth = 25 + (player.rebirthCount * 5);
  const rebirthProgress = Math.min(100, (player.level / reqRebirth) * 100);

  return (
    <aside className="w-24 md:w-80 glass-card border-r border-white/10 flex flex-col shrink-0 z-20 transition-all duration-500 relative overflow-hidden group/sidebar">
      {/* Decorative Gradient Top */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

      <div className="p-8 md:p-12 border-b border-white/5 space-y-10">
        <div className="hidden md:flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-[1.2rem] flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.4)] animate-float">
                <Hammer className="text-white" size={24} />
            </div>
            <div className="flex flex-col">
                <h1 className="text-xl font-black text-white uppercase tracking-tighter leading-none">THỢ RÈN</h1>
                <span className="text-orange-500 font-black text-[10px] tracking-[0.4em] uppercase">Vô Tận</span>
            </div>
        </div>

        {/* Player Mini Hub */}
        <div className="bg-slate-950/80 p-6 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden group/player">
          <div className="flex justify-between items-center mb-5">
             <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Đẳng Cấp</span>
                <span className="text-3xl font-black text-white tabular-nums tracking-tighter">{player.level}</span>
             </div>
             <div className="flex flex-col items-end">
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${player.rebirthCount > 0 ? 'bg-indigo-500/10 border-indigo-500/40 text-indigo-400' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>
                    <Sparkles size={10} className={player.rebirthCount > 0 ? 'animate-pulse' : ''} />
                    <span className="text-[10px] font-black uppercase tracking-wider">BẬC {player.rebirthCount}</span>
                </div>
             </div>
          </div>
          
          <div className="space-y-4">
              <div className="space-y-1.5">
                  <div className="flex justify-between px-1">
                      <span className="text-[8px] font-black text-slate-600 uppercase">Kinh Nghiệm</span>
                      <span className="text-[8px] font-black text-blue-400">{Math.floor(expPercent)}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
                    <div 
                        className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-700" 
                        style={{ width: `${expPercent}%` }}
                    ></div>
                  </div>
              </div>

              <div className="space-y-1.5">
                  <div className="flex justify-between px-1">
                      <span className="text-[8px] font-black text-slate-600 uppercase">Luân Hồi Lv.{reqRebirth}</span>
                      <span className="text-[8px] font-black text-rose-500">{Math.floor(rebirthProgress)}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
                      <div className="h-full bg-gradient-to-r from-rose-600 to-pink-500 shadow-[0_0_10px_rgba(244,63,94,0.4)] transition-all duration-700" style={{ width: `${rebirthProgress}%` }}></div>
                  </div>
              </div>
          </div>

          <button 
            onClick={() => setShowStatsModal(true)} 
            className="w-full mt-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-black flex items-center justify-center gap-3 transition-all uppercase tracking-[0.2em] active:scale-95 group-hover/player:border-blue-500/30"
          >
            <User size={16} className="text-blue-400" /> 
            <span className="hidden md:inline">Hồ Sơ Anh Hùng</span>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-2 overflow-y-auto scrollbar-hide mt-6">
        {danhMucNav.map(item => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-center md:justify-start gap-5 px-5 py-5 rounded-3xl transition-all duration-500 relative group/btn overflow-hidden ${isActive ? 'bg-white/5 text-white shadow-xl' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}
            >
              {isActive && (
                <div className={`absolute left-0 top-4 bottom-4 w-2 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-r-full shadow-[0_0_15px_rgba(79,70,229,0.8)]`}></div>
              )}
              
              <div className={`p-3 rounded-2xl transition-all duration-500 ${isActive ? `${item.bg} ${item.glow}` : 'bg-transparent group-hover/btn:bg-white/5'}`}>
                <item.icon size={22} className={`${isActive ? item.color : 'text-slate-600 group-hover/btn:text-slate-400'} transition-colors`} />
              </div>

              <span className={`hidden md:inline font-black text-[11px] uppercase tracking-[0.2em] leading-none ${isActive ? 'text-white' : 'text-slate-500'}`}>
                {item.label}
              </span>

              {isActive && (
                <ChevronRight size={16} className="hidden md:block ml-auto text-slate-700 animate-pulse" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Branding */}
      <div className="hidden md:block p-10 border-t border-white/5 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/5 to-transparent pointer-events-none"></div>
        <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] relative z-10 italic">LEGENDARY EDITION</p>
        <p className="text-[8px] font-bold text-slate-800 uppercase mt-2 relative z-10">Bản quyền 2024 • Thợ Rèn Vô Tận</p>
      </div>
    </aside>
  );
};
