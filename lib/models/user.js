const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  dist: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Export User Model
const User = module.exports = mongoose.model('users', userSchema);
module.exports.get = function (callback, limit) {
  User.find(callback).limit(limit);
}