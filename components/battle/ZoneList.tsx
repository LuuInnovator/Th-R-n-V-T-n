
import React from 'react';
import { Zone, Blueprint } from '../../types';
import { Map } from 'lucide-react';

interface ZoneListProps {
  zones: Zone[];
  activeZone: Zone;
  onSelect: (zone: Zone) => void;
  blueprints?: Blueprint[]; 
  dropRateBonus?: number;
}

export const ZoneList: React.FC<ZoneListProps> = ({ zones, activeZone, onSelect }) => {
  return (
    <>
      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-thin px-2">
        {zones.map((zone) => (
          <div
            key={zone.id}
            onClick={() => onSelect(zone)}
            className={`
              group flex-shrink-0 relative w-48 p-4 rounded-xl border transition-all duration-300 cursor-pointer
              ${activeZone.id === zone.id 
                ? 'bg-blue-900/40 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]' 
                : 'bg-slate-800/60 border-slate-700 hover:bg-slate-800 hover:border-slate-500'}
            `}
          >
            <div className="flex items-start justify-between mb-2 pr-2">
              <div className={`p-2 rounded-lg ${activeZone.id === zone.id ? 'bg-blue-600' : 'bg-slate-700 group-hover:bg-slate-600'}`}>
                <Map size={20} className="text-white" />
              </div>
            </div>
            
            <div className="text-left mt-2">
              <div className="flex justify-between items-center mb-1">
                 <span className="text-[10px] font-mono text-slate-400 bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-700">
                    Lv.{zone.recommendedLevel}
                  </span>
                  {zone.reqRebirth ? (
                      <span className="text-[9px] font-bold text-purple-400 bg-purple-900/20 px-1 rounded">RB {zone.reqRebirth}</span>
                  ) : null}
              </div>
              <h4 className={`font-bold text-sm truncate ${activeZone.id === zone.id ? 'text-blue-300' : 'text-slate-200'}`}>
                {zone.name}
              </h4>
              <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                  {zone.materials.join(', ')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
