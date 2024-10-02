import fs from 'fs/promises';
import path from 'path';
import existsAsync from './existsAsync.js';
import { fsOperationFailedMessage } from './errorMessages.js';

const __dirname = import.meta.dirname;

const remove = async () => {
    const fileName = path.join(__dirname, 'files/fileToRemove.txt');
    if (!await existsAsync(fileName)) {
        throw new Error(fsOperationFailedMessage);
    }
    try {
        await fs.unlink(fileName);
    } catch (error) {
        throw new Error(`${fsOperationFailedMessage}: ${error}`);
    }
};

await remove();