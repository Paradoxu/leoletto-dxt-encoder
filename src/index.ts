import { BC1Encoder } from "./lib/common/bc1_encoder";
import { BC2Encoder } from "./lib/common/bc2_encoder";
import { DDSEncoder } from "./lib/common/encoder";
import { DdsFormat } from "./lib/dds-format";
import { DecodedDDSData } from "./lib/dds-model";
import EncodeOptions from "./lib/encode-options";
import { parseDDSHeaders } from "./lib/parse-headers";

/**
 * From the given ddsBuffer, parse the headers and return the decoded data
 */
export function decode(ddsBuffer: ArrayBufferLike): DecodedDDSData {
    const ddsData = parseDDSHeaders(ddsBuffer);
    const format: any = DdsFormat[ddsData.format];
    const imageBuffers: Uint8Array[] = [];

    for(const image of ddsData.images){
        const [width, height] = image.shape;
        const imageDataView = new DataView(ddsBuffer, image.offset, image.length);

        switch(format){
            case DdsFormat.dxt1:
                imageBuffers.push(BC1Encoder.decode(imageDataView, width, height));
                break;
            case DdsFormat.dxt2:
            case DdsFormat.dxt3:
                imageBuffers.push(BC2Encoder.decode(imageDataView, width, height, format.toUpperCase()));
                break;
            case DdsFormat.dxt4:
            case DdsFormat.dxt5:
            default: 
                throw new Error('Unknown DXT format : \'' + format + '\'');
        }
    }

    return {
        headers: ddsData,
        images: imageBuffers
    };
}

/**
 * From the given RGBA data, create a DDS compressed buffer
 */
export function encode(rgbaData: ArrayBufferLike, options: EncodeOptions): DDSEncoder.DDSData {
    const view = new DataView(rgbaData);
    let data: DDSEncoder.DDSData;
    switch(options.format){
        case 'DXT1':
            data = BC1Encoder.encode(view, options.size, options.size);
            break;
        case 'DXT2':
        case 'DXT3':
            data = BC2Encoder.encode(view, options.size, options.size, options.format);
            break;
        default: 
            throw new Error('Unknown DXT format : \'' + options.format + '\'');
    }

    return data;
}