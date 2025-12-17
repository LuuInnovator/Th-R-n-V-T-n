
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
  Gem = 'Đá Quý Thô', // Gem thô nhặt được
  Essence = 'Tinh Hoa',
  FissionCrystal = 'Tinh Thể Nhiệt Hạch',
  SoulDust = 'Bụi Linh Hồn', // Dùng để chế đồ phù phép
  EnchantScroll = 'Giấy Phép Thuật', // Dùng để phù phép
  // --- MỚI CHO UPDATE BOSS & GUILD ---
  CondensedTimesand = 'Cát Thời Gian Cô Đặc', // Boss Drop
  AntiRustPotion = 'Thuốc Giải Rỉ Sét', // Craftable Consumable
  DecoyItem = 'Vật Phẩm Mồi', // Craftable Consumable
  GuildToken = 'Huy Hiệu Bang Hội' // Currency
}

// Nguyên tố (cho cơ chế Boss)
export enum ElementType {
  Physical = 'Vật Lý',
  Fire = 'Lửa',
  Ice = 'Băng',
  Lightning = 'Sét'
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
  Helmet = 'Mũ',
  Boots = 'Giày',
  Gloves = 'Găng Tay'
}

// Định danh Set đồ
export enum SetId {
  ForgeSpirit = 'forge_spirit',
  PrimalHunter = 'primal_hunter',
  DragonfireKeeper = 'dragonfire_keeper',
  InfinityChrono = 'infinity_chrono' // New Set
}

// --- HỆ THỐNG GEM & ENCHANT MỚI ---
export enum GemType {
  Ruby = 'Hồng Ngọc', // Tấn công
  Sapphire = 'Lam Ngọc', // Thủ / Kháng
  Topaz = 'Hoàng Ngọc' // Máu
}

export enum GemTier {
  Chipped = 1, // Sơ cấp
  Flawed = 2,
  Normal = 3,
  Flawless = 4,
  Perfect = 5 // Hoàn mỹ
}

export interface SocketedGem {
  type: GemType;
  tier: GemTier;
}

export enum EnchantmentType {
  None = 'Không',
  Sharpness = 'Sắc Bén', // Tăng % ATK
  Protection = 'Bảo Hộ', // Tăng % DEF
  Vampirism = 'Hút Máu', // Hồi máu khi đánh
  Fortune = 'May Mắn' // Tăng drop rate
}

// Cấu trúc trang bị (Cập nhật)
export interface Equipment {
  id: string;
  name: string;
  type: EquipmentType;
  rarity: Rarity;
  element?: ElementType; 
  stats: {
    attack?: number;
    defense?: number;
    hpBonus?: number;
  };
  isEquipped: boolean;
  value: number;
  setId?: SetId;
  
  // New Fields
  sockets: number; // Số lỗ tối đa (0-3)
  socketedGems: SocketedGem[]; // Ngọc đã khảm
  enchantment?: EnchantmentType; // Phù phép hiện tại
}

// Công thức chế tạo (Bản thiết kế)
export interface Blueprint {
  id: string;
  name: string;
  resultType: EquipmentType | 'MATERIAL'; // Cho phép chế nguyên liệu
  resultMaterial?: MaterialType; // Nếu là chế nguyên liệu
  element?: ElementType;
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
  isGuildBlueprint?: boolean; // New: Bản vẽ bang hội
  guildFameCost?: number; // New: Chi phí mở khóa
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
  element: ElementType;
  isBoss: boolean;
  dropTable: {
    materialType: MaterialType;
    chance: number;
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
  reqRebirth?: number;
  enemies: Enemy[];
  materials: MaterialType[];
}

// LỚP NHÂN VẬT (Di chuyển lên trên để dùng trong Skill)
export enum CharacterClass {
  None = 'Chưa chọn',
  HeavySentinel = 'Chiến Binh Giáp Nặng',
  ShadowBlade = 'Sát Thủ Bóng Đêm',
  AlchemistMage = 'Pháp Sư Luyện Kim'
}

// Kỹ năng thường
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
  cost: number;
  effectValue: number;
  reqClass?: CharacterClass; // New: Yêu cầu lớp nhân vật
}

// --- HỆ THỐNG VĨNH HẰNG (ETERNAL SYSTEM) ---
export enum EternalUpgradeId {
  HuntersEye = 'hunter_eye',
  SolidFoundation = 'solid_foundation',
  LearnFromFailure = 'learn_failure',
  LatentPower = 'latent_power'
}

export interface EternalUpgrade {
  id: EternalUpgradeId;
  name: string;
  description: string;
  maxLevel: number;
  baseCost: number; 
  costMultiplier: number; 
  effectValue: number; 
}

// --- BANG HỘI ---
export interface Guild {
  name: string;
  level: number;
  fame: number; // Danh tiếng dùng để mở khóa trong shop bang hội
  blueprints: string[]; // ID các bản vẽ đã mở khóa
}

// Trạng thái người chơi
export interface Player {
  characterClass: CharacterClass; 
  level: number;
  currentExp: number;
  maxExp: number;
  hp: number;
  maxHp: number;
  attack: number; // Đây là base ATK từ trang bị/cơ bản, chưa cộng chỉ số
  defense: number; // Đây là base DEF
  gold: number;
  eternalPoints: number;
  rebirthCount: number;
  
  // Skill System (Kỹ năng nghề)
  skillPoints: number;
  skills: Record<string, number>;
  
  // Eternal System
  eternalUpgrades: Record<string, number>;
  
  // Gem System
  gemInventory: Record<string, number>; 
  
  // Guild System
  guild: Guild; 

  // --- STATS ALLOCATION SYSTEM (THE CORE FIVE) ---
  statPoints: number; // Điểm tiềm năng chưa cộng
  stats: {
      strength: number;    // Sức mạnh: Atk, Weight(Flavor)
      dexterity: number;   // Khéo léo: Crit Chance, Attack Speed (Cooldown reduction)
      intelligence: number;// Trí tuệ: MP (Flavor), Skill Effect, Magic Def
      vitality: number;    // Thể lực: HP, Def
      luck: number;        // May mắn: Drop Rate, Crit Dmg
  };
}

// Nhật ký game
export interface GameLog {
  id: number;
  message: string;
  type: 'info' | 'combat' | 'loot' | 'craft' | 'alert';
  timestamp: Date;
}
