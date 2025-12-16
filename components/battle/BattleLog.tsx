import React, { useState } from 'react';
import { Card } from '../Card';
import { ChevronDown, ChevronUp, ScrollText, Trash2 } from 'lucide-react';
import { LogEntry } from '../../hooks/useGameLog';

interface BattleLogProps {
  logs: LogEntry[];
  onClear?: () => void;
}

export const BattleLog: React.FC<BattleLogProps> = ({ logs, onClear }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Card 
      className={`
        transition-all duration-300 ease-in-out flex flex-col shadow-xl border-slate-700
        ${isExpanded ? 'h-[200px]' : 'h-10'} 
      `}
      noPadding
    >
      {/* Header Bar */}
      <div 
        className="flex items-center justify-between p-2 bg-slate-900/80 border-b border-slate-700 select-none shrink-0"
      >
        <div 
          className="flex items-center gap-2 cursor-pointer hover:text-blue-400 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <ScrollText size={14} className="text-blue-500" />
          <h3 className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
            Nhật Ký {logs.length > 0 && `(${logs.length})`}
          </h3>
        </div>
        
        <div className="flex items-center gap-2">
          {isExpanded && logs.length > 0 && onClear && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
              className="text-slate-500 hover:text-red-400 transition-colors p-1"
              title="Xóa nhật ký"
            >
              <Trash2 size={12} />
            </button>
          )}
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-slate-500 hover:text-slate-300 transition-colors"
          >
            {isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
        </div>
      </div>

      {/* Log Content */}
      <div 
        className={`
          flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin bg-slate-950/30
          ${isExpanded ? 'opacity-100' : 'opacity-0 hidden'}
        `}
      >
        {logs.length === 0 ? (
          <div className="text-slate-600 text-[10px] italic text-center mt-4">
            Chưa có hoạt động...
          </div>
        ) : (
          logs.map((log) => (
            <div 
              key={log.id} 
              className="text-[10px] font-mono text-slate-300 border-l-2 border-slate-700 pl-2 py-0.5 leading-relaxed hover:bg-slate-800/50 rounded break-words"
            >
              {log.message}
            </div>
          ))
        )}
      </div>
    </Card>
  );
};