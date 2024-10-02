const parseEnv = () => {
    console.log(Object.getOwnPropertyNames(process.env)
        .filter(val => val.startsWith('RSS_'))
        .map(val => `${val}=${process.env[val]}`)
        .join('; '));
};

parseEnv();