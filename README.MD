# Description

This is a simple implementation of the Block Compression algorithm in javascript. This implementation hasn't been fully tested yet and not all formats are supported.

# Decoding DDS Files

```ts
import { decode } from '@leoletto/dxt-encoder';

const decodedDDS = decode(ddsBuffer.buffer);
const [width, height] = decodedDDS.headers.shape;

// An array of RGBA data
const rgbaData = decodedDDS.images[0];

// Creates a new image with the decoded data, in this example I'll be using (Jimp)[https://www.npmjs.com/package/jimp]
const image = new Jimp(width, height);

// Copy rgba data into the image buffer
Buffer.from(rgbaData).copy(image.bitmap.data);

// Saves it as a PNG to the file system
image.write('my-image.png');
```


# Encoding DDS Files

```ts
import { encode } from '@leoletto/dxt-encoder';

// Some random image...
const image = new Jimp(width, height);

// Copy rgba data into the image buffer
const imgeBuffer = image.bitmap.data;

const encodedData = encode(imgeBuffer.buffer, {
    size: image.getWidth(), // Size must be a power of 2
    format: 'DXT1'
});

// Saves it as a PNG to the file system
image.write('my-image.dds', Buffer.from(encodedData.buffer));
```