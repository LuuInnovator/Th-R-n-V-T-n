// Các loại độ hiếm của vật phẩm
export enum Rarity {
  Common = 'Thường',
  Rare = 'Hiếm',
  Epic = 'Sử Thi',
  Legendary = 'Huyền Thoại',
  Mythic = 'Thần Thoại'
}

// Các loại nguyên liệu
export enum MaterialType {
  Ore = 'Quặng',
  Wood = 'Gỗ',
  Leather = 'Da',
  Gem = 'Đá Quý',
  Essence = 'Tinh Hoa'
}

// Cấu trúc nguyên liệu trong kho
export interface Material {
  id: string;
  name: string;
  type: MaterialType;
  rarity: Rarity;
  quantity: number;
}

// Loại trang bị
export enum EquipmentType {
  Weapon = 'Vũ Khí',
  Armor = 'Giáp',
  Accessory = 'Phụ Kiện'
}

// Cấu trúc trang bị
export interface Equipment {
  id: string;
  name: string;
  type: EquipmentType;
  rarity: Rarity;
  stats: {
    attack?: number;
    defense?: number;
    hpBonus?: number;
  };
  isEquipped: boolean;
  value: number; // Giá trị bán
}

// Công thức chế tạo (Bản thiết kế)
export interface Blueprint {
  id: string;
  name: string;
  resultType: EquipmentType;
  requiredMaterials: {
    type: MaterialType;
    amount: number;
  }[];
  baseStats: {
    minAtk: number;
    maxAtk: number;
    minDef: number;
    maxDef: number;
  };
  unlocked: boolean;
}

// Kẻ thù
export interface Enemy {
  id: string;
  name: string;
  level: number;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  isBoss: boolean;
  dropTable: {
    materialType: MaterialType;
    chance: number; // 0-1
    minQty: number;
    maxQty: number;
  }[];
  expReward: number;
  goldReward: number;
}

// Khu vực bản đồ
export interface Zone {
  id: string;
  name: string;
  description: string;
  recommendedLevel: number;
  enemies: Enemy[]; // Danh sách kẻ thù có thể gặp
  materials: MaterialType[]; // Nguyên liệu đặc trưng
}

// Trạng thái người chơi
export interface Player {
  level: number;
  currentExp: number;
  maxExp: number;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  gold: number;
  eternalPoints: number; // Điểm tái sinh
  rebirthCount: number;
}

// Nhật ký game
export interface GameLog {
  id: number;
  message: string;
  type: 'info' | 'combat' | 'loot' | 'craft' | 'alert';
  timestamp: Date;
}