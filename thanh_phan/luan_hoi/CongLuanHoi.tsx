
import React, { useState, useMemo } from 'react';
import { Infinity, AlertTriangle, ArrowUpCircle, Sparkles, RefreshCcw, Star, Swords, Coins, Zap, Trophy, Target, Flame, Lock, Skull, Info } from 'lucide-react';
import { NutBam } from '../NutBam';
import { Player } from '../../kieu_du_lieu';
import { dinh_dang_so } from '../../tien_ich/tinh_toan';

interface Props {
  player: Player;
  onRebirth: (thienPhu?: string) => void;
  canRebirth: boolean;
}

export const CongLuanHoi: React.FC<Props> = ({ player, onRebirth, canRebirth }) => {
  const [thienPhuChon, setThienPhuChon] = useState<string | null>(null);

  const epNhanDuoc = player.level * 10;
  const diemTiemNangMoi = 10 + (player.rebirthCount * 10);

  const danhSachThienPhu = useMemo(() => [
    { id: 'tp_atk', name: 'Sát Ý Vô Tận', icon: Swords, desc: 'Tăng vĩnh viễn 10% Sát thương mỗi lần luân hồi.', color: 'text-red-400' },
    { id: 'tp_gold', name: 'Phước Lành Midas', icon: Coins, desc: 'Nhận thêm 20% Vàng từ mọi nguồn.', color: 'text-amber-400' },
    { id: 'tp_spd', name: 'Thần Tốc', icon: Zap, desc: 'Tăng 5% Tốc độ đánh tự động.', color: 'text-cyan-400' },
    { id: 'tp_luck', name: 'Vận May Thiên Định', icon: Star, desc: 'Tăng 2% Tỷ lệ rơi đồ hiếm.', color: 'text-emerald-400' }
  ], []);

  // Cơ chế "Chọn 1 từ 3": Lấy ngẫu nhiên 3 thiên phú từ kho dữ liệu
  const options = useMemo(() => {
    return [...danhSachThienPhu].sort(() => 0.5 - Math.random()).slice(0, 3);
  }, [danhSachThienPhu]);

  const achievementStats = [
    { label: 'Quái vật đã hạ', value: player.lifeStats.monstersKilled, icon: Skull, color: 'text-red-400' },
    { label: 'Vàng kiếm được', value: dinh_dang_so(player.lifeStats.goldEarned), icon: Coins, color: 'text-amber-400' },
    { label: 'Trang bị đã đúc', value: player.lifeStats.itemsCrafted, icon: Target, color: 'text-blue-400' },
    { label: 'Sát thương lớn nhất', value: dinh_dang_so(player.lifeStats.maxDamageDealt), icon: Flame, color: 'text-orange-500' }
  ];

  return (
    <div className="flex flex-col items-center max-w-5xl mx-auto py-10 space-y-12 animate-fade-in pb-32">
      <div className="text-center space-y-4">
        <h2 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 bg-clip-text text-transparent uppercase tracking-tighter italic drop-shadow-2xl">
          NGHI LỄ LUÂN HỒI
        </h2>
        <p className="text-slate-500 text-sm font-black uppercase tracking-[0.5em] animate-pulse">Phá vỡ giới hạn phàm trần để vươn tới vĩnh hằng</p>
      </div>

      {/* Bảng Tổng Kết Kiếp Này */}
      <div className="w-full bg-slate-900/40 border border-white/5 rounded-[3rem] p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10 flex flex-col gap-10">
            <div className="flex items-center gap-4">
                <Trophy size={28} className="text-amber-500" />
                <h3 className="text-2xl font-black text-white uppercase italic tracking-widest">Tổng Kết Kiếp Thứ {player.rebirthCount}</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {achievementStats.map((stat, idx) => (
                    <div key={idx} className="bg-slate-950/60 p-6 rounded-[2rem] border border-white/5 flex flex-col items-center text-center group hover:border-white/10 transition-all">
                        <stat.icon size={24} className={`${stat.color} mb-3 group-hover:scale-110 transition-transform`} />
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</span>
                        <span className="text-xl font-black text-white tabular-nums">{stat.value}</span>
                    </div>
                ))}
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <AlertTriangle size={18} className="text-rose-500" />
                        <span className="text-xs font-black text-slate-300 uppercase tracking-widest">Sự Hy Sinh Cần Thiết</span>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center p-4 bg-rose-500/5 border border-rose-500/10 rounded-2xl">
                            <span className="text-[10px] font-black text-slate-500 uppercase">Toàn bộ Cấp độ</span>
                            <span className="text-sm font-black text-rose-400">{player.level} → 1</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-rose-500/5 border border-rose-500/10 rounded-2xl">
                            <span className="text-[10px] font-black text-slate-500 uppercase">Kho Ngân Lượng</span>
                            <span className="text-sm font-black text-rose-400">{dinh_dang_so(player.gold)} → 0</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <ArrowUpCircle size={18} className="text-emerald-500" />
                        <span className="text-xs font-black text-slate-300 uppercase tracking-widest">Phước Lành Kiếp Sau</span>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                            <span className="text-[10px] font-black text-slate-500 uppercase">Tinh Hoa Luân Hồi (EP)</span>
                            <span className="text-sm font-black text-amber-400">+{dinh_dang_so(epNhanDuoc)} EP</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                            <span className="text-[10px] font-black text-slate-500 uppercase">Điểm Tiềm Năng Khởi Đầu</span>
                            <span className="text-sm font-black text-blue-400">+{diemTiemNangMoi} Pts</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* LỰA CHỌN THIÊN PHÚ: Giải thích cơ chế 1 từ 3 */}
      {canRebirth && (
          <div className="w-full flex flex-col items-center gap-10 animate-fade-in">
              <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-20 h-20 bg-indigo-600/10 rounded-full border border-indigo-500/20 flex items-center justify-center mb-4">
                      <RefreshCcw size={32} className="text-indigo-400 animate-spin-slow" />
                  </div>
                  <h4 className="text-xl font-black text-white uppercase tracking-tighter italic">Lựa Chọn 1 Thiên Phú Vĩnh Cửu</h4>
                  <div className="flex items-center gap-2 bg-indigo-500/10 px-4 py-2 rounded-xl border border-indigo-500/20">
                      <Info size={14} className="text-indigo-400" />
                      <p className="text-[10px] text-indigo-200 font-bold uppercase tracking-widest">
                          Hãy chọn duy nhất 1 trong 3 mảnh linh hồn ngẫu nhiên để mang theo vĩnh viễn
                      </p>
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                  {options.map(tp => (
                      <button 
                          key={tp.id}
                          onClick={() => setThienPhuChon(tp.id)}
                          className={`group relative p-8 rounded-[2.5rem] border-2 transition-all flex flex-col items-center text-center gap-4 ${thienPhuChon === tp.id ? 'bg-indigo-600/20 border-indigo-500 shadow-[0_0_40px_rgba(79,70,229,0.2)]' : 'bg-slate-900/40 border-white/5 hover:border-white/10'}`}
                      >
                          <div className={`p-4 rounded-2xl bg-slate-950 border border-white/5 transition-transform group-hover:scale-110 ${tp.color}`}>
                              <tp.icon size={28} />
                          </div>
                          <span className="text-base font-black text-white uppercase tracking-tight">{tp.name}</span>
                          <p className="text-[11px] text-slate-500 font-bold leading-relaxed">{tp.desc}</p>
                          {thienPhuChon === tp.id && (
                              <div className="absolute -top-3 -right-3 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white shadow-lg">
                                  <Sparkles size={16} />
                              </div>
                          )}
                      </button>
                  ))}
              </div>

              <div className="w-full max-w-md pt-10">
                  <NutBam 
                      kich_co="xl" 
                      rong_het_co
                      disabled={!thienPhuChon}
                      onClick={() => onRebirth(thienPhuChon || undefined)} 
                      className="py-6 rounded-[2rem] bg-indigo-600 hover:bg-indigo-500 border-none shadow-[0_20px_60px_rgba(79,70,229,0.3)] group"
                  >
                      <Infinity size={24} className="group-hover:rotate-180 transition-transform duration-700" /> 
                      XÁC NHẬN LUÂN HỒI
                  </NutBam>
                  <p className="text-[9px] text-slate-700 text-center mt-6 font-black uppercase tracking-[0.3em] italic">"Cái chết không phải là kết thúc, mà là sự khởi đầu của một huyền thoại mới."</p>
              </div>
          </div>
      )}

      {!canRebirth && (
          <div className="w-full max-w-2xl bg-slate-900/80 p-10 rounded-[3rem] border border-red-500/20 text-center space-y-6">
              <div className="flex justify-center">
                  <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20">
                      <Lock size={32} className="text-red-500 opacity-50" />
                  </div>
              </div>
              <div className="space-y-2">
                  <h4 className="text-xl font-black text-white uppercase italic">Chưa Đủ Tư Cách Luân Hồi</h4>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-relaxed">
                      Bạn cần đạt cấp độ <span className="text-red-500">50</span> để có thể thực hiện nghi lễ hiến tế linh hồn.
                  </p>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-gradient-to-r from-red-800 to-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]" style={{ width: `${(player.level / 50) * 100}%` }}></div>
              </div>
              <p className="text-[9px] text-slate-600 font-black uppercase italic tracking-widest">Tiến độ hiện tại: {player.level} / 50</p>
          </div>
      )}
    </div>
  );
};
