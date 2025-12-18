
import React from 'react';
import { Gem, Sparkles, Sword, Hammer, Coins } from 'lucide-react';
import { NANG_CAP_CHI_SO, NANG_CAP_DUC_REN, NANG_CAP_DB } from '../../hang_so/nang_cap';
import { Player, EternalUpgrade } from '../../kieu_du_lieu';
import { dinh_dang_so } from '../../tien_ich/tinh_toan';
import { TheNangCapVinhHang } from './TheNangCapVinhHang';

interface Props {
  player: Player;
  onBuyUpgrade: (upgrade: EternalUpgrade) => void;
}

export const CuaHangVinhHang: React.FC<Props> = ({ player, onBuyUpgrade }) => {
  const cacMuc = [
    { title: 'Sức Mạnh Bản Thể', icon: Sword, color: 'text-red-400', upgrades: NANG_CAP_CHI_SO },
    { title: 'Kỹ Nghệ Đúc Rèn', icon: Hammer, color: 'text-blue-400', upgrades: NANG_CAP_DUC_REN },
  ];

  return (
    <div className="h-full flex flex-col bg-slate-950 overflow-hidden animate-fade-in">
      <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800 mb-8 flex flex-col md:flex-row justify-between items-center sticky top-0 z-10 backdrop-blur-xl shrink-0 gap-6">
        <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center border border-white/10 shadow-lg">
                <Sparkles size={32} className="text-white" />
            </div>
            <div className="flex flex-col">
                <h3 className="text-2xl font-black text-purple-400 uppercase tracking-tighter italic">Thiên Phú Vĩnh Cửu</h3>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-2">Dấu ấn thợ rèn không bao giờ phai nhạt</span>
            </div>
        </div>

        <div className="bg-slate-950 px-8 py-4 rounded-3xl border border-slate-800 flex flex-col items-center justify-center min-w-[220px] shadow-inner">
          <span className="text-[10px] text-slate-500 font-black uppercase mb-1">Tinh Hoa Luân Hồi</span>
          <div className="text-3xl font-black text-amber-400 tabular-nums drop-shadow-[0_0_15px_rgba(245,158,11,0.3)] flex items-center gap-2">
            {dinh_dang_so(player.eternalPoints)} <span className="text-xs text-slate-600 font-bold">EP</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin space-y-12 pb-24">
        {cacMuc.map((cat, idx) => (
            <div key={idx} className="space-y-6">
                <div className="flex items-center gap-3 border-l-4 border-amber-500 pl-4">
                    <cat.icon size={20} className={cat.color} />
                    <h4 className="text-lg font-black text-slate-200 uppercase tracking-widest">{cat.title}</h4>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {cat.upgrades.map(upgrade => (
                        <TheNangCapVinhHang 
                            key={upgrade.id}
                            upgrade={upgrade}
                            currentLevel={player.eternalUpgrades[upgrade.id] || 0}
                            eternalPoints={player.eternalPoints}
                            onBuy={onBuyUpgrade}
                        />
                    ))}
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};
