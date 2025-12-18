
import React, { useMemo } from 'react';
import { Zone, Enemy, Player } from '../kieu_du_lieu';
import { Shield, Zap, Heart, Map as MapIcon, Crown, TrendingUp, BarChart3, Activity } from 'lucide-react';
import { DanhSachVungDat } from './chien_dau/DanhSachVungDat';
import { HienThiQuaiVat } from './chien_dau/HienThiQuaiVat';
import { NhatKyChienDau } from './chien_dau/NhatKyChienDau';
import { BAN_VE_KHOI_TAO } from '../hang_so/ban_ve';
import { dinh_dang_so } from '../tien_ich/tinh_toan';

interface Props {
  nguoi_choi: Player;
  vung_dat: Zone[];
  vung_hien_tai: Zone;
  onChonVung: (vung: Zone) => void;
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
  const lucChien = useMemo(() => {
    return Math.floor((nguoi_choi.attack * 1.5) + (nguoi_choi.defense * 1.2) + (nguoi_choi.maxHp / 10));
  }, [nguoi_choi.attack, nguoi_choi.defense, nguoi_choi.maxHp]);

  return (
    <div className="h-full w-full flex flex-col bg-[#020617] overflow-hidden">
      {/* Vùng đất - Thu gọn padding */}
      <div className="shrink-0 bg-slate-950/40 border-b border-white/5 p-3 relative z-30">
        <div className="max-w-7xl mx-auto flex flex-col gap-2">
            <div className="flex items-center gap-2 px-6">
                <MapIcon size={12} className="text-indigo-400" />
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.4em]">BẢN ĐỒ VIỄN CHINH</span>
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
      
      <div className="flex-1 p-4 md:p-6 grid grid-cols-12 gap-6 overflow-hidden">
        
        {/* Cột trái - Sinh Tồn (Được thiết kế lại siêu gọn) */}
        <div className="hidden lg:flex col-span-3 flex-col gap-4 overflow-y-auto scrollbar-hide">
             <div className="bg-slate-900/30 p-6 rounded-[2.5rem] border border-white/5 shadow-2xl flex flex-col gap-6">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500 border border-rose-500/20">
                        <Heart size={18} className="animate-pulse" />
                    </div>
                    <div>
                        <h3 className="font-black text-white text-[11px] uppercase tracking-widest italic">SINH TỒN</h3>
                        <span className="text-[7px] text-slate-600 font-bold uppercase block">Status_Core</span>
                    </div>
                </div>
                
                <div className="space-y-6">
                    {/* Máu */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-end px-1">
                            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Sinh Lực</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-lg font-black text-white tabular-nums tracking-tighter">{dinh_dang_so(nguoi_choi.hp)}</span>
                                <span className="text-[8px] font-bold text-slate-700">/ {dinh_dang_so(nguoi_choi.maxHp)}</span>
                            </div>
                        </div>
                        <div className="h-2 bg-black/60 rounded-full border border-white/5 p-0.5 overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-rose-600 to-pink-500 rounded-full transition-all duration-700 shadow-[0_0_8px_rgba(244,63,94,0.4)]" 
                                style={{ width: `${(nguoi_choi.hp / nguoi_choi.maxHp) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* EXP */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-end px-1">
                            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Tiến Trình</span>
                            <span className="text-[9px] font-black text-blue-400">{Math.floor((nguoi_choi.currentExp / nguoi_choi.maxExp) * 100)}%</span>
                        </div>
                        <div className="h-1 bg-black/60 rounded-full border border-white/5 overflow-hidden">
                             <div 
                                className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full" 
                                style={{ width: `${(nguoi_choi.currentExp / nguoi_choi.maxExp) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Lực Chiến Card */}
                    <div className="bg-slate-950/60 p-4 rounded-2xl border border-white/5 flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20 group-hover:scale-105 transition-transform">
                                <Crown size={20} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[7px] font-black text-slate-600 uppercase">Lực Chiến</span>
                                <span className="text-xl font-black text-amber-500 italic tabular-nums leading-none mt-0.5">{dinh_dang_so(lucChien)}</span>
                            </div>
                        </div>
                        <TrendingUp size={12} className="text-emerald-500 opacity-30" />
                    </div>

                    {/* Chỉ số lưới */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-950/40 p-3.5 rounded-2xl border border-white/5 flex flex-col items-center">
                            <Zap size={14} className="text-orange-500 mb-2" />
                            <span className="text-[7px] text-slate-600 font-black uppercase mb-1">CÔNG</span>
                            <span className="text-sm font-black text-white tabular-nums tracking-tight">{dinh_dang_so(nguoi_choi.attack)}</span>
                        </div>
                        <div className="bg-slate-950/40 p-3.5 rounded-2xl border border-white/5 flex flex-col items-center">
                            <Shield size={14} className="text-blue-500 mb-2" />
                            <span className="text-[7px] text-slate-600 font-black uppercase mb-1">THỦ</span>
                            <span className="text-sm font-black text-white tabular-nums tracking-tight">{dinh_dang_so(nguoi_choi.defense)}</span>
                        </div>
                    </div>
                </div>
             </div>
        </div>

        {/* Cột giữa - Quái vật */}
        <div className="col-span-12 lg:col-span-6 flex flex-col items-center overflow-y-auto scrollbar-hide">
             <HienThiQuaiVat 
                enemy={quai_vat} 
                moTaVung={vung_hien_tai.description}
                onTimKiem={onKhamPha}
                onTanCong={onTanCong}
                dangTuDong={dangTuDong}
                onDoiTuDong={() => datDangTuDong(!dangTuDong)}
            />
        </div>

        {/* Cột phải - Nhật ký */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-4 overflow-hidden">
             <NhatKyChienDau nhat_ky={nhat_ky} />
             
             <div className="mt-auto bg-slate-900/10 p-6 rounded-[2rem] border border-white/5 flex flex-col items-center text-center opacity-80">
                 <div className="w-10 h-10 rounded-full bg-slate-950 flex items-center justify-center mb-3 text-slate-800">
                    <BarChart3 size={20} />
                 </div>
                 <h4 className="text-[9px] text-white font-black uppercase tracking-[0.3em] italic">{vung_hien_tai.name}</h4>
                 <p className="text-[7px] text-slate-600 font-bold uppercase mt-1">Cấp đề xuất: {vung_hien_tai.recommendedLevel}</p>
             </div>
        </div>
      </div>
    </div>
  );
};
