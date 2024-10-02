import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const compress = async () => {
    const gzip = zlib.createGzip();
    const input = fs.createReadStream(path.join(import.meta.dirname, 'files/fileToCompress.txt'));
    const output = fs.createWriteStream(path.join(import.meta.dirname, 'files/archive.gz'));
    input.pipe(gzip).pipe(output);
};

await compress();