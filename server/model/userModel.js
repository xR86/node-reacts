var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

//User model structure
var userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true,
    default: 1,
    min: 1,
    max: 3
  },
  sharingIntention: {
    type: Boolean,
    default: true
  },
  copyingIntention: {
    type: Boolean,
    default: true
  },
  examList: [{
    grade: {
      type: Number,
      min: 1,
      max: 10,
      default: null
    },
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exam'
    },
    passed: {
      type: Boolean,
      default: false
    }
  }],
  facebookId: {
    type: Number
  }
});

userSchema.methods.hashPassword = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}
userSchema.methods.randomPasswordHashed = function () {
  return this.hashPassword(Math.random().toString(36).substr(2, 8));
}

module.exports = mongoose.model('User', userSchema);
