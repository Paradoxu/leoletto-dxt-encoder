"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Color = void 0;
var Color;
(function (Color) {
    const rgb_565_red_mask = 0b11111000;
    const rgb_565_green_mask = 0b11111100;
    function lerp(v1, v2, r) {
        return v1 * (1 - r) + v2 * r;
    }
    class Pixel {
        constructor(r, g, b, a = 255) {
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        }
        get red() {
            return this.r;
        }
        get green() {
            return this.g;
        }
        get blue() {
            return this.b;
        }
        get alpha() {
            return this.a;
        }
        get value() {
            return (this.red << 16) | (this.green << 8) | this.blue;
        }
        static fromInt24(value) {
            const red = (value >> 16) & 0xFF;
            const green = (value >> 8) & 0xFF;
            const blue = value & 0xFF;
            return new Pixel(red, green, blue);
        }
        static fromInt32(value) {
            const red = (value >> 16) & 0xFF;
            const green = (value >> 8) & 0xFF;
            const blue = value & 0xFF;
            const alpha = (value >> 24) & 0xFF;
            return new Pixel(red, green, blue, alpha);
        }
        static fromRgb565(value) {
            const red = Math.round(((value >>> 11) & 31) * (255 / 31));
            const green = Math.round(((value >>> 5) & 63) * (255 / 63));
            const blue = Math.round((value & 31) * (255 / 31));
            return new Pixel(red, green, blue);
        }
        static transparent() {
            return new Pixel(0, 0, 0, 0);
        }
        static black() {
            return new Pixel(0, 0, 0, 255);
        }
        toRgb565() {
            const red = (this.red & rgb_565_red_mask) >> 3;
            const green = (this.green & rgb_565_green_mask) >> 2;
            const blue = this.blue >> 3;
            return new Pixel565(red, green, blue, this.alpha);
        }
        interpolate(pixel, isDxt1 = false, dividend = 1) {
            if (isDxt1) {
                return new Pixel(Math.round((this.red + pixel.red) / 2), Math.round((this.green + pixel.green) / 2), Math.round((this.blue + pixel.blue) / 2));
            }
            else {
                return new Pixel(Math.round(lerp(this.red, pixel.red, dividend / 3)), Math.round(lerp(this.green, pixel.green, dividend / 3)), Math.round(lerp(this.blue, pixel.blue, dividend / 3)), Math.round(lerp(this.alpha, pixel.alpha, dividend / 3)));
            }
        }
    }
    Color.Pixel = Pixel;
    class Pixel565 extends Pixel {
        get value() {
            return (this.red << 11) | (this.green << 5) | this.blue;
        }
        interpolate(pixel, isDxt1 = false) {
            const result = super.interpolate(pixel, isDxt1);
            return new Pixel565(result.red, result.green, result.blue);
        }
    }
    Color.Pixel565 = Pixel565;
})(Color = exports.Color || (exports.Color = {}));
