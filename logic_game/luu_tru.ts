
import { Player, Equipment, Material } from '../kieu_du_lieu';

export const PHIEN_BAN_GAME = "v2.6.5";

export const xuLySaveJSON = (
    player: Player, 
    inventory: Equipment[], 
    materials: Material[]
) => {
    return JSON.stringify({
        metadata: {
            version: PHIEN_BAN_GAME,
            saveDate: new Date().toISOString()
        },
        data: {
            player,
            inventory,
            materials
        }
    }, null, 2);
};

export const xuLyLoadJSON = (
    jsonStr: string,
    onLoad: (p: Player, inv: Equipment[], mat: Material[]) => void
) => {
    try {
        const parsed = JSON.parse(jsonStr);
        if (parsed.data) {
            onLoad(parsed.data.player, parsed.data.inventory, parsed.data.materials);
            return true;
        }
    } catch (e) {
        console.error("Lỗi khi đọc file save:", e);
    }
    return false;
};
