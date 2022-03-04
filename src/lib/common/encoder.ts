export namespace DDSEncoder {
    export type DxtType = 'DXT1' | 'DXT2' | 'DXT3' | 'DXT4' | 'DXT5' | 'DX10';
    
    export enum DDSDwFlag {
        DDSD_CAPS = 0x1,
        DDSD_HEIGHT = 0x2,
        DDSD_WIDTH = 0x4,
        DDSD_PITCH = 0x8,
        DDSD_PIXELFORMAT = 0x1000,
        DDSD_MIPMAPCOUNT = 0x20000,
        DDSD_LINEARSIZE = 0x80000,
        DDSD_DEPTH = 0x800000
    }

    export enum DXGIFormat {
        DXGI_FORMAT_UNKNOWN = 0,
        DXGI_FORMAT_R32G32B32A32_TYPELESS = 1,
        DXGI_FORMAT_R32G32B32A32_FLOAT = 2,
        DXGI_FORMAT_R32G32B32A32_UINT = 3,
        DXGI_FORMAT_R32G32B32A32_SINT = 4,
        DXGI_FORMAT_R32G32B32_TYPELESS = 5,
        DXGI_FORMAT_R32G32B32_FLOAT = 6,
        DXGI_FORMAT_R32G32B32_UINT = 7,
        DXGI_FORMAT_R32G32B32_SINT = 8,
        DXGI_FORMAT_R16G16B16A16_TYPELESS = 9,
        DXGI_FORMAT_R16G16B16A16_FLOAT = 10,
        DXGI_FORMAT_R16G16B16A16_UNORM = 11,
        DXGI_FORMAT_R16G16B16A16_UINT = 12,
        DXGI_FORMAT_R16G16B16A16_SNORM = 13,
        DXGI_FORMAT_R16G16B16A16_SINT = 14,
        DXGI_FORMAT_R32G32_TYPELESS = 15,
        DXGI_FORMAT_R32G32_FLOAT = 16,
        DXGI_FORMAT_R32G32_UINT = 17,
        DXGI_FORMAT_R32G32_SINT = 18,
        DXGI_FORMAT_R32G8X24_TYPELESS = 19,
        DXGI_FORMAT_D32_FLOAT_S8X24_UINT = 20,
        DXGI_FORMAT_R32_FLOAT_X8X24_TYPELESS = 21,
        DXGI_FORMAT_X32_TYPELESS_G8X24_UINT = 22,
        DXGI_FORMAT_R10G10B10A2_TYPELESS = 23,
        DXGI_FORMAT_R10G10B10A2_UNORM = 24,
        DXGI_FORMAT_R10G10B10A2_UINT = 25,
        DXGI_FORMAT_R11G11B10_FLOAT = 26,
        DXGI_FORMAT_R8G8B8A8_TYPELESS = 27,
        DXGI_FORMAT_R8G8B8A8_UNORM = 28,
        DXGI_FORMAT_R8G8B8A8_UNORM_SRGB = 29,
        DXGI_FORMAT_R8G8B8A8_UINT = 30,
        DXGI_FORMAT_R8G8B8A8_SNORM = 31,
        DXGI_FORMAT_R8G8B8A8_SINT = 32,
        DXGI_FORMAT_R16G16_TYPELESS = 33,
        DXGI_FORMAT_R16G16_FLOAT = 34,
        DXGI_FORMAT_R16G16_UNORM = 35,
        DXGI_FORMAT_R16G16_UINT = 36,
        DXGI_FORMAT_R16G16_SNORM = 37,
        DXGI_FORMAT_R16G16_SINT = 38,
        DXGI_FORMAT_R32_TYPELESS = 39,
        DXGI_FORMAT_D32_FLOAT = 40,
        DXGI_FORMAT_R32_FLOAT = 41,
        DXGI_FORMAT_R32_UINT = 42,
        DXGI_FORMAT_R32_SINT = 43,
        DXGI_FORMAT_R24G8_TYPELESS = 44,
        DXGI_FORMAT_D24_UNORM_S8_UINT = 45,
        DXGI_FORMAT_R24_UNORM_X8_TYPELESS = 46,
        DXGI_FORMAT_X24_TYPELESS_G8_UINT = 47,
        DXGI_FORMAT_R8G8_TYPELESS = 48,
        DXGI_FORMAT_R8G8_UNORM = 49,
        DXGI_FORMAT_R8G8_UINT = 50,
        DXGI_FORMAT_R8G8_SNORM = 51,
        DXGI_FORMAT_R8G8_SINT = 52,
        DXGI_FORMAT_R16_TYPELESS = 53,
        DXGI_FORMAT_R16_FLOAT = 54,
        DXGI_FORMAT_D16_UNORM = 55,
        DXGI_FORMAT_R16_UNORM = 56,
        DXGI_FORMAT_R16_UINT = 57,
        DXGI_FORMAT_R16_SNORM = 58,
        DXGI_FORMAT_R16_SINT = 59,
        DXGI_FORMAT_R8_TYPELESS = 60,
        DXGI_FORMAT_R8_UNORM = 61,
        DXGI_FORMAT_R8_UINT = 62,
        DXGI_FORMAT_R8_SNORM = 63,
        DXGI_FORMAT_R8_SINT = 64,
        DXGI_FORMAT_A8_UNORM = 65,
        DXGI_FORMAT_R1_UNORM = 66,
        DXGI_FORMAT_R9G9B9E5_SHAREDEXP = 67,
        DXGI_FORMAT_R8G8_B8G8_UNORM = 68,
        DXGI_FORMAT_G8R8_G8B8_UNORM = 69,
        DXGI_FORMAT_BC1_TYPELESS = 70,
        DXGI_FORMAT_BC1_UNORM = 71,
        DXGI_FORMAT_BC1_UNORM_SRGB = 72,
        DXGI_FORMAT_BC2_TYPELESS = 73,
        DXGI_FORMAT_BC2_UNORM = 74,
        DXGI_FORMAT_BC2_UNORM_SRGB = 75,
        DXGI_FORMAT_BC3_TYPELESS = 76,
        DXGI_FORMAT_BC3_UNORM = 77,
        DXGI_FORMAT_BC3_UNORM_SRGB = 78,
        DXGI_FORMAT_BC4_TYPELESS = 79,
        DXGI_FORMAT_BC4_UNORM = 80,
        DXGI_FORMAT_BC4_SNORM = 81,
        DXGI_FORMAT_BC5_TYPELESS = 82,
        DXGI_FORMAT_BC5_UNORM = 83,
        DXGI_FORMAT_BC5_SNORM = 84,
        DXGI_FORMAT_B5G6R5_UNORM = 85,
        DXGI_FORMAT_B5G5R5A1_UNORM = 86,
        DXGI_FORMAT_B8G8R8A8_UNORM = 87,
        DXGI_FORMAT_B8G8R8X8_UNORM = 88,
        DXGI_FORMAT_R10G10B10_XR_BIAS_A2_UNORM = 89,
        DXGI_FORMAT_B8G8R8A8_TYPELESS = 90,
        DXGI_FORMAT_B8G8R8A8_UNORM_SRGB = 91,
        DXGI_FORMAT_B8G8R8X8_TYPELESS = 92,
        DXGI_FORMAT_B8G8R8X8_UNORM_SRGB = 93,
        DXGI_FORMAT_BC6H_TYPELESS = 94,
        DXGI_FORMAT_BC6H_UF16 = 95,
        DXGI_FORMAT_BC6H_SF16 = 96,
        DXGI_FORMAT_BC7_TYPELESS = 97,
        DXGI_FORMAT_BC7_UNORM = 98,
        DXGI_FORMAT_BC7_UNORM_SRGB = 99,
        DXGI_FORMAT_AYUV = 100,
        DXGI_FORMAT_Y410 = 101,
        DXGI_FORMAT_Y416 = 102,
        DXGI_FORMAT_NV12 = 103,
        DXGI_FORMAT_P010 = 104,
        DXGI_FORMAT_P016 = 105,
        DXGI_FORMAT_420_OPAQUE = 106,
        DXGI_FORMAT_YUY2 = 107,
        DXGI_FORMAT_Y210 = 108,
        DXGI_FORMAT_Y216 = 109,
        DXGI_FORMAT_NV11 = 110,
        DXGI_FORMAT_AI44 = 111,
        DXGI_FORMAT_IA44 = 112,
        DXGI_FORMAT_P8 = 113,
        DXGI_FORMAT_A8P8 = 114,
        DXGI_FORMAT_B4G4R4A4_UNORM = 115,
        DXGI_FORMAT_P208 = 130,
        DXGI_FORMAT_V208 = 131,
        DXGI_FORMAT_V408 = 132,
        DXGI_FORMAT_SAMPLER_FEEDBACK_MIN_MIP_OPAQUE = 133,
        DXGI_FORMAT_SAMPLER_FEEDBACK_MIP_REGION_USED_OPAQUE = 134,
        DXGI_FORMAT_FORCE_UINT = 0xffffffff
    }

    export enum D3D10ResourceDimension {
        D3D10_RESOURCE_DIMENSION_UNKNOWN = 0,
        D3D10_RESOURCE_DIMENSION_BUFFER = 1,
        D3D10_RESOURCE_DIMENSION_TEXTURE1D = 2,
        D3D10_RESOURCE_DIMENSION_TEXTURE2D = 3,
        D3D10_RESOURCE_DIMENSION_TEXTURE3D = 4
    }

    export enum PixelFlags {
        DDPF_ALPHAPIXELS = 0x1,
        DDPF_ALPHA = 0x2,
        DDPF_FOURCC = 0x4,
        DDPF_RGB = 0x40,
        DDPF_YUV = 0x200,
        DDPF_LUMINANCE = 0x20000
    }

    export enum DDSCapsFlags {
        /**
         * Optional; must be used on any file that contains more than one surface 
         * (a mipmap, a cubic environment map, or mipmapped volume texture).
         */
        DDSCAPS_COMPLEX = 0x8,

        /**
         * Optional; should be used for a mipmap.
         */
        DDSCAPS_MIPMAP = 0x400000,

        /**
         * Required
         */
        DDSCAPS_TEXTURE = 0x1000
    }

    export enum DDSCaps2Flags {
        // Required for a cube map.
        DDSCAPS2_CUBEMAP = 0x200,

        // Required when these surfaces are stored in a cube map.
        DDSCAPS2_CUBEMAP_POSITIVEX = 0x400,

        // Required when these surfaces are stored in a cube map.
        DDSCAPS2_CUBEMAP_NEGATIVEX = 0x800,

        // Required when these surfaces are stored in a cube map.
        DDSCAPS2_CUBEMAP_POSITIVEY = 0x1000,

        // Required when these surfaces are stored in a cube map.
        DDSCAPS2_CUBEMAP_NEGATIVEY = 0x2000,

        // Required when these surfaces are stored in a cube map.
        DDSCAPS2_CUBEMAP_POSITIVEZ = 0x4000,

        // Required when these surfaces are stored in a cube map.
        DDSCAPS2_CUBEMAP_NEGATIVEZ = 0x8000,

        // Required for a volume texture.
        DDSCAPS2_VOLUME = 0x200000
    }

    export class PixelFormat {
        readonly dwSize = 32;
        dwFlags: PixelFlags;
        dwFourCC: DxtType;
        dwRGBBitCount: number;
        dwRBitMask: number;
        dwGBitMask: number;
        dwBBitMask: number;
        dwABitMask: number;
    }

    export class DDSHeader {
        readonly dwSize = 124;
        dwFlags: number;
        dwHeight: number;
        dwWidth: number;
        dwPitchOrLinearSize: number;
        dwDepth = 0;
        dwMipMapCount = 0;

        /** @deprecated */
        dwReserved1 = new Array<number>(11).fill(0);

        ddspf: PixelFormat;
        dwCaps = DDSCapsFlags.DDSCAPS_TEXTURE; // Required flag
        dwCaps2: DDSCaps2Flags = 0;

        /** @deprecated */
        dwCaps3 = 0;

        /** @deprecated */
        dwCaps4 = 0;

        /** @deprecated */
        dwReserved2 = 0;
    }

    export class DXTHeader {
        dxgiFormat: DXGIFormat;
        resourceDimension: D3D10ResourceDimension;
        miscFlag: number;
        arraySize: number;
        miscFlags2: number;
    }

    export class DDSData {
        readonly magic: number = 0x20534444;

        header: DDSHeader;

        /**
         * This header exists only if 
         * header.ddspf.dwFlags === DdsPixelFormat.DDPF_FOURCC and
         * header.ddspf.dwFourCC === 'DX10'
         */
        dx10Header?: DXTHeader;

        data: Uint8Array;

        /**
         * Set the current instance data into the a buffer and returns it
         */
        public get buffer(): ArrayBuffer {
            const array = new Uint8Array(this.data.length + this.header.dwSize + 4).fill(0);
            array.set(this.data, 128);

            const view = new DataView(array.buffer);

            view.setUint32(0, this.magic, true);
            view.setUint32(4, this.header.dwSize, true);
            view.setUint32(8, this.header.dwFlags, true);
            view.setUint32(12, this.header.dwHeight, true);
            view.setUint32(16, this.header.dwWidth, true);
            view.setUint32(20, this.header.dwPitchOrLinearSize, true);
            view.setUint32(24, this.header.dwDepth, true);
            view.setUint32(28, this.header.dwMipMapCount, true);
            view.setUint32(76, this.header.ddspf.dwSize, true);
            view.setUint32(80, this.header.ddspf.dwFlags, true);

            for (let i = 0; i < this.header.ddspf.dwFourCC.length; i++) {
                view.setUint8(84 + i, this.header.ddspf.dwFourCC.charCodeAt(i));
            }

            view.setUint32(88, this.header.ddspf.dwRGBBitCount, true);
            view.setUint32(92, this.header.ddspf.dwRBitMask, true);
            view.setUint32(96, this.header.ddspf.dwGBitMask, true);
            view.setUint32(100, this.header.ddspf.dwBBitMask, true);
            view.setUint32(104, this.header.ddspf.dwABitMask, true);
            view.setUint32(108, this.header.dwCaps, true);
            view.setUint32(112, this.header.dwCaps2, true);

            return view.buffer;
        }

        /**
         * Creates a DDS Data file with the given data
         * @param data - Data is the encoded DXT data
         * @param width - The width of the image
         * @param height - The height of the image
         * @param dxt - The DXT format
         */
        public static fromData(data: Uint8Array, width: number, height: number, dxt: DxtType = 'DXT1'): DDSData {
            const ddsData = new DDSData();
            ddsData.header = new DDSHeader();
            ddsData.header.dwWidth = width;
            ddsData.header.dwHeight = height;

            ddsData.header.dwFlags = DDSDwFlag.DDSD_CAPS | DDSDwFlag.DDSD_HEIGHT | DDSDwFlag.DDSD_WIDTH | DDSDwFlag.DDSD_PIXELFORMAT;

            ddsData.header.ddspf = new PixelFormat();
            ddsData.header.ddspf.dwFlags = PixelFlags.DDPF_FOURCC;
            ddsData.header.ddspf.dwFourCC = dxt;

            ddsData.data = data;

            return ddsData;
        }
    }
}