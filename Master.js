const ipc = require('node-ipc');

ipc.config.id = 'master'
ipc.config.retry = 15000;
ipc.config.silent = true;

let registeredRacers = 0;
const racerCount = process.argv[2];
const racers = {};

function getLine() {
    return [Math.random() * 100, Math.random() * 100];
}

function* getLines(lineCount) {
    if (lineCount === 0) {
        return;
    }
    yield getLine();
    yield* getLines(lineCount--);
}

function beginLap() {
    const currentLap = 
    ipc.server.broadcast('lap.begin', {lines: [...getLines(racerCount)]});
}

function updatePosition({id, coords}, socket) {
    racers[id].coords = coords;
    
}

function registerRacer(racer, socket) {
    if (racers[racer.id] == null && racerCount !== racersStarted) {
        racers[racer.id] = {
            socket,
        };
        registersRacers++;
        console.log('Racer registered : ', racer);
        if (registeredRacers === racerCount) {
            beginLap();
        }
    }
}

ipc.serve(
    function () {
        ipc.server.on('racer.init', registerRacer)
        ipc.server.on('racer.position', updatePosition);

    }
);

ipc.server.start();
