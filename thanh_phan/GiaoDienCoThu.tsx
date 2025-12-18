
import React, { useState } from 'react';
import { Zone, Blueprint } from '../kieu_du_lieu';
import { Skull, Star, BookOpen } from 'lucide-react';
import { TuDienQuaiVat } from './co_thu/TuDienQuaiVat';
import { TuDienThienPhu } from './co_thu/TuDienThienPhu';
import { TuDienBiKy } from './co_thu/TuDienBiKy';

interface Props {
  vung_dat: Zone[];
  ban_ve: Blueprint[];
}

export const GiaoDienCoThu: React.FC<Props> = ({ vung_dat, ban_ve }) => {
  const [tabHienTai, datTabHienTai] = useState<'quai_vat' | 'thien_phu' | 'bi_ky'>('quai_vat');

  return (
    <div className="h-full w-full flex flex-col bg-slate-950 overflow-hidden">
      <div className="flex bg-slate-900 border-b border-slate-800 shrink-0 px-4 overflow-x-auto scrollbar-hide z-10 shadow-lg">
          <div className="flex max-w-7xl mx-auto w-full">
            <button 
                onClick={() => datTabHienTai('quai_vat')}
                className={`py-5 px-8 text-[10px] font-black uppercase tracking-[0.3em] border-b-2 transition-all flex items-center gap-3 whitespace-nowrap ${tabHienTai === 'quai_vat' ? 'border-blue-500 text-blue-400 bg-blue-500/5' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
            >
                <Skull size={16} /> Quái Vật
            </button>
            <button 
                onClick={() => datTabHienTai('thien_phu')}
                className={`py-5 px-8 text-[10px] font-black uppercase tracking-[0.3em] border-b-2 transition-all flex items-center gap-3 whitespace-nowrap ${tabHienTai === 'thien_phu' ? 'border-amber-500 text-amber-400 bg-amber-500/5' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
            >
                <Star size={16} /> Thiên Phú
            </button>
            <button 
                onClick={() => datTabHienTai('bi_ky')}
                className={`py-5 px-8 text-[10px] font-black uppercase tracking-[0.3em] border-b-2 transition-all flex items-center gap-3 whitespace-nowrap ${tabHienTai === 'bi_ky' ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
            >
                <BookOpen size={16} /> Bí Pháp
            </button>
          </div>
      </div>

      <div className="flex-1 overflow-hidden relative">
          {tabHienTai === 'quai_vat' && <TuDienQuaiVat zones={vung_dat} blueprints={ban_ve} />}
          {tabHienTai === 'thien_phu' && <TuDienThienPhu />}
          {tabHienTai === 'bi_ky' && <TuDienBiKy />}
      </div>
    </div>
  );
};
