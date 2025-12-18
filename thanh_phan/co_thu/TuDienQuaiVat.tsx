
import React, { useState, useMemo } from 'react';
import { Zone, Blueprint, Enemy } from '../../kieu_du_lieu';
import { QUAI_VAT_DB } from '../../hang_so/quai_vat';
import { Map, Skull, Target, Heart, Shield, Box, Sparkles, Swords, Activity, Hammer, Crown, AlertTriangle } from 'lucide-react';
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

  const lucChienQuai = useMemo(() => {
    if (!quaiDuocChon) return 0;
    return Math.floor((quaiDuocChon.attack * 1.5) + (quaiDuocChon.defense * 1.2) + (quaiDuocChon.maxHp / 10));
  }, [quaiDuocChon]);

  return (
    <div className="flex h-full overflow-hidden animate-fade-in bg-slate-950">
      {/* Sidebar */}
      <div className="w-20 md:w-72 bg-slate-900/50 border-r border-white/5 flex flex-col shrink-0 overflow-y-auto scrollbar-hide">
        <div className="p-8 border-b border-white/5">
            <h4 className="hidden md:block text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Hệ Sinh Thái</h4>
        </div>
        {zones.map(zone => (
          <button
            key={zone.id}
            onClick={() => { datVungChonId(zone.id); datQuaiChonId(null); }}
            className={`p-6 flex flex-col md:flex-row items-center gap-5 transition-all border-b border-white/5 ${vungChonId === zone.id ? 'bg-blue-600/10 text-blue-400' : 'text-slate-500 hover:bg-slate-800/50'}`}
          >
            <div className={`p-3 rounded-2xl ${vungChonId === zone.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'bg-slate-900 text-slate-700'}`}>
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
        <div className="bg-slate-900/40 p-10 rounded-[3rem] border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5">
                <Map size={120} />
            </div>
            <div className="relative z-10">
                <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter">{vungHienTai?.name}</h3>
                <p className="text-sm text-slate-500 italic mt-4 max-w-2xl leading-relaxed">"{vungHienTai?.description}"</p>
                
                <div className="mt-8 flex gap-3 overflow-x-auto scrollbar-hide">
                    {vungHienTai?.materials.map(m => (
                        <span key={m} className="px-4 py-1.5 bg-emerald-500/10 rounded-xl text-[9px] font-black text-emerald-400 border border-emerald-500/20 uppercase tracking-widest">
                           {m}
                        </span>
                    ))}
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4 space-y-4">
                <div className="flex items-center gap-3 px-2 mb-6">
                    <Swords size={18} className="text-blue-500" />
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dữ Liệu Thực Thể</h4>
                </div>
                <div className="grid gap-4">
                  {danhSachQuai.map(quai => (
                      <button 
                          key={quai.id}
                          onClick={() => datQuaiChonId(quai.id)}
                          className={`w-full bg-slate-900/60 border p-6 rounded-[2rem] flex justify-between items-center transition-all duration-500 group/item ${quaiChonId === quai.id ? 'border-blue-500/40 bg-blue-500/10 shadow-xl' : 'border-white/5 hover:border-white/10'}`}
                      >
                          <div className="flex items-center gap-5">
                              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${quai.isBoss ? 'bg-red-600 text-white shadow-lg shadow-red-900/40' : 'bg-slate-950 text-slate-700'}`}>
                                  {quai.isBoss ? <Skull size={24} /> : <Target size={24} />}
                              </div>
                              <div className="text-left">
                                  <div className={`text-sm font-black uppercase tracking-tight ${quai.isBoss ? 'text-red-400' : 'text-slate-100'}`}>{quai.name}</div>
                                  <div className="text-[9px] text-slate-500 font-bold uppercase mt-1">LV.{quai.level}</div>
                              </div>
                          </div>
                      </button>
                  ))}
                </div>
            </div>

            <div className="lg:col-span-8">
                {quaiDuocChon ? (
                    <div className="bg-slate-900/80 border border-white/10 p-10 rounded-[3.5rem] animate-fade-in flex flex-col gap-10 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                        <div className="flex justify-between items-start">
                            <div>
                                <h5 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-2">{quaiDuocChon.name}</h5>
                                <div className="flex gap-2">
                                    <span className="text-[9px] px-3 py-1 bg-slate-950 rounded-full border border-white/5 text-slate-500 uppercase font-black">ID: {quaiDuocChon.id}</span>
                                    {quaiDuocChon.isBoss && <span className="text-[9px] px-3 py-1 bg-red-600/20 rounded-full border border-red-500/30 text-red-500 uppercase font-black">Mục Tiêu Nguy Hiểm</span>}
                                </div>
                            </div>
                            
                            <div className="bg-slate-950 p-6 rounded-[2.5rem] border border-white/5 text-center min-w-[150px]">
                                <span className="text-[8px] font-black text-slate-600 uppercase mb-2 block">Lực Chiến Khuyến Nghị</span>
                                <div className="text-2xl font-black text-amber-500 italic tabular-nums">{dinh_dang_so(lucChienQuai)}</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            <div className="bg-slate-950/80 p-6 rounded-3xl border border-white/5 flex flex-col items-center group/stat">
                                <Heart size={20} className="text-rose-500 mb-3 group-hover/stat:scale-125 transition-transform" />
                                <span className="text-[8px] text-slate-600 uppercase font-black">Sinh Lực</span>
                                <span className="text-lg font-black text-white tabular-nums">{dinh_dang_so(quaiDuocChon.maxHp)}</span>
                            </div>
                            <div className="bg-slate-950/80 p-6 rounded-3xl border border-white/5 flex flex-col items-center group/stat">
                                <Shield size={20} className="text-blue-500 mb-3 group-hover/stat:scale-125 transition-transform" />
                                <span className="text-[8px] text-slate-600 uppercase font-black">Phòng Thủ</span>
                                <span className="text-lg font-black text-white tabular-nums">{dinh_dang_so(quaiDuocChon.defense)}</span>
                            </div>
                            <div className="bg-slate-950/80 p-6 rounded-3xl border border-white/5 flex flex-col items-center group/stat">
                                <Activity size={20} className="text-orange-500 mb-3 group-hover/stat:scale-125 transition-transform" />
                                <span className="text-[8px] text-slate-600 uppercase font-black">Tấn Công</span>
                                <span className="text-lg font-black text-white tabular-nums">{dinh_dang_so(quaiDuocChon.attack)}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 px-2">
                                    <Box size={14} className="text-emerald-500" /> Vật Phẩm Rơi Ra
                                </div>
                                <div className="grid gap-2">
                                    {quaiDuocChon.dropTable.map((drop, idx) => (
                                        <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-white/5 flex justify-between items-center group/drop hover:border-emerald-500/30 transition-all">
                                            <span className="text-[10px] font-black text-slate-300 uppercase">{drop.materialType}</span>
                                            <div className="flex items-center gap-3">
                                                <div className="h-1.5 w-12 bg-slate-900 rounded-full overflow-hidden">
                                                    <div className="h-full bg-emerald-500" style={{ width: `${drop.chance * 100}%` }}></div>
                                                </div>
                                                <span className="text-[10px] font-black text-emerald-500 tabular-nums">{Math.floor(drop.chance * 100)}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 px-2">
                                    <AlertTriangle size={14} className="text-red-500" /> Cảnh Báo Nguy Hiểm
                                </div>
                                <div className="bg-red-950/10 border border-red-500/20 p-6 rounded-[2rem] space-y-4">
                                    <div className="text-[9px] text-red-400 font-bold uppercase leading-relaxed italic">
                                        "{quaiDuocChon.isBoss ? "Thực thể này sở hữu luồng năng lượng khổng lồ. Tuyệt đối không đối đầu nếu Lực Chiến thấp hơn chỉ số khuyến nghị." : "Kẻ địch thường xuyên xuất hiện theo đàn, hãy tập trung vào các chỉ số phòng ngự."}"
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {quaiDuocChon.abilities?.map(a => (
                                            <span key={a} className="px-3 py-1 bg-red-600 text-white text-[8px] font-black rounded-lg uppercase">{a}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="h-full min-h-[500px] border-2 border-dashed border-slate-900 rounded-[3.5rem] flex flex-col items-center justify-center p-12 text-center text-slate-800 space-y-6">
                        <Activity size={64} className="opacity-10 animate-pulse" />
                        <div className="space-y-2">
                            <p className="font-black uppercase tracking-[0.3em] text-xs">Hệ Thống Phân Tích Dữ Liệu</p>
                            <p className="text-[10px] font-bold text-slate-700 italic">"Hãy chọn một mục tiêu để giải mã dữ liệu sinh tồn"</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};
