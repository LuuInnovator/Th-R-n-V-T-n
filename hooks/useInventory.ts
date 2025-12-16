
import { useState, useCallback } from 'react';
import { Material, Equipment, EquipmentType, MaterialType, Rarity, SocketedGem, EnchantmentType } from '../types';
import { generateId } from '../utils';

export const useInventory = (addLog: (msg: string) => void) => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  
  const [equipped, setEquipped] = useState<Record<EquipmentType, Equipment | null>>({
    [EquipmentType.Weapon]: null,
    [EquipmentType.Armor]: null,
    [EquipmentType.Accessory]: null,
    [EquipmentType.Helmet]: null,
    [EquipmentType.Gloves]: null,
    [EquipmentType.Boots]: null
  });

  const addMaterial = useCallback((type: MaterialType, qty: number, rarity: Rarity) => {
    setMaterials(prev => {
      const existing = prev.find(m => m.type === type && m.rarity === rarity);
      if (existing) {
        return prev.map(m => m.id === existing.id ? { ...m, quantity: m.quantity + qty } : m);
      }
      return [...prev, { id: generateId(), name: `${type} ${rarity}`, type, rarity, quantity: qty }];
    });
    addLog(`Nhận được: +${qty} ${type} (${rarity})`);
  }, [addLog]);

  const consumeMaterials = useCallback((requirements: { type: MaterialType; amount: number }[]) => {
    setMaterials(prev => {
      let newMaterials = [...prev];
      requirements.forEach(req => {
        let remainingNeeded = req.amount;
        for (let i = 0; i < newMaterials.length; i++) {
            if (newMaterials[i].type === req.type) {
                const take = Math.min(newMaterials[i].quantity, remainingNeeded);
                newMaterials[i] = { ...newMaterials[i], quantity: newMaterials[i].quantity - take };
                remainingNeeded -= take;
                if (remainingNeeded <= 0) break;
            }
        }
        return newMaterials.filter(m => m.quantity > 0);
      });
      return newMaterials;
    });
  }, []);

  const addEquipment = useCallback((item: Equipment) => {
    setEquipments(prev => [item, ...prev]);
    addLog(`Chế tạo: ${item.name} thành công!`);
  }, [addLog]);

  const removeEquipment = useCallback((id: string) => {
    setEquipments(prev => {
        const item = prev.find(e => e.id === id);
        // Logic mới: Disenchant trả lại vật liệu nếu item hiếm
        return prev.filter(e => e.id !== id);
    });
  }, []);

  // Update Item (Dùng cho Socketing/Enchanting)
  const updateEquipment = useCallback((updatedItem: Equipment) => {
      setEquipments(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
      setEquipped(prev => {
          if (prev[updatedItem.type]?.id === updatedItem.id) {
              return { ...prev, [updatedItem.type]: updatedItem };
          }
          return prev;
      });
  }, []);

  const equipItem = useCallback((item: Equipment) => {
    setEquipped(prev => {
        return { ...prev, [item.type]: item };
    });
    
    setEquipments(prev => prev.map(e => {
        if (e.id === item.id) return { ...e, isEquipped: true };
        if (equipped[item.type]?.id === e.id) return { ...e, isEquipped: false };
        return e;
    }));
    
    addLog(`Đã trang bị: ${item.name}`);
  }, [addLog, equipped]);

  const resetInventory = useCallback(() => {
    setMaterials([]);
    setEquipments([]);
    setEquipped({
      [EquipmentType.Weapon]: null,
      [EquipmentType.Armor]: null,
      [EquipmentType.Accessory]: null,
      [EquipmentType.Helmet]: null,
      [EquipmentType.Gloves]: null,
      [EquipmentType.Boots]: null
    });
  }, []);

  const loadInventory = useCallback((
    savedMaterials: Material[], 
    savedEquipments: Equipment[], 
    savedEquipped: Record<EquipmentType, Equipment | null>
  ) => {
    setMaterials(savedMaterials);
    setEquipments(savedEquipments);
    const defaultEquipped = {
      [EquipmentType.Weapon]: null,
      [EquipmentType.Armor]: null,
      [EquipmentType.Accessory]: null,
      [EquipmentType.Helmet]: null,
      [EquipmentType.Gloves]: null,
      [EquipmentType.Boots]: null
    };
    setEquipped({...defaultEquipped, ...savedEquipped});
  }, []);

  return { 
    materials, equipments, equipped, 
    addMaterial, consumeMaterials, addEquipment, removeEquipment, updateEquipment, equipItem, resetInventory,
    loadInventory 
  };
};
