
import React, { useState } from 'react';
import { Equipment, GemType, GemTier, EnchantmentType, Player } from '../../kieu_du_lieu';
import { CHISO_NGOC, PHU_PHEP_STATS } from '../../hang_so';
import { NutBam } from '../NutBam';
// Fix: Added missing 'Lock' import from lucide-react
import { X, Hammer, Gem as GemIcon, Sparkles, Shield, Sword, Heart, PlusCircle, Lock } from 'lucide-react';
import { dinh_dang_so } from '../../tien_ich/tinh_toan';

interface Props {
  item: Equipment;
  player: Player;
  onClose: () => void;
  onSocketGem: (type: GemType, tier: GemTier) => void;
  onEnchant: (type: EnchantmentType) => void;
  onAddSocket: () => void;
}

export const CuaSoNangCap: React.FC<Props> = ({ 
    item, player, onClose, onSocketGem, onEnchant, onAddSocket 
}) => {
  const [tab, setTab] = useState<'kham' | 'phu'>('kham');

  const socketCost = item.sockets === 0 ? 500 : (item.sockets === 1 ? 5000 : 50000);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in">
      <div className="bg-slate-900 border border-white/10 rounded-[2.5rem] w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        <div className="p-6 border-b border-white/5 bg-slate-950 flex justify-between items-center">
          <div className="flex items-center gap-4">
             <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20 text-amber-500">
                <Hammer size={24} />
             </div>
             <div>
                <h2 className="text-xl font-black text-slate-100 uppercase italic tracking-tighter">{item.name}</h2>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Cấp độ lò rèn: {player.level}</span>
             </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-rose-600/20 rounded-2xl transition-all text-slate-500 hover:text-rose-500">
            <X size={24} />
          </button>
        </div>

        <div className="flex bg-slate-950/50 p-2 gap-2 mx-6 mt-6 rounded-2xl border border-white/5">
            <button 
                onClick={() => setTab('kham')} 
                className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${tab === 'kham' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'text-slate-500 hover:text-slate-300'}`}
            >
                KHẢM NGỌC
            </button>
            <button 
                onClick={() => setTab('phu')} 
                className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${tab === 'phu' ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40' : 'text-slate-500 hover:text-slate-300'}`}
            >
                PHÙ PHÉP
            </button>
        </div>

        <div className="p-8 overflow-y-auto flex-1 scrollbar-thin">
            {tab === 'kham' ? (
                <div className="space-y-10">
                    <div className="flex flex-col items-center gap-6">
                        <div className="flex justify-center gap-6">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className={`w-20 h-20 rounded-[1.5rem] border-2 flex flex-col items-center justify-center transition-all relative group ${i >= item.sockets ? 'bg-slate-950 border-slate-800 opacity-20' : (item.socketedGems[i] ? 'bg-blue-900/10 border-blue-500 shadow-lg shadow-blue-500/10' : 'bg-slate-950 border-dashed border-slate-700 hover:border-slate-500')}`}>
                                    {i >= item.sockets ? (
                                        <Lock size={20} className="text-slate-700" />
                                    ) : (
                                        item.socketedGems[i] ? (
                                            <>
                                                <GemIcon size={28} className="text-blue-400 mb-1" />
                                                <span className="text-[7px] font-black text-blue-500 uppercase">{item.socketedGems[i].type}</span>
                                            </>
                                        ) : (
                                            <span className="text-[8px] text-slate-600 font-black uppercase">Trống</span>
                                        )
                                    )}
                                </div>
                            ))}
                        </div>
                        
                        {item.sockets < 3 && (
                            <NutBam 
                                kieu="vien" 
                                kich_co="sm" 
                                onClick={onAddSocket}
                                disabled={player.gold < socketCost}
                                className="border-amber-500/20 text-amber-500 hover:bg-amber-500/10"
                            >
                                <PlusCircle size={14} /> ĐỤC THÊM LỖ ({dinh_dang_so(socketCost)} Vàng)
                            </NutBam>
                        )}
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5 pb-2">Ngọc Đang Có</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {Object.values(GemType).map(type => (
                                <button 
                                    key={type}
                                    onClick={() => onSocketGem(type, GemTier.T1)}
                                    disabled={item.sockets <= item.socketedGems.length}
                                    className="p-4 bg-slate-950 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-blue-500 transition-all disabled:opacity-20"
                                >
                                    <div className="flex items-center gap-3">
                                        <GemIcon size={18} className="text-blue-400" />
                                        <span className="text-[10px] font-black text-slate-200 uppercase">{type} [Cấp 1]</span>
                                    </div>
                                    <span className="text-[9px] font-black text-slate-500 uppercase">Khảm</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="p-6 bg-purple-900/10 border border-purple-500/20 rounded-3xl text-center">
                        <Sparkles size={32} className="text-purple-400 mx-auto mb-3" />
                        <h4 className="text-sm font-black text-slate-200 uppercase tracking-tighter">Bùa Chú Cổ Đại</h4>
                        <p className="text-[10px] text-slate-500 mt-2 italic">Mỗi phù phép sẽ tăng cường sức mạnh vĩnh viễn cho trang bị.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        {Object.entries(PHU_PHEP_STATS).map(([id, info]) => (
                            <button 
                                key={id} 
                                onClick={() => onEnchant(id as EnchantmentType)} 
                                disabled={player.gold < 2000 || item.enchantment === id}
                                className={`w-full p-5 rounded-[2rem] border transition-all flex justify-between items-center group ${item.enchantment === id ? 'bg-purple-600 border-purple-400 shadow-xl' : 'bg-slate-950 border-white/5 hover:border-purple-500/50'}`}
                            >
                                <div className="text-left">
                                    <div className={`font-black text-xs uppercase tracking-tight ${item.enchantment === id ? 'text-white' : 'text-slate-100'}`}>{info.name}</div>
                                    <div className={`text-[9px] font-bold mt-1 ${item.enchantment === id ? 'text-purple-200' : 'text-slate-500'}`}>{info.desc}</div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className={`text-[10px] font-black ${item.enchantment === id ? 'text-white' : 'text-purple-400'}`}>2.000 Vàng</span>
                                    {item.enchantment === id && <span className="text-[8px] font-black text-white uppercase mt-1">Đã có</span>}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
        
        <div className="p-6 bg-slate-950 border-t border-white/5 text-center">
             <p className="text-[8px] font-black text-slate-700 uppercase tracking-[0.3em] italic">"Lửa lò rèn nung chảy mọi giới hạn"</p>
        </div>
      </div>
    </div>
  );
};
