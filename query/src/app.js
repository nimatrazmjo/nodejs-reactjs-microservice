const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const posts = {};
const handleEvent = (type, data) => {

   if (type === 'PostCreated') {
      const {id, title} = data;
      posts[id] = {id, title, comments: []};
   }

   if (type === 'CommentCreated') {
   console.log(data);
      const {id, content, postId, status} = data;
      const post = posts[postId];
      post.comments.push({id, content, status})
   }

   if (type === 'CommentUpdated') {
      console.log(data);
      const {id, content, postId, status} = data;
      const comments = posts[postId];
      console.log(comments, posts, postId);
      const comment = comments.comments.find(c => c.id === id );
      comment.content = content;
      comment.status = status;
   }
}
app.use(cors());
app.use(bodyParser.json());
app.get('/posts', (req, res) => {
  res.status(200).json(posts);
});

app.post('/events',(req, res) => {

 const {type, data} = req.body;
handleEvent(type, data);
 res.send({status: "ok"});
});

module.exports = { app, handleEvent };