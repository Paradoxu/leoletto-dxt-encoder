import { Color } from "./color";
export declare namespace Image {
    class RawBlock {
        readonly pixels: Color.Pixel[];
        constructor(fillColor: Color.Pixel);
        get hasTransparentPixels(): boolean;
        setColor(index: number, color: Color.Pixel): void;
        getMinMaxColorsBC1(): [Color.Pixel, Color.Pixel];
    }
    function imageTo4x4(image: DataView, width: number, height: number): {
        blockWidth: number;
        blockHeight: number;
        blocks: RawBlock[];
    };
}
