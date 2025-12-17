
import React, { useState } from 'react';
import { Zone, Blueprint } from '../types';
import { Skull, Star, BookOpen } from 'lucide-react';
import { MonsterWiki } from './wiki/MonsterWiki';
import { TalentWiki } from './wiki/TalentWiki';
import { SkillWiki } from './wiki/SkillWiki';

interface WikiViewProps {
  zones: Zone[];
  blueprints: Blueprint[];
}

export const WikiView: React.FC<WikiViewProps> = ({ zones, blueprints }) => {
  const [activeTab, setActiveTab] = useState<'monsters' | 'talents' | 'skills'>('monsters');

  return (
    <div className="h-full w-full flex flex-col bg-slate-950 overflow-hidden">
      {/* Header Tabs */}
      <div className="flex bg-slate-900 border-b border-slate-800 shrink-0 px-4 overflow-x-auto scrollbar-hide z-10">
          <div className="flex max-w-7xl mx-auto w-full">
            <button 
                onClick={() => setActiveTab('monsters')}
                className={`py-5 px-8 text-[10px] font-black uppercase tracking-[0.3em] border-b-2 transition-all flex items-center gap-3 whitespace-nowrap ${activeTab === 'monsters' ? 'border-blue-500 text-blue-400 bg-blue-500/5' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
            >
                <Skull size={16} /> Quái Vật
            </button>
            <button 
                onClick={() => setActiveTab('talents')}
                className={`py-5 px-8 text-[10px] font-black uppercase tracking-[0.3em] border-b-2 transition-all flex items-center gap-3 whitespace-nowrap ${activeTab === 'talents' ? 'border-amber-500 text-amber-400 bg-amber-500/5' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
            >
                <Star size={16} /> Thiên Phú
            </button>
            <button 
                onClick={() => setActiveTab('skills')}
                className={`py-5 px-8 text-[10px] font-black uppercase tracking-[0.3em] border-b-2 transition-all flex items-center gap-3 whitespace-nowrap ${activeTab === 'skills' ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
            >
                <BookOpen size={16} /> Bí Pháp
            </button>
          </div>
      </div>

      {/* Tab Content Display */}
      <div className="flex-1 overflow-hidden relative">
          {activeTab === 'monsters' && <MonsterWiki zones={zones} blueprints={blueprints} />}
          {activeTab === 'talents' && <TalentWiki />}
          {activeTab === 'skills' && <SkillWiki />}
      </div>
    </div>
  );
};
