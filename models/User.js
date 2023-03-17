const mongoose = require("mongoose");

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
    match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/],
    required: true
  },
});

const User = mongoose.model('user', userSchema);

module.exports = User;
