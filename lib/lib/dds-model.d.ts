export interface ParsedDDSImage {
    offset: number;
    length: number;
    shape: number[];
}
export interface ParsedDDSHeaders {
    shape: number[];
    images: ParsedDDSImage[];
    format: 'dxt1' | 'dxt3' | 'dxt5';
    flags: number;
    cubemap: boolean;
}
export interface DecodedDDSData {
    headers: ParsedDDSHeaders;
    /**
     * The decoded images, in RGBA format
     */
    images: Uint8Array[];
}
