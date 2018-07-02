const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('../db/mongoose');
const { Tip } = require('../models/tip');
const { User } = require('../models/user');

var app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Welcome to Tipacifics'));

app.post('/tips', (req, res) => {
  var tip = new Tip({
    text: req.body.text
  });

  tip.save().then((doc) => {
    res.send(doc);
  }, e => {
    res.status(400).send(e);
  });

});

app.listen(3000, () => console.log('App running on port 3000...'));
