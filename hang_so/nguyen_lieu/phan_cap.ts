
import { MaterialType, MaterialTier } from '../../kieu_du_lieu';

export const PHAN_CAP_NGUYEN_LIEU: Record<MaterialType, MaterialTier> = {
  [MaterialType.SlimeResin]: MaterialTier.Basic,
  [MaterialType.PoisonSpore]: MaterialTier.Basic,
  [MaterialType.ForestWood]: MaterialTier.Basic,
  [MaterialType.WolfSkin]: MaterialTier.Basic,
  [MaterialType.IronScraps]: MaterialTier.Basic,
  [MaterialType.RawCopperOre]: MaterialTier.Basic,
  [MaterialType.GolemCore]: MaterialTier.Elite,
  [MaterialType.SnowCrystal]: MaterialTier.Elite,
  [MaterialType.VoidCore]: MaterialTier.Eternal,
  [MaterialType.RealityTear]: MaterialTier.Eternal,
  [MaterialType.EternalSpark]: MaterialTier.Eternal,
  // Cac loai khac mac dinh la Basic
} as any;
