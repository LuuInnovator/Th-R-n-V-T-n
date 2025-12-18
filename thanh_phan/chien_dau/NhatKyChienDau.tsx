
import React, { useState } from 'react';
import { KhungVien } from '../KhungVien';
import { ChevronDown, ChevronUp, ScrollText, Trash2 } from 'lucide-react';
import { DongNhatKy } from '../../logic_game/nhat_ky';

interface Props {
  nhat_ky: DongNhatKy[];
  onXoa?: () => void;
}

export const NhatKyChienDau: React.FC<Props> = ({ nhat_ky, onXoa }) => {
  const [dangMo, datDangMo] = useState(true);

  return (
    <KhungVien 
      className={`transition-all duration-300 ease-in-out flex flex-col shadow-xl border-slate-700 ${dangMo ? 'h-[250px]' : 'h-12'}`}
      khongPadding
    >
      <div className="flex items-center justify-between p-3 bg-slate-900 border-b border-slate-800 select-none shrink-0">
        <div 
          className="flex items-center gap-2 cursor-pointer hover:text-blue-400 transition-colors"
          onClick={() => datDangMo(!dangMo)}
        >
          <ScrollText size={16} className="text-blue-500" />
          <h3 className="text-[11px] font-black text-slate-300 uppercase tracking-widest">
            NHẬT KÝ VIỄN CHINH ({nhat_ky.length})
          </h3>
        </div>
        
        <div className="flex items-center gap-2">
          {dangMo && nhat_ky.length > 0 && onXoa && (
            <button onClick={onXoa} className="text-slate-500 hover:text-red-400 p-1" title="Xóa toàn bộ">
              <Trash2 size={14} />
            </button>
          )}
          <button onClick={() => datDangMo(!dangMo)} className="text-slate-500 hover:text-slate-300">
            {dangMo ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
          </button>
        </div>
      </div>

      <div className={`flex-1 overflow-y-auto p-3 space-y-1.5 scrollbar-thin bg-slate-950/50 ${dangMo ? 'opacity-100' : 'opacity-0 hidden'}`}>
        {nhat_ky.length === 0 ? (
          <div className="text-slate-600 text-[10px] italic text-center mt-10 uppercase tracking-widest opacity-50">Sẵn sàng nhận lệnh...</div>
        ) : (
          nhat_ky.map((log) => (
            <div key={log.id} className="text-[10px] font-mono text-slate-400 border-l-2 border-slate-800 pl-3 py-1 leading-relaxed hover:bg-white/5 rounded transition-colors break-words">
              {log.tin_nhan}
            </div>
          ))
        )}
      </div>
    </KhungVien>
  );
};
