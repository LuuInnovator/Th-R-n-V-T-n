
import React from 'react';
import { CharacterClass } from '../types';
import { CLASS_INFO } from '../constants';
import { Button } from './Button';
import { Shield, Sword, Beaker } from 'lucide-react';

interface ClassSelectionModalProps {
  onSelect: (cls: CharacterClass) => void;
}

export const ClassSelectionModal: React.FC<ClassSelectionModalProps> = ({ onSelect }) => {
  const classes = [CharacterClass.HeavySentinel, CharacterClass.ShadowBlade, CharacterClass.AlchemistMage];
  const icons = {
    [CharacterClass.HeavySentinel]: Shield,
    [CharacterClass.ShadowBlade]: Sword,
    [CharacterClass.AlchemistMage]: Beaker
  };
  const colors = {
      [CharacterClass.HeavySentinel]: 'from-blue-600 to-cyan-500',
      [CharacterClass.ShadowBlade]: 'from-purple-600 to-indigo-600',
      [CharacterClass.AlchemistMage]: 'from-green-600 to-emerald-500'
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-fade-in overflow-y-auto">
      <div className="max-w-6xl w-full my-auto">
        <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-orange-500 mb-4 drop-shadow-sm">
                CHỌN CON ĐƯỜNG CỦA BẠN
            </h1>
            <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">Mỗi lớp nhân vật sở hữu bộ kỹ năng và thiên phú chế tạo riêng biệt.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8">
            {classes.map(cls => {
                const info = CLASS_INFO[cls] || { name: 'Đang tải...', desc: 'Đang chuẩn bị sức mạnh...', bonuses: 'Vui lòng chờ' };
                const Icon = icons[cls] || Sword;
                return (
                    <div key={cls} className="bg-slate-900 border border-slate-700 rounded-2xl p-6 flex flex-col items-center text-center hover:border-slate-500 hover:bg-slate-800 transition-all duration-300 group hover:-translate-y-2 h-full relative overflow-hidden min-h-[500px]">
                        {/* Background Gradient Effect */}
                        <div className={`absolute inset-0 bg-gradient-to-b ${colors[cls] || 'from-slate-600 to-slate-800'} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}></div>

                        <div className={`p-5 rounded-full bg-gradient-to-br ${colors[cls] || 'from-slate-600 to-slate-800'} mb-6 shadow-lg shadow-black/50 group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                            <Icon size={40} className="text-white drop-shadow-md" />
                        </div>
                        
                        {/* Title - Fixed Height for alignment */}
                        <div className="h-14 flex items-center justify-center mb-1 w-full">
                             <h3 className="text-2xl font-bold text-slate-100 leading-tight">{info.name}</h3>
                        </div>
                        
                        {/* Description - Fixed Height */}
                        <div className="h-10 flex items-start justify-center mb-6 w-full px-2">
                             <p className="text-slate-400 italic text-sm line-clamp-2">{info.desc}</p>
                        </div>
                        
                        {/* Bonuses Box - Flex 1 pushes button down */}
                        <div className="bg-slate-950/60 p-5 rounded-xl w-full mb-6 border border-slate-800/80 group-hover:border-slate-600 transition-colors flex flex-col justify-start flex-1">
                            <div className="text-[10px] text-slate-500 uppercase font-bold mb-3 tracking-widest border-b border-slate-800 pb-2">Lợi Thế Độc Quyền</div>
                            <div className="text-sm font-medium text-yellow-500 leading-relaxed flex-1 flex items-center justify-center">
                                {info.bonuses}
                            </div>
                        </div>

                        <Button 
                            fullWidth 
                            size="lg" 
                            className="mt-auto relative z-10 shadow-xl"
                            onClick={() => onSelect(cls)}
                        >
                            CHỌN LỚP NÀY
                        </Button>
                    </div>
                );
            })}
        </div>
      </div>
    </div>
  );
};
