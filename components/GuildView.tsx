
import React from 'react';
import { Player } from '../types';
import { Store, Star, ShoppingBag, ArrowRight, UserCheck } from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';
import { formatNumber } from '../utils';

interface GuildViewProps {
  player: Player;
}

export const GuildView: React.FC<GuildViewProps> = ({ player }) => {
  return (
    <div className="h-full w-full flex flex-col bg-slate-950 overflow-hidden">
      <div className="p-6 bg-slate-900 border-b border-slate-800 shrink-0">
          <div className="flex items-center justify-between max-w-5xl mx-auto">
              <div className="flex items-center gap-4">
                  <div className="p-3 bg-amber-500 rounded-2xl shadow-lg">
                      <Store className="text-slate-900" size={28} />
                  </div>
                  <div>
                      <h2 className="text-2xl font-black text-slate-100 uppercase tracking-tighter">Thương Hội Blacksmith</h2>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Nơi trao đổi & Thăng tiến danh vọng</p>
                  </div>
              </div>
              <div className="bg-slate-950 px-5 py-3 rounded-2xl border border-slate-800 shadow-inner text-right">
                  <div className="text-[10px] text-slate-500 font-black uppercase mb-1">Uy Tín Thợ Rèn</div>
                  <div className="text-2xl font-black text-amber-500 flex items-center gap-2">
                      <Star size={18} fill="currentColor" /> {formatNumber(player.guild.fame)}
                  </div>
              </div>
          </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          <div className="max-w-5xl mx-auto space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-8 border-slate-800 bg-slate-900/40 relative overflow-hidden group">
                      <div className="absolute -right-8 -bottom-8 opacity-5 group-hover:opacity-10 transition-opacity">
                          <ShoppingBag size={200} />
                      </div>
                      <div className="relative z-10">
                          <h3 className="text-xl font-black text-slate-100 uppercase mb-4 flex items-center gap-2">
                              <ShoppingBag size={20} className="text-amber-500" /> Bản Vẽ Hiếm
                          </h3>
                          <p className="text-sm text-slate-500 mb-6 italic">Mở khóa những công thức rèn đúc cấp cao bằng điểm Uy Tín đã tích lũy được qua các nhiệm vụ.</p>
                          <Button fullWidth variant="outline" className="border-amber-500/50 text-amber-500 hover:bg-amber-500/10">
                              XEM CỬA HÀNG <ArrowRight size={16} />
                          </Button>
                      </div>
                  </Card>

                  <Card className="p-8 border-slate-800 bg-slate-900/40 relative overflow-hidden group">
                      <div className="absolute -right-8 -bottom-8 opacity-5 group-hover:opacity-10 transition-opacity">
                          <UserCheck size={200} />
                      </div>
                      <div className="relative z-10">
                          <h3 className="text-xl font-black text-slate-100 uppercase mb-4 flex items-center gap-2">
                              <UserCheck size={20} className="text-amber-500" /> Nhiệm Vụ Giao Hàng
                          </h3>
                          <p className="text-sm text-slate-500 mb-6 italic">Hoàn thành các đơn hàng trang bị đặc biệt từ Thương Hội để nhận Vàng và Điểm Uy Tín.</p>
                          <Button fullWidth className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-black">
                              NHẬN ĐƠN HÀNG <ArrowRight size={16} />
                          </Button>
                      </div>
                  </Card>
              </div>

              <div className="bg-slate-900/20 p-10 rounded-3xl border border-dashed border-slate-800 text-center">
                  <div className="text-4xl mb-4">⚒️</div>
                  <h4 className="text-slate-500 text-xs font-black uppercase tracking-[0.3em]">Cấp độ Hội hiện tại: {player.guild.level}</h4>
                  <p className="text-slate-600 text-[10px] mt-2 italic">Tiếp tục rèn luyện để nâng cao thứ hạng trong Thương Hội!</p>
              </div>
          </div>
      </div>
    </div>
  );
};
