
import React from 'react';
import { Zone } from '../../types';
import { Map } from 'lucide-react';

interface ZoneListProps {
  zones: Zone[];
  activeZone: Zone;
  onSelect: (zone: Zone) => void;
  // Giữ lại các prop này để tránh lỗi TS ở App.tsx nhưng không sử dụng UI
  blueprints: any[];
  dropRateBonus: number;
}

export const ZoneList: React.FC<ZoneListProps> = ({ 
  zones, 
  activeZone, 
  onSelect
}) => {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide px-2">
      {zones.map((zone) => (
        <button
          key={zone.id}
          onClick={() => onSelect(zone)}
          className={`
            group flex-shrink-0 relative w-40 p-3 rounded-xl border transition-all duration-300 text-left
            ${activeZone.id === zone.id 
              ? 'bg-blue-600/20 border-blue-500/60 shadow-[0_0_15px_rgba(59,130,246,0.2)]' 
              : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900'}
          `}
        >
          <div className="flex items-center justify-between mb-2">
            <div className={`p-1.5 rounded-lg transition-colors ${activeZone.id === zone.id ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-500 group-hover:text-slate-300'}`}>
              <Map size={14} />
            </div>
            <div className="text-[8px] font-black text-slate-500 bg-slate-950/80 px-1.5 py-0.5 rounded border border-slate-800 uppercase tracking-tighter">
                Lv.{zone.recommendedLevel}
            </div>
          </div>
          
          <div className="text-left">
            <h4 className={`font-black text-xs truncate uppercase tracking-tighter ${activeZone.id === zone.id ? 'text-blue-400' : 'text-slate-300'}`}>
              {zone.name}
            </h4>
          </div>

          {activeZone.id === zone.id && (
              <div className="absolute -bottom-0.5 left-4 right-4 h-0.5 bg-blue-500 rounded-full blur-[0.5px]"></div>
          )}
        </button>
      ))}
    </div>
  );
};
