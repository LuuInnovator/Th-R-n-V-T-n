
import React from 'react';
import { Infinity, AlertTriangle, ArrowUpCircle, Gem, Skull, Zap, Coins, Hammer } from 'lucide-react';
import { Button } from '../Button';
import { Player } from '../../types';
import { formatNumber } from '../../utils';

interface RebirthActionProps {
  player: Player;
  onRebirth: () => void;
  canRebirth: boolean;
}

export const RebirthAction: React.FC<RebirthActionProps> = ({ player, onRebirth, canRebirth }) => {
  const epReward = player.level * 10;

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8 py-4 animate-fade-in">
      <div className="relative">
        <Infinity size={80} className="text-purple-500 animate-pulse" />
        <div className="absolute inset-0 blur-2xl bg-purple-500/20 rounded-full"></div>
      </div>
      
      <div>
        <h2 className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-1 uppercase tracking-tighter">
          Cổng Luân Hồi (Lần {player.rebirthCount})
        </h2>
        <p className="text-slate-500 text-xs italic">"Rũ bỏ phàm trần để đạt đến cảnh giới tối cao của nghề rèn."</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
        {/* Loss Panel */}
        <div className="bg-slate-900/60 p-5 rounded-2xl border border-red-900/30 flex flex-col gap-4">
          <h3 className="text-red-400 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 mb-2">
            <AlertTriangle size={14} /> TÀI SẢN SẼ MẤT
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Cấp Độ', val: `Lv.${player.level} → 1`, icon: Zap },
              { label: 'Ngân Lượng', val: `0`, icon: Coins },
              { label: 'Bản Đồ', val: `Rừng Khởi Nguyên`, icon: Skull },
              { label: 'NL Cơ Bản', val: `Gỗ, Sắt, Da...`, icon: Hammer },
            ].map((item, i) => (
              <div key={i} className="bg-slate-950/50 p-3 rounded-xl border border-slate-800 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <item.icon size={12} className="text-slate-600" />
                  <span className="text-[9px] font-black text-slate-500 uppercase">{item.label}</span>
                </div>
                <div className="text-xs font-bold text-red-400/80">{item.val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Gain Panel */}
        <div className="bg-slate-900/60 p-5 rounded-2xl border border-green-900/30 flex flex-col gap-4">
          <h3 className="text-green-400 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 mb-2">
            <ArrowUpCircle size={14} /> QUYỀN LỢI VĨNH VIỄN
          </h3>
          <div className="grid grid-cols-2 gap-2">
             <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <Gem size={12} className="text-purple-400" />
                  <span className="text-[9px] font-black text-slate-500 uppercase">Điểm EP</span>
                </div>
                <div className="text-xs font-bold text-green-400">+{formatNumber(epReward)} EP</div>
              </div>
              <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <Zap size={12} className="text-blue-400" />
                  <span className="text-[9px] font-black text-slate-500 uppercase">Điểm Tiềm Năng</span>
                </div>
                <div className="text-xs font-bold text-blue-400">+{5 + (player.rebirthCount * 5)} Stat Pts</div>
              </div>
              <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800 text-left col-span-2">
                <div className="flex items-center gap-2 mb-1">
                  <Hammer size={12} className="text-amber-500" />
                  <span className="text-[9px] font-black text-slate-500 uppercase">Bản Vẽ & Nâng Cấp</span>
                </div>
                <div className="text-[10px] text-slate-400">Giữ nguyên 100% cấp độ tiến hóa</div>
              </div>
          </div>
        </div>
      </div>

      {/* Memory Compression Detail */}
      <div className="bg-blue-900/10 p-6 rounded-2xl border border-blue-500/20 max-w-xl w-full">
          <div className="flex items-start gap-4 text-left">
              <div className="p-3 bg-blue-600/20 rounded-xl border border-blue-500/30 shrink-0">
                  <Gem size={28} className="text-blue-400" />
              </div>
              <div>
                  <h4 className="font-black text-blue-400 uppercase text-sm mb-1 tracking-tighter">Cơ Chế: Nén Ký Ức Trang Bị</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed italic">
                    Toàn bộ chỉ số từ trang bị bạn đang sở hữu sẽ được nén thành "Tiềm năng di sản". 
                    Khi rèn <span className="text-amber-500 font-bold">Kiếm Thánh Kế Thừa</span> ở kiếp sau, 
                    vũ khí đó sẽ nhận thêm <span className="text-blue-400 font-bold">+{player.memoryGemPotential} Tấn Công</span> vĩnh viễn.
                  </p>
              </div>
          </div>
      </div>

      <div className="pt-4 pb-10">
        {canRebirth ? (
          <Button 
            size="xl" 
            onClick={onRebirth}
            className="px-16 bg-gradient-to-r from-purple-600 to-pink-600 shadow-xl shadow-purple-900/40 text-xl font-black tracking-widest hover:scale-105 active:scale-95 transition-all"
          >
            TIẾN VÀO LUÂN HỒI
          </Button>
        ) : (
          <div className="space-y-3">
            <Button disabled size="xl" className="opacity-40 grayscale px-16">
              CHƯA ĐỦ CÔNG LỰC
            </Button>
            <div className="bg-red-500/10 text-red-400 text-[10px] font-bold py-1 px-4 rounded-full border border-red-500/20">
              Yêu cầu: Cấp độ 50 (Hiện tại: {player.level})
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
