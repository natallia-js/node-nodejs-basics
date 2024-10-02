import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import existsAsync from './existsAsync.js';
import { fsOperationFailedMessage } from './errorMessages.js';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

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