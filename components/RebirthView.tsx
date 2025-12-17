
import React, { useState } from 'react';
import { Player, EternalUpgrade } from '../types';
import { Button } from './Button';
import { Card } from './Card';
import { Infinity, AlertTriangle, ArrowUpCircle, ShoppingBag, Lock, Unlock, Gem } from 'lucide-react';
import { ETERNAL_UPGRADES } from '../constants';
import { formatNumber } from '../utils';

interface RebirthViewProps {
  player: Player;
  onRebirth: () => void;
  canRebirth: boolean;
  onBuyUpgrade: (upgrade: EternalUpgrade) => void;
}

export const RebirthView: React.FC<RebirthViewProps> = ({ player, onRebirth, canRebirth, onBuyUpgrade }) => {
  const [tab, setTab] = useState<'action' | 'shop'>('action');

  return (
    <div className="h-full max-w-7xl mx-auto w-full p-4 flex flex-col gap-6 overflow-y-auto scrollbar-thin">
      <div className="flex justify-center gap-4 shrink-0">
        <button 
          onClick={() => setTab('action')}
          className={`px-6 py-2 rounded-lg font-bold transition-all ${tab === 'action' ? 'bg-purple-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400'}`}
        >
          Cổng Tái Sinh
        </button>
        <button 
          onClick={() => setTab('shop')}
          className={`px-6 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${tab === 'shop' ? 'bg-amber-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400'}`}
        >
          <ShoppingBag size={16} /> Cửa Hàng Vĩnh Hằng
        </button>
      </div>

      {tab === 'action' ? (
        <div className="flex flex-col items-center justify-center text-center space-y-8 py-8">
            <div className="relative shrink-0">
                <Infinity size={100} className="text-purple-500 animate-pulse" />
            </div>
            
            <div>
                <h2 className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-2">
                VÒNG LẶP VÔ TẬN ({player.rebirthCount})
                </h2>
                <p className="text-slate-400 max-w-md mx-auto italic">
                "Cái chết chỉ là khởi đầu cho một thợ rèn huyền thoại."
                </p>
            </div>

            <div className="bg-slate-900 border border-blue-500/30 p-6 rounded-2xl max-w-md w-full">
                <div className="flex items-center gap-3 mb-4">
                    <Gem size={32} className="text-blue-400 animate-bounce" />
                    <div className="text-left">
                        <h3 className="font-black text-blue-400 uppercase">Vật Phẩm Ký Ức</h3>
                        <p className="text-[10px] text-slate-500">Toàn bộ kho đồ hiện tại sẽ chuyển hóa thành tiềm năng.</p>
                    </div>
                </div>
                <div className="flex justify-between items-center bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs font-bold text-slate-400">Tiềm năng tích lũy:</span>
                    <span className="text-xl font-black text-blue-400">+{player.memoryGemPotential} ATK</span>
                </div>
                <p className="text-[9px] text-slate-500 mt-3 text-left">
                   * Sát thương này sẽ được cộng thêm khi bạn rèn "Kiếm Thánh Kế Thừa" ở kiếp sau.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
                <div className="bg-slate-800 p-6 rounded-lg border border-red-500/30">
                <h3 className="text-red-400 font-bold text-lg mb-4 flex items-center justify-center gap-2">
                    <AlertTriangle size={20} /> BẠN SẼ MẤT
                </h3>
                <ul className="text-slate-300 text-sm space-y-2 text-left list-disc pl-5">
                    <li>Vàng, Cấp độ, Kinh nghiệm</li>
                    <li>Nguyên liệu Cơ bản (Gỗ, Sắt...)</li>
                    <li>Tiến độ khám phá khu vực</li>
                </ul>
                </div>

                <div className="bg-slate-800 p-6 rounded-lg border border-green-500/30">
                <h3 className="text-green-400 font-bold text-lg mb-4 flex items-center justify-center gap-2">
                    <ArrowUpCircle size={20} /> BẠN NHẬN ĐƯỢC
                </h3>
                <ul className="text-slate-300 text-sm space-y-2 text-left list-disc pl-5">
                    <li>Điểm Vĩnh Cửu (EP)</li>
                    <li>Giữ lại nguyên liệu Vĩnh Cửu</li>
                    <li>Cấp độ Bản Vẽ được giữ nguyên</li>
                </ul>
                </div>
            </div>

            <div className="pt-4 pb-8">
                {canRebirth ? (
                <Button 
                    size="xl" 
                    onClick={onRebirth}
                    className="px-12 bg-gradient-to-r from-purple-600 to-pink-600 shadow-xl shadow-purple-900/40 text-xl font-black"
                >
                    TIẾN VÀO LUÂN HỒI
                </Button>
                ) : (
                <div className="space-y-2">
                    <Button disabled size="xl" className="opacity-50 grayscale">
                    CHƯA ĐỦ ĐIỀU KIỆN
                    </Button>
                    <p className="text-red-400 text-sm">Cần đạt Cấp độ 50</p>
                </div>
                )}
            </div>
        </div>
      ) : (
        <div className="flex flex-col h-full animate-fade-in">
           <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 mb-6 flex justify-between items-center sticky top-0 z-10 backdrop-blur shrink-0">
             <div>
                <h3 className="text-xl font-bold text-amber-500">Thiên Phú Vĩnh Hằng</h3>
             </div>
             <div className="text-right">
                <div className="text-xs text-slate-500 uppercase">Điểm EP</div>
                <div className="text-2xl font-bold text-purple-400">{formatNumber(player.eternalPoints)}</div>
             </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-8">
             {ETERNAL_UPGRADES.map(upgrade => {
               const currentLevel = player.eternalUpgrades[upgrade.id] || 0;
               const isMax = currentLevel >= upgrade.maxLevel;
               const cost = Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, currentLevel));
               const canBuy = !isMax && player.eternalPoints >= cost;

               return (
                 <Card key={upgrade.id} className="relative group">
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                            <div className={`p-2 rounded-lg ${isMax ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-700 text-slate-400'}`}>
                                {isMax ? <Lock size={20} /> : <Unlock size={20} />}
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-200">{upgrade.name}</h4>
                                <div className="text-xs font-mono text-purple-400">Cấp {currentLevel} / {upgrade.maxLevel}</div>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-slate-400 mb-4 h-10">{upgrade.description}</p>
                    <div className="flex justify-between items-center mt-auto">
                        <Button 
                            size="sm" 
                            variant={canBuy ? 'primary' : 'outline'} 
                            disabled={!canBuy}
                            onClick={() => onBuyUpgrade(upgrade)}
                        >
                            {isMax ? 'Tối Đa' : `Nâng Cấp (${formatNumber(cost)} EP)`}
                        </Button>
                    </div>
                 </Card>
               );
             })}
           </div>
        </div>
      )}
    </div>
  );
};
