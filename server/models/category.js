const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  author: mongoose.Schema.Types.ObjectId,
  tags: [mongoose.Schema.Types.ObjectId]
});

var Category = mongoose.model('Category', CategorySchema);
module.exports = {Category};
