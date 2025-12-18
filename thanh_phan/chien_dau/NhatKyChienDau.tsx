
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, Trash2, Radio, Zap, Terminal } from 'lucide-react';
import { DongNhatKy } from '../../logic_game/nhat_ky';

interface Props {
  nhat_ky: DongNhatKy[];
  onXoa?: () => void;
}

export const NhatKyChienDau: React.FC<Props> = ({ nhat_ky, onXoa }) => {
  const [dangMo, datDangMo] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = 0;
    }
  }, [nhat_ky]);

  return (
    <div className={`flex flex-col bg-slate-900/40 border border-white/10 rounded-[2.5rem] overflow-hidden transition-all duration-700 ease-in-out shadow-2xl relative ${dangMo ? 'flex-1' : 'h-20 shrink-0'}`}>
      {/* Hiệu ứng nền Terminal */}
      <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none"></div>

      <div 
        className="flex items-center justify-between p-6 bg-slate-900/80 border-b border-white/5 select-none shrink-0 cursor-pointer group z-10"
        onClick={() => datDangMo(!dangMo)}
      >
        <div className="flex items-center gap-4">
          <div className={`p-2.5 rounded-xl transition-all duration-500 ${dangMo ? 'bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] animate-pulse' : 'bg-slate-950 text-slate-700'}`}>
             <Terminal size={18} />
          </div>
          <div className="flex flex-col">
            <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] italic">
                NHẬT KÝ VIỄN CHINH
            </h3>
            <span className="text-[9px] text-indigo-400/70 font-bold uppercase tracking-widest">{nhat_ky.length} TÍN HIỆU ĐƯỢC GHI LẠI</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {dangMo && nhat_ky.length > 0 && onXoa && (
            <button 
              onClick={(e) => { e.stopPropagation(); onXoa(); }} 
              className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center text-slate-600 hover:text-rose-500 hover:bg-rose-500/10 transition-all border border-white/5"
            >
              <Trash2 size={16} />
            </button>
          )}
          <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center text-slate-600 border border-white/5 group-hover:text-white transition-colors">
            {dangMo ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </div>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className={`flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin bg-black/40 z-10 ${dangMo ? 'opacity-100' : 'opacity-0 hidden'}`}
      >
        {nhat_ky.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center py-20">
            <div className="w-16 h-16 rounded-full bg-slate-950 border border-white/5 flex items-center justify-center text-slate-800 mb-6 animate-pulse">
                <Radio size={32} />
            </div>
            <div className="text-slate-600 text-[11px] font-black uppercase tracking-[0.5em] italic">ĐANG CHỜ TÍN HIỆU...</div>
          </div>
        ) : (
          nhat_ky.map((log) => (
            <div key={log.id} className="text-[11px] font-mono text-slate-300 border-l-2 border-indigo-500/40 pl-5 py-3 leading-relaxed hover:bg-white/5 hover:border-indigo-400 rounded-r-2xl transition-all group/line relative overflow-hidden animate-fade-in">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-500/5 to-transparent opacity-0 group-hover/line:opacity-100 transition-opacity"></div>
              <div className="flex items-start gap-3 relative z-10">
                <span className="text-indigo-500 font-black group-hover/line:scale-125 transition-transform">▶</span>
                <span className="break-words">{log.tin_nhan}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
