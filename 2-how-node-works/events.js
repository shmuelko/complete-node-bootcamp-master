const EventEmitter = require('events');
const http = require('http');

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();
myEmitter.on('newSale', () => {
  console.log('myEvent fired');
});

myEmitter.on('newSale', () => {
  console.log('Customer: Jones');
});

myEmitter.on('newSale', (stock) => {
  console.log(`there are now ${stock}`);
});

myEmitter.emit('newSale', 9);

////////////////////////////////////

const server = http.createServer();

server.on('request', (req, res) => {
  console.log('Request received');
  console.log(req.url);
  res.end('Request Recived res1');
});

server.on('request', (req, res) => {
  console.log('Another one res');
});

server.on('close', () => {
  console.log('Server closed');
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Server listening on port 8000');
});
