
import React, { useState } from 'react';
import { Zone, Blueprint } from '../../kieu_du_lieu';
import { QUAI_VAT_DB } from '../../hang_so/quai_vat';
import { Map, Skull, Target, Heart, Shield, Box, Sparkles, Swords, Activity, Hammer } from 'lucide-react';
import { dinh_dang_so } from '../../tien_ich/tinh_toan';

interface Props {
  zones: Zone[];
  blueprints: Blueprint[];
}

export const TuDienQuaiVat: React.FC<Props> = ({ zones, blueprints }) => {
  const [vungChonId, datVungChonId] = useState<string>(zones[0]?.id || '');
  const [quaiChonId, datQuaiChonId] = useState<string | null>(null);

  const vungHienTai = zones.find(z => z.id === vungChonId);
  const danhSachQuai = vungHienTai ? QUAI_VAT_DB[vungHienTai.id] || [] : [];
  const quaiDuocChon = danhSachQuai.find(q => q.id === quaiChonId);

  // Tìm các bản vẽ liên quan đến nguyên liệu của quái này
  const banVeLienQuan = quaiDuocChon ? blueprints.filter(bp => 
    bp.requiredMaterials.some(req => 
        quaiDuocChon.dropTable.some(drop => drop.materialType === req.type)
    )
  ) : [];

  return (
    <div className="flex h-full overflow-hidden animate-fade-in bg-slate-950">
      {/* Sidebar - Cố định */}
      <div className="w-20 md:w-72 bg-slate-900/50 border-r border-white/5 flex flex-col shrink-0 overflow-y-auto scrollbar-hide">
        <div className="p-8 border-b border-white/5">
            <h4 className="hidden md:block text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Bản Đồ Sinh Thái</h4>
        </div>
        {zones.map(zone => (
          <button
            key={zone.id}
            onClick={() => { datVungChonId(zone.id); datQuaiChonId(null); }}
            className={`p-6 flex flex-col md:flex-row items-center gap-5 transition-all border-b border-white/5 ${vungChonId === zone.id ? 'bg-blue-600/10 text-blue-400' : 'text-slate-500 hover:bg-slate-800/50'}`}
          >
            <div className={`p-3 rounded-2xl ${vungChonId === zone.id ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-700'}`}>
                <Map size={20} />
            </div>
            <div className="hidden md:block text-left overflow-hidden">
                <span className="text-xs font-black uppercase truncate block">{zone.name}</span>
                <span className="text-[9px] font-bold text-slate-600 uppercase">Cấp {zone.recommendedLevel}+</span>
            </div>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 md:p-12 space-y-10 scrollbar-thin">
        <div className="bg-slate-900 p-8 md:p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
            <div className="relative z-10">
                <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">{vungHienTai?.name}</h3>
                <p className="text-sm text-slate-500 italic mt-3 max-w-2xl leading-relaxed">"{vungHienTai?.description}"</p>
                
                <div className="mt-6 flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                    {vungHienTai?.materials.map(m => (
                        <span key={m} className="px-3 py-1 bg-slate-950 rounded-xl text-[9px] font-black text-emerald-400 border border-emerald-500/10 uppercase">
                           • {m}
                        </span>
                    ))}
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Monster List */}
            <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-3 px-2 mb-4">
                    <Swords size={18} className="text-red-500" />
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Danh Sách Thực Thể</h4>
                </div>
                <div className="grid gap-3">
                  {danhSachQuai.map(quai => (
                      <button 
                          key={quai.id}
                          onClick={() => datQuaiChonId(quai.id)}
                          className={`w-full bg-slate-900/40 border p-5 rounded-[1.8rem] flex justify-between items-center transition-all ${quaiChonId === quai.id ? 'border-red-500/40 bg-red-500/5' : 'border-white/5 hover:border-white/10'}`}
                      >
                          <div className="flex items-center gap-4">
                              <div className={`p-3 rounded-xl ${quai.isBoss ? 'bg-red-600 text-white' : 'bg-slate-950 text-slate-700'}`}>
                                  {quai.isBoss ? <Skull size={20} /> : <Target size={20} />}
                              </div>
                              <div className="text-left">
                                  <div className={`text-sm font-black uppercase ${quai.isBoss ? 'text-red-400' : 'text-slate-200'}`}>{quai.name}</div>
                                  <div className="text-[9px] text-slate-600 font-bold uppercase">Cấp {quai.level}</div>
                              </div>
                          </div>
                      </button>
                  ))}
                </div>
            </div>

            {/* Monster Detail */}
            <div className="lg:col-span-7">
                {quaiDuocChon ? (
                    <div className="bg-slate-900/60 border border-white/5 p-8 rounded-[2.5rem] animate-fade-in flex flex-col gap-8 shadow-2xl">
                        <div className="text-center">
                            <h5 className="text-2xl font-black text-white uppercase italic mb-2">{quaiDuocChon.name}</h5>
                            <span className="text-[9px] px-3 py-1 bg-slate-950 rounded-full border border-white/5 text-slate-600 uppercase font-black">Mã: {quaiDuocChon.id}</span>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-slate-950 p-4 rounded-2xl border border-white/5 flex flex-col items-center">
                                <Heart size={16} className="text-rose-500 mb-1" />
                                <span className="text-[8px] text-slate-600 uppercase font-black">Sinh Lực</span>
                                <span className="text-sm font-black text-white">{dinh_dang_so(quaiDuocChon.maxHp)}</span>
                            </div>
                            <div className="bg-slate-950 p-4 rounded-2xl border border-white/5 flex flex-col items-center">
                                <Shield size={16} className="text-blue-500 mb-1" />
                                <span className="text-[8px] text-slate-600 uppercase font-black">Phòng Thủ</span>
                                <span className="text-sm font-black text-white">{dinh_dang_so(quaiDuocChon.defense)}</span>
                            </div>
                            <div className="bg-slate-950 p-4 rounded-2xl border border-white/5 flex flex-col items-center">
                                <Activity size={16} className="text-orange-500 mb-1" />
                                <span className="text-[8px] text-slate-600 uppercase font-black">Tấn Công</span>
                                <span className="text-sm font-black text-white">{dinh_dang_so(quaiDuocChon.attack)}</span>
                            </div>
                        </div>

                        {/* Drop Items */}
                        <div className="space-y-4">
                             <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <Box size={14} className="text-emerald-500" /> Vật Phẩm Rơi Ra
                             </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                 {quaiDuocChon.dropTable.map((drop, idx) => (
                                     <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-white/5 flex justify-between items-center">
                                         <span className="text-[10px] font-black text-slate-300 uppercase">{drop.materialType}</span>
                                         <span className="text-[10px] font-black text-emerald-500">{Math.floor(drop.chance * 100)}%</span>
                                     </div>
                                 ))}
                             </div>
                        </div>

                        {/* Craftable Equipment */}
                        <div className="space-y-4">
                             <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <Hammer size={14} className="text-blue-500" /> Trang Bị Liên Quan
                             </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                 {banVeLienQuan.length > 0 ? banVeLienQuan.map((bp) => (
                                     <div key={bp.id} className="bg-blue-900/10 p-3 rounded-xl border border-blue-500/20 flex items-center gap-3">
                                         <Sparkles size={14} className="text-blue-400" />
                                         <span className="text-[10px] font-black text-blue-200 uppercase truncate">{bp.name}</span>
                                     </div>
                                 )) : (
                                     <p className="text-[10px] text-slate-600 italic px-2">Chưa phát hiện trang bị liên quan...</p>
                                 )}
                             </div>
                        </div>
                    </div>
                ) : (
                    <div className="h-full min-h-[400px] border-2 border-dashed border-slate-900 rounded-[2.5rem] flex flex-col items-center justify-center p-12 text-center text-slate-700">
                        <Skull size={48} className="mb-4 opacity-10" />
                        <p className="font-black uppercase tracking-widest text-[10px] italic">Chọn mục tiêu để phân tích dữ liệu sinh thái</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};
