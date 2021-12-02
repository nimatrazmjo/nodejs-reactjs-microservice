const { default: axios } = require('axios');
const http = require('http');

const { app, handleEvent } = require('./src/app');

const PORT = 4002;

const server = http.createServer(app);
server.listen(PORT,'localhost',async() => {
    events = await axios.get('http://localhost:4005/events');

    for (let event of events) {
      console.log(event.type, 'Query');
      handleEvent(event.type, event.data);
    }
});
console.log('Query is listening on port', PORT);