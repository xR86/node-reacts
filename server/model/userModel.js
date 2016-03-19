var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//User model structure
var userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  year: Number,
  sharingIntention: Boolean,
  copyingIntention: Boolean
});

module.exports = mongoose.model('User', userSchema);
