
import React from 'react';
import { User, Sword, Hammer, Zap, RefreshCw, Book, Settings } from 'lucide-react';
import { Player } from '../../types';

interface SidebarProps {
  player: Player;
  activeTab: string;
  setActiveTab: (tab: any) => void;
  setShowStatsModal: (show: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ player, activeTab, setActiveTab, setShowStatsModal }) => {
  const navItems = [
    { id: 'battle', label: 'Viễn Chinh', icon: Sword, color: 'text-cyan-400' },
    { id: 'inventory', label: 'Hành Trang', icon: User, color: 'text-blue-400' },
    { id: 'craft', label: 'Lò Rèn', icon: Hammer, color: 'text-purple-400' },
    { id: 'skills', label: 'Bí Kỹ', icon: Zap, color: 'text-amber-400' },
    { id: 'rebirth', label: 'Luân Hồi', icon: RefreshCw, color: 'text-rose-400' },
    { id: 'wiki', label: 'Cổ Thư', icon: Book, color: 'text-slate-400' },
    { id: 'settings', label: 'Cài Đặt', icon: Settings, color: 'text-slate-500' },
  ];

  return (
    <aside className="w-20 md:w-64 glass-card border-r border-white/5 flex flex-col shrink-0 z-20">
      <div className="p-4 md:p-8 border-b border-white/5 bg-slate-900/40 text-center">
        <h1 className="hidden md:block text-xl font-black bg-gradient-to-br from-cyan-400 to-purple-600 bg-clip-text text-transparent uppercase mb-6 tracking-tighter italic">THỢ RÈN VÔ TẬN</h1>
        <div className="bg-slate-950/40 p-4 rounded-3xl border border-white/5">
          <div className="flex justify-between items-center mb-2 text-[10px] font-black uppercase tracking-tighter">
            <span>LV.{player.level}</span>
            <span className="text-purple-400">RB.{player.rebirthCount}</span>
          </div>
          <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden mb-4 border border-white/5 shadow-inner">
            <div className="h-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]" style={{ width: `${(player.currentExp / player.maxExp) * 100}%` }}></div>
          </div>
          <button onClick={() => setShowStatsModal(true)} className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-[9px] font-black flex items-center justify-center gap-2 hover:bg-white/10 transition-colors uppercase tracking-widest shadow-lg">
            <User size={14} /> <span className="hidden md:inline">Nhân Vật</span>
          </button>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-2 overflow-y-auto scrollbar-hide">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 relative group ${activeTab === item.id ? 'bg-white/10 text-white shadow-xl' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}
          >
            {activeTab === item.id && <div className="absolute left-0 top-3 bottom-3 w-1 bg-cyan-500 rounded-full blur-[1px]"></div>}
            <item.icon size={20} className={`${activeTab === item.id ? item.color : 'text-slate-600 group-hover:text-slate-400'} transition-colors`} />
            <span className="hidden md:inline font-bold text-[11px] uppercase tracking-widest leading-none">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};
