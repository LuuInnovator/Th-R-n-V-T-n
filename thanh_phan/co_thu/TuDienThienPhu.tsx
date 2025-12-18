
import React from 'react';
import { Star, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { THIEN_PHU_TRANG_BI } from '../../hang_so';

export const TuDienThienPhu: React.FC = () => {
  return (
    <div className="h-full p-6 overflow-y-auto animate-fade-in scrollbar-thin">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-3xl mb-8">
          <div className="flex items-center gap-4 mb-3">
            <Star className="text-amber-400" size={24} />
            <h3 className="text-xl font-black text-amber-400 uppercase tracking-tighter italic">Dấu Ấn Thần Linh</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed italic">
            "Thiên phú là những dòng chỉ số đặc biệt chỉ xuất hiện trên các trang bị từ phẩm chất Sử Thi trở lên. 
            Chúng mang lại những khả năng thay đổi cục diện trận đấu mà các chỉ số cơ bản không thể có được."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-20">
          {THIEN_PHU_TRANG_BI.map((tp, idx) => (
            <div key={idx} className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl hover:border-amber-500/30 transition-all group">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-800 rounded-xl text-amber-500 group-hover:scale-110 transition-transform">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h4 className="font-black text-slate-100 uppercase tracking-wide mb-1">{tp.name}</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                    {tp.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
