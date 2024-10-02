import { Transform } from 'stream';

function reverseString(str) {
    return str.split('').reverse().join('');
}

const transform = async () => {
    const uppercase = new Transform({
        transform(chunk, _encoding, callback) {
            callback(null, reverseString(chunk.toString()));
        },
    });
    process.stdin.pipe(uppercase).pipe(process.stdout);
};

await transform();