"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = exports.decode = void 0;
const bc1_encoder_1 = require("./lib/common/bc1_encoder");
const bc2_encoder_1 = require("./lib/common/bc2_encoder");
const dds_format_1 = require("./lib/dds-format");
const parse_headers_1 = require("./lib/parse-headers");
/**
 * From the given ddsBuffer, parse the headers and return the decoded data
 */
function decode(ddsBuffer) {
    const ddsData = (0, parse_headers_1.parseDDSHeaders)(ddsBuffer);
    const format = dds_format_1.DdsFormat[ddsData.format];
    const imageBuffers = [];
    for (const image of ddsData.images) {
        const [width, height] = image.shape;
        const imageDataView = new DataView(ddsBuffer, image.offset, image.length);
        switch (format) {
            case dds_format_1.DdsFormat.dxt1:
                imageBuffers.push(bc1_encoder_1.BC1Encoder.decode(imageDataView, width, height));
                break;
            case dds_format_1.DdsFormat.dxt2:
            case dds_format_1.DdsFormat.dxt3:
                imageBuffers.push(bc2_encoder_1.BC2Encoder.decode(imageDataView, width, height, format.toUpperCase()));
                break;
            case dds_format_1.DdsFormat.dxt4:
            case dds_format_1.DdsFormat.dxt5:
            default:
                throw new Error('Unknown DXT format : \'' + format + '\'');
        }
    }
    return {
        headers: ddsData,
        images: imageBuffers
    };
}
exports.decode = decode;
/**
 * From the given RGBA data, create a DDS compressed buffer
 */
function encode(rgbaData, options) {
    const view = new DataView(rgbaData);
    let data;
    switch (options.format) {
        case 'DXT1':
            data = bc1_encoder_1.BC1Encoder.encode(view, options.size, options.size);
            break;
        case 'DXT2':
        case 'DXT3':
            data = bc2_encoder_1.BC2Encoder.encode(view, options.size, options.size, options.format);
            break;
        default:
            throw new Error('Unknown DXT format : \'' + options.format + '\'');
    }
    return data;
}
exports.encode = encode;
