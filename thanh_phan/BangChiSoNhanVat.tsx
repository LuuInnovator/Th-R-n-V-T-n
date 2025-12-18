
import React, { useMemo } from 'react';
import { Player, Equipment, EquipmentType } from '../kieu_du_lieu';
import { tinh_toan_chi_so_nhan_vat } from '../tien_ich/tinh_toan_chi_so';
import { X, Crown, Sparkles } from 'lucide-react';
import { dinh_dang_so } from '../tien_ich/tinh_toan';
import { MAU_DO_HIEM } from '../hang_so/do_hiem';
import { TheTrangThaiChienDau } from './nhan_vat/TheTrangThaiChienDau';
import { BangTiemNang } from './nhan_vat/BangTiemNang';

interface Props {
  player: Player;
  equipped: any;
  onClose: () => void;
  getStatMultiplier: (base: number) => number;
  onAllocate: (stat: keyof Player['stats'], amount: number) => void;
  onUnequip?: (type: any) => void;
}

export const BangChiSoNhanVat: React.FC<Props> = ({ 
  player, equipped, onClose, getStatMultiplier, onAllocate, onUnequip
}) => {
  const stats = useMemo(() => tinh_toan_chi_so_nhan_vat(player, equipped, getStatMultiplier), [player, equipped, getStatMultiplier]);

  const luonChien = useMemo(() => {
    return Math.floor((stats.totalAtk * 1.5) + (stats.totalDef * 1.2) + (stats.totalHp / 10));
  }, [stats]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/98 backdrop-blur-3xl p-4 animate-fade-in overflow-hidden">
      <div className="glass-card rounded-[4rem] w-full max-w-5xl h-full max-h-[85vh] flex flex-col relative overflow-hidden border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,1)]">
        
        {/* Header Cao Cấp */}
        <div className="p-10 flex justify-between items-center bg-slate-900/40 border-b border-white/5">
           <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-800 rounded-[1.8rem] flex items-center justify-center border-2 border-white/20 shadow-2xl animate-float">
                 <Crown className="text-white" size={32} />
              </div>
              <div className="flex flex-col">
                 <div className="flex items-center gap-3">
                    <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none">HỒ SƠ ANH HÙNG</h2>
                    <span className="px-3 py-1 bg-amber-500 rounded-lg text-slate-950 text-xs font-black">LV.{player.level}</span>
                 </div>
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mt-2 italic">{player.characterClass}</span>
              </div>
           </div>
           <button onClick={onClose} className="w-14 h-14 bg-slate-950 hover:bg-rose-600/20 rounded-2xl transition-all border border-white/5 flex items-center justify-center text-slate-500 hover:text-rose-500">
              <X size={28} />
           </button>
        </div>

        <div className="flex-1 overflow-y-auto p-10 scrollbar-hide">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Cột Trái: Tiềm Năng */}
              <div className="lg:col-span-4">
                  <BangTiemNang 
                    stats={player.stats} 
                    points={player.statPoints} 
                    onAllocate={(s) => onAllocate(s, 1)} 
                  />
              </div>

              {/* Cột Phải: Trạng Thái Chiến Đấu & Thông Số Chính */}
              <div className="lg:col-span-8 space-y-8">
                  {/* Container 6 Thẻ Đỏ */}
                  <div className="bg-slate-950/40 p-8 rounded-[3rem] border border-white/5">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                          <TheTrangThaiChienDau label="NÉ TRÁNH" value={stats.dodge} />
                          <TheTrangThaiChienDau label="PHẢN ĐÒN" value={stats.reflect} />
                          <TheTrangThaiChienDau label="CÂM LẶNG" value={stats.silence} />
                          <TheTrangThaiChienDau label="CHOÁNG" value={stats.stun} />
                          <TheTrangThaiChienDau label="HỒI PHỤC" value={stats.regen} isPercent={false} />
                          <TheTrangThaiChienDau label="HÚT MÁU" value={stats.lifesteal} />
                      </div>

                      <div className="w-full h-px bg-white/5 mb-8"></div>

                      {/* Thông số cốt lõi */}
                      <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                              <span className="text-[9px] font-black text-slate-600 uppercase block mb-1">TẤN CÔNG</span>
                              <span className="text-4xl font-black text-rose-500 tabular-nums italic">{dinh_dang_so(stats.totalAtk)}</span>
                          </div>
                          <div>
                              <span className="text-[9px] font-black text-slate-600 uppercase block mb-1">PHÒNG THỦ</span>
                              <span className="text-4xl font-black text-blue-500 tabular-nums italic">{dinh_dang_so(stats.totalDef)}</span>
                          </div>
                          <div>
                              <span className="text-[9px] font-black text-slate-600 uppercase block mb-1">LỰC CHIẾN</span>
                              <span className="text-4xl font-black text-amber-500 tabular-nums italic drop-shadow-lg">{dinh_dang_so(luonChien)}</span>
                          </div>
                      </div>
                  </div>

                  {/* Khu vực trang bị mini */}
                  <div className="bg-slate-900/20 p-6 rounded-[2.5rem] border border-white/5">
                      <div className="grid grid-cols-7 gap-4">
                          {[
                            EquipmentType.Weapon, EquipmentType.Armor, EquipmentType.Helmet, 
                            EquipmentType.Boots, EquipmentType.Necklace, 'Ring1', 'Ring2'
                          ].map(key => {
                              const item = (equipped as any)[key];
                              return (
                                  <div key={key} className="flex flex-col items-center gap-2">
                                      <div className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-all ${item ? `bg-slate-950 border-white/20 shadow-xl ${MAU_DO_HIEM[item.rarity]}` : 'bg-slate-950/20 border-dashed border-slate-800 opacity-20'}`}>
                                          {item ? <Sparkles size={20} /> : <div className="w-1 h-1 bg-slate-700 rounded-full"></div>}
                                      </div>
                                      <span className="text-[8px] font-black text-slate-700 uppercase truncate w-full text-center">
                                          {key.replace('Ring', 'NHẪN ')}
                                      </span>
                                  </div>
                              );
                          })}
                      </div>
                  </div>
              </div>
           </div>
        </div>

        {/* Footer info */}
        <div className="p-8 bg-slate-950 border-t border-white/5 flex justify-between items-center shrink-0">
           <div className="flex gap-10">
              <div className="flex flex-col">
                  <span className="text-[8px] font-black text-slate-700 uppercase mb-1">LUÂN HỒI</span>
                  <span className="text-sm font-black text-white italic">BẬC {player.rebirthCount}</span>
              </div>
              <div className="flex flex-col">
                  <span className="text-[8px] font-black text-slate-700 uppercase mb-1">NGÂN LƯỢNG</span>
                  <span className="text-sm font-black text-amber-500 italic">{dinh_dang_so(player.gold)} VÀNG</span>
              </div>
           </div>
           <div className="text-[9px] font-black text-slate-800 uppercase tracking-[1em] italic opacity-40">FORGE SYSTEM V2.6.5</div>
        </div>
      </div>
    </div>
  );
};
