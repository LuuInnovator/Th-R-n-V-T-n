
import React from 'react';
import { Material } from '../../types';
import { Box, Package, ArrowUp } from 'lucide-react';
import { Card } from '../Card';
import { Button } from '../Button';

interface MaterialListProps {
  materials: Material[];
  // Thêm prop onUpgrade để xử lý nâng cấp nguyên liệu
  onUpgrade?: (id: string) => void;
}

export const MaterialList: React.FC<MaterialListProps> = ({ materials, onUpgrade }) => {
  return (
    <Card className="h-full">
      <div className="flex items-center gap-2 mb-4 border-b border-slate-700 pb-2">
        <Package className="text-green-500" size={20} />
        <h3 className="font-bold text-lg text-slate-200">Kho Nguyên Liệu</h3>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 overflow-y-auto pr-2 max-h-[calc(100vh-300px)] scrollbar-thin">
        {materials.length === 0 && (
          <div className="col-span-full text-center text-slate-500 py-8 italic text-sm">
            Túi nguyên liệu trống rỗng. Hãy đi săn quái vật!
          </div>
        )}
        {materials.map((mat) => (
          <div 
            key={mat.id} 
            className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 flex flex-col items-center text-center hover:border-blue-500/50 transition-all group"
          >
            <div className="p-3 rounded-full bg-slate-800 mb-3 group-hover:scale-110 transition-transform">
              <Box size={24} className="text-blue-400" />
            </div>
            <div className="text-sm font-bold text-slate-200 mb-1">
              {mat.name}
            </div>
            <div className="mt-2 bg-slate-950 px-4 py-1.5 rounded-full text-xs font-mono font-bold text-blue-400 border border-blue-900/30">
              x{mat.quantity}
            </div>
            {/* Hiển thị nút nâng cấp nếu có hàm xử lý */}
            {onUpgrade && (
              <Button 
                size="xs" 
                variant="outline" 
                className="mt-3 w-full"
                onClick={() => onUpgrade(mat.id)}
              >
                <ArrowUp size={12} /> Nâng Cấp
              </Button>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};
