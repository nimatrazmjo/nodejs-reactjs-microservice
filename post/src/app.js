const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const axios = require('axios');
const app = express();

const posts = {};

app.use(bodyParser.json());
app.use(cors())

app.get('/posts', (req, res) => {
  res.status(200).json(posts);
});

app.post('/posts/create', async (req, res) => {
  const { title } = req.body;
  const postId = randomBytes(4).toString('hex');
  posts[postId]={id: postId, title};
  await axios.post('http://event-bus-service:4005/events',{type: 'PostCreated',data: {id: postId, title}});
  res.status(201).json(posts[postId]);
  
});

app.post('/events', (req, res) => {
  console.log(req.body);
});

module.exports = { app }