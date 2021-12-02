const http = require('http');
const { app } = require('./src/app');
const PORT = 4003;

const server = http.createServer(app);
server.listen(PORT);

console.log('Moderate server is listening', PORT);