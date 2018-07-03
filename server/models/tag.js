const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  tips: [mongoose.Schema.Types.ObjectId],
  category: {
    type: String,
    required: true
  }
});

var Tag = mongoose.model('Tag', TagSchema);

module.exports = { Tag };
