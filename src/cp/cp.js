import path from 'path';
import child_process from 'child_process';

const spawnChildProcess = async (args) => {
    const childProcess = child_process.fork(
        path.join(import.meta.dirname, 'files/script.js'),
        args,
        { stdio: [process.stdin, process.stdout, process.stderr, 'ipc'] });
    childProcess.on('error', (err) => {
        console.log(`Failed to start child process: ${err}`);
        process.exit(1);
    });
    childProcess.on('close', (code) => {
        console.log(`Child process exited. Code: ${code}`);
        process.exit(0);
    });
};

// Put your arguments in function call to test this functionality
spawnChildProcess([ 1, 2, 'Hello, world!' ]);
