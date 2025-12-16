import React from 'react';
import { Blueprint } from '../../types';
import { Hammer, Lock, ChevronRight } from 'lucide-react';
import { Card } from '../Card';

interface BlueprintListProps {
  blueprints: Blueprint[];
  selectedId: string | undefined;
  onSelect: (bp: Blueprint) => void;
}

export const BlueprintList: React.FC<BlueprintListProps> = ({ blueprints, selectedId, onSelect }) => {
  return (
    <Card className="h-full flex flex-col bg-slate-800/80">
      <div className="flex items-center gap-2 mb-4 border-b border-slate-700 pb-2">
        <Hammer className="text-amber-500" size={20} />
        <h3 className="font-bold text-lg text-slate-200">Danh Sách Bản Vẽ</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-2 pr-2 scrollbar-thin">
        {blueprints.map(bp => (
          <button
            key={bp.id}
            onClick={() => onSelect(bp)}
            disabled={!bp.unlocked}
            className={`
              w-full text-left p-3 rounded-lg border transition-all duration-200 flex items-center justify-between group
              ${selectedId === bp.id 
                ? 'bg-blue-600/20 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.2)]' 
                : 'bg-slate-900/50 border-slate-700 hover:border-slate-500 hover:bg-slate-800'}
              ${!bp.unlocked ? 'opacity-50 cursor-not-allowed grayscale' : ''}
            `}
          >
            <div>
              <div className={`font-bold text-sm ${selectedId === bp.id ? 'text-blue-300' : 'text-slate-300'}`}>
                {bp.name}
              </div>
              <div className="text-xs text-slate-500 mt-1">{bp.resultType}</div>
            </div>
            {!bp.unlocked ? (
              <Lock size={16} className="text-slate-600" />
            ) : (
              <ChevronRight size={16} className={`transition-transform ${selectedId === bp.id ? 'translate-x-1 text-blue-400' : 'text-slate-600 group-hover:text-slate-400'}`} />
            )}
          </button>
        ))}
      </div>
    </Card>
  );
};