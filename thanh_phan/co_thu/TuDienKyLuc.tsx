
import React from 'react';
import { Trophy, History, Star, Swords, Shield, Hammer, Crown, Sparkles, TrendingUp, Package, Zap, Info, ShieldCheck, HelpCircle, ArrowRight, Lightbulb } from 'lucide-react';
import { dinh_dang_so } from '../../tien_ich/tinh_toan';
import { Player, Equipment } from '../../kieu_du_lieu';
import { MAU_DO_HIEM } from '../../hang_so/do_hiem';

interface Props {
  player: Player;
  equipped?: any;
}

export const TuDienKyLuc: React.FC<Props> = ({ player, equipped }) => {
  const stats = {
      maxDps: player.lifeStats?.maxDamageDealt || 0,
      bestItemName: player.rebirthCount > 0 ? "Bản Sắc Luân Hồi" : "Tân Thủ Cốt",
      totalCrafted: player.lifeStats?.itemsCrafted || 0,
      maxGold: player.lifeStats?.goldEarned || 0,
      totalRebirth: player.rebirthCount || 0
  };

  const legacyItem = (Object.values(equipped || {}) as (Equipment | null)[]).find(i => i?.isLegacy);

  const RecordCard = ({ title, value, sub, icon: Icon, color }: any) => (
    <div className="bg-slate-900/60 p-10 rounded-[3.5rem] border border-white/5 relative overflow-hidden group hover:border-white/20 transition-all duration-700">
        <div className={`absolute -right-8 -top-8 w-32 h-32 blur-[60px] opacity-10 bg-${color}-500 group-hover:opacity-30 transition-all`}></div>
        <div className="flex items-center gap-8 relative z-10">
            <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center bg-slate-950 border border-white/10 text-${color}-400 shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                <Icon size={40} />
            </div>
            <div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] block mb-2">{title}</span>
                <div className="text-3xl font-black text-white italic tabular-nums">{typeof value === 'number' ? dinh_dang_so(value) : value}</div>
                {sub && <span className="text-[9px] font-bold text-slate-700 uppercase mt-2 block tracking-widest">{sub}</span>}
            </div>
        </div>
    </div>
  );

  return (
    <div className="h-full p-8 md:p-16 overflow-y-auto animate-fade-in scrollbar-thin bg-[#020617]">
        <div className="max-w-6xl mx-auto space-y-16 pb-40">
            {/* Tiêu đề chính */}
            <div className="relative p-16 rounded-[5rem] bg-gradient-to-br from-indigo-950 via-slate-950 to-black border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
                <div className="absolute inset-0 bg-grid opacity-10"></div>
                <div className="relative z-10 space-y-6 text-center md:text-left">
                    <div className="inline-flex items-center gap-3 px-5 py-2 bg-indigo-500/10 border border-indigo-500/40 rounded-full">
                        <Crown size={18} className="text-indigo-400 animate-float" />
                        <span className="text-xs font-black text-indigo-400 uppercase tracking-[0.4em]">ĐIỀN TRANG HUYỀN THOẠI</span>
                    </div>
                    <h2 className="text-6xl md:text-8xl font-black text-white uppercase italic tracking-tighter leading-none">
                        VĨNH HẰNG<br/><span className="text-indigo-500">BẤT DIỆT</span>
                    </h2>
                    <p className="text-sm text-slate-500 italic max-w-lg leading-relaxed">"Nơi dòng thời gian ngừng lại, nơi mỗi hành động rèn đúc đều được khắc ghi vào hư không vĩnh cửu. Kỷ lục của bạn là định mệnh của thế giới này."</p>
                </div>
                
                <div className="relative z-10 flex gap-12 bg-slate-900/40 p-10 rounded-[3rem] border border-white/5 backdrop-blur-md">
                    <div className="flex flex-col items-center">
                        <div className="text-5xl font-black text-white italic">{stats.totalRebirth}</div>
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-2">Kiếp Luân Hồi</div>
                    </div>
                    <div className="w-px h-16 bg-white/10"></div>
                    <div className="flex flex-col items-center">
                        <div className="text-5xl font-black text-amber-500 italic">{dinh_dang_so(player.lifeStats?.monstersKilled || 0)}</div>
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-2">Quái Đã Diệt</div>
                    </div>
                </div>
            </div>

            {/* Phần giải thích cách sở hữu Dấu Ấn */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 bg-slate-900/40 border border-white/5 p-12 rounded-[4rem] space-y-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-5">
                        <HelpCircle size={120} />
                    </div>
                    
                    <div className="flex items-center gap-5 relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/30">
                            <Info size={28} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-white uppercase italic tracking-widest">Cách sở hữu Dấu Ấn Luân Hồi</h3>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Hướng dẫn kế thừa sức mạnh qua các kiếp</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-slate-950 flex items-center justify-center text-blue-400 font-black text-xs border border-white/10">01</div>
                                <span className="text-[10px] font-black text-white uppercase tracking-wider">Chuẩn bị</span>
                            </div>
                            <p className="text-[11px] text-slate-400 leading-relaxed italic">
                                Hãy rèn và <span className="text-blue-400 font-bold">Trang bị</span> món đồ mạnh nhất bạn đang có. Chỉ những món đang mặc trên người mới có thể chọn làm Dấu Ấn.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-slate-950 flex items-center justify-center text-purple-400 font-black text-xs border border-white/10">02</div>
                                <span className="text-[10px] font-black text-white uppercase tracking-wider">Đạt giới hạn</span>
                            </div>
                            <p className="text-[11px] text-slate-400 leading-relaxed italic">
                                Cày cuốc để đạt cấp độ yêu cầu (Lv.25+ ở kiếp đầu). Khi nút <span className="text-purple-400 font-bold">Luân Hồi</span> sáng lên, hãy tiến vào Cổng Luân Hồi.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-slate-950 flex items-center justify-center text-amber-400 font-black text-xs border border-white/10">03</div>
                                <span className="text-[10px] font-black text-white uppercase tracking-wider">Khai phong</span>
                            </div>
                            <p className="text-[11px] text-slate-400 leading-relaxed italic">
                                Tại Cổng Luân Hồi, nhấn chọn món đồ bạn muốn giữ lại. Sau khi xác nhận, món đồ đó sẽ trở thành <span className="text-amber-400 font-bold">Dấu Ấn Vĩnh Hằng</span>.
                            </p>
                        </div>
                    </div>

                    <div className="p-6 bg-indigo-500/5 border border-indigo-500/20 rounded-3xl flex items-start gap-4">
                        <Lightbulb className="text-amber-400 shrink-0 mt-1" size={20} />
                        <div className="space-y-1">
                            <span className="text-[10px] font-black text-white uppercase tracking-widest">Lưu ý về sức mạnh</span>
                            <p className="text-[10px] text-slate-500 leading-relaxed italic">
                                Ở kiếp mới, Dấu Ấn sẽ tạm thời bị phong ấn sức mạnh và mở khóa lại dần dần theo <span className="text-indigo-400 font-bold">Cấp độ hiện tại</span> của bạn so với yêu cầu gốc của món đồ.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-6">
                    <div className="bg-slate-900/60 border border-white/5 p-8 rounded-[3rem] flex-1 flex flex-col items-center justify-center text-center gap-6 group hover:border-indigo-500/30 transition-all">
                        <div className="w-20 h-20 bg-indigo-500/10 rounded-[2rem] flex items-center justify-center text-indigo-400 animate-float border border-indigo-500/20">
                            <ShieldCheck size={40} />
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-sm font-black text-indigo-400 uppercase tracking-widest">Đặc quyền Kế Thừa</h4>
                            <p className="text-[10px] text-slate-500 font-medium italic leading-relaxed px-4">
                                "Dấu Ấn là món đồ duy nhất không bị phá hủy khi Luân Hồi. Nó mang theo linh hồn của thợ rèn qua mọi thời đại."
                            </p>
                        </div>
                    </div>
                    
                    <div className="bg-amber-500/5 border border-amber-500/20 p-8 rounded-[3rem] flex flex-col items-center text-center gap-4">
                        <TrendingUp className="text-amber-500" size={32} />
                        <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Lời khuyên chiến thuật</span>
                        <p className="text-[10px] text-slate-400 italic">
                            Hãy ưu tiên chọn <span className="text-white font-bold">Vũ Khí</span> làm Dấu Ấn để tối ưu tốc độ cày cuốc ở giai đoạn đầu của mỗi kiếp.
                        </p>
                    </div>
                </div>
            </div>

            {/* Hiển thị Dấu Ấn Hiện Tại */}
            <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-indigo-500/20 blur-3xl opacity-50 rounded-[4rem]"></div>
                <div className="bg-slate-900/60 border border-indigo-500/40 p-12 rounded-[4rem] relative overflow-hidden group backdrop-blur-3xl shadow-2xl">
                    <div className="flex items-center gap-5 mb-10">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/30">
                            <Package size={28} />
                        </div>
                        <h3 className="text-2xl font-black text-white uppercase italic tracking-[0.2em]">DẤU ẤN ĐANG SỞ HỮU</h3>
                    </div>

                    {legacyItem ? (
                        <div className="flex flex-col md:flex-row items-center gap-16">
                            <div className="relative">
                                <div className="absolute inset-0 bg-indigo-500 blur-[60px] opacity-20 animate-pulse rounded-full"></div>
                                <div className={`w-48 h-48 md:w-56 md:h-56 rounded-[3rem] bg-slate-950 border-4 border-indigo-500/60 flex items-center justify-center shadow-[0_0_80px_rgba(79,70,229,0.4)] relative animate-float z-10 ${MAU_DO_HIEM[legacyItem.rarity]}`}>
                                     <Zap size={80} className="relative z-20 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" />
                                     <div className="absolute inset-0 border-2 border-white/5 rounded-[3rem] animate-spin-slow"></div>
                                </div>
                            </div>
                            <div className="space-y-6 text-center md:text-left flex-1">
                                <div>
                                    <h4 className={`text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-2 ${MAU_DO_HIEM[legacyItem.rarity]}`}>{legacyItem.name}</h4>
                                    <div className="inline-block px-4 py-1.5 bg-indigo-500/10 rounded-full border border-indigo-500/30">
                                        <p className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.3em]">Cổ Vật Thần Thoại Kế Thừa</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4">
                                    {legacyItem.stats.attack && (
                                        <div className="bg-slate-950/50 p-4 rounded-2xl border border-white/5">
                                            <span className="text-[8px] font-black text-slate-500 uppercase block mb-1">Công Kế Thừa</span>
                                            <span className="text-lg font-black text-red-400 tabular-nums">{dinh_dang_so(legacyItem.stats.attack)}</span>
                                        </div>
                                    )}
                                    {legacyItem.stats.defense && (
                                        <div className="bg-slate-950/50 p-4 rounded-2xl border border-white/5">
                                            <span className="text-[8px] font-black text-slate-500 uppercase block mb-1">Thủ Kế Thừa</span>
                                            <span className="text-lg font-black text-blue-400 tabular-nums">{dinh_dang_so(legacyItem.stats.defense)}</span>
                                        </div>
                                    )}
                                    {legacyItem.stats.hpBonus && (
                                        <div className="bg-slate-950/50 p-4 rounded-2xl border border-white/5">
                                            <span className="text-[8px] font-black text-slate-500 uppercase block mb-1">Máu Kế Thừa</span>
                                            <span className="text-lg font-black text-rose-400 tabular-nums">{dinh_dang_so(legacyItem.stats.hpBonus)}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="py-20 text-center border-4 border-dashed border-indigo-500/10 rounded-[3rem] bg-black/20">
                            <Sparkles size={64} className="text-slate-800 mx-auto mb-6 opacity-20" />
                            <p className="text-sm font-black text-slate-600 uppercase tracking-[0.4em]">Điện Thờ Đang Chờ Đợi</p>
                            <p className="text-[10px] text-slate-700 italic mt-3">Món đồ "Dấu Ấn" đầu tiên sẽ xuất hiện sau lần Luân Hồi của bạn</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Các kỷ lục khác */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <RecordCard 
                    title="Kỷ Lục Sát Thương" 
                    value={stats.maxDps} 
                    sub="Đòn đánh uy lực nhất lịch sử"
                    icon={Swords} 
                    color="red"
                />
                <RecordCard 
                    title="Ngân Khố Tích Lũy" 
                    value={stats.maxGold} 
                    sub="Tổng ngân lượng thu thập qua mọi kiếp"
                    icon={TrendingUp} 
                    color="amber"
                />
                <RecordCard 
                    title="Tuyệt Phẩm Chế Tác" 
                    value={stats.totalCrafted} 
                    sub="Số trang bị đã được rèn giũa"
                    icon={Hammer} 
                    color="emerald"
                />
                <RecordCard 
                    title="Bậc Thầy Luân Hồi" 
                    value={stats.totalRebirth} 
                    sub="Số lần vượt qua ranh giới sinh tử"
                    icon={History} 
                    color="purple"
                />
            </div>
        </div>
    </div>
  );
};
