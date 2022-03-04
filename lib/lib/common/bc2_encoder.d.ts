import { BC1Encoder } from "./bc1_encoder";
import { Color } from "./color";
import { DDSEncoder } from "./encoder";
export declare namespace BC2Encoder {
    class BC2Block extends BC1Encoder.BC1Block {
        private alphas;
        constructor(alphas: bigint, color0: Color.Pixel565, color1: Color.Pixel565);
        get alpha(): bigint;
        /**
         * Sets the given Alpha into the Alphas bitfield
         * @returns - Returns the inserted alpha value
         */
        setAlpha(index: number, alpha: number): bigint;
        getAlpha(index: number): number;
    }
    /**
     * Encode the RGBA data to a DDS DXT2/3 file format
     * @param imageData - A DataView pointing directly to the data of the DXT image
     * @param width - Width of the image
     * @param height - Height of the image
     * @returns - The DDS File data with headers and the compressed bytes
     */
    function encode(imageData: DataView, width: number, height: number, format: 'DXT2' | 'DXT3'): DDSEncoder.DDSData;
    function decode(imageData: DataView, width: number, height: number, format: 'DXT2' | 'DXT3'): Uint8Array;
}
