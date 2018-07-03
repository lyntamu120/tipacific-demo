require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Tip } = require('./models/tip');
const { User } = require('./models/user');

var app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());

// GET ALL TIPS
app.get('/tips', (req, res) => {
  Tip.find().then((tips) => {
    res.send({tips});
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

  tip.save().then((tip) => {
    res.send({tip});
  }, e => {
    res.status(400).send(e);
  });
});

//GET a specific tip
app.get('/tips/:id', (req, res) => {
  let id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Tip.findById(id).then((tip) => {
    if (!tip) {
      return res.status(404).send();
    }
    res.send({tip});
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.listen(3000, () => console.log('App running on port 3000...'));
module.exports = { app };
