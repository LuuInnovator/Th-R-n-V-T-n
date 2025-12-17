
import { Zone, MaterialType } from '../types';

export const ZONES: Zone[] = [
  { id: 'z1', name: 'Rừng Khởi Nguyên', description: 'Nơi bắt đầu của mọi huyền thoại.', recommendedLevel: 1, materials: [MaterialType.SlimeResin, MaterialType.WolfSkin, MaterialType.WolfFang, MaterialType.ForestWood, MaterialType.SpiderSilk, MaterialType.WildHerb] },
  { id: 'z2', name: 'Hang Động Đồng Thô', description: 'Nơi chứa đựng những quặng kim loại đầu tiên.', recommendedLevel: 10, materials: [MaterialType.RawCopperOre, MaterialType.IronScraps, MaterialType.BatWing, MaterialType.GolemCore, MaterialType.Flint, MaterialType.GemStone, MaterialType.AmberFragment] },
  { id: 'z3', name: 'Núi Tuyết Vĩnh Cửu', description: 'Băng giá che phủ những bí mật cổ xưa.', recommendedLevel: 25, materials: [MaterialType.SnowCrystal, MaterialType.WarmFur, MaterialType.YetiFur, MaterialType.IceShard, MaterialType.FrozenHeart, MaterialType.FrostLotus] },
  { id: 'z4', name: 'Thành Cổ Hoang Tàn', description: 'Tàn tích của một đế chế ma pháp hùng mạnh.', recommendedLevel: 45, materials: [MaterialType.OldBone, MaterialType.BlueSoul, MaterialType.BrokenSwordFragment, MaterialType.AncientScroll, MaterialType.MagicThread, MaterialType.GhostEssence, MaterialType.CursedStone, MaterialType.WillOfDead] },
  { id: 'z5', name: 'Cung Điện Long Tộc', description: 'Thánh địa của những sinh vật mạnh nhất thế gian.', recommendedLevel: 65, materials: [MaterialType.DragonScale, MaterialType.GoldOre, MaterialType.StarDust, MaterialType.DragonBlood, MaterialType.RoyalCloth, MaterialType.PearlOfPower, MaterialType.AncientDragonBone] },
  { id: 'z6', name: 'Vùng Đất Song Song', description: 'Thực tại bị bóp méo bởi năng lượng hư không.', recommendedLevel: 85, minRebirth: 2, materials: [MaterialType.FissionCrystal, MaterialType.VoidCore, MaterialType.DarkEssence, MaterialType.MemoryGem, MaterialType.OmniStone] },
  { id: 'z7', name: 'Vực Thẳm Vô Định', description: 'Nơi kết thúc của không gian và thời gian.', recommendedLevel: 100, minRebirth: 5, materials: [MaterialType.RealityTear, MaterialType.VoidShard, MaterialType.AncientRelic, MaterialType.EternalSpark] }
];
