import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import existsAsync from './existsAsync.js';
import { fsOperationFailedMessage } from './errorMessages.js';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const list = async () => {
    const filesDirName = path.join(__dirname, 'files');
    if (!(await existsAsync(filesDirName))) {
        throw new Error(fsOperationFailedMessage);
    }
    try {
        (await fs.readdir(filesDirName)).forEach(fileName => console.log(fileName));
    } catch (error) {
        throw new Error(`${fsOperationFailedMessage}: ${error}`);
    }
};

await list();