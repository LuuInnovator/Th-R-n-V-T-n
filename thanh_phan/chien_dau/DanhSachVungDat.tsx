
import React from 'react';
import { Zone } from '../../kieu_du_lieu';
import { Map } from 'lucide-react';

interface Props {
  zones: Zone[];
  activeZone: Zone;
  onSelect: (zone: Zone) => void;
  blueprints: any[];
  dropRateBonus: number;
}

export const DanhSachVungDat: React.FC<Props> = ({ 
  zones, 
  activeZone, 
  onSelect
}) => {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide px-6 mobile-scroll-x">
      {zones.map((vung) => {
        const isActive = activeZone.id === vung.id;
        return (
          <button
            key={vung.id}
            onClick={() => onSelect(vung)}
            className={`group flex-shrink-0 relative w-48 p-4 rounded-2xl border transition-all duration-300 text-left overflow-hidden ${isActive ? 'bg-blue-600/10 border-blue-500/50 shadow-lg' : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'}`}
          >
            <div className="flex items-center justify-between mb-2 relative z-10">
              <div className={`p-2 rounded-lg ${isActive ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-500'}`}>
                <Map size={14} />
              </div>
              <span className={`text-[8px] font-black uppercase ${isActive ? 'text-blue-400' : 'text-slate-600'}`}>
                Cấp {vung.recommendedLevel}
              </span>
            </div>
            
            <div className="relative z-10">
              <h4 className={`font-black text-[11px] mb-0.5 truncate uppercase tracking-tighter italic ${isActive ? 'text-white' : 'text-slate-400'}`}>
                {vung.name}
              </h4>
              <p className="text-[8px] text-slate-600 font-medium line-clamp-1">
                {vung.description}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};
