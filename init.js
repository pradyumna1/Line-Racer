const cp = require('child_process');

const racerCount = process.argv[2];

const masterOptions = {
    detached: true,
    stdio: [process.stdin, process.stdout, process.stderr],
};

const master = cp.spawn('node', ['Master.js']);
master.unref()
console.log('Started master with id ', master.pid);
const racerOptions = {
    detached: true,
    stdio: 'inherit',
}
for (let i = 0; i < racerCount; i++) {
    const racer = cp.spawn('node', ['Racer.js', i + 1]);
    racer.unref()
    console.log(`Started Racer ${i + 1} with pid ${racer.pid}`);
}
process.exit(0);
