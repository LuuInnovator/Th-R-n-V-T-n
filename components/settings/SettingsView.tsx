
import React, { useRef } from 'react';
import { Save, FolderDown, Trash2, Database, Info, HardDrive, FileJson, UploadCloud, HelpCircle, Monitor } from 'lucide-react';
import { Button } from '../Button';
import { Card } from '../Card';

interface SettingsViewProps {
  onSave: () => void;
  onLoad: () => void;
  onReset: () => void;
  onExportFile: () => void;
  onImportFile: (file: File) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ 
  onSave, onLoad, onReset, onExportFile, onImportFile 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="p-6 md:p-10 flex flex-col items-center gap-8 overflow-y-auto h-full scrollbar-thin bg-slate-950">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-2">
            <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic">Quản Lý Dữ Liệu</h3>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.3em]">Hệ thống đồng bộ hóa ký ức thợ rèn</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Local Storage */}
          <Card className="bg-slate-900/40 border-slate-800 p-6 flex flex-col relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-600/10 rounded-full blur-2xl group-hover:bg-blue-600/20 transition-all"></div>
            <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-600/20 rounded-2xl border border-blue-500/30 text-blue-400">
                    <Monitor size={24} />
                </div>
                <div>
                    <h4 className="font-black text-slate-100 uppercase text-sm tracking-tight">Trình Duyệt Này</h4>
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Lưu nhanh • LocalStorage</span>
                </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed mb-8 flex-1 italic">
                Sử dụng bộ nhớ tạm của trình duyệt. Dữ liệu sẽ tồn tại miễn là bạn không xóa "Site Data" hoặc Lịch sử duyệt web.
            </p>

            <div className="space-y-3">
                <Button fullWidth onClick={onSave} className="gap-2 py-4 bg-slate-800 hover:bg-slate-700 border-slate-700 text-xs font-black tracking-widest">
                    <Save size={18}/> LƯU TIẾN TRÌNH
                </Button>
                <Button fullWidth variant="outline" onClick={onLoad} className="gap-2 py-4 border-blue-500/20 text-blue-400 hover:bg-blue-500/10 text-xs font-black tracking-widest">
                    <FolderDown size={18}/> TẢI LẠI BẢN LƯU
                </Button>
            </div>
          </Card>

          {/* Card 2: File Export */}
          <Card className="bg-slate-900/40 border-slate-800 p-6 flex flex-col relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-600/10 rounded-full blur-2xl group-hover:bg-amber-600/20 transition-all"></div>
            <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-amber-600/20 rounded-2xl border border-amber-500/30 text-amber-500">
                    <FileJson size={24} />
                </div>
                <div>
                    <h4 className="font-black text-slate-100 uppercase text-sm tracking-tight">Tệp Tin Di Động</h4>
                    <span className="text-[10px] text-slate-500 font-bold uppercase">An toàn • Đa thiết bị</span>
                </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed mb-8 flex-1 italic">
                Xuất dữ liệu thành file .json. Bạn có thể gửi file này qua Zalo/Drive để chơi tiếp trên máy tính khác hoặc điện thoại.
            </p>

            <div className="space-y-3">
                <Button fullWidth onClick={onExportFile} className="gap-2 py-4 bg-blue-600 hover:bg-blue-500 text-xs font-black tracking-widest shadow-blue-900/40">
                    <UploadCloud size={18}/> XUẤT FILE (.JSON)
                </Button>
                
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept=".json"
                  onChange={(e) => e.target.files?.[0] && onImportFile(e.target.files[0])}
                />
                
                <Button 
                  fullWidth 
                  variant="outline" 
                  onClick={() => fileInputRef.current?.click()} 
                  className="gap-2 py-4 border-amber-500/20 text-amber-500 hover:bg-amber-500/10 text-xs font-black tracking-widest"
                >
                  <FolderDown size={18}/> NHẬP FILE TỪ MÁY
                </Button>
            </div>
          </Card>
        </div>

        {/* Danger Zone */}
        <div className="pt-6 border-t border-slate-900">
            <Button variant="danger" fullWidth onClick={onReset} className="py-4 opacity-40 hover:opacity-100 transition-all border-none bg-red-950/20 hover:bg-red-600 text-xs font-black tracking-[0.2em]">
                <Trash2 size={18} className="mr-2"/> XÓA TOÀN BỘ VÀ LÀM LẠI CUỘC ĐỜI
            </Button>
            <p className="text-center text-[9px] text-slate-700 mt-3 font-bold uppercase tracking-widest">Hành động này sẽ xóa sạch LocalStorage và làm mới trang web</p>
        </div>
      </div>
    </div>
  );
};
