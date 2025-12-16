import { useState, useCallback } from 'react';
import { Material, Equipment, EquipmentType, MaterialType, Rarity } from '../types';
import { generateId } from '../utils';

export const useInventory = (addLog: (msg: string) => void) => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [equipped, setEquipped] = useState<Record<EquipmentType, Equipment | null>>({
    [EquipmentType.Weapon]: null,
    [EquipmentType.Armor]: null,
    [EquipmentType.Accessory]: null
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
        // Ưu tiên dùng nguyên liệu chất lượng thấp trước (đơn giản hóa)
        // Trong thực tế có thể cho người chơi chọn. Ở đây ta lọc tìm type đó
        for (let i = 0; i < newMaterials.length; i++) {
            if (newMaterials[i].type === req.type) {
                const take = Math.min(newMaterials[i].quantity, remainingNeeded);
                newMaterials[i] = { ...newMaterials[i], quantity: newMaterials[i].quantity - take };
                remainingNeeded -= take;
                if (remainingNeeded <= 0) break;
            }
        }
        // Xóa các slot = 0
        newMaterials = newMaterials.filter(m => m.quantity > 0);
      });
      return newMaterials;
    });
  }, []);

  const addEquipment = useCallback((item: Equipment) => {
    setEquipments(prev => [item, ...prev]);
    addLog(`Chế tạo: ${item.name} thành công!`);
  }, [addLog]);

  const removeEquipment = useCallback((id: string) => {
    setEquipments(prev => prev.filter(e => e.id !== id));
  }, []);

  const equipItem = useCallback((item: Equipment) => {
    setEquipped(prev => {
        // Gỡ đồ cũ ra (chỉnh flag isEquipped trong list)
        const currentItem = prev[item.type];
        return { ...prev, [item.type]: item };
    });
    
    setEquipments(prev => prev.map(e => {
        if (e.id === item.id) return { ...e, isEquipped: true };
        if (equipped[item.type]?.id === e.id) return { ...e, isEquipped: false }; // Đồ cũ
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
      [EquipmentType.Accessory]: null
    });
  }, []);

  return { 
    materials, equipments, equipped, 
    addMaterial, consumeMaterials, addEquipment, removeEquipment, equipItem, resetInventory 
  };
};