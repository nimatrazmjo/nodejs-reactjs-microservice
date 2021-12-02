const express = require('express');
const bodyParser = require('body-parser');
const { default: axios } = require('axios');
const app = express();

app.use(bodyParser.json());
app.post('/events', async (req, res) => {
    const { type , data} = req.body;
    console.log(type);
    if (type === 'CommentCreated') {
      console.log(data,type);
      const status = data.content.includes('orange') ? 'rejected' : 'approved';
      await axios.post('http://localhost:4005/events',{
        type: 'CommentModerated',
        data: {
          id: data.id,
          content: data.content,
          postId: data.postId,
          status: status
        }
      })
    }
    res.send({status: "ok"});
});

module.exports = {app};

