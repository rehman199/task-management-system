const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, select: false, required: true },
});

module.exports = model("User", userSchema);
