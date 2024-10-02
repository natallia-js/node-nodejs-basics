const parseArgs = () => {
    const argIdentificationMark = '--';
    const argIdentificationMarkLength = argIdentificationMark.length;
    const firstArgIndex = process.argv.findIndex(el => el.startsWith(argIdentificationMark));
    if (firstArgIndex === -1)
        return;
    const finalArgsArray = [];
    let expectingArgName = true;
    let tmp = '';
    for (let i = firstArgIndex; i < process.argv.length; i++) {
        if (expectingArgName) {
            if (process.argv[i].startsWith(argIdentificationMark)) {
                tmp = process.argv[i].slice(argIdentificationMarkLength);
                expectingArgName = false;
            } else
                throw new Error('Wrong arguments');
        } else {
            if (!process.argv[i].startsWith(argIdentificationMark)) {
                tmp += ` is ${process.argv[i]}`;
                finalArgsArray.push(tmp);
                expectingArgName = true;
            } else
                throw new Error('Wrong arguments');
        }
    }
    console.log(finalArgsArray.join(', '));
};

parseArgs();