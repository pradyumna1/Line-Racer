const cp = require('child_process');

const racerCount = process.argv[2];

if (!racerCount) {
    console.log('Please give racerCount: node init.js racerCount');
    process.exit(-1);
} 

const childOptions = {
    detached: true,
    stdio: 'inherit',
};

const master = cp.spawn('node', ['Master.js', racerCount], childOptions);
console.log('Started master with id ', master.pid);
master.unref();

for (let i = 0; i < racerCount; i++) {
    const racer = cp.spawn('node', ['Racer.js', i + 1], childOptions);
    console.log(`Started Racer ${i + 1} with pid ${racer.pid}`);
    racer.unref();
}

process.exit(0);
