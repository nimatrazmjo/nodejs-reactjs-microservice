const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const axios = require('axios');
const cors = require('cors');
const app = express();

const commentsByPostId = [];

app.use(cors({origin: '*'}));
app.use(bodyParser.json());

app.get('/posts/:id/comments', (req, res) => {
  res.status(200).json(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const { content } = req.body;
  const commentId = randomBytes(4).toString('hex');
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({id: commentId, content, status: 'pending'});
  commentsByPostId[req.params.id] = comments;
  await axios.post('http://localhost:4005/events',{
  type: "CommentCreated",
   data:{ id: commentId,
    content,
    postId: req.params.id,
    status: 'pending'
  },
  });
  res.status(200).json(comments);
});

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  console.log(type);
  if (type === 'CommentModerated') {
    console.log(data,type);
    const { id, postId, content, status } = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find(comment => comment.id === id);
    comment.status = status;
    comment.content = content;
    await axios.post('http://localhost:4005/events',{
      type: "CommentUpdated",
       data:{...comment, postId},
      });
  }
  res.send({status: "ok"});
});
module.exports = { app }