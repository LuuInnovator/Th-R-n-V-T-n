
import React, { useState } from 'react';
import { Player, EternalUpgrade } from '../kieu_du_lieu';
import { ShoppingBag, RefreshCw } from 'lucide-react';
import { CongLuanHoi } from './luan_hoi/CongLuanHoi';
import { CuaHangVinhHang } from './luan_hoi/CuaHangVinhHang';

interface Props {
  player: Player;
  onRebirth: () => void;
  canRebirth: boolean;
  onBuyUpgrade: (upgrade: EternalUpgrade) => void;
}

export const GiaoDienLuanHoi: React.FC<Props> = ({ player, onRebirth, canRebirth, onBuyUpgrade }) => {
  const [tabHienTai, datTabHienTai] = useState<'hanh_dong' | 'cua_hang'>('hanh_dong');

  return (
    <div className="h-full max-w-5xl mx-auto w-full p-4 flex flex-col gap-6 overflow-hidden">
      <div className="flex justify-center p-1 bg-slate-900 rounded-2xl border border-slate-800 shrink-0 w-fit mx-auto">
        <button 
          onClick={() => datTabHienTai('hanh_dong')}
          className={`px-8 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2 ${tabHienTai === 'hanh_dong' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <RefreshCw size={14} /> Cổng Luân Hồi
        </button>
        <button 
          onClick={() => datTabHienTai('cua_hang')}
          className={`px-8 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2 ${tabHienTai === 'cua_hang' ? 'bg-amber-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <ShoppingBag size={14} /> Cửa Hàng EP
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin pr-2">
        {tabHienTai === 'hanh_dong' ? (
          <CongLuanHoi player={player} onRebirth={onRebirth} canRebirth={canRebirth} />
        ) : (
          <CuaHangVinhHang player={player} onBuyUpgrade={onBuyUpgrade} />
        )}
      </div>
    </div>
  );
};
