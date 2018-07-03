const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String
});

var User = mongoose.model('User', UserSchema);

module.exports = { User };
