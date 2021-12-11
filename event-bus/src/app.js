const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const events = [];
app.use(bodyParser.json());
app.post('/events', (req, res) => {
  try {
    const event = req.body;
    events.push(event);
    console.log(event.type);
    axios.post('http://post-clusterip-service:4000/events', event);
    axios.post('http://comments-service:4001/events', event);
    axios.post('http://query-service:4002/events', event);
    axios.post('http://moderate-service:4003/events', event);
    res.send({status: "ok"});
  } catch (error) {
    res.status(500).json(error);     
  }
});

app.get('/events', (req, res) => {
  res.status(200).json(events);
});
module.exports = { app };

