
import React from 'react';
import { Enemy, MutationType } from '../../kieu_du_lieu';
import { NutBam } from '../NutBam';
import { Shield, Skull, Map, Repeat, Target, Ghost, Zap } from 'lucide-react';

interface Props {
  enemy: Enemy | null;
  moTaVung: string;
  onTimKiem: () => void;
  onTanCong: () => void;
  dangTuDong?: boolean;
  onDoiTuDong?: () => void;
}

export const HienThiQuaiVat: React.FC<Props> = ({ 
  enemy, moTaVung, onTimKiem, onTanCong, dangTuDong, onDoiTuDong 
}) => {
  if (!enemy) {
    return (
      <div className="text-center animate-fade-in py-4">
        <div className="inline-block p-6 bg-slate-900/50 rounded-full mb-4 border border-slate-800 shadow-xl">
            <Map className="w-12 h-12 text-slate-700" />
        </div>
        <div className="bg-slate-900/80 p-6 rounded-3xl border border-slate-800 backdrop-blur-md max-w-sm mx-auto">
            <h3 className="text-lg font-black text-slate-200 mb-1 uppercase tracking-tighter italic">Vùng Hoang Vu</h3>
            <p className="text-[10px] text-slate-500 mb-6 italic opacity-70">"{moTaVung}"</p>
            <NutBam kich_co="lg" onClick={onTimKiem} rong_het_co className="shadow-blue-900/40">
                <Skull size={18} /> TRUY TÌM MỤC TIÊU
            </NutBam>
        </div>
      </div>
    );
  }

  const phanTramMau = (enemy.hp / enemy.maxHp) * 100;
  
  return (
    <div className="w-full max-w-md flex flex-col items-center animate-fade-in px-4 py-2">
      <div className="flex gap-2 mb-3">
          {enemy.isBoss && (
              <div className="bg-red-600 px-3 py-1 rounded-full text-[8px] font-black uppercase text-white shadow-lg border border-red-400 flex items-center gap-1">
                  <Skull size={10} /> TRÙM
              </div>
          )}
          {enemy.mutation && enemy.mutation !== MutationType.None && (
              <div className="bg-purple-600 px-3 py-1 rounded-full text-[8px] font-black uppercase text-white border border-purple-400 flex items-center gap-1">
                  <Ghost size={10}/> {enemy.mutation.toUpperCase()}
              </div>
          )}
      </div>

      <div className="text-center mb-4">
         <h2 className={`text-2xl font-black tracking-tighter uppercase italic mb-1 ${enemy.isBoss ? 'text-red-500' : 'text-slate-100'}`}>
            {enemy.name}
         </h2>
         <div className="flex items-center justify-center gap-2">
            <span className="text-[9px] font-black text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 uppercase">CẤP {enemy.level}</span>
            <span className="text-[9px] font-black text-blue-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 uppercase">{enemy.element}</span>
         </div>
      </div>

      <div className="w-full h-8 bg-slate-950 rounded-xl border border-slate-800 relative overflow-hidden shadow-inner mb-6">
         <div 
            className={`h-full transition-all duration-300 ease-out relative ${enemy.isBoss ? 'bg-gradient-to-r from-red-700 to-rose-400' : 'bg-red-600'}`}
            style={{ width: `${phanTramMau}%` }}
         >
             <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
         </div>
         <div className="absolute inset-0 flex items-center justify-between px-4 text-[9px] font-black text-white uppercase italic">
            <span>SINH LỰC</span>
            <span className="tabular-nums">{enemy.hp.toLocaleString()} / {enemy.maxHp.toLocaleString()}</span>
         </div>
      </div>

      <div className="relative mb-6 group">
          <div className={`absolute inset-0 blur-[40px] opacity-10 rounded-full ${enemy.isBoss ? 'bg-red-600' : 'bg-blue-600'}`}></div>
          <div className={`w-32 h-32 rounded-3xl border-2 flex items-center justify-center relative z-10 transition-all ${enemy.isBoss ? 'border-red-600 bg-slate-900 shadow-xl' : 'border-slate-800 bg-slate-900/50'}`}>
              <Target size={60} className={enemy.isBoss ? 'text-red-500' : 'text-slate-700'} />
          </div>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full max-w-xs mb-6">
          <div className="bg-slate-900/60 p-2 rounded-2xl border border-slate-800 flex flex-col items-center">
              <Zap size={12} className="text-orange-400 mb-0.5"/>
              <span className="text-[7px] text-slate-500 font-black uppercase">Công</span>
              <span className="text-xs font-black text-slate-100">{enemy.attack.toLocaleString()}</span>
          </div>
          <div className="bg-slate-900/60 p-2 rounded-2xl border border-slate-800 flex flex-col items-center">
              <Shield size={12} className="text-blue-400 mb-0.5"/>
              <span className="text-[7px] text-slate-500 font-black uppercase">Thủ</span>
              <span className="text-xs font-black text-slate-100">{enemy.defense.toLocaleString()}</span>
          </div>
      </div>

      <div className="flex gap-3 w-full max-w-sm">
          <NutBam 
            kieu="nguy_hiem" 
            kich_co="lg" 
            rong_het_co
            onClick={onTanCong} 
            className="h-14 text-sm font-black tracking-widest italic"
          >
            QUYẾT CHIẾN
          </NutBam>

          {onDoiTuDong && (
             <NutBam 
              kieu={dangTuDong ? 'chinh' : 'vien'}
              kich_co="lg" 
              onClick={onDoiTuDong}
              className={`w-14 h-14 shrink-0 ${dangTuDong ? 'animate-pulse' : ''}`}
            >
              <Repeat size={20} />
            </NutBam>
          )}
      </div>
    </div>
  );
};
