
import React, { useState } from 'react';
import { Blueprint, Material, Player } from '../../kieu_du_lieu';
import { NutBam } from '../NutBam';
import { Hammer, AlertCircle, Sparkles, X, Flame } from 'lucide-react';
import { ChiSoCheTac } from './ChiSoCheTac';
import { NguyenLieuCheTac } from './NguyenLieuCheTac';

interface Props {
  blueprint: Blueprint | null;
  materials: Material[];
  onCraft: (bp: Blueprint, useOverheat: boolean) => void;
  onClose?: () => void;
  player: Player;
}

export const ChiTietCheTac: React.FC<Props> = ({ blueprint, materials, onCraft, onClose, player }) => {
  const [dotNhiet, datDotNhiet] = useState(false);

  const duNguyenLieu = (bp: Blueprint) => {
    return bp.requiredMaterials.every(req => {
      const tonKho = materials.filter(m => m.type === req.type).reduce((acc, curr) => acc + curr.quantity, 0);
      return tonKho >= req.amount;
    });
  };

  if (!blueprint) return (
    <div className="h-full flex flex-col items-center justify-center text-center p-8">
        <Hammer size={48} className="text-slate-700 mb-4" />
        <h3 className="text-xl font-black text-slate-500 uppercase">Sẵn sàng đúc rèn</h3>
    </div>
  );

  const coTheCheTac = duNguyenLieu(blueprint);

  return (
    <div className="h-full flex flex-col bg-slate-950 relative overflow-hidden">
        <button onClick={onClose} className="md:hidden absolute top-4 right-4 z-50 p-2 bg-slate-800 rounded-full text-white"><X size={20} /></button>
        
        <div className="flex-1 overflow-y-auto p-6 pb-32">
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="text-center">
                    <h2 className="text-2xl font-black text-slate-100 uppercase tracking-tighter mb-4">{blueprint.name}</h2>
                    <button 
                        onClick={() => datDotNhiet(!dotNhiet)}
                        className={`px-6 py-2 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${dotNhiet ? 'bg-red-600 text-white border-red-400 shadow-lg' : 'bg-slate-900 text-slate-500 border-slate-800'}`}
                    >
                        {dotNhiet ? '🔥 CHẾ ĐỘ ĐỐT NHIỆT 🔥' : '🔨 CHẾ ĐỘ TIÊU CHUẨN 🔨'}
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ChiSoCheTac blueprint={blueprint} dotNhiet={dotNhiet} player={player} />
                    <NguyenLieuCheTac blueprint={blueprint} materials={materials} />
                </div>
            </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-slate-900/80 backdrop-blur-md border-t border-slate-800">
            <NutBam 
                kich_co="xl" rong_het_co 
                disabled={!coTheCheTac}
                kieu={dotNhiet ? 'nguy_hiem' : 'chinh'}
                onClick={() => onCraft(blueprint, dotNhiet)}
            >
                {coTheCheTac ? (dotNhiet ? 'KHAI HỎA (70% RỦI RO)' : 'BẮT ĐẦU CHẾ TÁC') : 'THIẾU NGUYÊN LIỆU'}
            </NutBam>
        </div>
    </div>
  );
};
