
import React from 'react';
import { User, Sword, Hammer, Zap, RefreshCw, Book, Settings, ChevronRight, Lock } from 'lucide-react';
import { Player } from '../../kieu_du_lieu';

interface Props {
  player: Player;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setShowStatsModal: (show: boolean) => void;
}

export const ThanhBen: React.FC<Props> = ({ player, activeTab, setActiveTab, setShowStatsModal }) => {
  const danhMucNav = [
    { id: 'chien_dau', label: 'Viễn Chinh', icon: Sword, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { id: 'hanh_trang', label: 'Hành Trang', icon: User, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { id: 'lo_ren', label: 'Lò Rèn', icon: Hammer, color: 'text-orange-400', bg: 'bg-orange-500/10' },
    { id: 'bi_ky', label: 'Bí Kỹ', icon: Zap, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { id: 'luan_hoi', label: 'Luân Hồi', icon: RefreshCw, color: 'text-rose-400', bg: 'bg-rose-500/10' },
    { id: 'co_thu', label: 'Cổ Thư', icon: Book, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { id: 'cai_dat', label: 'Hệ Thống', icon: Settings, color: 'text-slate-400', bg: 'bg-slate-500/10' },
  ];

  const expPercent = (player.currentExp / player.maxExp) * 100;
  const rebirthProgress = Math.min(100, (player.level / 50) * 100);

  return (
    <aside className="w-20 md:w-72 glass-card border-r border-white/5 flex flex-col shrink-0 z-20 transition-all duration-500 group/sidebar">
      {/* Brand Header */}
      <div className="p-6 md:p-10 border-b border-white/5">
        <div className="hidden md:flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-900/50">
                <Hammer className="text-white" size={20} />
            </div>
            <h1 className="text-lg font-black bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent uppercase tracking-tighter leading-none">
                THỢ RÈN<br/><span className="text-orange-500">VÔ TẬN</span>
            </h1>
        </div>

        {/* Player Status Mini Card */}
        <div className="bg-slate-950/60 p-5 rounded-3xl border border-white/5 shadow-inner">
          <div className="flex justify-between items-end mb-3">
             <div className="flex flex-col">
                <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Cấp Độ</span>
                <span className="text-2xl font-black text-white tabular-nums leading-none">{player.level}</span>
             </div>
             <div className="flex flex-col items-end">
                <span className="text-[9px] text-purple-400 font-black uppercase tracking-widest">Luân Hồi</span>
                <span className="text-sm font-black text-purple-200 tabular-nums">#{player.rebirthCount}</span>
             </div>
          </div>
          
          <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden mb-5 border border-white/5">
            <div 
                className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.4)] transition-all duration-1000" 
                style={{ width: `${expPercent}%` }}
            ></div>
          </div>

          {/* REBIRTH PROGRESS BAR */}
          <div className="mt-2 mb-4 space-y-1">
              <div className="flex justify-between items-center px-1">
                  <span className="text-[7px] font-black text-slate-600 uppercase">Tiến Độ Luân Hồi</span>
                  <span className="text-[7px] font-black text-rose-500 uppercase">{Math.floor(rebirthProgress)}%</span>
              </div>
              <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-600" style={{ width: `${rebirthProgress}%` }}></div>
              </div>
          </div>

          <button 
            onClick={() => setShowStatsModal(true)} 
            className="w-full py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 text-[10px] font-black flex items-center justify-center gap-2 transition-all uppercase tracking-widest active:scale-95"
          >
            <User size={14} className="text-blue-400" /> 
            <span className="hidden md:inline">Hồ Sơ Nhân Vật</span>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto scrollbar-hide mt-4">
        {danhMucNav.map(item => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-center md:justify-start gap-4 px-4 py-4 rounded-2xl transition-all duration-300 relative group/btn ${isActive ? 'bg-white/10 text-white shadow-xl' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}
            >
              {isActive && (
                <div className={`absolute left-0 top-3 bottom-3 w-1.5 ${item.bg.replace('/10', '/100')} rounded-r-full blur-[2px]`}></div>
              )}
              
              <div className={`p-2.5 rounded-xl transition-all duration-300 ${isActive ? item.bg : 'bg-transparent group-hover/btn:bg-white/5'}`}>
                <item.icon size={20} className={`${isActive ? item.color : 'text-slate-600 group-hover/btn:text-slate-400'} transition-colors`} />
              </div>

              <span className={`hidden md:inline font-bold text-[11px] uppercase tracking-[0.15em] leading-none ${isActive ? 'text-white' : 'text-slate-500'}`}>
                {item.label}
              </span>

              {isActive && (
                <ChevronRight size={14} className="hidden md:block ml-auto text-slate-600" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Footer Info */}
      <div className="hidden md:block p-8 border-t border-white/5 text-center">
        <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Phiên Bản 2.0 Beta</p>
      </div>
    </aside>
  );
};
