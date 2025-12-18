
import { Zone, MaterialType } from '../kieu_du_lieu';

export const CAC_VUNG_DAT: Zone[] = [
  { id: 'z1', name: 'Rừng Khởi Nguyên', description: 'Nơi bắt đầu của mọi huyền thoại.', recommendedLevel: 1, materials: [MaterialType.SlimeResin, MaterialType.WolfSkin, MaterialType.WolfFang, MaterialType.ForestWood, MaterialType.SpiderSilk, MaterialType.WildHerb] },
  { id: 'z2', name: 'Hang Động Đồng Thô', description: 'Nơi chứa đựng những quặng kim loại đầu tiên.', recommendedLevel: 10, materials: [MaterialType.RawCopperOre, MaterialType.IronScraps, MaterialType.BatWing, MaterialType.GolemCore, MaterialType.Flint, MaterialType.GemStone, MaterialType.AmberFragment] },
  { id: 'z3', name: 'Núi Tuyết Vĩnh Cửu', description: 'Băng giá che phủ những bí mật cổ xưa.', recommendedLevel: 25, materials: [MaterialType.SnowCrystal, MaterialType.WarmFur, MaterialType.YetiFur, MaterialType.IceShard, MaterialType.FrozenHeart, MaterialType.FrostLotus] },
  { id: 'z4', name: 'Thành Cổ U Linh', description: 'Tàn tích của một đế chế đã mất.', recommendedLevel: 50, materials: [MaterialType.OldBone, MaterialType.BlueSoul, MaterialType.BrokenSwordFragment, MaterialType.AncientScroll, MaterialType.MagicThread, MaterialType.GhostEssence] },
  { id: 'z5', name: 'Long Cung Rực Lửa', description: 'Lãnh địa của loài rồng thượng cổ.', recommendedLevel: 100, materials: [MaterialType.DragonScale, MaterialType.DragonBlood, MaterialType.PearlOfPower, MaterialType.AncientDragonBone, MaterialType.GoldOre, MaterialType.FissionCrystal] },
  { id: 'z7', name: 'Vực Thẳm Hư Không', description: 'Nơi thực tại bị xé nát.', recommendedLevel: 200, materials: [MaterialType.VoidCore, MaterialType.VoidShard, MaterialType.DarkEssence, MaterialType.RealityTear, MaterialType.EternalSpark, MaterialType.OmniStone], minRebirth: 5 }
];
