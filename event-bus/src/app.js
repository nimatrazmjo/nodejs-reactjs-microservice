const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const events = [];
app.use(bodyParser.json());
app.post('/events',async (req, res) => {
  try {
    const event = req.body;
    events.push(event);
    await axios.post('http://post-clusterip-service:4000/events', event);
    // await axios.post('http://localhost:4001/events', event);
    // await axios.post('http://localhost:4002/events', event);
    // await axios.post('http://localhost:4003/events', event);
    res.send({status: "ok"});
  } catch (error) {
    res.status(500).json(error);     
  }
});

app.get('/events', (req, res) => {
  res.status(200).json(events);
});
module.exports = { app };

