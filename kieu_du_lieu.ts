
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
  PoisonSpore = 'Bào Tử Độc',
  MushroomCap = 'Mũ Nấm',
  WolfSkin = 'Da Sói',
  WolfFang = 'Răng Nanh',
  ForestWood = 'Gỗ Khởi Nguyên',
  SpiderSilk = 'Tơ Nhện',
  WildHerb = 'Thảo Mộc Hoang',
  RawCopperOre = 'Quặng Đồng Thô',
  IronScale = 'Vảy Sắt',
  IronScraps = 'Mảnh Sắt Vụn',
  Flint = 'Đá Lửa',
  GemStone = 'Đá Quý Thô',
  BatWing = 'Cánh Dơi',
  GolemCore = 'Lõi Golem',
  SilverOre = 'Quặng Bạc',
  AmberFragment = 'Mảnh Hổ Phách',
  SnowCrystal = 'Tinh Thể Tuyết',
  WarmFur = 'Lông Thú Ấm',
  YetiFur = 'Lông Yeti',
  IceShard = 'Mảnh Băng Vĩnh Cửu',
  FrozenHeart = 'Trái Tim Băng',
  FrostLotus = 'Hoa Tuyết Liên',
  OldBone = 'Xương Mục',
  BlueSoul = 'Linh Hồn Xanh',
  BrokenSwordFragment = 'Mảnh Kiếm Gãy',
  AncientScroll = 'Cuộn Giấy Cổ',
  MagicThread = 'Chỉ Ma Thuật',
  GhostEssence = 'Tinh Hoa U Linh',
  CursedStone = 'Đá Nguyền Rủa',
  WillOfDead = 'Ý Chí Vong Linh',
  GoldOre = 'Quặng Vàng',
  StarDust = 'Bụi Sao',
  MemoryGem = 'Ngọc Ký Ức',
  DragonScale = 'Vảy Rồng',
  RoyalCloth = 'Vải Hoàng Gia',
  DragonBlood = 'Máu Rồng Thiêng',
  PearlOfPower = 'Long Châu Lực',
  AncientDragonBone = 'Xương Rồng Thượng Cổ',
  VoidCore = 'Lõi Hư Không',
  VoidShard = 'Mảnh Vỡ Hư Không',
  FissionCrystal = 'Tinh Thể Nhiệt Hạch',
  DarkEssence = 'Tinh Hoa Bóng Tối',
  RealityTear = 'Vết Rách Thực Tại',
  AncientRelic = 'Di Vật Cổ Đại',
  EternalSpark = 'Tàn Lửa Vĩnh Hằng',
  OmniStone = 'Đá Toàn Năng',
  BlueCoreFragment = 'Mảnh Lõi Xanh',
  PureIronOre = 'Quặng Sắt Tinh Khiết',
  Wood = 'Gỗ Rừng',
  Leather = 'Da Thú',
  Ore = 'Quặng Thô'
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
  Regen = 'Hồi Phục',
  Silence = 'Câm Lặng'
}

export enum MutationType {
  None = 'Bình Thường',
  Stalker = 'Kẻ Săn Đuổi',
  Void = 'Hư Không',
  Corrupted = 'Hóa Quỷ'
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

export enum SetId {
  PrimalHunter = 'Thợ Săn Nguyên Thủy',
  IronWill = 'Ý Chí Thép',
  FrozenLegacy = 'Di Sản Băng Giá',
  GhostlyRelic = 'Di Vật U Linh',
  DragonWarlord = 'Đại Tướng Long Tộc',
  VoidSeeker = 'Kẻ Tầm Đạo Hư Không',
  InfinityChrono = 'Vòng Lặp Vô Tận'
}

export enum EquipmentType {
  Weapon = 'Vũ Khí',
  Armor = 'Giáp Trụ',
  Accessory = 'Trang Sức',
  Helmet = 'Mũ Giáp',
  Boots = 'Giày',
  Gloves = 'Găng Tay'
}

export enum GemType { Ruby = 'Hồng Ngọc', Sapphire = 'Lam Ngọc', Topaz = 'Hoàng Ngọc' }
export enum GemTier { T1 = 1, T2 = 2, T3 = 3 }

export interface SocketedGem {
  type: GemType;
  tier: GemTier;
}

export interface EquipmentTalent {
  name: string;
  desc: string;
}

export enum EnchantmentType {
  None = 'Không',
  Sharpness = 'Sắc Bén',
  Protection = 'Bảo Vệ',
  Vitality = 'Sinh Lực',
  Luck = 'Vận May'
}

export interface Equipment {
  id: string;
  name: string;
  type: EquipmentType;
  rarity: Rarity;
  isEquipped: boolean;
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

export interface Blueprint {
  id: string;
  name: string;
  resultType: EquipmentType | 'VẬT PHẨM';
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
  GodlyForging = 'ky_thuat_duc_than'
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

export interface Material {
  id: string;
  name: string;
  type: MaterialType;
  quantity: number;
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
  lifeStats: LifeStats; // Theo dõi thành tích kiếp hiện tại
}
