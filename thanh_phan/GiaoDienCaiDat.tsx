
import React, { useRef } from 'react';
import { Save, FolderDown, Trash2, FileJson, UploadCloud, Monitor, ShieldAlert } from 'lucide-react';
import { NutBam } from './NutBam';
import { KhungVien } from './KhungVien';

interface Props {
  onLuu: () => void;
  onTai: () => void;
  onReset: () => void;
  onXuatFile: () => void;
  onNhapFile: (file: File) => void;
}

export const GiaoDienCaiDat: React.FC<Props> = ({ 
  onLuu, onTai, onReset, onXuatFile, onNhapFile 
}) => {
  const refNhapFile = useRef<HTMLInputElement>(null);

  return (
    <div className="p-6 md:p-10 flex flex-col items-center gap-8 overflow-y-auto h-full scrollbar-thin bg-slate-950">
      <div className="max-w-4xl w-full space-y-8 animate-fade-in">
        <div className="text-center space-y-2">
            <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic">Quản Lý Dữ Liệu</h3>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.3em]">Hệ thống đồng bộ hóa ký ức thợ rèn</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <KhungVien className="bg-slate-900/40 border-slate-800 p-8 flex flex-col relative overflow-hidden group hover:border-blue-500/30 transition-all duration-500">
            <div className="flex items-center gap-5 mb-8">
                <div className="p-4 bg-blue-600/20 rounded-2xl border border-blue-500/30 text-blue-400 shadow-lg shadow-blue-900/20">
                    <Monitor size={32} />
                </div>
                <div>
                    <h4 className="font-black text-slate-100 uppercase text-lg tracking-tight">Máy Hiện Tại</h4>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Lưu nhanh • LocalStorage</span>
                </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mb-10 flex-1 italic opacity-80">Sử dụng bộ nhớ tạm của trình duyệt. Thích hợp để lưu tiến trình khi chơi liên tục trên cùng một thiết bị.</p>
            <div className="space-y-3 mt-auto">
                <NutBam rong_het_co onClick={onLuu} className="gap-2 py-4 bg-slate-800 hover:bg-slate-700 border-slate-700 text-xs font-black tracking-widest">
                    <Save size={18}/> GHI NHỚ TIẾN TRÌNH
                </NutBam>
                <NutBam rong_het_co kieu="vien" onClick={onTai} className="gap-2 py-4 border-blue-500/20 text-blue-400 hover:bg-blue-500/10 text-xs font-black tracking-widest">
                    <FolderDown size={18}/> KHÔI PHỤC KÝ ỨC
                </NutBam>
            </div>
          </KhungVien>

          <KhungVien className="bg-slate-900/40 border-slate-800 p-8 flex flex-col relative overflow-hidden group hover:border-amber-500/30 transition-all duration-500">
            <div className="flex items-center gap-5 mb-8">
                <div className="p-4 bg-amber-600/20 rounded-2xl border border-amber-600/30 text-amber-500 shadow-lg shadow-amber-900/20">
                    <FileJson size={32} />
                </div>
                <div>
                    <h4 className="font-black text-slate-100 uppercase text-lg tracking-tight">Tệp Tin Rời</h4>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">An toàn • Đa thiết bị</span>
                </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mb-10 flex-1 italic opacity-80">Xuất dữ liệu thành tệp .json để mang sang thiết bị khác hoặc làm bản sao lưu an toàn 100%.</p>
            <div className="space-y-3 mt-auto">
                <NutBam rong_het_co onClick={onXuatFile} className="gap-2 py-4 bg-blue-600 hover:bg-blue-500 text-xs font-black tracking-widest shadow-xl shadow-blue-900/40 border-none">
                    <UploadCloud size={18}/> XUẤT FILE (.JSON)
                </NutBam>
                <input type="file" ref={refNhapFile} className="hidden" accept=".json" onChange={(e) => e.target.files?.[0] && onNhapFile(e.target.files[0])} />
                <NutBam rong_het_co kieu="vien" onClick={() => refNhapFile.current?.click()} className="gap-2 py-4 border-amber-500/20 text-amber-500 hover:bg-amber-500/10 text-xs font-black tracking-widest">
                    <FolderDown size={18}/> NHẬP FILE TỪ MÁY
                </NutBam>
            </div>
          </KhungVien>
        </div>

        <div className="pt-8 border-t border-slate-900 text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-red-500/60 font-bold text-[10px] uppercase tracking-widest">
                <ShieldAlert size={14} /> Vùng Nguy Hiểm
            </div>
            <NutBam kieu="nguy_hiem" rong_het_co onClick={onReset} className="py-4 opacity-40 hover:opacity-100 transition-all border-none bg-red-950/20 hover:bg-red-600 text-xs font-black tracking-[0.2em]">
                <Trash2 size={18} className="mr-2"/> XÓA TOÀN BỘ VÀ LÀM LẠI CUỘC ĐỜI
            </NutBam>
        </div>
      </div>
    </div>
  );
};
