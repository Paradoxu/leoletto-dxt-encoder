export declare namespace Color {
    class Pixel {
        protected r: number;
        protected g: number;
        protected b: number;
        protected a: number;
        constructor(r: number, g: number, b: number, a?: number);
        get red(): number;
        get green(): number;
        get blue(): number;
        get alpha(): number;
        get value(): number;
        static fromInt24(value: number): Pixel;
        static fromInt32(value: number): Pixel;
        static fromRgb565(value: number): Pixel;
        static transparent(): Pixel;
        static black(): Pixel;
        toRgb565(): Pixel565;
        interpolate(pixel: Pixel, isDxt1?: boolean, dividend?: 1 | 2): Pixel;
    }
    class Pixel565 extends Pixel {
        get value(): number;
        interpolate(pixel: Pixel565, isDxt1?: boolean): Pixel565;
    }
}
