
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
          if (newQty <= 0) {
            newMaterials.splice(index, 1);
          } else {
            newMaterials[index] = { ...newMaterials[index], quantity: newQty };
          }
        }
      });
      return newMaterials;
    });
  }, []);

  const addEquipment = useCallback((item: Equipment) => {
    setEquipments(prev => [item, ...prev]);
    addLog(`Chế tạo thành công: ${item.name}!`);
  }, [addLog]);

  const removeEquipment = useCallback((id: string) => {
    setEquipments(prev => prev.filter(e => e.id !== id));
  }, []);

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
    setEquipped(prev => ({ ...prev, [item.type]: item }));
    setEquipments(prev => prev.map(e => ({ ...e, isEquipped: e.id === item.id ? true : (equipped[item.type]?.id === e.id ? false : e.isEquipped) })));
    addLog(`Đã trang bị: ${item.name}`);
  }, [addLog, equipped]);

  const resetInventory = useCallback(() => {
    setMaterials([]);
    setEquipments([]);
    setEquipped({
      [EquipmentType.Weapon]: null, [EquipmentType.Armor]: null, [EquipmentType.Accessory]: null,
      [EquipmentType.Helmet]: null, [EquipmentType.Gloves]: null, [EquipmentType.Boots]: null
    });
  }, []);

  const loadInventory = useCallback((savedMaterials: any[], savedEquipments: Equipment[], savedEquipped: any) => {
    setMaterials(savedMaterials);
    setEquipments(savedEquipments);
    setEquipped(savedEquipped);
  }, []);

  return { 
    materials, equipments, equipped, 
    addMaterial, consumeMaterials, addEquipment, removeEquipment, updateEquipment, equipItem, resetInventory, loadInventory
  };
};
