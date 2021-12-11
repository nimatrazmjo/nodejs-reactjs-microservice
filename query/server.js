const { default: axios } = require('axios');
const http = require('http');

const { app, handleEvent } = require('./src/app');

const PORT = 4002;

const server = http.createServer(app);
server.listen(PORT);
console.log('Query is listening on port', PORT);