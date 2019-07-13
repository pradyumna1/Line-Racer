const ipc = require('node-ipc');

ipc.config.id = 'master'
ipc.config.retry = 15000;
ipc.config.silent = true;

let racersStarted = 0;
const racerCount = process.argv[2];
const racers = {};
ipc.serve(
    function () {
        ipc.server.on(
            'racer.init',
            function (data, socket) {
                console.log('Racer registered : ', data);
                if (racers[data.racer.id] == null && racerCount !== racersStarted) {
                    racers[data.racer.id] = {};
                    racersStarted++;
                    if (racersStarted === racerCount) {
                        ipc.server.broadcast('lap.start', )
                    }
                }
            }
        )
    }
);

ipc.server.start();
