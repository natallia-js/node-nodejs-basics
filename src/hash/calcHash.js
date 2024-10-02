import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

function getSha256Hash(path) {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('sha256');
        const readStream = fs.createReadStream(path);
        readStream.on('error', reject);
        readStream.on('data', chunk => hash.update(chunk));
        readStream.on('end', () => resolve(hash.digest('hex')));
    });
}

const calculateHash = async () => {
    try {
        const hashValue = await getSha256Hash(path.join(import.meta.dirname, 'files/fileToCalculateHashFor.txt'));
        process.stdout.write(`${hashValue}\n`);
    } catch (error) {
        console.error('Error:', error);
    }
};

await calculateHash();