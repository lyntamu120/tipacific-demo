require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const _ = require('lodash');

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
    tag: req.body.tag
  });

  tip.save().then((tip) => {
    res.send({tip});
  }).catch(e => {
    res.status(400).send(e);
  });
});

//GET a tip by id
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
  }).catch(e => {
    res.status(400).send(e);
  });
});

//DELETE a tip by id
app.delete('/tips/:id', (req, res) => {
  let id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Tip.findByIdAndRemove(id).then(tip => {
    if (!tip) {
      return res.status(404).send();
    }
    res.send({tip});
  }).catch(e => {
    res.status(400).send(e);
  });
});

// Edit a tip
app.patch('/tips/:id', (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ['text', 'tag']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  body.updated = Date.now();

  Tip.findByIdAndUpdate(id, {$set: body}, {new: true}).then(tip => {
    if (!tip) {
      return res.status(404).send();
    }
    res.send({tip});
  }).catch(e => {
    res.status(400).send();
  });
});

app.listen(PORT, () => console.log(`App running on port ${PORT}...`));
module.exports = { app };
