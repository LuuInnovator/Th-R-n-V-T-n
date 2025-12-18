
import React, { useState } from 'react';
import { Blueprint, Material, Player } from '../../kieu_du_lieu';
import { NutBam } from '../NutBam';
import { Hammer, Flame, Sparkles, ShieldCheck, Zap, Info } from 'lucide-react';
import { ChiSoCheTac } from './ChiSoCheTac';
import { NguyenLieuCheTac } from './NguyenLieuCheTac';

interface Props {
  blueprint: Blueprint | null;
  materials: Material[];
  onCraft: (bp: Blueprint, useOverheat: boolean) => void;
  onClose?: () => void;
  player: Player;
}

export const ChiTietCheTac: React.FC<Props> = ({ blueprint, materials, onCraft, player }) => {
  const [dotNhiet, datDotNhiet] = useState(false);

  const duNguyenLieu = (bp: Blueprint) => {
    return bp.requiredMaterials.every(req => {
      const tonKho = materials.filter(m => m.type === req.type).reduce((acc, curr) => acc + curr.quantity, 0);
      return tonKho >= req.amount;
    });
  };

  if (!blueprint) return (
    <div className="h-full flex flex-col items-center justify-center text-center p-8">
        <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center border border-white/5 mb-6">
            <Hammer size={24} className="text-slate-800 animate-float" />
        </div>
        <h3 className="text-sm font-black text-slate-600 uppercase tracking-[0.3em] italic">Vui lòng chọn bản vẽ</h3>
    </div>
  );

  const coTheCheTac = duNguyenLieu(blueprint);

  return (
    <div className="h-full flex flex-col bg-[#020617] relative animate-fade-in overflow-hidden">
        {/* Workspace Header - Rút gọn */}
        <div className="p-4 md:p-6 border-b border-white/5 flex items-center justify-between bg-slate-950/40">
            <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${dotNhiet ? 'border-red-500 bg-red-500/10 text-red-500 shadow-lg shadow-red-500/20' : 'border-white/10 bg-slate-900 text-white'}`}>
                    {dotNhiet ? <Flame size={18} /> : <Hammer size={18} />}
                </div>
                <div>
                   <span className="text-[7px] font-black text-slate-600 uppercase tracking-[0.3em] block">WORKBENCH_SYS</span>
                   <h2 className="text-lg font-black text-white uppercase italic tracking-tighter leading-none">{blueprint.name}</h2>
                </div>
            </div>

            <button 
                onClick={() => datDotNhiet(!dotNhiet)}
                className={`px-4 py-2 rounded-xl border text-[8px] font-black uppercase tracking-widest transition-all flex items-center gap-2
                    ${dotNhiet ? 'bg-red-600 border-red-400 text-white' : 'bg-slate-900 border-white/5 text-slate-500 hover:text-white'}`}
            >
                {dotNhiet ? <Zap size={12} className="animate-pulse" /> : <ShieldCheck size={12} />}
                {dotNhiet ? 'OVERHEAT' : 'STANDARD'}
            </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-hide pb-32">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Stats Prediction Area */}
                <div className="lg:col-span-7">
                    <ChiSoCheTac blueprint={blueprint} dotNhiet={dotNhiet} player={player} />
                </div>
                
                {/* Requirements Area */}
                <div className="lg:col-span-5 space-y-6">
                    <NguyenLieuCheTac blueprint={blueprint} materials={materials} />
                    
                    <div className="bg-slate-900/40 p-4 rounded-2xl border border-white/5 space-y-2">
                        <div className="flex items-center gap-2">
                            <Info size={12} className="text-indigo-500" />
                            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Ghi chú</span>
                        </div>
                        <p className="text-[8px] text-slate-600 font-bold uppercase leading-relaxed">
                            {dotNhiet ? "Tỷ lệ hỏng cao nhưng chỉ số nhân đôi." : "An toàn tuyệt đối, chỉ số cơ bản."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        
        {/* Floating Action Bar - Slimmer */}
        <div className="absolute bottom-6 left-0 right-0 px-8 z-30 pointer-events-none">
            <div className="max-w-3xl mx-auto flex items-center gap-6 p-4 bg-slate-950/90 border border-white/10 rounded-[2rem] backdrop-blur-2xl shadow-2xl pointer-events-auto">
                <div className="flex flex-col items-center px-4">
                    <span className="text-[7px] font-black text-slate-600 uppercase mb-0.5 tracking-widest">KHẢ THI</span>
                    <div className="text-base font-black italic text-white leading-none">{coTheCheTac ? (dotNhiet ? "30%" : "100%") : "0%"}</div>
                </div>

                <div className="flex-1">
                    <NutBam 
                        kich_co="lg" 
                        rong_het_co 
                        disabled={!coTheCheTac}
                        kieu={dotNhiet ? 'nguy_hiem' : 'chinh'}
                        onClick={() => onCraft(blueprint, dotNhiet)}
                        className="h-12 text-[10px] font-black italic tracking-[0.2em] shadow-lg"
                    >
                        {coTheCheTac ? (dotNhiet ? 'KHAI HỎA' : 'CHẾ TÁC') : 'THIẾU TÀI NGUYÊN'}
                    </NutBam>
                </div>
            </div>
        </div>
    </div>
  );
};
