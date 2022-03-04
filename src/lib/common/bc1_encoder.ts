import { Color } from "./color";
import { DDSEncoder } from "./encoder";
import { Image } from "./image";

export namespace BC1Encoder {
    const rWeight = 0.3;
    const gWeight = 0.59;
    const bWeight = 0.11;

    /**
     * Represents an encoded BC1 Block
     */
    export class BC1Block {
        protected indices: number;

        constructor(protected color0: Color.Pixel565, protected color1: Color.Pixel565) {
        }

        public get data(): [Color.Pixel565, Color.Pixel565, number] {
            return [this.color0, this.color1, this.indices];
        }


        setIndex(index: number, value: number) {
            this.indices = (this.indices | (value & 0x3) << (30 - index * 2)) >>> 0;
        }

        get value(): number {
            const c0 = this.color0.value << 16;
            const c1 = this.color1.value << 16;

            const colors = c0 | c1;
            return (colors << 32) | this.indices;
        }
    }

    /**
     * Encode the RGBA data to a DDS DXT1 file format
     * @param imageData - A DataView pointing directly to the data of the DXT image
     * @param width - Width of the image
     * @param height - Height of the image
     * @returns - The DDS File data with headers and the compressed bytes
     */
    export function encode(imageData: DataView, width: number, height: number): DDSEncoder.DDSData {
        const { blockWidth, blockHeight, blocks } = Image.imageTo4x4(imageData, width, height);
        const output = new Uint8Array(blockWidth * blockHeight * 4 * 2);
        const outputView = new DataView(output.buffer);

        for (let i = 0; i < blocks.length; i++) {
            const block = blocks[i];
            const bc = encodeBlock(block);
            const [color0, color1, indices] = bc.data;

            let offset = i * 8;
            outputView.setUint16(offset, color0.value, true);
            outputView.setUint16(offset + 2, color1.value, true);
            outputView.setUint32(offset + 4, indices, true);
        }

        return DDSEncoder.DDSData.fromData(output, width, height, 'DXT1');
    }

    export function decode(imageData: DataView, width: number, height: number) {
        let rgba = new Uint8Array(width * height * 4),
            height_4 = (height / 4) | 0,
            width_4 = (width / 4) | 0,
            offset = 0;

        for (let h = 0; h < height_4; h++) {
            for (let w = 0; w < width_4; w++) {
                if (offset >= imageData.byteLength) break;

                // Grab color0 and color1  32 bits
                const color0 = Color.Pixel.fromRgb565(imageData.getUint16(offset, true));
                const color1 = Color.Pixel.fromRgb565(imageData.getUint16(offset + 2, true));
                let color2: Color.Pixel, color3: Color.Pixel;

                if (color0.value <= color1.value) {
                    color2 = color0.interpolate(color1, true);
                    color3 = new Color.Pixel(0, 0, 0);
                } else {
                    color2 = color0.interpolate(color1, false, 1);
                    color3 = color0.interpolate(color1, false, 2);
                }

                const colorValues = [color0, color1, color2, color3];

                // Grab color indices 32 bits
                const colorIndices = imageData.getUint32(offset + 4, true);

                for (let y = 0; y < 4; y++) {
                    for (let x = 0; x < 4; x++) {
                        const pixelIndex = (3 - x) + (y * 4);
                        const rgbaIndex = (h * 4 + 3 - y) * (width * 4) + (w * 4 + x) * 4;
                        const colorIndex = (colorIndices >> (2 * (15 - pixelIndex))) & 0x03;

                        rgba[rgbaIndex] = colorValues[colorIndex].red;
                        rgba[rgbaIndex + 1] = colorValues[colorIndex].green;
                        rgba[rgbaIndex + 2] = colorValues[colorIndex].blue;
                        rgba[rgbaIndex + 3] = colorValues[colorIndex].alpha;
                    }
                }
                offset += 8;
            }

            if (offset >= imageData.byteLength) break;
        }

        return rgba;
    }

    /**
     * Encode the given BC1 block
     */
    function encodeBlock(block: Image.RawBlock): BC1Encoder.BC1Block {
        const [min, max] = block.getMinMaxColorsBC1();

        const color0Pixel = new Color.Pixel(max.red, max.green, max.blue);
        const color1Pixel = new Color.Pixel(min.red, min.green, min.blue);

        const color0 = color0Pixel.toRgb565();
        const color1 = color1Pixel.toRgb565();

        const bc1Block = new BC1Encoder.BC1Block(color0, color1);

        let color2: Color.Pixel, color3: Color.Pixel;

        if (color0.value <= color1.value) {
            color2 = color0Pixel.interpolate(color1Pixel, true);
            color3 = new Color.Pixel(0, 0, 0);
        } else {
            color2 = color0Pixel.interpolate(color1Pixel, false, 1);
            color3 = color0Pixel.interpolate(color1Pixel, false, 2);
        }

        for (let i = 0; i < 16; i++) {
            const color = block.pixels[i];

            const difference = [
                Math.abs(color0Pixel.red - color.red) * rWeight +
                Math.abs(color0Pixel.green - color.green) * gWeight +
                Math.abs(color0Pixel.blue - color.blue) * bWeight,

                Math.abs(color1Pixel.red - color.red) * rWeight +
                Math.abs(color1Pixel.green - color.green) * gWeight +
                Math.abs(color1Pixel.blue - color.blue) * bWeight,

                Math.abs(color2.red - color.red) * rWeight +
                Math.abs(color2.green - color.green) * gWeight +
                Math.abs(color2.blue - color.blue) * bWeight,

                Math.abs(color3.red - color.red) * rWeight +
                Math.abs(color3.green - color.green) * gWeight +
                Math.abs(color3.blue - color.blue) * bWeight,
            ];

            const min = Math.min(...difference);
            const idx = difference.indexOf(min);
            bc1Block.setIndex(i, idx);
        }

        return bc1Block;
    }
}