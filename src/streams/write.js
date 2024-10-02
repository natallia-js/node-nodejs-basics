import fs from 'fs';
import path from 'path';

const write = async () => {
    const writeStream = fs.createWriteStream(path.join(import.meta.dirname, 'files/fileToWrite.txt'));
    process.stdin.pipe(writeStream);
};

await write();