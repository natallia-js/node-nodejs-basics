import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import existsAsync from './existsAsync.js';
import { fsOperationFailedMessage } from './errorMessages.js';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const copy = async () => {
    const filesDirName = path.join(__dirname, 'files');
    const filesCopyDirName = path.join(__dirname, 'files_copy');
    if (!(await existsAsync(filesDirName)) || await existsAsync(filesCopyDirName)) {
        throw new Error(fsOperationFailedMessage);
    }
    try {
        await fs.cp(filesDirName, filesCopyDirName, { recursive: true });
    } catch (error) {
        throw new Error(`${fsOperationFailedMessage}: ${error}`);
    }
};

await copy();
