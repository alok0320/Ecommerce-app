const crypto = require('crypto');
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");



const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
    validate: function (v) {
      return /^[6-9]\d{9}$/.test(v);
    },

  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid Email"],
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  passwordConf: {
    type: String,
    required: true,
    validate: {
      //This will work only with CREATE and SAVE
      validator: function (el) {
        return el === this.password;
      },
    },
  },
  role: {
    type: String,
    enum: ['user', 'employee', 'seller', 'admin'],
    default: 'user'
  },
  photo: String,

  passwordChangedAt: Date,

  passwordResetToken: String,
  passwordResetExpires: Date
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConf = undefined;
  next();
});


userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
})




userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};


userSchema.methods.changePasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000);
    console.log(changedTimeStamp, JWTTimestamp);
    return JWTTimestamp < changedTimeStamp;
  }


  return false;
}


userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');


  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
}


const User = mongoose.model("User", userSchema);

module.exports = User;