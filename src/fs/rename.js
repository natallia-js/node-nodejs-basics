import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import existsAsync from './existsAsync.js';
import { fsOperationFailedMessage } from './errorMessages.js';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

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