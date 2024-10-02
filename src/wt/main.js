import path from 'path';
import os from 'os';
import { Worker } from 'node:worker_threads';

const performCalculations = async () => {
    const systemCpuCoresNumber = os.cpus().length;
    let responsesReceived = 0;
    const workersArray = [];
    const outputResults = () => console.log(workersArray.map((el) => ({ status: el.status, data: el.data })));
    const checkForEnd = () => {
        if (responsesReceived === systemCpuCoresNumber)
            outputResults();
    };
    for (let i = 0, numberToStartWith = 10; i < systemCpuCoresNumber; i++, numberToStartWith++) {
        workersArray.push({ workerId: numberToStartWith });
        const worker = new Worker(path.join(import.meta.dirname, 'worker.js'));
        worker
        .on('online', () => {
            worker.postMessage(numberToStartWith);
        })
        .on('message', ({ result }) => {
            const workerArrayElement = workersArray.find(el => el.workerId === numberToStartWith);
            workerArrayElement.status = 'resolved';
            workerArrayElement.data = result;
            responsesReceived++;
            worker.unref();
            checkForEnd();
        })
        .on('error', () => {
            const workerArrayElement = workersArray.find(el => el.workerId === numberToStartWith);
            workerArrayElement.status = 'error';
            workerArrayElement.data = null;
            responsesReceived++;
            worker.unref();
            checkForEnd();
        });
    }
};

await performCalculations();