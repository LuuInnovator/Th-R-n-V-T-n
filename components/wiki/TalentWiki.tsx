
import React from 'react';
import { EQUIPMENT_TALENTS } from '../../constants';
import { Sparkles, Star } from 'lucide-react';

export const TalentWiki: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-12 scrollbar-thin bg-slate-950 animate-fade-in">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 pb-24">
        <div className="col-span-full mb-6 border-l-4 border-amber-500 pl-6 py-2">
          <h3 className="text-2xl font-black text-slate-100 uppercase tracking-tighter italic">Thiên Phú Cổ Đại</h3>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2">Dấu ấn thần bí xuất hiện ngẫu nhiên trên trang bị Hiếm+</p>
        </div>

        {EQUIPMENT_TALENTS.map((talent, idx) => (
          <div key={idx} className="bg-slate-900/40 border border-slate-800 p-8 rounded-3xl group hover:border-amber-500/50 transition-all shadow-xl hover:shadow-amber-900/10 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl rounded-full group-hover:bg-amber-500/10 transition-all"></div>
            
            <div className="flex items-center gap-5 mb-5 relative z-10">
              <div className="p-4 bg-amber-500/10 rounded-2xl text-amber-500 group-hover:scale-110 transition-transform shadow-inner border border-amber-500/20">
                <Star size={28} fill="currentColor" />
              </div>
              <h4 className="font-black text-slate-100 text-xl uppercase tracking-tighter italic leading-tight">{talent.name}</h4>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed font-medium relative z-10 border-t border-slate-800 pt-4">
              {talent.desc}
            </p>
          </div>
        ))}

        <div className="col-span-full bg-slate-900/20 border border-dashed border-slate-800 p-12 rounded-3xl text-center mt-8">
            <Sparkles size={40} className="mx-auto text-slate-800 mb-4" />
            <p className="text-xs text-slate-600 font-black uppercase tracking-[0.4em]">Trang bị phẩm chất càng cao, tỷ lệ xuất hiện Thiên Phú càng lớn</p>
        </div>
      </div>
    </div>
  );
};
