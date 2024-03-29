const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: { type: String, default: 'user' },
  },
  { timestamps: true },
);

const userModel = model('Users', userSchema);

module.exports = userModel;
