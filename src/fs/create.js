import fs from 'fs/promises';
import path from 'path';
import existsAsync from './existsAsync.js';
import { fsOperationFailedMessage } from './errorMessages.js';

const __dirname = import.meta.dirname;

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