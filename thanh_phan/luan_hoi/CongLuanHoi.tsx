
import React, { useState, useMemo } from 'react';
import { Infinity, AlertTriangle, ArrowUpCircle, Sparkles, RefreshCcw, Star, Swords, Coins, Zap, Trophy, Target, Flame, Lock, Skull, Info, Package, Hammer } from 'lucide-react';
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
  const reqLevel = 25 + (player.rebirthCount * 5);

  const options = useMemo(() => [
    { id: 'tp_atk', name: 'Sát Ý Vô Tận', icon: Swords, desc: 'Tăng vĩnh viễn 10% Sát thương tổng thể.', color: 'text-red-400' },
    { id: 'tp_gold', name: 'Phước Lành Midas', icon: Coins, desc: 'Nhận thêm 20% Vàng khi diệt quái.', color: 'text-amber-400' },
    { id: 'tp_craft', name: 'Linh Hồn Thợ Rèn', icon: Hammer, desc: 'Tăng 20% chỉ số gốc cho mọi trang bị bạn tự tay đúc.', color: 'text-blue-400' }
  ], []);

  return (
    <div className="flex flex-col items-center max-w-5xl mx-auto py-10 space-y-12 animate-fade-in pb-32">
      <div className="text-center space-y-4">
        <h2 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 bg-clip-text text-transparent uppercase tracking-tighter italic drop-shadow-2xl">
          NGHI LỄ LUÂN HỒI
        </h2>
        <div className="flex flex-col items-center gap-2">
            <div className="inline-block px-6 py-2 bg-slate-900 border border-purple-500/30 rounded-full">
                <span className="text-xs font-black text-purple-400 uppercase tracking-widest">Kiếp thứ {player.rebirthCount + 1}</span>
            </div>
            <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] max-w-md text-center leading-relaxed">
                Tử bỏ hiện tại để chạm đến vĩnh hằng. Mọi vật phẩm và nguyên liệu sẽ tan biến, chỉ còn lại ý chí và sức mạnh tiềm ẩn.
            </p>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Cột trái: Cảnh báo và Kế thừa */}
          <div className="md:col-span-5 space-y-6">
              <div className="bg-red-950/20 border border-red-500/30 p-6 rounded-[2rem] space-y-4">
                  <div className="flex items-center gap-3 text-red-400 font-black text-xs uppercase italic">
                      <AlertTriangle size={18} /> CẢNH BÁO TỐI THƯỢNG
                  </div>
                  <ul className="text-[10px] text-slate-400 space-y-2 font-bold uppercase leading-relaxed">
                      <li>• Cấp độ sẽ quay về Level 1</li>
                      <li>• Toàn bộ Vàng sẽ bị xóa bỏ</li>
                      <li>• Toàn bộ Nguyên liệu cơ bản sẽ biến mất</li>
                      <li>• <span className="text-red-500">Tất cả trang bị trong kho sẽ bị hủy</span></li>
                      <li className="text-emerald-500">• Duy nhất 1 món đồ "Dấu Ấn" được giữ lại</li>
                  </ul>
              </div>

              {canRebirth && (
                  <div className="bg-slate-900/60 border border-white/5 rounded-[2.5rem] p-8 space-y-6">
                      <div className="flex items-center gap-3">
                          <Package size={20} className="text-blue-400" />
                          <h3 className="text-sm font-black text-white uppercase italic">Dấu Ấn Luân Hồi</h3>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                          {equippedItems.filter(i => i !== null).map(item => (
                              <button 
                                key={item.id}
                                onClick={() => setLegacyItemChon(item.id)}
                                className={`aspect-square rounded-2xl border-2 flex flex-col items-center justify-center p-2 transition-all relative ${legacyItemChon === item.id ? 'border-blue-500 bg-blue-500/10 scale-105' : 'border-white/5 bg-slate-950 opacity-60'}`}
                              >
                                  <span className="text-[7px] font-black uppercase text-slate-500 mb-1">{item.type}</span>
                                  <span className="text-[8px] font-black text-white truncate w-full text-center">{item.name}</span>
                                  {legacyItemChon === item.id && <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-1 shadow-lg"><Star size={8} className="text-white" /></div>}
                              </button>
                          ))}
                          {equippedItems.length === 0 && (
                              <div className="col-span-full py-6 text-center text-slate-700 font-black uppercase text-[8px] border border-dashed border-white/5 rounded-2xl">Không có trang bị mặc sẵn</div>
                          )}
                      </div>
                      <p className="text-[8px] text-slate-500 italic text-center">Sức mạnh món đồ này sẽ mở khóa dần theo cấp độ mới của bạn.</p>
                  </div>
              )}
          </div>

          {/* Cột phải: Thiên phú kiếp sau */}
          <div className="md:col-span-7 space-y-8">
              {canRebirth ? (
                  <>
                      <div className="flex items-center gap-3 px-2">
                        <ArrowUpCircle size={20} className="text-purple-400" />
                        <h4 className="text-sm font-black text-white uppercase italic">Chọn Mảnh Linh Hồn Kiếp Sau</h4>
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                          {options.map(tp => (
                              <button 
                                  key={tp.id}
                                  onClick={() => setThienPhuChon(tp.id)}
                                  className={`p-5 rounded-[2rem] border-2 transition-all flex items-center gap-6 text-left relative overflow-hidden group ${thienPhuChon === tp.id ? 'bg-indigo-600/10 border-indigo-500' : 'bg-slate-900/40 border-white/5 hover:border-white/10'}`}
                              >
                                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${thienPhuChon === tp.id ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-600 group-hover:text-slate-400'}`}>
                                      <tp.icon size={28} className={thienPhuChon === tp.id ? 'text-white' : tp.color} />
                                  </div>
                                  <div className="flex-1">
                                      <span className="text-sm font-black text-white uppercase block mb-1">{tp.name}</span>
                                      <p className="text-[10px] text-slate-500 font-bold leading-relaxed">{tp.desc}</p>
                                  </div>
                                  {thienPhuChon === tp.id && <div className="absolute right-6"><Star size={20} className="text-indigo-500 animate-pulse" /></div>}
                              </button>
                          ))}
                      </div>

                      <div className="pt-6">
                          <NutBam 
                              kich_co="xl" rong_het_co
                              disabled={!thienPhuChon}
                              onClick={() => onRebirth(thienPhuChon || undefined, legacyItemChon || undefined)} 
                              className="shadow-[0_0_30px_rgba(99,102,241,0.3)]"
                          >
                              <Infinity size={24} /> BẮT ĐẦU LUÂN HỒI (+{dinh_dang_so(epNhanDuoc)} EP)
                          </NutBam>
                      </div>
                  </>
              ) : (
                  <div className="h-full flex flex-col items-center justify-center bg-slate-900/40 p-12 rounded-[3rem] border border-red-500/10 text-center space-y-6">
                      <Lock size={64} className="text-red-500/20" />
                      <div className="space-y-2">
                        <h4 className="text-xl font-black text-white uppercase italic">Linh Hồn Chưa Đủ Lớn</h4>
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Cần đạt Cấp độ {reqLevel} để tiến hành nghi lễ</p>
                      </div>
                      <div className="w-full max-w-xs space-y-3">
                          <div className="h-3 bg-slate-950 rounded-full border border-white/5 overflow-hidden">
                              <div className="h-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)] transition-all" style={{ width: `${(player.level/reqLevel)*100}%` }}></div>
                          </div>
                          <div className="flex justify-between text-[10px] font-black text-red-400 italic">
                             <span>LV.{player.level}</span>
                             <span>LV.{reqLevel}</span>
                          </div>
                      </div>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};
