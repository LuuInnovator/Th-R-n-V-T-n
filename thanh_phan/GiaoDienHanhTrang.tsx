
import React, { useState } from 'react';
import { Equipment, Material, EquipmentType, Rarity, Player, GemType, GemTier, EnchantmentType } from '../kieu_du_lieu';
import { Gem, Box } from 'lucide-react';
import { dinh_dang_so } from '../tien_ich/tinh_toan';
import { DanhSachTrangBi } from './hanh_trang/DanhSachTrangBi';

interface Props {
  trangBi: Equipment[];
  nguyenLieu: Material[];
  dangMac: any;
  onMac: (item: Equipment) => void;
  onSell: (item: Equipment) => void;
  onSocketGem: (gemType: GemType, gemTier: GemTier, item: Equipment) => void;
  onAddSocket: (item: Equipment) => void;
  onEnchant: (type: EnchantmentType, item: Equipment) => void;
  player: Player;
}

export const GiaoDienHanhTrang: React.FC<Props> = ({ 
  trangBi, nguyenLieu, onMac, onSell, onSocketGem, onAddSocket, onEnchant, player 
}) => {
  const [tabHanhTrang, setTab] = useState<'do' | 'nguyen_lieu'>('do');

  // ĐIỀU CHỈNH QUAN TRỌNG: Ẩn đồ đang mặc khỏi túi đồ chính
  const doTrongKho = trangBi.filter(item => !item.isEquipped);

  return (
    <div className="h-full flex flex-col p-6 md:p-10 gap-8 bg-[#020617] overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shrink-0">
        <div className="flex gap-4 p-1.5 bg-slate-900 rounded-[1.8rem] border border-white/5 w-fit shadow-2xl">
            <button 
                onClick={() => setTab('do')}
                className={`px-10 py-3 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center gap-3 ${tabHanhTrang === 'do' ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/40' : 'text-slate-500 hover:text-slate-300'}`}
            >
                <Box size={16} /> Trang Bị ({doTrongKho.length})
            </button>
            <button 
                onClick={() => setTab('nguyen_lieu')}
                className={`px-10 py-3 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center gap-3 ${tabHanhTrang === 'nguyen_lieu' ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-900/40' : 'text-slate-500 hover:text-slate-300'}`}
            >
                <Gem size={16} /> Nguyên Liệu ({nguyenLieu.length})
            </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin">
        {tabHanhTrang === 'do' ? (
          <DanhSachTrangBi 
            equipments={doTrongKho} 
            onEquip={onMac} 
            onSell={onSell} 
            player={player} 
            onSocketGem={(key, item) => onSocketGem(GemType.Ruby, GemTier.T1, item)}
            onAddSocket={onAddSocket}
            onEnchant={onEnchant}
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6 animate-fade-in pb-20">
            {nguyenLieu.map(m => (
              <div key={m.id} className="bg-slate-900/40 border border-slate-800 p-6 rounded-[2rem] flex flex-col items-center gap-4 group hover:border-emerald-500/30 hover:bg-slate-900/60 transition-all duration-300">
                <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center border border-white/5 text-emerald-500 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <Gem size={32} />
                </div>
                <div className="text-center w-full">
                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-tighter leading-tight h-8 line-clamp-2 mb-2">{m.name}</div>
                    <div className="px-4 py-2 bg-emerald-500/5 rounded-full text-[12px] font-black text-emerald-400 border border-emerald-500/20 tabular-nums">
                        x{dinh_dang_so(m.quantity)}
                    </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
