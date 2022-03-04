import { DDSEncoder } from "./lib/common/encoder";
import { DecodedDDSData } from "./lib/dds-model";
import EncodeOptions from "./lib/encode-options";
/**
 * From the given ddsBuffer, parse the headers and return the decoded data
 */
export declare function decode(ddsBuffer: ArrayBufferLike): DecodedDDSData;
/**
 * From the given RGBA data, create a DDS compressed buffer
 */
export declare function encode(rgbaData: ArrayBufferLike, options: EncodeOptions): DDSEncoder.DDSData;
