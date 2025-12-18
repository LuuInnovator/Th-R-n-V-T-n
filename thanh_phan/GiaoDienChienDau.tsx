
import React from 'react';
import { Zone, Enemy, Player } from '../kieu_du_lieu';
import { Shield, Target, Zap, Heart, Map as MapIcon } from 'lucide-react';
import { DanhSachVungDat } from './chien_dau/DanhSachVungDat';
import { HienThiQuaiVat } from './chien_dau/HienThiQuaiVat';
import { NhatKyChienDau } from './chien_dau/NhatKyChienDau';
import { BAN_VE_KHOI_TAO } from '../hang_so/ban_ve';

interface Props {
  vung_dat: Zone[];
  vung_hien_tai: Zone;
  onChonVung: (vung: Zone) => void;
  nguoi_choi: Player;
  quai_vat: Enemy | null;
  onKhamPha: () => void;
  onTanCong: () => void;
  nhat_ky: any[];
  dangTuDong: boolean;
  datDangTuDong: (v: boolean) => void;
}

export const GiaoDienChienDau: React.FC<Props> = ({
  vung_dat, vung_hien_tai, onChonVung, nguoi_choi, quai_vat, onKhamPha, onTanCong, nhat_ky,
  dangTuDong, datDangTuDong
}) => {
  return (
    <div className="h-full w-full flex flex-col bg-[#020617] overflow-hidden">
      {/* Map Selector */}
      <div className="shrink-0 bg-slate-900/60 backdrop-blur-xl border-b border-white/5 p-4 relative z-30 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex flex-col gap-3">
            <div className="flex items-center gap-2 px-2">
                <MapIcon size={14} className="text-blue-500" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Chọn Bản Đồ Viễn Chinh</span>
            </div>
            <DanhSachVungDat 
                zones={vung_dat} 
                activeZone={vung_hien_tai} 
                onSelect={onChonVung}
                blueprints={BAN_VE_KHOI_TAO} 
                dropRateBonus={0}
            />
        </div>
      </div>
      
      {/* Battle Layout */}
      <div className="flex-1 p-4 md:p-6 grid grid-cols-12 gap-6 overflow-hidden">
        
        {/* Left Column - Stats */}
        <div className="hidden lg:flex col-span-3 flex-col gap-4 overflow-y-auto scrollbar-hide">
             <div className="bg-slate-900/40 p-6 rounded-[2rem] border border-white/5 space-y-6">
                <div className="flex items-center gap-2">
                    <Heart size={16} className="text-rose-500" />
                    <span className="font-black text-white text-[10px] uppercase tracking-widest italic">Trạng Thái Sinh Tồn</span>
                </div>
                
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-[9px] font-black text-slate-500 mb-1.5 uppercase tracking-widest">
                            <span>Máu</span>
                            <span className="text-white">{nguoi_choi.hp.toLocaleString()} / {nguoi_choi.maxHp.toLocaleString()}</span>
                        </div>
                        <div className="h-3 bg-slate-950 rounded-full border border-white/5 p-0.5">
                            <div 
                                className="h-full bg-gradient-to-r from-rose-700 to-rose-500 rounded-full transition-all duration-300" 
                                style={{ width: `${(nguoi_choi.hp / nguoi_choi.maxHp) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between text-[9px] font-black text-slate-500 mb-1.5 uppercase tracking-widest">
                            <span>Kinh nghiệm</span>
                            <span>{Math.floor((nguoi_choi.currentExp / nguoi_choi.maxExp) * 100)}%</span>
                        </div>
                        <div className="h-2 bg-slate-950 rounded-full border border-white/5 p-0.5">
                             <div 
                                className="h-full bg-blue-500 rounded-full" 
                                style={{ width: `${(nguoi_choi.currentExp / nguoi_choi.maxExp) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="bg-slate-950 p-3 rounded-2xl border border-white/5 flex flex-col items-center">
                        <Zap size={14} className="text-orange-400 mb-1" />
                        <span className="text-[10px] font-black text-white">{nguoi_choi.attack.toLocaleString()}</span>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-2xl border border-white/5 flex flex-col items-center">
                        <Shield size={14} className="text-blue-400 mb-1" />
                        <span className="text-[10px] font-black text-white">{nguoi_choi.defense.toLocaleString()}</span>
                    </div>
                </div>
             </div>
        </div>

        {/* Center - Monster Display */}
        <div className="col-span-12 lg:col-span-6 flex flex-col items-center overflow-y-auto scrollbar-hide py-4">
             <HienThiQuaiVat 
                enemy={quai_vat} 
                moTaVung={vung_hien_tai.description}
                onTimKiem={onKhamPha}
                onTanCong={onTanCong}
                dangTuDong={dangTuDong}
                onDoiTuDong={() => datDangTuDong(!dangTuDong)}
            />
        </div>

        {/* Right Column - Logs */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-4 overflow-hidden">
             <NhatKyChienDau nhat_ky={nhat_ky} />
             
             <div className="mt-auto bg-slate-900/20 p-6 rounded-[2rem] border-2 border-dashed border-white/5 flex flex-col items-center text-center">
                 <Target size={32} className="text-slate-800 mb-3" />
                 <h4 className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{vung_hien_tai.name}</h4>
                 <p className="text-[8px] text-slate-600 font-bold uppercase mt-1">Cấp đề xuất: {vung_hien_tai.recommendedLevel}</p>
             </div>
        </div>
      </div>
    </div>
  );
};
