
export enum Rarity {
  Common = 'Thường',
  Rare = 'Hiếm',
  Epic = 'Sử Thi',
  Legendary = 'Huyền Thoại',
  Mythic = 'Thần Thoại',
  Cosmic = 'Vũ Trụ'
}

export enum MaterialType {
  Ore = 'Quặng Thô',
  Wood = 'Gỗ Rừng',
  Leather = 'Da Thú',
  Gem = 'Đá Quý',
  Essence = 'Tinh Hoa',
  FissionCrystal = 'Tinh Thể Nhiệt Hạch',
  SoulDust = 'Bụi Linh Hồn',
  CondensedTimesand = 'Cát Thời Gian',
  MemoryShard = 'Mảnh Vỡ Ký Ức',
  IronScraps = 'Mảnh Sắt Vụn',
  StoneSharpener = 'Đá Mài Cường Hóa',
  // Fix: Added missing Ice material type referenced in ZONES constant
  Ice = 'Băng Thạch'
}

export enum ElementType {
  Physical = 'Vật Lý',
  Fire = 'Lửa',
  Ice = 'Băng',
  Lightning = 'Sét',
  Acid = 'Axit'
}

export interface Material {
  id: string;
  name: string;
  type: MaterialType;
  quantity: number;
}

export enum EquipmentType {
  Weapon = 'Vũ Khí',
  Armor = 'Giáp Trụ',
  Accessory = 'Trang Sức',
  Helmet = 'Mũ Giáp',
  Boots = 'Giày',
  Gloves = 'Găng Tay'
}

export interface Blueprint {
  id: string;
  name: string;
  resultType: EquipmentType | 'VẬT PHẨM';
  requiredMaterials: { type: MaterialType; amount: number }[];
  baseStats: {
    minAtk: number;
    maxAtk: number;
    minDef: number;
    maxDef: number;
  };
  unlocked: boolean;
}

export enum MonsterAbility {
  Dodge = 'Né Đòn',
  LifeSteal = 'Hút Máu',
  ArmorBreak = 'Phá Giáp',
  Reflect = 'Phản Đòn',
  Invisibility = 'Tàng Hình',
}

export enum MutationType {
  None = 'Bình Thường',
  Empowered = 'Cường Hóa',
  Resistant = 'Kháng Nguyên Tố',
  Reflective = 'Phản Chiếu',
  Void = 'Vô Định',
  Stalker = 'Kẻ Săn Đuổi',
  Corrupted = 'Tha Hóa'
}

export interface Enemy {
  id: string;
  name: string;
  level: number;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  element: ElementType;
  isBoss?: boolean;
  mutation?: MutationType;
  abilities?: MonsterAbility[];
  expReward: number;
  goldReward: number;
  dropTable: {
    materialType: MaterialType;
    chance: number;
    minQty: number;
    maxQty: number;
  }[];
  corruptedGearName?: string;
}

export enum SetId {
  PrimalHunter = 'Thợ Săn Nguyên Thủy',
  InfinityChrono = 'Vòng Lặp Vĩnh Hằng'
}

export enum EnchantmentType {
  None = 'Không',
  Sharpness = 'Sắc Bén',
  Protection = 'Bảo Vệ'
}

export enum GemType {
  Ruby = 'Hồng Ngọc',
  Sapphire = 'Lam Ngọc',
  Topaz = 'Hoàng Ngọc'
}

export enum GemTier {
  T1 = 1,
  T2 = 2,
  T3 = 3
}

export interface SocketedGem {
  type: GemType;
  tier: GemTier;
}

export interface Equipment {
  id: string;
  name: string;
  type: EquipmentType;
  rarity: Rarity;
  isEquipped: boolean;
  value: number;
  stats: {
    attack?: number;
    defense?: number;
    hpBonus?: number;
  };
  sockets: number;
  socketedGems: SocketedGem[];
  setId?: SetId;
  enchantment?: EnchantmentType;
  element?: ElementType;
}

export interface Zone {
  id: string;
  name: string;
  description: string;
  recommendedLevel: number;
  materials: MaterialType[];
}

export enum EternalUpgradeId {
  LatentPower = 'suc_manh_tiem_an',
  ResourceRetention = 'bao_toan_tai_nguyen'
}

export interface EternalUpgrade {
  id: EternalUpgradeId;
  name: string;
  description: string;
  baseCost: number;
  costMultiplier: number;
  maxLevel: number;
  effectValue: number;
}

export enum CharacterClass {
  None = 'Chưa Chọn',
  HeavySentinel = 'Hộ Vệ Thủ Lĩnh',
  ShadowBlade = 'Bóng Ma Hắc Ám',
  AlchemistMage = 'Giả Kim Pháp Sư'
}

export interface Guild {
  name: string;
  level: number;
  fame: number;
  blueprints: string[];
}

export enum SkillBranch {
  WeaponSmith = 'Kỹ Thuật Rèn Vũ Khí',
  ArmorSmith = 'Kỹ Thuật Rèn Giáp',
  Alchemy = 'Giả Kim Thuật',
  Enchanting = 'Ma Thuật Phù Phép'
}

export interface Skill {
  id: string;
  name: string;
  branch: SkillBranch;
  description: string;
  maxLevel: number;
  cost: number;
  effectValue: number;
  reqClass?: CharacterClass;
}

export interface Player {
  characterClass: CharacterClass;
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
  skillPoints: number;
  skills: Record<string, number>;
  eternalUpgrades: Record<string, number>;
  gemInventory: Record<string, number>;
  statPoints: number;
  stats: { strength: number; dexterity: number; intelligence: number; vitality: number; luck: number };
  guild: Guild;
  legacyGearNames: string[];
}

export interface EquipmentTalent {
  name: string;
  desc: string;
}
