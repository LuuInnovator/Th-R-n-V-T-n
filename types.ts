
export enum Rarity {
  Common = 'Thường',
  Rare = 'Hiếm',
  Epic = 'Sử Thi',
  Legendary = 'Huyền Thoại',
  Mythic = 'Thần Thoại',
  Cosmic = 'Vũ Trụ'
}

export enum MaterialTier {
  Basic = 'Cơ Bản',
  Elite = 'Tinh Hoa',
  Eternal = 'Vĩnh Cửu'
}

export enum MaterialType {
  SlimeResin = 'Nhựa Slime',
  BlueCoreFragment = 'Mảnh Lõi Xanh',
  PoisonSpore = 'Bào Tử Độc',
  MushroomCap = 'Mũ Nấm',
  WolfSkin = 'Da Sói',
  WolfFang = 'Răng Nanh',
  BatWing = 'Cánh Dơi',
  Flint = 'Đá Lửa',
  IronScale = 'Vảy Sắt',
  RawCopperOre = 'Quặng Đồng Thô',
  GolemCore = 'Lõi Golem',
  PureIronOre = 'Quặng Sắt Tinh Khiết',
  SnowCrystal = 'Tinh Thể Tuyết',
  WarmFur = 'Lông Thú Ấm',
  OldBone = 'Xương Mục',
  BrokenSwordFragment = 'Mảnh Kiếm Gãy',
  BlueSoul = 'Linh Hồn Xanh',
  VoidCore = 'Lõi Hư Không',
  StarDust = 'Bụi Sao',
  MemoryGem = 'Ngọc Ký Ức',
  FissionCrystal = 'Tinh Thể Nhiệt Hạch',
  IronScraps = 'Mảnh Sắt Vụn',
  Wood = 'Gỗ Rừng',
  Leather = 'Da Thú',
  Ore = 'Quặng Thô',
  ForestWood = 'Gỗ Khởi Nguyên',
  WildHerb = 'Thảo Mộc Rừng',
  YetiFur = 'Lông Yeti',
  GoldOre = 'Quặng Vàng',
  VoidShard = 'Mảnh Vỡ Hư Không',
  GemStone = 'Đá Quý'
}

export interface Material {
  id: string;
  name: string;
  type: MaterialType;
  quantity: number;
}

export enum ElementType {
  Physical = 'Vật Lý',
  Fire = 'Lửa',
  Ice = 'Băng',
  Lightning = 'Sét',
  Acid = 'Axit',
  Void = 'Hư Không'
}

export enum MonsterAbility {
  Dodge = 'Né Đòn',
  LifeSteal = 'Hút Máu',
  ArmorBreak = 'Phá Giáp',
  Reflect = 'Phản Đòn',
  Stun = 'Gây Choáng',
  Freeze = 'Đông Cứng',
  Regen = 'Hồi Phục'
}

export enum MutationType {
  None = 'Bình Thường',
  RebirthVariant = 'Biến Dị Tái Sinh',
  Void = 'Vô Định',
  Corrupted = 'Tha Hóa',
  Stalker = 'Kẻ Săn Đuổi'
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
  minRebirth?: number;
  dropTable: {
    materialType: MaterialType;
    chance: number;
    minQty: number;
    maxQty: number;
  }[];
}

export interface EquipmentTalent {
  name: string;
  desc: string;
}

export enum SetId {
  PrimalHunter = 'PrimalHunter',
  InfinityChrono = 'InfinityChrono'
}

export enum EnchantmentType {
  None = 'Không',
  Sharpness = 'Sắc Bén',
  Protection = 'Bảo Vệ'
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
  talent?: EquipmentTalent;
  setId?: SetId;
  enchantment?: EnchantmentType;
  element?: ElementType;
}

export enum EquipmentType {
  Weapon = 'Vũ Khí',
  Armor = 'Giáp Trụ',
  Accessory = 'Trang Sức',
  Helmet = 'Mũ Giáp',
  Boots = 'Giày',
  Gloves = 'Găng Tay'
}

export interface SocketedGem {
  type: GemType;
  tier: GemTier;
}

export enum GemType { Ruby = 'Hồng Ngọc', Sapphire = 'Lam Ngọc', Topaz = 'Hoàng Ngọc' }
export enum GemTier { T1 = 1, T2 = 2, T3 = 3 }

export interface Blueprint {
  id: string;
  name: string;
  resultType: EquipmentType | 'VẬT PHẨM';
  evolutionLevel: number;
  requiredMaterials: { type: MaterialType; amount: number }[];
  baseStats: { minAtk: number; maxAtk: number; minDef: number; maxDef: number };
  unlocked: boolean;
}

export interface Zone {
  id: string;
  name: string;
  description: string;
  recommendedLevel: number;
  materials: MaterialType[];
  minRebirth?: number;
}

export enum EternalUpgradeId {
  LatentPower = 'suc_manh_tiem_an',
  ResourceRetention = 'bao_toan_tai_nguyen',
  BlueprintMastery = 'bac_thay_ban_ve',
  EternalBlood = 'huyet_mach_vinh_hang',
  DeepSight = 'thau_thi_sau'
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

export enum CharacterClass {
  None = 'Chưa Chọn',
  HeavySentinel = 'Hộ Vệ Thủ Lĩnh',
  ShadowBlade = 'Bóng Ma Hắc Ám',
  AlchemistMage = 'Giả Kim Pháp Sư'
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
  reqLevel: number;
  reqClass?: CharacterClass;
}

export interface Guild {
  name: string;
  level: number;
  fame: number;
  blueprints: string[];
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
}
