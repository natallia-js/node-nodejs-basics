import fs from 'fs';
import path from 'path';

async function streamAsPromise(stream) {
    return new Promise((resolve, reject) => {
        stream.on('data', chunk => process.stdout.write(chunk + '\n'));
        stream.on('end', () => resolve());
        stream.on('error', error => reject(error));
    });
}

const read = async () => {
    await streamAsPromise(fs.createReadStream(path.join(import.meta.dirname, 'files/fileToRead.txt')));
};

await read();