import { Color } from "./color";
import { DDSEncoder } from "./encoder";
export declare namespace BC1Encoder {
    /**
     * Represents an encoded BC1 Block
     */
    class BC1Block {
        protected color0: Color.Pixel565;
        protected color1: Color.Pixel565;
        protected indices: number;
        constructor(color0: Color.Pixel565, color1: Color.Pixel565);
        get data(): [Color.Pixel565, Color.Pixel565, number];
        setIndex(index: number, value: number): void;
        get value(): number;
    }
    /**
     * Encode the RGBA data to a DDS DXT1 file format
     * @param imageData - A DataView pointing directly to the data of the DXT image
     * @param width - Width of the image
     * @param height - Height of the image
     * @returns - The DDS File data with headers and the compressed bytes
     */
    function encode(imageData: DataView, width: number, height: number): DDSEncoder.DDSData;
    function decode(imageData: DataView, width: number, height: number): Uint8Array;
}
