import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import existsAsync from './existsAsync.js';
import { fsOperationFailedMessage } from './errorMessages.js';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the current file
const __dirname = path.dirname(__filename); // get the name of the directory

const create = async () => {
    const fileName = path.join(__dirname, 'files/fresh.txt');
    if (await existsAsync(fileName)) {
        throw new Error(fsOperationFailedMessage);
    }
    try {
        await fs.appendFile(fileName, 'I am fresh and young');
    } catch (error) {
        throw new Error(`${fsOperationFailedMessage}: ${error}`);
    }
};

await create();