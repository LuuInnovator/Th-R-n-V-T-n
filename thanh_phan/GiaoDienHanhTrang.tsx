
import React, { useState, useMemo, useCallback } from 'react';
import { Equipment, Material, EquipmentType, Player, GemType, GemTier, EnchantmentType, Rarity } from '../kieu_du_lieu';
import { Gem, Box, ShieldCheck, Sword, HardHat, Footprints, Hand, CircuitBoard, Trash2, CheckSquare, Square, X, Filter } from 'lucide-react';
import { dinh_dang_so } from '../tien_ich/tinh_toan';
import { DanhSachTrangBi } from './hanh_trang/DanhSachTrangBi';
import { MAU_DO_HIEM } from '../hang_so/do_hiem';
import { NutBam } from './NutBam';

interface Props {
  trangBi: Equipment[];
  nguyenLieu: Material[];
  dangMac: any;
  onMac: (item: Equipment) => void;
  onSell: (item: Equipment) => void;
  onSellMany: (ids: string[], onDone: (v: number) => void) => void;
  onSocketGem: (gemType: GemType, gemTier: GemTier, item: Equipment) => void;
  onAddSocket: (item: Equipment) => void;
  onEnchant: (type: EnchantmentType, item: Equipment) => void;
  player: Player;
}

const SLOT_ICONS: Record<string, any> = {
  [EquipmentType.Weapon]: Sword,
  [EquipmentType.Armor]: ShieldCheck,
  [EquipmentType.Helmet]: HardHat,
  [EquipmentType.Ring]: Hand,
  [EquipmentType.Boots]: Footprints,
  [EquipmentType.Necklace]: CircuitBoard
};

export const GiaoDienHanhTrang: React.FC<Props> = ({ 
  trangBi, nguyenLieu, dangMac, onMac, onSell, onSellMany, onSocketGem, onAddSocket, onEnchant, player 
}) => {
  const [tabHanhTrang, setTab] = useState<'do' | 'nguyen_lieu'>('do');
  const [idsChon, setIdsChon] = useState<string[]>([]);
  const [cheDoChon, setCheDoChon] = useState(false);

  const doTrongKho = useMemo(() => trangBi.filter(item => !item.isEquipped), [trangBi]);
  const danhSachDangMac = useMemo(() => trangBi.filter(item => item.isEquipped), [trangBi]);

  const toggleChon = (id: string) => {
    setIdsChon(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const selectByRarity = (rarity: Rarity) => {
    const matchingIds = doTrongKho.filter(item => item.rarity === rarity).map(item => item.id);
    setIdsChon(prev => {
        const otherIds = prev.filter(id => !matchingIds.includes(id));
        // Nếu đã chọn tất cả của phẩm cấp này rồi thì bỏ chọn
        const allAlreadySelected = matchingIds.every(id => prev.includes(id)) && matchingIds.length > 0;
        if (allAlreadySelected) return otherIds;
        return [...otherIds, ...matchingIds];
    });
  };

  const handleBanHangLoat = () => {
    if (idsChon.length === 0) return;
    onSellMany(idsChon, (v) => {});
    setIdsChon([]);
    setCheDoChon(false);
  };

  return (
    <div className="h-full flex flex-col p-4 md:p-8 gap-6 bg-[#020617] overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
        <div className="flex gap-2 p-1 bg-slate-900 rounded-2xl border border-white/5 w-fit">
            <button 
                onClick={() => { setTab('do'); setCheDoChon(false); }}
                className={`px-8 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 ${tabHanhTrang === 'do' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'text-slate-500 hover:text-slate-300'}`}
            >
                <Box size={14} /> Trang Bị ({trangBi.length}/{player.inventorySlots})
            </button>
            <button 
                onClick={() => { setTab('nguyen_lieu'); setCheDoChon(false); }}
                className={`px-8 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 ${tabHanhTrang === 'nguyen_lieu' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40' : 'text-slate-500 hover:text-slate-300'}`}
            >
                <Gem size={14} /> Nguyên Liệu ({nguyenLieu.length})
            </button>
        </div>

        {tabHanhTrang === 'do' && (
          <div className="flex gap-3 items-center">
             {!cheDoChon ? (
                <NutBam kieu="vien" kich_co="sm" onClick={() => setCheDoChon(true)}>
                    <CheckSquare size={14} /> CHỌN NHIỀU
                </NutBam>
             ) : (
                <div className="flex items-center gap-4 animate-fade-in bg-slate-900/80 p-2 rounded-2xl border border-white/5">
                    <div className="flex gap-1 border-r border-white/10 pr-4">
                        {(Object.values(Rarity) as Rarity[]).slice(0, 3).map(r => (
                            <button 
                                key={r}
                                onClick={() => selectByRarity(r)}
                                className={`w-8 h-8 rounded-lg flex items-center justify-center text-[8px] font-black border transition-all ${MAU_DO_HIEM[r].replace('text-', 'text-').replace('400', '400')} border-white/5 hover:bg-white/5`}
                                title={`Chọn tất cả đồ ${r}`}
                            >
                                {r[0]}
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <NutBam kieu="nguy_hiem" kich_co="sm" onClick={handleBanHangLoat} disabled={idsChon.length === 0}>
                            <Trash2 size={14} /> BÁN ({idsChon.length})
                        </NutBam>
                        <NutBam kieu="ma" kich_co="sm" onClick={() => { setCheDoChon(false); setIdsChon([]); }}>
                            <X size={14} /> HỦY
                        </NutBam>
                    </div>
                </div>
             )}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin space-y-8">
        {tabHanhTrang === 'do' ? (
          <>
            {danhSachDangMac.length > 0 && !cheDoChon && (
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
                                <button onClick={() => onMac(item)} className="p-2 bg-slate-900 hover:bg-rose-600 rounded-lg text-slate-500 hover:text-white transition-all text-[8px] font-black uppercase">Tháo</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <DanhSachTrangBi 
              equipments={doTrongKho} 
              onEquip={onMac} 
              onSell={onSell} 
              player={player} 
              onSocketGem={(key, item) => onSocketGem(GemType.Ruby, GemTier.T1, item)}
              onAddSocket={onAddSocket}
              onEnchant={onEnchant}
              selectionMode={cheDoChon}
              selectedIds={idsChon}
              onToggleSelect={toggleChon}
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
