
import React, { useState, useMemo } from 'react';
import { Infinity, AlertTriangle, ArrowUpCircle, Sparkles, RefreshCcw, Star, Swords, Coins, Zap, Trophy, Target, Flame, Lock, Skull, Info, Package } from 'lucide-react';
import { NutBam } from '../NutBam';
import { Player, Equipment } from '../../kieu_du_lieu';
import { dinh_dang_so } from '../../tien_ich/tinh_toan';

interface Props {
  player: Player;
  onRebirth: (thienPhu?: string, legacyItemId?: string) => void;
  canRebirth: boolean;
  equippedItems?: Equipment[];
}

export const CongLuanHoi: React.FC<Props> = ({ player, onRebirth, canRebirth, equippedItems = [] }) => {
  const [thienPhuChon, setThienPhuChon] = useState<string | null>(null);
  const [legacyItemChon, setLegacyItemChon] = useState<string | null>(null);

  const epNhanDuoc = player.level * 10;
  const diemTiemNangMoi = 10 + (player.rebirthCount * 10);

  const options = useMemo(() => [
    { id: 'tp_atk', name: 'Sát Ý Vô Tận', icon: Swords, desc: 'Tăng vĩnh viễn 10% Sát thương.', color: 'text-red-400' },
    { id: 'tp_gold', name: 'Phước Lành Midas', icon: Coins, desc: 'Nhận thêm 20% Vàng.', color: 'text-amber-400' },
    { id: 'tp_spd', name: 'Thần Tốc', icon: Zap, desc: 'Tăng 5% Tốc độ đánh.', color: 'text-cyan-400' }
  ], []);

  return (
    <div className="flex flex-col items-center max-w-5xl mx-auto py-10 space-y-12 animate-fade-in pb-32">
      <div className="text-center space-y-4">
        <h2 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 bg-clip-text text-transparent uppercase tracking-tighter italic drop-shadow-2xl">
          NGHI LỄ LUÂN HỒI
        </h2>
      </div>

      {/* Legacy Gear Selection */}
      {canRebirth && (
          <div className="w-full bg-slate-900/40 border border-white/5 rounded-[3rem] p-8 md:p-12 space-y-8">
              <div className="flex items-center gap-4">
                  <Package size={28} className="text-blue-400" />
                  <h3 className="text-2xl font-black text-white uppercase italic tracking-widest">Dấu Ấn Luân Hồi (Kế thừa)</h3>
              </div>
              <p className="text-xs text-slate-500 italic">Chọn duy nhất 1 trang bị bạn muốn giữ lại cho kiếp sau. Sức mạnh của nó sẽ bị khóa và mở lại dần theo Level mới của bạn.</p>
              
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  {equippedItems.filter(i => i !== null).map(item => (
                      <button 
                        key={item.id}
                        onClick={() => setLegacyItemChon(item.id)}
                        className={`aspect-square rounded-2xl border-2 flex flex-col items-center justify-center p-2 transition-all ${legacyItemChon === item.id ? 'border-blue-500 bg-blue-500/10' : 'border-white/5 bg-slate-950'}`}
                      >
                          <span className="text-[7px] font-black uppercase text-slate-500 mb-1">{item.type}</span>
                          <span className="text-[8px] font-black text-white truncate w-full text-center">{item.name}</span>
                          {legacyItemChon === item.id && <Sparkles size={12} className="text-blue-400 mt-2" />}
                      </button>
                  ))}
                  {equippedItems.length === 0 && (
                      <div className="col-span-full py-10 text-center text-slate-700 font-black uppercase text-[10px]">Bạn không mặc trang bị nào có thể kế thừa.</div>
                  )}
              </div>
          </div>
      )}

      {/* Thiên Phú Selection */}
      {canRebirth && (
          <div className="w-full flex flex-col items-center gap-10">
              <h4 className="text-xl font-black text-white uppercase italic">Chọn Mảnh Linh Hồn Kiếp Sau</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                  {options.map(tp => (
                      <button 
                          key={tp.id}
                          onClick={() => setThienPhuChon(tp.id)}
                          className={`p-6 rounded-[2.5rem] border-2 transition-all flex flex-col items-center text-center gap-4 ${thienPhuChon === tp.id ? 'bg-indigo-600/20 border-indigo-500' : 'bg-slate-900/40 border-white/5'}`}
                      >
                          <tp.icon size={24} className={tp.color} />
                          <span className="text-sm font-black text-white uppercase">{tp.name}</span>
                          <p className="text-[10px] text-slate-500 font-bold">{tp.desc}</p>
                      </button>
                  ))}
              </div>

              <div className="w-full max-w-md pt-10">
                  <NutBam 
                      kich_co="xl" rong_het_co
                      disabled={!thienPhuChon}
                      onClick={() => onRebirth(thienPhuChon || undefined, legacyItemChon || undefined)} 
                  >
                      <Infinity size={24} /> XÁC NHẬN LUÂN HỒI
                  </NutBam>
              </div>
          </div>
      )}

      {!canRebirth && (
          <div className="w-full max-w-2xl bg-slate-900/80 p-10 rounded-[3rem] border border-red-500/20 text-center">
              <Lock size={48} className="mx-auto text-red-500/30 mb-4" />
              <h4 className="text-xl font-black text-white uppercase italic">Chưa Đủ Tư Cách</h4>
              <p className="text-[10px] text-slate-500 font-black uppercase mt-4">Yêu cầu đạt Cấp độ 50.</p>
          </div>
      )}
    </div>
  );
};
