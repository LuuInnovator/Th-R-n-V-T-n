
import { CharacterClass } from '../kieu_du_lieu';

export const THONG_TIN_HE_PHAI: Record<string, { name: string; desc: string; bonuses: string }> = {
  [CharacterClass.None]: { 
    name: 'Vô Danh', 
    desc: 'Chưa thức tỉnh sức mạnh.', 
    bonuses: 'Không có.' 
  },
  [CharacterClass.HeavySentinel]: { 
    name: 'Hộ Vệ Thủ Lĩnh', 
    desc: 'Bậc thầy phòng ngự với sức chống chịu vô song.', 
    bonuses: '+100% Phòng Thủ, +200% HP' 
  },
  [CharacterClass.ShadowBlade]: { 
    name: 'Bóng Ma Hắc Ám', 
    desc: 'Sát thủ tàn bạo chuyên tối ưu sát thương chí mạng.', 
    bonuses: '+150% Tấn Công, +60% Chí Mạng' 
  },
  [CharacterClass.AlchemistMage]: { 
    name: 'Giả Kim Pháp Sư', 
    desc: 'Bậc thầy chế tác và sử dụng dược liệu.', 
    bonuses: '+100% Hiệu quả thuốc, +200% Tỷ lệ Rơi đồ' 
  }
};
