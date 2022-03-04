"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
const color_1 = require("./color");
var Image;
(function (Image) {
    class RawBlock {
        constructor(fillColor) {
            this.pixels = new Array(16);
            this.pixels.fill(fillColor);
        }
        get hasTransparentPixels() {
            return this.pixels.some(c => c.alpha < 255);
        }
        setColor(index, color) {
            this.pixels[index] = color;
        }
        getMinMaxColorsBC1() {
            const colorInsetShift = 4;
            let minR = 255, minG = 255, minB = 255, minA = 255;
            let maxR = 0, maxG = 0, maxB = 0, maxA = 0;
            for (const pixel of this.pixels) {
                if (pixel.red < minR)
                    minR = pixel.red;
                if (pixel.green < minG)
                    minG = pixel.green;
                if (pixel.blue < minB)
                    minB = pixel.blue;
                if (pixel.alpha < minA)
                    minA = pixel.alpha;
                if (pixel.red > maxR)
                    maxR = pixel.red;
                if (pixel.green > maxG)
                    maxG = pixel.green;
                if (pixel.blue > maxB)
                    maxB = pixel.blue;
                if (pixel.alpha > maxA)
                    maxA = pixel.alpha;
            }
            const insetR = (maxR - minR) >> colorInsetShift;
            const insetG = (maxG - minG) >> colorInsetShift;
            const insetB = (maxB - minB) >> colorInsetShift;
            const insetA = (maxA - minA) >> colorInsetShift;
            // Inset by 1/16th
            minR = ((minR << colorInsetShift) + insetR) >> colorInsetShift;
            minG = ((minG << colorInsetShift) + insetG) >> colorInsetShift;
            minB = ((minB << colorInsetShift) + insetB) >> colorInsetShift;
            minA = ((minA << colorInsetShift) + insetA) >> colorInsetShift;
            maxR = ((maxR << colorInsetShift) - insetR) >> colorInsetShift;
            maxG = ((maxG << colorInsetShift) - insetG) >> colorInsetShift;
            maxB = ((maxB << colorInsetShift) - insetB) >> colorInsetShift;
            maxA = ((maxA << colorInsetShift) - insetA) >> colorInsetShift;
            minR = minR >= 0 ? minR : 0;
            minG = minG >= 0 ? minG : 0;
            minB = minB >= 0 ? minB : 0;
            minA = minA >= 0 ? minA : 0;
            maxR = maxR <= 255 ? maxR : 255;
            maxG = maxG <= 255 ? maxG : 255;
            maxB = maxB <= 255 ? maxB : 255;
            maxA = maxA <= 255 ? maxA : 255;
            return [
                new color_1.Color.Pixel(minR, minG, minB, minA),
                new color_1.Color.Pixel(maxR, maxG, maxB, maxA),
            ];
        }
    }
    Image.RawBlock = RawBlock;
    function imageTo4x4(image, width, height) {
        const blockWidth = ((width + 3) & ~3) >> 2;
        const blockHeight = ((height + 3) & ~3) >> 2;
        const blocks = new Array(blockWidth * blockHeight);
        let blockOffset = 0;
        for (let h = 0; h < blockHeight; h++) {
            for (let w = 0; w < blockWidth; w++) {
                const block = new RawBlock(new color_1.Color.Pixel(0, 0, 0, 0));
                for (let y = 0; y < 4; y++) {
                    for (let x = 0; x < 4; x++) {
                        const pixelIndex = (3 - x) + (y * 4);
                        const rgbaIndex = (h * 4 + 3 - y) * (width * 4) + (w * 4 + x) * 4;
                        const red = image.getUint8(rgbaIndex);
                        const green = image.getUint8(rgbaIndex + 1);
                        const blue = image.getUint8(rgbaIndex + 2);
                        const alpha = image.getUint8(rgbaIndex + 3);
                        block.setColor(pixelIndex, new color_1.Color.Pixel(red, green, blue, alpha));
                    }
                }
                blocks[blockOffset++] = block;
            }
        }
        return { blockWidth, blockHeight, blocks };
    }
    Image.imageTo4x4 = imageTo4x4;
})(Image = exports.Image || (exports.Image = {}));
