
import React, { useState, useMemo } from 'react';
import { Blueprint, Material, EquipmentType, Player } from '../types';
import { BlueprintList } from './crafting/BlueprintList';
import { CraftingDetail } from './crafting/CraftingDetail';
import { Sword, Shield, CircuitBoard, Beaker, ArrowUpCircle, ChevronRight } from 'lucide-react';
import { Button } from './Button';

interface CraftingViewProps {
  blueprints: Blueprint[];
  materials: Material[];
  onCraft: (blueprint: Blueprint, useOverheat: boolean) => void;
  craftingSkill: number;
  onUpgradeBlueprint: (id: string, cost: number) => void;
  eternalPoints: number;
  player: Player;
}

type CraftBranch = 'vũ khí' | 'giáp trụ' | 'trang sức' | 'vật phẩm';

export const CraftingView: React.FC<CraftingViewProps> = ({
  blueprints,
  materials,
  onCraft,
  onUpgradeBlueprint,
  eternalPoints,
  player
}) => {
  const [activeBranch, setActiveBranch] = useState<CraftBranch>('vũ khí');
  const [selectedBp, setSelectedBp] = useState<Blueprint | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Logic lọc bản vẽ theo nhánh (Branching)
  const branchData = useMemo(() => {
    return blueprints.filter(bp => {
      switch(activeBranch) {
        case 'vũ khí': return bp.resultType === EquipmentType.Weapon;
        case 'giáp trụ': return [EquipmentType.Armor, EquipmentType.Helmet, EquipmentType.Gloves, EquipmentType.Boots].includes(bp.resultType as EquipmentType);
        case 'trang sức': return bp.resultType === EquipmentType.Accessory;
        case 'vật phẩm': return bp.resultType === 'VẬT PHẨM';
        default: return false;
      }
    });
  }, [blueprints, activeBranch]);

  const branches = [
    { id: 'vũ khí' as CraftBranch, label: 'Vũ Khí', icon: Sword, color: 'text-red-400', bg: 'bg-red-400/10' },
    { id: 'giáp trụ' as CraftBranch, label: 'Giáp Trụ', icon: Shield, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { id: 'trang sức' as CraftBranch, label: 'Trang Sức', icon: CircuitBoard, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { id: 'vật phẩm' as CraftBranch, label: 'Hóa Chất', icon: Beaker, color: 'text-green-400', bg: 'bg-green-400/10' },
  ];

  const handleSelectBlueprint = (bp: Blueprint) => {
    setSelectedBp(bp);
    setIsDetailOpen(true);
  };

  const upgradeCost = selectedBp ? Math.floor(100 * Math.pow(1.8, selectedBp.evolutionLevel)) : 0;
  const canUpgrade = selectedBp && eternalPoints >= upgradeCost;

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-950 overflow-hidden">
      
      {/* CỘT TRÁI: DANH MỤC NHÁNH & DANH SÁCH BẢN VẼ */}
      <div className="w-full md:w-80 flex flex-col border-r border-slate-800 bg-slate-900/20 shrink-0">
          
          {/* Chuyển nhánh (Branch Selector) */}
          <div className="grid grid-cols-4 border-b border-slate-800">
              {branches.map(b => (
                  <button
                    key={b.id}
                    onClick={() => { setActiveBranch(b.id); setSelectedBp(null); setIsDetailOpen(false); }}
                    className={`p-4 flex flex-col items-center gap-1 transition-all border-b-2
                        ${activeBranch === b.id ? `bg-slate-800 border-amber-500 ${b.color}` : 'border-transparent text-slate-600 hover:text-slate-400'}`}
                  >
                      <b.icon size={20} />
                      <span className="text-[8px] font-black uppercase tracking-tighter">{b.label}</span>
                  </button>
              ))}
          </div>

          {/* Danh sách bản vẽ trong nhánh */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin">
              <div className="flex items-center gap-2 mb-4 px-2">
                  <div className={`w-1 h-4 rounded-full ${branches.find(b => b.id === activeBranch)?.bg.replace('/10', '')}`}></div>
                  <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Danh mục {activeBranch}</h3>
              </div>
              
              <BlueprintList 
                  blueprints={branchData} 
                  selectedId={selectedBp?.id} 
                  onSelect={handleSelectBlueprint} 
              />
          </div>

          {/* Khu vực Nâng cấp Bản vẽ */}
          {selectedBp && (
              <div className="p-4 bg-slate-900 border-t border-slate-800">
                  <div className="flex justify-between items-center mb-3">
                      <div>
                          <div className="text-[10px] font-black text-slate-500 uppercase">Tiến Hóa Cấp {selectedBp.evolutionLevel}</div>
                          <div className="text-[8px] text-amber-500 font-bold">Chỉ số gốc +{selectedBp.evolutionLevel * 25}%</div>
                      </div>
                  </div>
                  <Button 
                    fullWidth 
                    variant={canUpgrade ? 'success' : 'outline'}
                    disabled={!canUpgrade}
                    onClick={() => onUpgradeBlueprint(selectedBp.id, upgradeCost)}
                    className="h-10 text-[10px] font-black"
                  >
                      NÂNG CẤP BẢN VẼ ({formatNumber(upgradeCost)} EP)
                  </Button>
              </div>
          )}
      </div>

      {/* CỘT PHẢI: CHI TIẾT CHẾ TÁC */}
      <div className={`
          flex-1 h-full bg-slate-950/40 relative
          ${isDetailOpen ? 'fixed inset-0 z-50 md:static' : 'hidden md:block'}
      `}>
          <CraftingDetail 
              blueprint={selectedBp} 
              materials={materials} 
              onCraft={onCraft} 
              onClose={() => setIsDetailOpen(false)}
              player={player}
          />
      </div>
    </div>
  );
};

// Hàm helper định dạng số (đảm bảo hiển thị đẹp)
const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
