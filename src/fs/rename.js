import fs from 'fs/promises';
import path from 'path';
import existsAsync from './existsAsync.js';
import { fsOperationFailedMessage } from './errorMessages.js';

const __dirname = import.meta.dirname;

const rename = async () => {
    const fileName = path.join(__dirname, 'files/wrongFilename.txt');
    const newFileName = path.join(__dirname, 'files/properFilename.md');
    if (!(await existsAsync(fileName)) || await existsAsync(newFileName)) {
        throw new Error(fsOperationFailedMessage);
    }
    try {
        await fs.rename(fileName, newFileName);
    } catch (error) {
        throw new Error(`${fsOperationFailedMessage}: ${error}`);
    }
};

await rename();