import React from 'react';
import { Zone } from '../../types';
import { Map } from 'lucide-react';

interface ZoneListProps {
  zones: Zone[];
  activeZone: Zone;
  onSelect: (zone: Zone) => void;
}

export const ZoneList: React.FC<ZoneListProps> = ({ zones, activeZone, onSelect }) => {
  return (
    <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-thin">
      {zones.map((zone) => (
        <button
          key={zone.id}
          onClick={() => onSelect(zone)}
          className={`
            group flex-shrink-0 relative w-48 p-4 rounded-xl border transition-all duration-300
            ${activeZone.id === zone.id 
              ? 'bg-blue-900/40 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]' 
              : 'bg-slate-800/60 border-slate-700 hover:bg-slate-800 hover:border-slate-500'}
          `}
        >
          <div className="flex items-start justify-between mb-2">
            <div className={`p-2 rounded-lg ${activeZone.id === zone.id ? 'bg-blue-600' : 'bg-slate-700 group-hover:bg-slate-600'}`}>
              <Map size={20} className="text-white" />
            </div>
            <span className="text-xs font-mono text-slate-400 bg-slate-900/80 px-2 py-1 rounded">
              Lv.{zone.recommendedLevel}
            </span>
          </div>
          <div className="text-left">
            <h4 className={`font-bold text-sm ${activeZone.id === zone.id ? 'text-blue-300' : 'text-slate-200'}`}>
              {zone.name}
            </h4>
          </div>
        </button>
      ))}
    </div>
  );
};