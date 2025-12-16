
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
  Accessory = 'Phụ Kiện',
  Helmet = 'Mũ',      // Mới: Để đủ bộ set 6 món
  Boots = 'Giày',     // Mới
  Gloves = 'Găng Tay' // Mới
}

// Định danh Set đồ
export enum SetId {
  ForgeSpirit = 'forge_spirit', // Tinh Thần Lò Rèn
  PrimalHunter = 'primal_hunter' // Kẻ Săn Mồi Viễn Cổ
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
  value: number;
  setId?: SetId; // Thuộc set nào
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
  setId?: SetId;
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
  enemies: Enemy[];
  materials: MaterialType[];
}

// Kỹ năng
export enum SkillBranch {
  Alchemy = 'Luyện Kim',
  WeaponSmith = 'Rèn Vũ Khí',
  ArmorSmith = 'May Vá Giáp',
  Enchanting = 'Bùa Chú'
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  branch: SkillBranch;
  maxLevel: number;
  cost: number; // SP cost per level
  effectValue: number; // Giá trị hiệu ứng mỗi cấp
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
  eternalPoints: number;
  rebirthCount: number;
  skillPoints: number; // Điểm kỹ năng
  skills: Record<string, number>; // ID skill -> Level hiện tại
}

// Nhật ký game
export interface GameLog {
  id: number;
  message: string;
  type: 'info' | 'combat' | 'loot' | 'craft' | 'alert';
  timestamp: Date;
}
