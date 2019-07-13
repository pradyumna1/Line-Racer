const ipc = require('node-ipc');

ipc.config.id = `Racer ${process.argv[2]}`;
ipc.config.retry = 15000;
ipc.config.silent = true;

ipc.connectTo(
    'master',
    function() {
        ipc.of.master.on(
            'connect',
            function(){
                console.log('## connected to master ##');
                ipc.of.master.emit(
                    'racer.init',  //any event or message type your server listens for
                    {racer: {id: process.argv[2]}},
                );
            }
        );
        ipc.of.master.on(
            'disconnect',
            function() {
                ipc.log('disconnected from world');
            }
        );
    }
)