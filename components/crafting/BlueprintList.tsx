
import React from 'react';
import { Blueprint } from '../../types';
import { Lock, ChevronRight } from 'lucide-react';

interface BlueprintListProps {
  blueprints: Blueprint[];
  selectedId: string | undefined;
  onSelect: (bp: Blueprint) => void;
}

export const BlueprintList: React.FC<BlueprintListProps> = ({ blueprints, selectedId, onSelect }) => {
  return (
    <div className="space-y-1">
      {blueprints.length === 0 && (
          <div className="text-center text-slate-500 py-10 text-xs italic">
              Không có bản vẽ nào trong danh mục này.
          </div>
      )}
      {blueprints.map(bp => (
        <button
          key={bp.id}
          onClick={() => onSelect(bp)}
          disabled={!bp.unlocked}
          className={`
            w-full text-left p-3 rounded-lg border transition-all duration-200 flex items-center justify-between group relative overflow-hidden
            ${selectedId === bp.id 
              ? 'bg-amber-600/20 border-amber-500/50' 
              : 'bg-slate-800/40 border-slate-700 hover:border-slate-600 hover:bg-slate-800'}
            ${!bp.unlocked ? 'opacity-40 grayscale' : ''}
          `}
        >
          {selectedId === bp.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500"></div>}
          
          <div className="min-w-0 pr-2">
            <div className={`font-bold text-sm truncate ${selectedId === bp.id ? 'text-amber-400' : 'text-slate-300'}`}>
              {bp.name}
            </div>
            {/* Hiển thị nguyên liệu chính sơ lược */}
            <div className="text-[10px] text-slate-500 truncate mt-0.5">
                {bp.requiredMaterials.map(r => r.type).join(', ')}
            </div>
          </div>
          
          <div className="shrink-0">
            {!bp.unlocked ? (
              <Lock size={14} className="text-slate-600" />
            ) : (
              <ChevronRight size={14} className={`transition-transform ${selectedId === bp.id ? 'translate-x-1 text-amber-500' : 'text-slate-600'}`} />
            )}
          </div>
        </button>
      ))}
    </div>
  );
};
