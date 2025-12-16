import React from 'react';
import { Material } from '../../types';
import { RARITY_COLOR } from '../../constants';
import { Gem, Box } from 'lucide-react';
import { Card } from '../Card';

interface MaterialListProps {
  materials: Material[];
}

export const MaterialList: React.FC<MaterialListProps> = ({ materials }) => {
  return (
    <Card className="h-full">
      <div className="flex items-center gap-2 mb-4 border-b border-slate-700 pb-2">
        <Box className="text-green-500" size={20} />
        <h3 className="font-bold text-lg text-slate-200">Kho Nguyên Liệu</h3>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 overflow-y-auto pr-2 max-h-[calc(100vh-300px)] scrollbar-thin">
        {materials.length === 0 && (
          <div className="col-span-full text-center text-slate-500 py-8 italic">
            Kho nguyên liệu trống rỗng
          </div>
        )}
        {materials.map((mat) => (
          <div 
            key={mat.id} 
            className="bg-slate-900/50 p-3 rounded-lg border border-slate-700 flex flex-col items-center text-center hover:border-slate-500 transition-colors"
          >
            <div className={`p-3 rounded-full bg-slate-800 mb-2 shadow-inner`}>
              <Gem size={20} className={RARITY_COLOR[mat.rarity]} />
            </div>
            <div className={`text-xs font-bold mb-1 ${RARITY_COLOR[mat.rarity]}`}>
              {mat.name}
            </div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wide mb-2">
              {mat.type}
            </div>
            <div className="mt-auto bg-slate-800 px-3 py-1 rounded-full text-xs text-white font-mono">
              x{mat.quantity}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};