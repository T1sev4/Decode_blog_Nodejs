const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  email: String,
  full_name: String,
  password: String,
  GitHubID: String,
});

module.exports = mongoose.model('user', UserSchema);
