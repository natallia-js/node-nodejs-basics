import fs from 'fs/promises';

async function existsAsync(path) {
    try {
        await fs.access(path, fs.constants.F_OK);
        return true;
    } catch {
        return false;
    }
}

export default existsAsync;
