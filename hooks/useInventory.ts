
import { useState, useCallback } from 'react';
import { Material, Equipment, EquipmentType, MaterialType, MaterialTier } from '../types';
import { generateId } from '../utils';
import { MATERIAL_TIERS } from '../constants';

export const useInventory = (addLog: (msg: string) => void) => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  
  const [equipped, setEquipped] = useState<Record<EquipmentType, Equipment | null>>({
    [EquipmentType.Weapon]: null, [EquipmentType.Armor]: null, [EquipmentType.Accessory]: null,
    [EquipmentType.Helmet]: null, [EquipmentType.Gloves]: null, [EquipmentType.Boots]: null
  });

  const addMaterial = useCallback((type: MaterialType, qty: number) => {
    setMaterials(prev => {
      const existing = prev.find(m => m.type === type);
      if (existing) {
        return prev.map(m => m.id === existing.id ? { ...m, quantity: m.quantity + qty } : m);
      }
      return [...prev, { id: generateId(), name: type, type, quantity: qty }];
    });
    addLog(`Nhận được: +${qty} ${type}`);
  }, [addLog]);

  const consumeMaterials = useCallback((requirements: { type: MaterialType; amount: number }[]) => {
    setMaterials(prev => {
      let newMaterials = [...prev];
      requirements.forEach(req => {
        const index = newMaterials.findIndex(m => m.type === req.type);
        if (index !== -1) {
          const newQty = newMaterials[index].quantity - req.amount;
          if (newQty <= 0) newMaterials.splice(index, 1);
          else newMaterials[index] = { ...newMaterials[index], quantity: newQty };
        }
      });
      return newMaterials;
    });
  }, []);

  const handleRebirth = useCallback((retentionBonus: number, onCompress: (potential: number) => void) => {
    let totalPotential = 0;
    equipments.forEach(e => {
      totalPotential += (e.stats.attack || 0) + (e.stats.defense || 0);
    });
    onCompress(Math.floor(totalPotential * 0.1));

    setMaterials(prev => {
        return prev.filter(m => {
            const tier = MATERIAL_TIERS[m.type];
            if (tier === MaterialTier.Eternal) return true;
            if (tier === MaterialTier.Elite) {
                const keepQty = Math.floor(m.quantity * (retentionBonus / 100));
                if (keepQty > 0) {
                    m.quantity = keepQty;
                    return true;
                }
            }
            return false;
        });
    });

    setEquipments([]);
    setEquipped({
        [EquipmentType.Weapon]: null, [EquipmentType.Armor]: null, [EquipmentType.Accessory]: null,
        [EquipmentType.Helmet]: null, [EquipmentType.Gloves]: null, [EquipmentType.Boots]: null
    });

    addLog("🌀 Kho đồ đã được nén thành tiềm năng cho kiếp sau!");
  }, [equipments, addLog]);

  const addEquipment = useCallback((item: Equipment) => {
    setEquipments(prev => [item, ...prev]);
    addLog(`Chế tạo thành công: ${item.name}!`);
  }, [addLog]);

  const removeEquipment = useCallback((id: string) => {
    setEquipments(prev => prev.filter(e => e.id !== id));
  }, []);

  const equipItem = useCallback((item: Equipment) => {
    setEquipped(prev => ({ ...prev, [item.type]: item }));
    setEquipments(prev => prev.map(e => ({ ...e, isEquipped: e.id === item.id ? true : (equipped[item.type]?.id === e.id ? false : e.isEquipped) })));
    addLog(`Đã trang bị: ${item.name}`);
  }, [addLog, equipped]);

  return { 
    materials, setMaterials, equipments, setEquipments, equipped, setEquipped,
    addMaterial, consumeMaterials, addEquipment, removeEquipment, equipItem, handleRebirth
  };
};
