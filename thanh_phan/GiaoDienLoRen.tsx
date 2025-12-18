
import React, { useState, useMemo } from 'react';
import { Blueprint, Material, EquipmentType, Player } from '../kieu_du_lieu';
import { Sword, Shield, CircuitBoard, Beaker } from 'lucide-react';
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

type NhanhCheTac = 'vu_khi' | 'giap_tru' | 'trang_suc' | 'vat_pham';

export const GiaoDienLoRen: React.FC<Props> = ({
  blueprints, materials, onCraft, onUpgradeBlueprint, eternalPoints, player
}) => {
  const [nhanhHienTai, datNhanhHienTai] = useState<NhanhCheTac>('vu_khi');
  const [bpDuocChon, datBpDuocChon] = useState<Blueprint | null>(null);
  const [moChiTiet, datMoChiTiet] = useState(false);

  const duLieuNhanh = useMemo(() => {
    return blueprints.filter(bp => {
      switch(nhanhHienTai) {
        case 'vu_khi': return bp.resultType === EquipmentType.Weapon;
        case 'giap_tru': return [EquipmentType.Armor, EquipmentType.Helmet, EquipmentType.Gloves, EquipmentType.Boots].includes(bp.resultType as EquipmentType);
        case 'trang_suc': return bp.resultType === EquipmentType.Accessory;
        case 'vat_pham': return bp.resultType === 'VẬT PHẨM';
        default: return false;
      }
    });
  }, [blueprints, nhanhHienTai]);

  const cacNhanh = [
    { id: 'vu_khi' as NhanhCheTac, ten: 'Vũ Khí', icon: Sword, mau: 'text-red-400' },
    { id: 'giap_tru' as NhanhCheTac, ten: 'Giáp Trụ', icon: Shield, mau: 'text-blue-400' },
    { id: 'trang_suc' as NhanhCheTac, ten: 'Trang Sức', icon: CircuitBoard, mau: 'text-purple-400' },
    { id: 'vat_pham' as NhanhCheTac, ten: 'Vật Phẩm', icon: Beaker, mau: 'text-green-400' },
  ];

  const giaNangCap = bpDuocChon ? Math.floor(100 * Math.pow(1.8, (bpDuocChon.evolutionLevel || 0))) : 0;
  const coTheNangCap = bpDuocChon && eternalPoints >= giaNangCap;

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950 overflow-hidden">
      <div className="w-full md:w-80 flex flex-col border-r border-slate-800 bg-slate-900/20 shrink-0">
          <div className="grid grid-cols-4 border-b border-slate-800">
              {cacNhanh.map(b => (
                  <button
                    key={b.id}
                    onClick={() => { datNhanhHienTai(b.id); datBpDuocChon(null); datMoChiTiet(false); }}
                    className={`p-4 flex flex-col items-center gap-1 transition-all border-b-2
                        ${nhanhHienTai === b.id ? `bg-slate-800 border-amber-500 ${b.mau}` : 'border-transparent text-slate-600 hover:text-slate-400'}`}
                  >
                      <b.icon size={20} />
                      <span className="text-[8px] font-black uppercase tracking-tighter">{b.ten}</span>
                  </button>
              ))}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              <div className="flex items-center gap-3 px-2 mb-2">
                  <div className="w-1 h-4 bg-amber-500 rounded-full"></div>
                  <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Danh mục bản vẽ</h3>
              </div>
              
              <DanhSachBanVe 
                  blueprints={duLieuNhanh} 
                  selectedId={bpDuocChon?.id} 
                  onSelect={(bp) => { datBpDuocChon(bp); datMoChiTiet(true); }} 
              />
          </div>

          {bpDuocChon && (
              <div className="p-5 bg-slate-900 border-t border-slate-800">
                  <div className="flex justify-between mb-4 px-1">
                      <span className="text-[9px] font-black text-slate-500 uppercase">Tiến hóa cấp {bpDuocChon.evolutionLevel}</span>
                      <span className="text-[9px] font-black text-amber-500 uppercase">+{bpDuocChon.evolutionLevel * 25}% sức mạnh</span>
                  </div>
                  <NutBam 
                    rong_het_co 
                    kieu={coTheNangCap ? 'chinh' : 'vien'}
                    disabled={!coTheNangCap}
                    onClick={() => onUpgradeBlueprint(bpDuocChon.id, giaNangCap)}
                    className="h-12 text-[11px] font-black uppercase tracking-widest"
                  >
                      NÂNG CẤP ({dinh_dang_so(giaNangCap)} EP)
                  </NutBam>
              </div>
          )}
      </div>

      <div className={`flex-1 h-full bg-slate-950/40 relative ${moChiTiet ? 'fixed inset-0 z-50 md:static' : 'hidden md:block'}`}>
          <ChiTietCheTac 
              blueprint={bpDuocChon} 
              materials={materials} 
              onCraft={onCraft} 
              onClose={() => datMoChiTiet(false)}
              player={player}
          />
      </div>
    </div>
  );
};
