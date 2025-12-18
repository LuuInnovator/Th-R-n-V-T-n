
export enum CharacterClass {
  None = 'Vô Danh',
  HeavySentinel = 'Hộ Vệ Thủ Lĩnh',
  ShadowBlade = 'Bóng Ma Hắc Ám',
  AlchemistMage = 'Giả Kim Pháp Sư',
}

export enum EquipmentType {
  Weapon = 'VŨ KHÍ',
  Armor = 'GIÁP TRỤ',
  Helmet = 'MŨ GIÁP',
  Boots = 'GIÀY',
  Ring = 'NHẪN',
  Necklace = 'VÒNG CỔ',
}

export enum Rarity {
  Common = 'Thường',
  Rare = 'Hiếm',
  Epic = 'Sử Thi',
  Legendary = 'Huyền Thoại',
  Mythic = 'Thần Thoại',
  Cosmic = 'Vũ Trụ',
}

export enum ElementType {
  Physical = 'VẬT LÝ',
  Nature = 'TỰ NHIÊN',
  Ice = 'BĂNG',
  Fire = 'HỎA',
  Lightning = 'LÔI',
  Void = 'HƯ KHÔNG',
}

export enum MaterialType {
  SlimeResin = 'Nhựa Slime',
  PoisonSpore = 'Bào Tử Độc',
  ForestWood = 'Gỗ Rừng',
  WolfSkin = 'Da Sói',
  WolfFang = 'Nanh Sói',
  IronScraps = 'Sắt Vụn',
  RawCopperOre = 'Quặng Đồng Thô',
  GolemCore = 'Lõi Golem',
  SnowCrystal = 'Tinh Thể Tuyết',
  VoidCore = 'Lõi Hư Không',
  RealityTear = 'Mảnh Vỡ Thực Tại',
  EternalSpark = 'Tia Sáng Vĩnh Hằng',
  WildHerb = 'Thảo Mộc Hoang',
  BeeSting = 'Ngòi Ong',
  SpiderSilk = 'Tơ Nhện',
  BearClaw = 'Móng Gấu',
  AmberFragment = 'Mảnh Hổ Phách',
  BatWing = 'Cánh Dơi',
  MagicDust = 'Bụi Ma Thuật',
  SilverOre = 'Quặng Bạc',
  IceShard = 'Mảnh Băng',
  FrozenHeart = 'Trái Tim Băng Giá',
  WarmFur = 'Lông Ấm',
  YetiFur = 'Lông Yeti',
  FrostLotus = 'Hoa Sen Băng',
  OldBone = 'Xương Cũ',
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
  VoidShard = 'Mảnh Hư Không',
  DarkEssence = 'Tinh Hoa Bóng Tối',
  OmniStone = 'Đá Toàn Năng',
  GoblinEar = 'Tai Goblin',
  SkeletonRib = 'Xương Sườn Bộ Xương',
  WillOfDead = 'Ý Chí Người Chết',
  LavaRock = 'Đá Dung Nham',
}

export enum MaterialTier {
  Basic = 'Cơ Bản',
  Elite = 'Tinh Anh',
  Eternal = 'Vĩnh Hằng',
}

export enum MonsterAbility {
  Silence = 'Câm Lặng',
  Regen = 'Hồi Phục',
  Stun = 'Choáng',
  Reflect = 'Phản Đòn',
  LifeSteal = 'Hút Máu',
  ArmorBreak = 'Phá Giáp',
  Freeze = 'Đóng Băng',
  Dodge = 'Né Tránh',
  Hardened = 'Cứng Hóa',
}

export enum MutationType {
  None = 'None',
  Giant = 'Giant',
  Speedy = 'Speedy',
}

export enum SkillBranch {
  WeaponSmith = 'WeaponSmith',
  ArmorSmith = 'ArmorSmith',
  Alchemy = 'Alchemy',
  Enchanting = 'Enchanting',
}

export enum EternalUpgradeId {
  LatentPower = 'nc_suc_manh_tiem_an',
  EternalBlood = 'nc_huyet_mach_vinh_hang',
  GodlyForging = 'nc_ky_thuat_duc_than',
}

export enum GemType {
  Ruby = 'Ruby',
  Sapphire = 'Sapphire',
  Topaz = 'Topaz',
}

export enum GemTier {
  T1 = 'T1',
  T2 = 'T2',
  T3 = 'T3',
}

export enum EnchantmentType {
  Sharpness = 'Sharpness',
  Protection = 'Protection',
  Vitality = 'Vitality',
  Luck = 'Luck',
}

export enum SetId {
  PrimalHunter = 'PrimalHunter',
  IronWill = 'IronWill',
  FrozenLegacy = 'FrozenLegacy',
  GhostlyRelic = 'GhostlyRelic',
  DragonWarlord = 'DragonWarlord',
  VoidSeeker = 'VoidSeeker',
  InfinityChrono = 'InfinityChrono',
}

export interface SocketedGem {
  type: GemType;
  tier: GemTier;
}

export interface EquipmentTalent {
  name: string;
  desc: string;
}

export interface Equipment {
  id: string;
  name: string;
  type: EquipmentType;
  rarity: Rarity;
  isEquipped: boolean;
  isLegacy?: boolean;
  value: number;
  reqLevel: number;
  stats: {
    attack?: number;
    defense?: number;
    hpBonus?: number;
    dodge?: number;
    reflect?: number;
    silence?: number;
    stun?: number;
    regen?: number;
    lifesteal?: number;
    minAtk?: number;
    maxAtk?: number;
    minDef?: number;
    maxDef?: number;
    minHp?: number;
    maxHp?: number;
  };
  sockets: number;
  socketedGems: SocketedGem[];
  talent?: EquipmentTalent;
  setId?: SetId;
  enchantment?: EnchantmentType;
  element?: ElementType;
  ringSlot?: 1 | 2;
}

export interface Material {
  id: string;
  name: string;
  type: MaterialType;
  quantity: number;
}

export interface DropInfo {
  materialType: MaterialType;
  chance: number;
  minQty: number;
  maxQty: number;
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
  dropTable: DropInfo[];
  abilities?: MonsterAbility[];
  isBoss?: boolean;
  minRebirth?: number;
  mutation?: MutationType;
}

export interface Zone {
  id: string;
  name: string;
  description: string;
  recommendedLevel: number;
  materials: MaterialType[];
  minRebirth?: number;
}

export interface Blueprint {
  id: string;
  name: string;
  resultType: EquipmentType | 'VẬT PHẨM';
  evolutionLevel: number;
  reqLevel: number;
  requiredMaterials: { type: MaterialType; amount: number }[];
  baseStats: {
    minAtk: number;
    maxAtk: number;
    minDef: number;
    maxDef: number;
    minHp?: number;
    maxHp?: number;
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
  guild: { name: string; level: number; fame: number; blueprints: string[] };
  statPoints: number;
  stats: {
    strength: number;
    dexterity: number;
    intelligence: number;
    vitality: number;
    luck: number;
  };
  blueprintLevels: Record<string, number>;
  gameSpeed: number;
  memoryGemPotential: number;
  rebirthTalents: string[];
  lifeStats: LifeStats;
  inventorySlots: number;
}
