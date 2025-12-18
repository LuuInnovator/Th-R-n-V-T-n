
import React from 'react';
import { Enemy, MutationType } from '../../kieu_du_lieu';
import { NutBam } from '../NutBam';
// Added Activity to the imports to fix the error on line 77
import { Shield, Skull, Map, Repeat, Target, Ghost, Zap, Crosshair, Radar, AlertTriangle, Sparkles, Activity } from 'lucide-react';
import { dinh_dang_so } from '../../tien_ich/tinh_toan';

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
      <div className="text-center animate-fade-in py-10 flex flex-col items-center gap-8">
        <div className="relative">
            <div className="w-32 h-32 rounded-full bg-slate-900 flex items-center justify-center border border-white/5 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent"></div>
                <Radar size={56} className="text-slate-800 group-hover:scale-110 transition-transform animate-spin-slow" />
            </div>
            <div className="absolute -inset-4 border border-blue-500/10 rounded-full animate-pulse"></div>
        </div>
        
        <div className="bg-slate-900/60 p-10 rounded-[3rem] border border-white/5 backdrop-blur-3xl max-w-sm mx-auto shadow-2xl relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-slate-950 border border-white/10 rounded-full text-[8px] font-black text-slate-500 uppercase tracking-widest">RADAR_OFFLINE</div>
            <h3 className="text-xl font-black text-slate-100 mb-2 uppercase tracking-tighter italic">VÙNG HOANG VU</h3>
            <p className="text-[11px] text-slate-500 mb-8 italic opacity-70 leading-relaxed font-medium">"{moTaVung}"</p>
            <NutBam kich_co="xl" onClick={onTimKiem} rong_het_co className="shadow-[0_20px_40px_rgba(37,99,235,0.2)]">
                <Crosshair size={20} /> QUÉT MỤC TIÊU
            </NutBam>
        </div>
      </div>
    );
  }

  const phanTramMau = (enemy.hp / enemy.maxHp) * 100;
  
  return (
    <div className="w-full max-w-xl flex flex-col items-center animate-fade-in px-4 py-2 relative">
      {/* Hiệu ứng tia sét/ánh sáng nền */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] blur-[100px] opacity-10 rounded-full ${enemy.isBoss ? 'bg-red-600' : 'bg-blue-600'}`}></div>

      <div className="flex gap-4 mb-6 relative z-10">
          {enemy.isBoss && (
              <div className="bg-red-600 px-5 py-2 rounded-2xl text-[10px] font-black uppercase text-white shadow-[0_10px_20px_rgba(220,38,38,0.4)] border border-red-400 flex items-center gap-2 animate-bounce">
                  <Skull size={14} /> THỰC THỂ TRÙM
              </div>
          )}
          {enemy.mutation && enemy.mutation !== MutationType.None && (
              <div className="bg-purple-600 px-5 py-2 rounded-2xl text-[10px] font-black uppercase text-white border border-purple-400 flex items-center gap-2 shadow-lg shadow-purple-900/20">
                  <Sparkles size={14}/> BIẾN DỊ: {enemy.mutation.toUpperCase()}
              </div>
          )}
      </div>

      <div className="text-center mb-8 relative z-10">
         <h2 className={`text-5xl font-black tracking-tighter uppercase italic mb-3 drop-shadow-2xl ${enemy.isBoss ? 'text-red-500' : 'text-slate-100'}`}>
            {enemy.name}
         </h2>
         <div className="flex items-center justify-center gap-4">
            <span className="text-[10px] font-black text-slate-400 bg-slate-950 px-4 py-1.5 rounded-xl border border-white/10 uppercase tracking-widest">CẤP ĐỘ {enemy.level}</span>
            <span className="text-[10px] font-black text-blue-400 bg-slate-950 px-4 py-1.5 rounded-xl border border-white/10 uppercase tracking-widest italic">{enemy.element}</span>
         </div>
      </div>

      {/* Thanh Máu Quái Vật Pro */}
      <div className="w-full max-w-lg space-y-2 mb-10 relative z-10">
          <div className="flex justify-between items-center px-2">
              <span className="text-[10px] font-black text-rose-500 uppercase italic tracking-[0.2em] flex items-center gap-2">
                 <Activity size={12} className="animate-pulse" /> SINH LỰC THỰC THỂ
              </span>
              <div className="text-sm font-black text-white tabular-nums tracking-tighter">
                {dinh_dang_so(enemy.hp)} <span className="text-slate-700 opacity-50">/</span> {dinh_dang_so(enemy.maxHp)}
              </div>
          </div>
          <div className="h-10 bg-slate-950/80 rounded-[1.2rem] border border-white/10 relative overflow-hidden shadow-2xl p-1.5">
             <div 
                className={`h-full rounded-lg transition-all duration-300 ease-out relative group ${enemy.isBoss ? 'bg-gradient-to-r from-red-800 via-rose-600 to-pink-500' : 'bg-gradient-to-r from-red-600 to-rose-400'}`}
                style={{ width: `${phanTramMau}%` }}
             >
                 {/* Hiệu ứng quét sáng chạy qua thanh máu */}
                 <div className="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse translate-x-full"></div>
                 <div className="absolute inset-0 bg-white/5 pointer-events-none"></div>
             </div>
          </div>
      </div>

      {/* Avatar Quái Vật Scanner Look */}
      <div className="relative mb-12 group cursor-crosshair">
          <div className="absolute -inset-10 bg-blue-500/5 blur-[80px] rounded-full group-hover:bg-blue-500/10 transition-all"></div>
          
          {/* Góc quét scanner */}
          <div className="absolute -top-4 -left-4 w-12 h-12 border-t-4 border-l-4 border-slate-700 rounded-tl-3xl opacity-50 group-hover:border-blue-500 group-hover:opacity-100 transition-all"></div>
          <div className="absolute -top-4 -right-4 w-12 h-12 border-t-4 border-r-4 border-slate-700 rounded-tr-3xl opacity-50 group-hover:border-blue-500 group-hover:opacity-100 transition-all"></div>
          <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-4 border-l-4 border-slate-700 rounded-bl-3xl opacity-50 group-hover:border-blue-500 group-hover:opacity-100 transition-all"></div>
          <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-4 border-r-4 border-slate-700 rounded-br-3xl opacity-50 group-hover:border-blue-500 group-hover:opacity-100 transition-all"></div>

          <div className={`w-44 h-44 rounded-[3.5rem] border-2 flex items-center justify-center relative z-10 transition-all duration-500 transform group-hover:scale-105 shadow-2xl ${enemy.isBoss ? 'border-red-600/50 bg-slate-900 shadow-red-900/20' : 'border-white/10 bg-slate-900/60 shadow-black/80'}`}>
              <Target size={90} className={`relative z-20 ${enemy.isBoss ? 'text-red-500' : 'text-slate-800'}`} />
              <div className="absolute inset-0 bg-grid opacity-10 rounded-[3.5rem]"></div>
              {/* Vạch kẻ ngang di chuyển */}
              <div className="absolute left-0 right-0 h-[2px] bg-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.5)] z-20 animate-[move-down_4s_linear_infinite]"></div>
          </div>
      </div>

      {/* Chỉ số Công Thủ Pro */}
      <div className="grid grid-cols-2 gap-6 w-full max-w-sm mb-12 relative z-10">
          <div className="bg-slate-900/60 p-5 rounded-[2.2rem] border border-white/5 flex flex-col items-center group/stat shadow-xl hover:border-orange-500/20 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-400 mb-3 shadow-inner">
                  <Zap size={22} />
              </div>
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">CÔNG VẬT LÝ</span>
              <span className="text-2xl font-black text-white tabular-nums tracking-tighter italic">{dinh_dang_so(enemy.attack)}</span>
          </div>
          <div className="bg-slate-900/60 p-5 rounded-[2.2rem] border border-white/5 flex flex-col items-center group/stat shadow-xl hover:border-blue-500/20 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-3 shadow-inner">
                  <Shield size={22} />
              </div>
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">HỆ PHÒNG NGỰ</span>
              <span className="text-2xl font-black text-white tabular-nums tracking-tighter italic">{dinh_dang_so(enemy.defense)}</span>
          </div>
      </div>

      <div className="flex gap-4 w-full max-w-md relative z-10">
          <NutBam 
            kieu="nguy_hiem" 
            kich_co="xl" 
            rong_het_co
            onClick={onTanCong} 
            className="h-20 text-lg font-black tracking-[0.2em] italic shadow-[0_25px_50px_-12px_rgba(225,29,72,0.4)]"
          >
            QUYẾT CHIẾN
          </NutBam>

          {onDoiTuDong && (
             <NutBam 
              kieu={dangTuDong ? 'chinh' : 'vien'}
              kich_co="lg" 
              onClick={onDoiTuDong}
              className={`w-20 h-20 shrink-0 rounded-3xl ${dangTuDong ? 'shadow-[0_0_20px_rgba(37,99,235,0.4)]' : ''}`}
            >
              <Repeat size={24} className={dangTuDong ? 'animate-spin' : ''} />
            </NutBam>
          )}
      </div>

      <style>{`
        @keyframes move-down {
            0% { top: 0; }
            50% { top: 100%; }
            100% { top: 0; }
        }
      `}</style>
    </div>
  );
};
