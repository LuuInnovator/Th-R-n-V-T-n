
import React, { useState, useMemo } from 'react';
import { Blueprint, Material, EquipmentType, Player } from '../kieu_du_lieu';
import { Sword, Shield, CircuitBoard, Beaker, HardHat, Footprints, CircleDot, Hammer, Flame, Sparkles, BookOpen, ChevronRight } from 'lucide-react';
import { NutBam } from './NutBam';
import { dinh_dang_so } from '../tien_ich/tinh_toan';
import { DanhSachBanVe } from './lo_ren/DanhSachBanVe';
import { ChiTietCheTac } from './lo_ren/ChiTietCheTac';

interface Props {
  blueprints: Blueprint[];
  materials: Material[];
  onCraft: (blueprint: Blueprint, useOverheat: boolean) => void;
  craftingSkill: number;
  onUpgradeBlueprint: (id: string, cost: number) => void;
  eternalPoints: number;
  player: Player;
}

type NhanhCheTac = 'vu_khi' | 'giap_tru' | 'mu_giap' | 'giay' | 'nhan' | 'vong_co' | 'vat_pham';

export const GiaoDienLoRen: React.FC<Props> = ({
  blueprints, materials, onCraft, onUpgradeBlueprint, eternalPoints, player
}) => {
  const [nhanhHienTai, datNhanhHienTai] = useState<NhanhCheTac>('vu_khi');
  const [bpDuocChon, datBpDuocChon] = useState<Blueprint | null>(null);

  const duLieuNhanh = useMemo(() => {
    return blueprints.filter(bp => {
      switch(nhanhHienTai) {
        case 'vu_khi': return bp.resultType === EquipmentType.Weapon;
        case 'giap_tru': return bp.resultType === EquipmentType.Armor;
        case 'mu_giap': return bp.resultType === EquipmentType.Helmet;
        case 'giay': return bp.resultType === EquipmentType.Boots;
        case 'nhan': return bp.resultType === EquipmentType.Ring;
        case 'vong_co': return bp.resultType === EquipmentType.Necklace;
        case 'vat_pham': return bp.resultType === 'VẬT PHẨM';
        default: return false;
      }
    });
  }, [blueprints, nhanhHienTai]);

  const cacNhanh = [
    { id: 'vu_khi' as NhanhCheTac, ten: 'VŨ KHÍ', icon: Sword, color: 'text-rose-500' },
    { id: 'giap_tru' as NhanhCheTac, ten: 'GIÁP TRỤ', icon: Shield, color: 'text-blue-500' },
    { id: 'mu_giap' as NhanhCheTac, ten: 'MŨ GIÁP', icon: HardHat, color: 'text-sky-500' },
    { id: 'giay' as NhanhCheTac, ten: 'GIÀY', icon: Footprints, color: 'text-orange-500' },
    { id: 'nhan' as NhanhCheTac, ten: 'NHẪN', icon: CircleDot, color: 'text-amber-500' },
    { id: 'vong_co' as NhanhCheTac, ten: 'VÒNG CỔ', icon: CircuitBoard, color: 'text-purple-500' },
    { id: 'vat_pham' as NhanhCheTac, ten: 'DƯỢC PHẨM', icon: Beaker, color: 'text-emerald-500' },
  ];

  const giaNangCap = bpDuocChon ? Math.floor(100 * Math.pow(1.8, (player.blueprintLevels[bpDuocChon.id] || 0))) : 0;
  const coTheNangCap = bpDuocChon && eternalPoints >= giaNangCap;

  return (
    <div className="flex h-full w-full bg-[#020617] overflow-hidden relative">
      <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none"></div>

      {/* Sidebar chọn nhánh - Slim & Clean */}
      <aside className="w-20 md:w-24 flex flex-col bg-slate-950 border-r border-white/5 z-20 shrink-0">
          <div className="p-6 border-b border-white/5 flex justify-center">
              <Hammer size={24} className="text-amber-500" />
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-hide py-4 space-y-1">
              {cacNhanh.map(b => (
                  <button
                    key={b.id}
                    onClick={() => { datNhanhHienTai(b.id); datBpDuocChon(null); }}
                    className={`w-full py-5 flex flex-col items-center gap-1.5 transition-all relative group
                        ${nhanhHienTai === b.id ? `text-white bg-white/5` : 'text-slate-600 hover:text-slate-400'}`}
                  >
                      {nhanhHienTai === b.id && (
                          <div className="absolute left-0 top-2 bottom-2 w-1.5 rounded-r-full bg-amber-500 shadow-lg shadow-amber-500/40"></div>
                      )}
                      <b.icon size={20} className={nhanhHienTai === b.id ? b.color : 'opacity-40'} />
                      <span className="text-[7px] font-black uppercase tracking-tighter">{b.ten}</span>
                  </button>
              ))}
          </div>
      </aside>

      {/* Danh sách bản vẽ - Left Panel */}
      <div className="w-80 md:w-96 flex flex-col bg-slate-950/40 border-r border-white/5 z-10 shrink-0">
          <div className="p-8 border-b border-white/5 bg-slate-950/60">
              <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                     <BookOpen size={18} />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] italic">BẢN VẼ CHIẾN ĐỒ</h3>
                    <span className="text-[8px] text-slate-600 font-black uppercase mt-0.5">{duLieuNhanh.length} CÔNG THỨC KHẢ DỤNG</span>
                  </div>
              </div>
              
              <div className="p-4 bg-slate-950 border border-white/5 rounded-2xl flex items-center justify-between">
                 <div className="flex flex-col">
                    <span className="text-[8px] text-slate-500 font-black uppercase leading-none mb-1">TINH HOA LUÂN HỒI</span>
                    <span className="text-sm font-black text-amber-500 tabular-nums italic">{dinh_dang_so(eternalPoints)} <span className="text-[9px] opacity-40">EP</span></span>
                 </div>
                 <Sparkles size={16} className="text-amber-500/40" />
              </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-3 scrollbar-hide">
              <DanhSachBanVe 
                  blueprints={duLieuNhanh} 
                  selectedId={bpDuocChon?.id} 
                  blueprintLevels={player.blueprintLevels}
                  onSelect={(bp) => datBpDuocChon(bp)} 
              />
          </div>

          {bpDuocChon && (
              <div className="p-8 bg-slate-950 border-t border-white/10 animate-fade-in">
                  <div className="flex justify-between items-center mb-6">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-white uppercase italic">TIẾN HÓA CẤP {player.blueprintLevels[bpDuocChon.id] || 0}</span>
                        <span className="text-[8px] text-slate-500 font-bold uppercase mt-1">GIA TĂNG SỨC MẠNH: +{ (player.blueprintLevels[bpDuocChon.id] || 0) * 25}%</span>
                      </div>
                      <ChevronRight size={16} className="text-amber-500" />
                  </div>
                  <NutBam 
                    rong_het_co 
                    kieu={coTheNangCap ? 'canh_bao' : 'vien'}
                    disabled={!coTheNangCap}
                    onClick={() => onUpgradeBlueprint(bpDuocChon.id, giaNangCap)}
                    className="h-16 text-[10px] font-black uppercase tracking-[0.2em] italic"
                  >
                      NÂNG CẤP ({dinh_dang_so(giaNangCap)} EP)
                  </NutBam>
              </div>
          )}
      </div>

      {/* Khu vực chi tiết chế tác - Right Panel (Main Workspace) */}
      <div className="flex-1 h-full relative z-0">
          <ChiTietCheTac 
              blueprint={bpDuocChon} 
              materials={materials} 
              onCraft={onCraft} 
              onClose={() => datBpDuocChon(null)}
              player={player}
          />
      </div>
    </div>
  );
};
