const mongoose = require('mongoose');

var TipSchema = new mongoose.Schema({
  // label: {
  //   type: String,
  //   required: true
  // },
  text: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  // author: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true
  // },
  // numOfReference: {
  //   type: Number
  // },
  // updated: {
  //   type: Date,
  //   default: Date.now
  // },
  // referAuthors: [mongoose.Schema.Types.ObjectId]
});

var Tip = mongoose.model('Tip', TipSchema);

module.exports = { Tip };
