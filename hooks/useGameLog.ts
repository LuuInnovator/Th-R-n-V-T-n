import { useState, useCallback } from 'react';

export interface LogEntry {
  id: string;
  message: string;
}

export const useGameLog = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const addLog = useCallback((msg: string) => {
    const timestamp = new Date().toLocaleTimeString('vi-VN', { hour12: false });
    const newLog = {
      id: Date.now().toString() + Math.random().toString().slice(2, 6), // Unique ID
      message: `[${timestamp}] ${msg}`
    };

    setLogs(prev => {
      // Thêm vào ĐẦU mảng (Mới nhất hiển thị trên cùng)
      const newLogs = [newLog, ...prev];
      // Giới hạn 30 dòng để tránh kéo dài vô hạn
      if (newLogs.length > 30) {
        return newLogs.slice(0, 30);
      }
      return newLogs;
    });
  }, []);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  return { logs, addLog, clearLogs };
};