import { COLORS, Colors } from "@/constants";

export function getHexFromColors(colors: Colors[]): string[] {
    const hexs: string[] = [];
    colors.forEach(color => {
        const hex = COLORS.find(colorObject => colorObject.text === color)?.hex;
        if (hex) hexs.push(hex);
    })

    return hexs;
}