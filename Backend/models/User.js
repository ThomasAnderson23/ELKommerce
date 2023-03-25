const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    default: "Nombre no señalado",
    trim: true,
  },
  lastname: String,
  email: {
    type: String,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/],
  },
  age: Number,
  newsletter: Boolean,
  favoriteProducts: [
    {
      type: mongoose.Types.ObjectId,
      ref: "product",
    },
  ],
  password: {
    type: String,
    match: [/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/],
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
});

userSchema.methods.hashPassword = function (password) {
  this.salt = crypto.randomBytes(10).toString("hex");
  this.password = crypto
    .pbkdf2Sync(password, this.salt, 5000, 20, "sha512")
    .toString("hex");
};

userSchema.methods.hashValidation = function (password, salt, passwordDB) {
  //console.log(password)
  //console.log(salt)
  //console.log(passwordDB)
  const hash = crypto
    .pbkdf2Sync(password, salt, 5000, 20, "sha512")
    .toString("hex");

  console.log(hash);

  return hash === passwordDB;
};

userSchema.methods.generateToken = function () {
  const payload = {
    id: this._id,
    firstname: this.firstname,
    email: this.email,
  };
  const token = jwt.sign(payload, process.env.SECRET);
  return token;
};

const User = mongoose.model("user", userSchema);

module.exports = User;
