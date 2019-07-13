const ipc = require('node-ipc');
const racer = {
    id: process.argv[2],
};
ipc.config.id = `R${racer.id}`;
ipc.config.retry = 15000;
ipc.config.silent = true;

function register() {
    console.log(ipc.config.id + ': init');
    console.log(ipc.config.id + ' connected to master');
    ipc.of.master.emit('racer.init', racer);
}

function updateCoords() {
    racer.coords[0] += 1;
    ipc.of.master.emit('racer.position', {
        id: racer.id,
        coords: racer.coords,
    });
}

function beginLap(data) {
    racer.coords = getIntersection(data.lines);
    clearInterval(racer.interval);
    racer.interval = setInterval(updateCoords, 50);
}

ipc.connectTo(
    'master',
    function() {
        ipc.of.master.on('connect', register);
        ipc.of.master.on('lap.begin', beginLap);
        ipc.of.master.on('disconnect', process.exit());
    }
)