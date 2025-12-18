
import React from 'react';
import { Blueprint } from '../../kieu_du_lieu';
import { Lock, ChevronRight, Sparkles } from 'lucide-react';

interface Props {
  blueprints: Blueprint[];
  selectedId: string | undefined;
  onSelect: (bp: Blueprint) => void;
}

export const DanhSachBanVe: React.FC<Props> = ({ blueprints, selectedId, onSelect }) => {
  return (
    <div className="space-y-2">
      {blueprints.length === 0 && (
          <div className="text-center text-slate-600 py-16 text-xs font-black uppercase tracking-widest opacity-50 italic">
              Danh mục trống
          </div>
      )}
      {blueprints.map(bp => (
        <button
          key={bp.id}
          onClick={() => onSelect(bp)}
          disabled={!bp.unlocked}
          className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between group relative overflow-hidden ${selectedId === bp.id ? 'bg-amber-600/20 border-amber-500/60 shadow-lg' : 'bg-slate-800/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800'} ${!bp.unlocked ? 'opacity-30 grayscale cursor-not-allowed' : ''}`}
        >
          {selectedId === bp.id && <div className="absolute left-0 top-3 bottom-3 w-1 bg-amber-500 rounded-full blur-[1px]"></div>}
          
          <div className="min-w-0 pr-4">
            <div className={`font-black text-sm uppercase tracking-tight truncate ${selectedId === bp.id ? 'text-amber-400' : 'text-slate-200'}`}>
              {bp.name}
            </div>
            <div className="text-[9px] text-slate-500 font-bold uppercase mt-1 tracking-widest truncate">
                Cấp {bp.evolutionLevel} • {bp.resultType}
            </div>
          </div>
          
          <div className="shrink-0">
            {!bp.unlocked ? (
              <Lock size={16} className="text-slate-700" />
            ) : (
              <div className={`p-1.5 rounded-lg transition-all ${selectedId === bp.id ? 'bg-amber-500 text-slate-900 scale-110' : 'bg-slate-900 text-slate-600'}`}>
                <ChevronRight size={14} strokeWidth={3} />
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};
