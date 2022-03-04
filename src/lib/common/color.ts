export namespace Color {
    const rgb_565_red_mask = 0b11111000;
    const rgb_565_green_mask = 0b11111100;

    function lerp(v1: number, v2: number, r: number) {
        return v1 * (1 - r) + v2 * r;
    }

    export class Pixel {
        constructor(
            protected r: number,
            protected g: number,
            protected b: number,
            protected a = 255
        ) { }

        public get red(): number {
            return this.r;
        }

        public get green(): number {
            return this.g;
        }

        public get blue(): number {
            return this.b;
        }

        public get alpha(): number {
            return this.a;
        }

        public get value(): number {
            return (this.red << 16) | (this.green << 8) | this.blue;
        }

        public static fromInt24(value: number): Pixel {
            const red = (value >> 16) & 0xFF;
            const green = (value >> 8) & 0xFF;
            const blue = value & 0xFF;
            return new Pixel(red, green, blue);
        }

        public static fromInt32(value: number): Pixel {
            const red = (value >> 16) & 0xFF;
            const green = (value >> 8) & 0xFF;
            const blue = value & 0xFF;
            const alpha = (value >> 24) & 0xFF;
            return new Pixel(red, green, blue, alpha);
        }

        public static fromRgb565(value: number): Pixel {
            const red = Math.round(((value >>> 11) & 31) * (255 / 31));
            const green = Math.round(((value >>> 5) & 63) * (255 / 63));
            const blue = Math.round((value & 31) * (255 / 31));

            return new Pixel(red, green, blue);
        }

        public static transparent(): Pixel {
            return new Pixel(0, 0, 0, 0);
        }

        public static black(): Pixel {
            return new Pixel(0, 0, 0, 255);
        }

        public toRgb565(): Pixel565 {
            const red = (this.red & rgb_565_red_mask) >> 3;
            const green = (this.green & rgb_565_green_mask) >> 2;
            const blue = this.blue >> 3;

            return new Pixel565(red, green, blue, this.alpha);
        }

        public interpolate(pixel: Pixel, isDxt1 = false, dividend: 1 | 2 = 1): Pixel {
            if(isDxt1) {
                return new Pixel(
                    Math.round((this.red + pixel.red) / 2),
                    Math.round((this.green + pixel.green) / 2),
                    Math.round((this.blue + pixel.blue) / 2),
                );
            } else {
                return new Pixel(
                    Math.round(lerp(this.red, pixel.red, dividend / 3)),
                    Math.round(lerp(this.green, pixel.green, dividend / 3)),
                    Math.round(lerp(this.blue, pixel.blue, dividend / 3)),
                    Math.round(lerp(this.alpha, pixel.alpha, dividend / 3)),
                );
            }
        }
    }

    export class Pixel565 extends Pixel {
        get value(): number {
            return (this.red << 11) | (this.green << 5) | this.blue;
        }

        public interpolate(pixel: Pixel565, isDxt1 = false): Pixel565 {
            const result = super.interpolate(pixel, isDxt1);

            return new Pixel565(result.red, result.green, result.blue);
        }
    }
}