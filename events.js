const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

myEmitter = new MyEmitter();

myEmitter.on('event', (arg) => {
});

myEmitter.emit('event', {"data": "123456"});
