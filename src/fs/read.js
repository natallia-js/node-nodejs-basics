import fs from 'fs/promises';
import path from 'path';
import existsAsync from './existsAsync.js';
import { fsOperationFailedMessage } from './errorMessages.js';

const __dirname = import.meta.dirname;

const read = async () => {
    const fileName = path.join(__dirname, 'files/fileToRead.txt');
    if (!(await existsAsync(fileName))) {
        throw new Error(fsOperationFailedMessage);
    }
    try {
        const contents = await fs.readFile(fileName, { encoding: 'utf8' });
        console.log(contents);
    } catch (error) {
        throw new Error(`${fsOperationFailedMessage}: ${error}`);
    }
};

await read();