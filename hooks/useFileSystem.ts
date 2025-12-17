
import { useCallback } from 'react';
import { Player } from '../types';

export const useFileSystem = (setPlayer: (p: Player) => void, addLog: (msg: string) => void) => {
  const exportSaveFile = useCallback((playerData: Player) => {
    try {
      const dataStr = JSON.stringify(playerData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `ThoRenVoTan_Save_${new Date().toISOString().slice(0,10)}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      addLog("📁 Đã xuất bản sao lưu ra file .json thành công!");
    } catch (e) {
      addLog("❌ Lỗi khi xuất file: " + e);
    }
  }, [addLog]);

  const importSaveFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);
        
        // Cơ chế kiểm tra sơ bộ dữ liệu hợp lệ
        if (parsed && typeof parsed.level === 'number' && parsed.stats) {
          setPlayer(parsed);
          addLog("📥 Đã đồng bộ dữ liệu từ file thành công!");
        } else {
          throw new Error("Cấu trúc file không hợp lệ");
        }
      } catch (err) {
        addLog("❌ Lỗi: File không đúng định dạng hoặc bị hỏng.");
      }
    };
    reader.readAsText(file);
  }, [setPlayer, addLog]);

  return { exportSaveFile, importSaveFile };
};
