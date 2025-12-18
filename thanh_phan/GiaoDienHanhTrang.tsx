
import React, { useState, useMemo } from 'react';
import { Equipment, Material, EquipmentType, Player, GemType, GemTier, EnchantmentType } from '../kieu_du_lieu';
import { Gem, Box, ShieldCheck, Sword, HardHat, Footprints, Hand, CircuitBoard } from 'lucide-react';
import { dinh_dang_so } from '../tien_ich/tinh_toan';
import { DanhSachTrangBi } from './hanh_trang/DanhSachTrangBi';
import { MAU_DO_HIEM } from '../hang_so/do_hiem';

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

const SLOT_ICONS: Record<string, any> = {
  [EquipmentType.Weapon]: Sword,
  [EquipmentType.Armor]: ShieldCheck,
  [EquipmentType.Helmet]: HardHat,
  [EquipmentType.Gloves]: Hand,
  [EquipmentType.Boots]: Footprints,
  [EquipmentType.Accessory]: CircuitBoard
};

export const GiaoDienHanhTrang: React.FC<Props> = ({ 
  trangBi, nguyenLieu, dangMac, onMac, onSell, onSocketGem, onAddSocket, onEnchant, player 
}) => {
  const [tabHanhTrang, setTab] = useState<'do' | 'nguyen_lieu'>('do');

  // Lọc đồ trong kho (chưa mặc)
  const doTrongKho = useMemo(() => trangBi.filter(item => !item.isEquipped), [trangBi]);
  
  // Danh sách đồ đang mặc để hiển thị header
  const danhSachDangMac = useMemo(() => trangBi.filter(item => item.isEquipped), [trangBi]);

  return (
    <div className="h-full flex flex-col p-4 md:p-8 gap-6 bg-[#020617] overflow-hidden">
      {/* Header Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
        <div className="flex gap-2 p-1 bg-slate-900 rounded-2xl border border-white/5 w-fit">
            <button 
                onClick={() => setTab('do')}
                className={`px-8 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 ${tabHanhTrang === 'do' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'text-slate-500 hover:text-slate-300'}`}
            >
                <Box size={14} /> Trang Bị ({doTrongKho.length})
            </button>
            <button 
                onClick={() => setTab('nguyen_lieu')}
                className={`px-8 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 ${tabHanhTrang === 'nguyen_lieu' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40' : 'text-slate-500 hover:text-slate-300'}`}
            >
                <Gem size={14} /> Nguyên Liệu ({nguyenLieu.length})
            </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin space-y-8">
        {tabHanhTrang === 'do' ? (
          <>
            {/* Khu vực đồ đang mặc - Giải quyết vấn đề "mất tính năng mặc đồ" */}
            {danhSachDangMac.length > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center gap-3 px-2">
                        <ShieldCheck size={16} className="text-blue-400" />
                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Đang Trang Bị</h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {danhSachDangMac.map(item => (
                            <div key={item.id} className="bg-blue-900/10 border border-blue-500/30 p-4 rounded-[1.5rem] flex items-center justify-between group">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center border border-blue-500/20 ${MAU_DO_HIEM[item.rarity]}`}>
                                        {React.createElement(SLOT_ICONS[item.type] || Box, { size: 20 })}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className={`text-[10px] font-black uppercase truncate max-w-[120px] ${MAU_DO_HIEM[item.rarity]}`}>{item.name}</span>
                                        <span className="text-[8px] text-slate-500 font-bold uppercase">{item.type}</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => onMac(item)} // Logic mặc đồ sẽ tự tháo nếu đã mặc
                                    className="p-2 bg-slate-900 hover:bg-rose-600 rounded-lg text-slate-500 hover:text-white transition-all text-[8px] font-black uppercase"
                                >
                                    Tháo
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Túi đồ chính */}
            <DanhSachTrangBi 
              equipments={doTrongKho} 
              onEquip={onMac} 
              onSell={onSell} 
              player={player} 
              onSocketGem={(key, item) => onSocketGem(GemType.Ruby, GemTier.T1, item)}
              onAddSocket={onAddSocket}
              onEnchant={onEnchant}
            />
          </>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 animate-fade-in pb-20">
            {nguyenLieu.map(m => (
              <div key={m.id} className="bg-slate-900/40 border border-slate-800 p-4 rounded-2xl flex flex-col items-center gap-3 group hover:border-emerald-500/30 transition-all">
                <div className="w-12 h-12 bg-slate-950 rounded-xl flex items-center justify-center border border-white/5 text-emerald-500">
                    <Gem size={24} />
                </div>
                <div className="text-center w-full">
                    <div className="text-[8px] font-black text-slate-500 uppercase h-6 line-clamp-2">{m.name}</div>
                    <div className="text-[10px] font-black text-emerald-400">x{dinh_dang_so(m.quantity)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
