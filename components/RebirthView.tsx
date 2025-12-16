import React from 'react';
import { Player } from '../types';
import { Button } from './Button';
import { Infinity, AlertTriangle, ArrowUpCircle } from 'lucide-react';

interface RebirthViewProps {
  player: Player;
  onRebirth: () => void;
  canRebirth: boolean;
}

export const RebirthView: React.FC<RebirthViewProps> = ({ player, onRebirth, canRebirth }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-8 animate-fade-in">
      <div className="relative">
        <Infinity size={100} className="text-purple-500 animate-pulse" />
        <div className="absolute inset-0 bg-purple-500 blur-3xl opacity-20 rounded-full"></div>
      </div>
      
      <div>
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
          VÒNG LẶP VÔ TẬN
        </h2>
        <p className="text-slate-400 max-w-md mx-auto">
          Tái sinh để tôi luyện linh hồn thợ rèn. Bạn sẽ mất hết trang bị, cấp độ và nguyên liệu thường, nhưng giữ lại Kỹ Năng và nhận Điểm Vĩnh Cửu.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
        <div className="bg-slate-800 p-6 rounded-lg border border-red-500/30">
          <h3 className="text-red-400 font-bold text-lg mb-4 flex items-center justify-center gap-2">
             <AlertTriangle size={20} /> BẠN SẼ MẤT
          </h3>
          <ul className="text-slate-300 text-sm space-y-2 text-left list-disc pl-5">
            <li>Tất cả Vàng hiện có</li>
            <li>Cấp độ nhân vật trở về 1</li>
            <li>Tất cả Trang bị và Nguyên liệu thường</li>
            <li>Tiến độ khám phá khu vực</li>
          </ul>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg border border-green-500/30">
          <h3 className="text-green-400 font-bold text-lg mb-4 flex items-center justify-center gap-2">
             <ArrowUpCircle size={20} /> BẠN NHẬN ĐƯỢC
          </h3>
          <ul className="text-slate-300 text-sm space-y-2 text-left list-disc pl-5">
            <li>+1 lần Tái sinh ({player.rebirthCount} → {player.rebirthCount + 1})</li>
            <li>Giữ nguyên công thức đã học</li>
            <li>Nhận <b>{(player.level * 10)} Điểm Vĩnh Cửu</b></li>
            <li>Quái vật mạnh hơn, nhưng rơi đồ xịn hơn</li>
          </ul>
        </div>
      </div>

      <div className="pt-4">
        {canRebirth ? (
          <Button 
            size="lg" 
            onClick={onRebirth}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-900/50 text-xl font-bold"
          >
            THỰC HIỆN TÁI SINH
          </Button>
        ) : (
          <div className="space-y-2">
            <Button disabled size="lg" className="px-8 py-4 bg-slate-700 text-slate-500 text-xl font-bold border-none cursor-not-allowed">
              CHƯA ĐỦ ĐIỀU KIỆN
            </Button>
            <p className="text-red-400 text-sm">Yêu cầu: Cấp độ 50 trở lên</p>
          </div>
        )}
      </div>
    </div>
  );
};