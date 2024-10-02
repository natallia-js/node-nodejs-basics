import fs from 'fs/promises';
import path from 'path';
import existsAsync from './existsAsync.js';
import { fsOperationFailedMessage } from './errorMessages.js';

const __dirname = import.meta.dirname;

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