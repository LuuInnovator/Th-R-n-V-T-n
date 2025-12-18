
import React from 'react';
import { Plus } from 'lucide-react';
import { Player } from '../../kieu_du_lieu';

interface Props {
  stats: Player['stats'];
  points: number;
  onAllocate: (stat: keyof Player['stats']) => void;
}

export const BangTiemNang: React.FC<Props> = ({ stats, points, onAllocate }) => {
  const cacStat = [
    { k: 'strength', l: 'Sức Mạnh' },
    { k: 'dexterity', l: 'Khéo Léo' },
    { k: 'intelligence', l: 'Thông Thái' },
    { k: 'vitality', l: 'Sinh Lực' },
    { k: 'luck', l: 'May Mắn' }
  ];

  return (
    <div className="bg-slate-900/40 p-6 rounded-[2.5rem] border border-white/5 space-y-4">
      <div className="flex justify-between items-center mb-2 px-2">
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] italic">TIỀM NĂNG</span>
        <span className="text-indigo-400 text-xs font-black bg-indigo-500/10 px-3 py-1 rounded-lg border border-indigo-500/20">
          {points} SP
        </span>
      </div>
      
      <div className="grid gap-2">
        {cacStat.map(s => (
          <div key={s.k} className="bg-slate-950/60 p-3 pl-5 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-white/10 transition-all">
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-slate-600 uppercase mb-1">{s.l}</span>
              <span className="text-lg font-black text-white tabular-nums">{(stats as any)[s.k]}</span>
            </div>
            <button 
              onClick={() => onAllocate(s.k as any)}
              disabled={points <= 0}
              className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-indigo-600 flex items-center justify-center text-white disabled:opacity-5 transition-all border border-white/10 shadow-lg"
            >
              <Plus size={18} strokeWidth={3} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
