const http = require('http');
const port  = 4005;
const { app } = require('./src/app');
const server = http.createServer(app);

server.listen(port);

console.log('event bus server is listening on port', port); 
