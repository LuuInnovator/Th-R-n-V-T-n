
// File kieu_du_lieu.ts: Khai báo tất cả các kiểu dữ liệu dùng trong game

// Các hệ phái nhân vật
export enum CharacterClass {
  None = 'Vô Danh',
  HeavySentinel = 'Hộ Vệ Thủ Lĩnh',
  ShadowBlade = 'Bóng Ma Hắc Ám',
  AlchemistMage = 'Giả Kim Pháp Sư'
}

// Các loại trang bị
export enum EquipmentType {
  Weapon = 'Vũ Khí',
  Armor = 'Giáp Trụ',
  Helmet = 'Mũ Giáp',
  Gloves = 'Bao Tay',
  Boots = 'Giày',
  Accessory = 'Trang Sức'
}

// Độ hiếm trang bị
export enum Rarity {
  Common = 'Thường',
  Rare = 'Hiếm',
  Epic = 'Sử Thi',
  Legendary = 'Huyền Thoại',
  Mythic = 'Thần Thoại',
  Cosmic = 'Vũ Trụ'
}

// Các nguyên tố
export enum ElementType {
  Physical = 'Vật Lý',
  Fire = 'Hỏa',
  Ice = 'Băng',
  Void = 'Hư Không',
  Nature = 'Tự Nhiên'
}

// Phân cấp nguyên liệu
export enum MaterialTier {
  Basic = 'Cơ Bản',
  Elite = 'Tinh Anh',
  Eternal = 'Vĩnh Hằng'
}

// Các nhánh kỹ năng
export enum SkillBranch {
  WeaponSmith = 'Đúc Vũ Khí',
  ArmorSmith = 'Đúc Giáp',
  Alchemy = 'Giả Kim',
  Enchanting = 'Phù Phép'
}

// ID các nâng cấp vĩnh hằng
export enum EternalUpgradeId {
  LatentPower = 'nc_suc_manh_tiem_an',
  EternalBlood = 'nc_huyet_mach_vinh_hang',
  GodlyForging = 'nc_ky_thuat_duc_than'
}

// Các loại ngọc
export enum GemType {
  Ruby = 'Ruby',
  Sapphire = 'Sapphire',
  Topaz = 'Topaz'
}

// Cấp độ ngọc
export enum GemTier {
  T1 = 'T1',
  T2 = 'T2',
  T3 = 'T3'
}

// Các loại phù phép
export enum EnchantmentType {
  Sharpness = 'Sharpness',
  Protection = 'Protection',
  Vitality = 'Vitality',
  Luck = 'Luck'
}

// Các bộ trang bị (Set)
export enum SetId {
  PrimalHunter = 'PrimalHunter',
  IronWill = 'IronWill',
  FrozenLegacy = 'FrozenLegacy',
  GhostlyRelic = 'GhostlyRelic',
  DragonWarlord = 'DragonWarlord',
  VoidSeeker = 'VoidSeeker',
  InfinityChrono = 'InfinityChrono'
}

// Kỹ năng của quái vật
export enum MonsterAbility {
  Stun = 'Choáng',
  ArmorBreak = 'Phá Giáp',
  Freeze = 'Đóng Băng',
  Regen = 'Hồi Phục',
  Silence = 'Câm Lặng',
  LifeSteal = 'Hút Máu',
  Dodge = 'Né Tránh',
  Reflect = 'Phản Sát Thương'
}

// Các loại đột biến của quái
export enum MutationType {
  None = 'Bình Thường',
  Elite = 'Tinh Anh',
  Ancient = 'Cổ Đại'
}

// Các loại nguyên liệu
export enum MaterialType {
  SlimeResin = 'Nhựa Slime',
  PoisonSpore = 'Bào Tử Độc',
  ForestWood = 'Gỗ Rừng',
  WolfSkin = 'Da Sói',
  WolfFang = 'Răng Sói',
  SpiderSilk = 'Tơ Nhện',
  WildHerb = 'Thảo Mộc',
  RawCopperOre = 'Quặng Đồng Thô',
  IronScraps = 'Sắt Vụn',
  BatWing = 'Cánh Dơi',
  GolemCore = 'Lõi Golem',
  Flint = 'Đá Lửa',
  GemStone = 'Đá Quý',
  AmberFragment = 'Mảnh Hổ Phách',
  SnowCrystal = 'Tinh Thể Tuyết',
  WarmFur = 'Lông Ấm',
  YetiFur = 'Lông Yeti',
  IceShard = 'Mảnh Băng',
  FrozenHeart = 'Trái Tim Băng',
  FrostLotus = 'Hoa Tuyết',
  OldBone = 'Xương Cổ',
  BlueSoul = 'Linh Hồn Xanh',
  BrokenSwordFragment = 'Mảnh Kiếm Gãy',
  AncientScroll = 'Cuộn Giấy Cổ',
  MagicThread = 'Chỉ Ma Thuật',
  GhostEssence = 'Tinh Hoa U Linh',
  DragonScale = 'Vảy Rồng',
  DragonBlood = 'Máu Rồng',
  PearlOfPower = 'Ngọc Quyền Năng',
  AncientDragonBone = 'Xương Rồng Cổ',
  GoldOre = 'Quặng Vàng',
  FissionCrystal = 'Tinh Thể Phân Hạch',
  VoidCore = 'Lõi Hư Không',
  VoidShard = 'Mảnh Hư Không',
  DarkEssence = 'Tinh Hoa Bóng Tối',
  RealityTear = 'Vết Rách Thực Tại',
  EternalSpark = 'Tia Sáng Vĩnh Hằng',
  OmniStone = 'Đá Vạn Năng',
  WillOfDead = 'Ý Chí Tử Sĩ'
}

export interface SocketedGem {
  type: GemType;
  tier: GemTier;
}

export interface EquipmentTalent {
  name: string;
  desc: string;
}

export interface Material {
  id: string;
  name: string;
  type: MaterialType;
  quantity: number;
}

export interface Zone {
  id: string;
  name: string;
  description: string;
  recommendedLevel: number;
  materials: MaterialType[];
  minRebirth?: number;
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
  expReward: number;
  goldReward: number;
  dropTable: { materialType: MaterialType; chance: number; minQty: number; maxQty: number }[];
  isBoss?: boolean;
  minRebirth?: number;
  abilities?: MonsterAbility[];
  mutation?: MutationType;
}

export interface Blueprint {
  id: string;
  name: string;
  resultType: EquipmentType | string;
  evolutionLevel: number;
  reqLevel: number;
  requiredMaterials: { type: MaterialType; amount: number }[];
  baseStats: { 
    minAtk: number; maxAtk: number; 
    minDef: number; maxDef: number;
    minHp?: number; maxHp?: number;
  };
  unlocked: boolean;
  setId?: SetId;
}

export interface Skill {
  id: string;
  name: string;
  branch: SkillBranch;
  description: string;
  maxLevel: number;
  cost: number;
  effectValue: number;
  reqLevel: number;
  reqClass?: CharacterClass;
}

export interface EternalUpgrade {
  id: EternalUpgradeId | string;
  name: string;
  description: string;
  baseCost: number;
  costMultiplier: number;
  maxLevel: number;
  effectValue: number;
}

export interface Guild {
  name: string;
  level: number;
  fame: number;
  blueprints: string[];
}

export interface LifeStats {
  monstersKilled: number;
  goldEarned: number;
  itemsCrafted: number;
  maxDamageDealt: number;
}

export interface Equipment {
  id: string;
  name: string;
  type: EquipmentType;
  rarity: Rarity;
  isEquipped: boolean;
  isLegacy?: boolean; // Trang bị được chọn để kế thừa sau luân hồi
  value: number;
  reqLevel: number;
  stats: {
    attack?: number;
    defense?: number;
    hpBonus?: number;
  };
  sockets: number;
  socketedGems: SocketedGem[];
  talent?: EquipmentTalent;
  setId?: SetId;
  enchantment?: EnchantmentType;
  element?: ElementType;
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
  blueprintLevels: Record<string, number>;
  gameSpeed: number;
  memoryGemPotential: number;
  rebirthTalents: string[];
  lifeStats: LifeStats;
}
