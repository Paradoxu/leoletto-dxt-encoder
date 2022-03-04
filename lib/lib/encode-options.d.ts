import { DDSEncoder } from "./common/encoder";
export default interface EncodeOptions {
    /**
     * The format compression to be used
     */
    format: DDSEncoder.DxtType;
    /**
     * The size of the image to encode, will be translated as WIDTH x HEIGHT
     */
    size: number;
}
