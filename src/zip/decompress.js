import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const decompress = async () => {
    const unzip = zlib.createUnzip();
    const input = fs.createReadStream(path.join(import.meta.dirname, 'files/archive.gz'));  
    const output = fs.createWriteStream(path.join(import.meta.dirname, 'files/fileToCompress2.txt'));  
    input.pipe(unzip).pipe(output);
};

await decompress();