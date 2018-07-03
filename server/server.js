require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { Tip } = require('./models/tip');
const { User } = require('./models/user');

var app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());



// GET ALL TIPS
app.get('/tips', (req, res) => {
  Tip.find().then((docs) => {
    res.send(docs);
  }, e => {
    res.status(400).send(e);
  });
});


// POST a tip
app.post('/tips', (req, res) => {
  var tip = new Tip({
    text: req.body.text,
    tag: req.body.text
  });

  tip.save().then((doc) => {
    res.send(doc);
  }, e => {
    res.status(400).send(e);
  });

});

app.listen(3000, () => console.log('App running on port 3000...'));
module.exports = { app };
