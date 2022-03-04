"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BC2Encoder = void 0;
const bc1_encoder_1 = require("./bc1_encoder");
const color_1 = require("./color");
const encoder_1 = require("./encoder");
const image_1 = require("./image");
var BC2Encoder;
(function (BC2Encoder) {
    const rWeight = 0.3;
    const gWeight = 0.59;
    const bWeight = 0.11;
    class BC2Block extends bc1_encoder_1.BC1Encoder.BC1Block {
        constructor(alphas = 0n, color0, color1) {
            super(color0, color1);
            this.alphas = alphas;
        }
        get alpha() {
            return this.alphas;
        }
        /**
         * Sets the given Alpha into the Alphas bitfield
         * @returns - Returns the inserted alpha value
         */
        setAlpha(index, alpha) {
            const shift = BigInt((4 * (15 - index)));
            const a = BigInt(Math.floor(alpha / 17)) & 15n;
            this.alphas |= (a & 0xfn) << shift;
            return a;
        }
        getAlpha(index) {
            const shift = BigInt((4 * (15 - index)));
            return Number((this.alphas >> shift) & 15n) * 17;
        }
    }
    BC2Encoder.BC2Block = BC2Block;
    /**
     * Encode the RGBA data to a DDS DXT2/3 file format
     * @param imageData - A DataView pointing directly to the data of the DXT image
     * @param width - Width of the image
     * @param height - Height of the image
     * @returns - The DDS File data with headers and the compressed bytes
     */
    function encode(imageData, width, height, format) {
        if ('DXT2' !== format && 'DXT3' !== format)
            throw new Error(`Unkown format ${format}`);
        const { blockWidth, blockHeight, blocks } = image_1.Image.imageTo4x4(imageData, width, height);
        const output = new Uint8Array(blockWidth * blockHeight * 16);
        const outputView = new DataView(output.buffer);
        for (let i = 0; i < blocks.length; i++) {
            const block = blocks[i];
            const bc = encodeBlock(block, format);
            const [color0, color1, indices] = bc.data;
            let offset = i * 16;
            outputView.setBigUint64(offset, bc.alpha, true);
            outputView.setUint16(offset + 8, color0.value, true);
            outputView.setUint16(offset + 10, color1.value, true);
            outputView.setUint32(offset + 12, indices, true);
        }
        return encoder_1.DDSEncoder.DDSData.fromData(output, width, height, format);
    }
    BC2Encoder.encode = encode;
    function decode(imageData, width, height, format) {
        let rgba = new Uint8Array(width * height * 4), height_4 = (height / 4) | 0, width_4 = (width / 4) | 0, offset = 0;
        for (let h = 0; h < height_4; h++) {
            for (let w = 0; w < width_4; w++) {
                if (offset >= imageData.byteLength)
                    break;
                const alphaValues = imageData.getBigUint64(offset, true);
                // Grab color0 and color1  32 bits
                const color0 = color_1.Color.Pixel.fromRgb565(imageData.getUint16(offset + 8, true));
                const color1 = color_1.Color.Pixel.fromRgb565(imageData.getUint16(offset + 10, true));
                const bc2Block = new BC2Block(alphaValues, color0, color1);
                const color2 = color0.interpolate(color1, false, 1);
                const color3 = color0.interpolate(color1, false, 2);
                const colorValues = [color0, color1, color2, color3];
                // Grab color indices 32 bits
                const colorIndices = imageData.getUint32(offset + 12, true);
                for (let y = 0; y < 4; y++) {
                    for (let x = 0; x < 4; x++) {
                        const pixelIndex = (3 - x) + (y * 4);
                        const rgbaIndex = (h * 4 + 3 - y) * (width * 4) + (w * 4 + x) * 4;
                        const colorIndex = (colorIndices >> (2 * (15 - pixelIndex))) & 0x03;
                        const alpha = bc2Block.getAlpha(pixelIndex);
                        const multiplier = format === 'DXT2' ? 255 / alpha : 1;
                        if (multiplier === 0 || !isFinite(multiplier)) {
                            rgba[rgbaIndex] = 0;
                            rgba[rgbaIndex + 1] = 0;
                            rgba[rgbaIndex + 2] = 0;
                        }
                        else {
                            rgba[rgbaIndex] = Math.round(colorValues[colorIndex].red * multiplier);
                            rgba[rgbaIndex + 1] = Math.round(colorValues[colorIndex].green * multiplier);
                            rgba[rgbaIndex + 2] = Math.round(colorValues[colorIndex].blue * multiplier);
                        }
                        rgba[rgbaIndex + 3] = alpha;
                    }
                }
                offset += 16;
            }
            if (offset >= imageData.byteLength)
                break;
        }
        return rgba;
    }
    BC2Encoder.decode = decode;
    function encodeBlock(block, format) {
        const [min, max] = block.getMinMaxColorsBC1();
        const color0 = new color_1.Color.Pixel(max.red, max.green, max.blue, max.alpha);
        const color1 = new color_1.Color.Pixel(min.red, min.green, min.blue, min.alpha);
        const bc2Block = new BC2Block(0n, color0.toRgb565(), color1.toRgb565());
        const color2 = color0.interpolate(color1, false, 1);
        const color3 = color0.interpolate(color1, false, 2);
        for (let i = 0; i < 16; i++) {
            const color = block.pixels[i];
            const difference = [
                Math.abs(color0.red - color.red) * rWeight +
                    Math.abs(color0.green - color.green) * gWeight +
                    Math.abs(color0.blue - color.blue) * bWeight,
                Math.abs(color1.red - color.red) * rWeight +
                    Math.abs(color1.green - color.green) * gWeight +
                    Math.abs(color1.blue - color.blue) * bWeight,
                Math.abs(color2.red - color.red) * rWeight +
                    Math.abs(color2.green - color.green) * gWeight +
                    Math.abs(color2.blue - color.blue) * bWeight,
                Math.abs(color3.red - color.red) * rWeight +
                    Math.abs(color3.green - color.green) * gWeight +
                    Math.abs(color3.blue - color.blue) * bWeight,
            ];
            const min = Math.min(...difference);
            const idx = difference.indexOf(min);
            bc2Block.setAlpha(i, color.alpha);
            bc2Block.setIndex(i, idx);
        }
        return bc2Block;
    }
})(BC2Encoder = exports.BC2Encoder || (exports.BC2Encoder = {}));
