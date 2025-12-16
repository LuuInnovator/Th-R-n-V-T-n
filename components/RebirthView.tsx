
import React, { useState } from 'react';
import { Player, EternalUpgrade } from '../types';
import { Button } from './Button';
import { Card } from './Card';
import { Infinity, AlertTriangle, ArrowUpCircle, ShoppingBag, Lock, Unlock } from 'lucide-react';
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
      {/* Header Tabs */}
      <div className="flex justify-center gap-4 shrink-0">
        <button 
          onClick={() => setTab('action')}
          className={`px-6 py-2 rounded-lg font-bold transition-all ${tab === 'action' ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50' : 'bg-slate-800 text-slate-400'}`}
        >
          Cổng Tái Sinh
        </button>
        <button 
          onClick={() => setTab('shop')}
          className={`px-6 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${tab === 'shop' ? 'bg-amber-600 text-white shadow-lg shadow-amber-900/50' : 'bg-slate-800 text-slate-400'}`}
        >
          <ShoppingBag size={16} /> Cửa Hàng Vĩnh Hằng
        </button>
      </div>

      {tab === 'action' ? (
        <div className="flex flex-col items-center justify-center text-center space-y-8 animate-fade-in py-8">
            <div className="relative shrink-0">
                <Infinity size={100} className="text-purple-500 animate-pulse" />
                <div className="absolute inset-0 bg-purple-500 blur-3xl opacity-20 rounded-full"></div>
            </div>
            
            <div className="shrink-0">
                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
                VÒNG LẶP VÔ TẬN ({player.rebirthCount})
                </h2>
                <p className="text-slate-400 max-w-md mx-auto">
                Tái sinh để tôi luyện linh hồn thợ rèn. Bạn sẽ mất hết trang bị, cấp độ và nguyên liệu thường, nhưng giữ lại Kỹ Năng và nhận Điểm Vĩnh Cửu.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl shrink-0">
                <div className="bg-slate-800 p-6 rounded-lg border border-red-500/30">
                <h3 className="text-red-400 font-bold text-lg mb-4 flex items-center justify-center gap-2">
                    <AlertTriangle size={20} /> BẠN SẼ MẤT
                </h3>
                <ul className="text-slate-300 text-sm space-y-2 text-left list-disc pl-5">
                    <li>Tất cả Vàng hiện có</li>
                    <li>Cấp độ nhân vật trở về 1</li>
                    <li>Tất cả Trang bị và Nguyên liệu (Trừ khi có Thiên Phú)</li>
                    <li>Tiến độ khám phá khu vực</li>
                </ul>
                </div>

                <div className="bg-slate-800 p-6 rounded-lg border border-green-500/30">
                <h3 className="text-green-400 font-bold text-lg mb-4 flex items-center justify-center gap-2">
                    <ArrowUpCircle size={20} /> BẠN NHẬN ĐƯỢC
                </h3>
                <ul className="text-slate-300 text-sm space-y-2 text-left list-disc pl-5">
                    <li>+1 lần Tái sinh ({player.rebirthCount} → {player.rebirthCount + 1})</li>
                    <li>Mở khóa <b>Cự Thạch Nham Thạch (Zone 4)</b></li>
                    <li>Nhận <b>{(player.level * 10)} Điểm Vĩnh Cửu</b></li>
                    <li>Quái vật mạnh hơn, nhưng rơi đồ xịn hơn</li>
                </ul>
                </div>
            </div>

            <div className="pt-4 pb-8 shrink-0">
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
      ) : (
        <div className="flex flex-col h-full animate-fade-in">
           <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 mb-6 flex justify-between items-center sticky top-0 z-10 backdrop-blur shrink-0">
             <div>
                <h3 className="text-xl font-bold text-amber-500">Thiên Phú Vĩnh Hằng</h3>
                <p className="text-sm text-slate-400">Các nâng cấp này tồn tại mãi mãi qua các lần Tái sinh.</p>
             </div>
             <div className="text-right">
                <div className="text-xs text-slate-500 uppercase">Điểm Vĩnh Cửu (EP)</div>
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
                        {/* Visual progress bar */}
                        <div className="w-16 h-1.5 bg-slate-800 rounded-full mt-2">
                           <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(currentLevel / upgrade.maxLevel) * 100}%`}}></div>
                        </div>
                    </div>

                    <p className="text-sm text-slate-400 mb-4 h-10">{upgrade.description}</p>
                    
                    <div className="flex justify-between items-center mt-auto">
                        <div className="text-xs text-green-400">
                             Hiệu quả: +{currentLevel * upgrade.effectValue}
                             {!isMax && <span className="text-slate-600"> ➜ +{(currentLevel + 1) * upgrade.effectValue}</span>}
                        </div>
                        <Button 
                            size="sm" 
                            variant={canBuy ? 'primary' : 'ghost'} 
                            disabled={!canBuy}
                            onClick={() => onBuyUpgrade(upgrade)}
                            className={canBuy ? 'bg-amber-600 hover:bg-amber-500 border-amber-500/50' : ''}
                        >
                            {isMax ? 'Tối Đa' : `Mở khóa (${formatNumber(cost)} EP)`}
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
