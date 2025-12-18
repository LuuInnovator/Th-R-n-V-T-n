
import React from 'react';
import { Blueprint } from '../../kieu_du_lieu';
import { Lock, ChevronRight, Zap, Star } from 'lucide-react';

interface Props {
  blueprints: Blueprint[];
  selectedId: string | undefined;
  blueprintLevels: Record<string, number>;
  onSelect: (bp: Blueprint) => void;
}

export const DanhSachBanVe: React.FC<Props> = ({ blueprints, selectedId, blueprintLevels, onSelect }) => {
  return (
    <div className="grid gap-2">
      {blueprints.length === 0 && (
          <div className="text-center py-10 px-4 flex flex-col items-center gap-2 border border-dashed border-white/5 rounded-2xl">
              <Lock size={20} className="text-slate-800" />
              <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest italic">Chưa có bản vẽ</div>
          </div>
      )}
      {blueprints.map(bp => {
        const isSelected = selectedId === bp.id;
        const level = blueprintLevels[bp.id] || 0;
        
        return (
          <button
            key={bp.id}
            onClick={() => onSelect(bp)}
            disabled={!bp.unlocked}
            className={`w-full text-left p-3 rounded-2xl border transition-all duration-300 flex items-center justify-between group relative overflow-hidden
                ${isSelected 
                    ? 'bg-amber-500/10 border-amber-500/50 shadow-lg' 
                    : 'bg-slate-950 border-white/5 hover:border-white/10'
                } ${!bp.unlocked ? 'opacity-20 grayscale' : ''}`}
          >
            <div className="flex items-center gap-3 relative z-10">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-300
                    ${isSelected ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-900 text-slate-700 border-white/5'}`}>
                    <Zap size={16} className={isSelected ? 'animate-pulse' : ''} />
                </div>
                <div className="flex flex-col min-w-0">
                    <div className={`font-black text-xs uppercase tracking-tight truncate leading-none mb-1 ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                        {bp.name}
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`text-[8px] font-black uppercase ${isSelected ? 'text-amber-500' : 'text-slate-600'}`}>
                            CẤP {level}
                        </span>
                        <div className="w-0.5 h-0.5 bg-slate-800 rounded-full"></div>
                        <span className="text-[8px] text-slate-700 font-bold uppercase truncate max-w-[80px]">
                            {bp.resultType}
                        </span>
                    </div>
                </div>
            </div>
            
            <div className="shrink-0 relative z-10">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all
                    ${isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-800'}`}>
                    <ChevronRight size={14} strokeWidth={3} />
                </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};
