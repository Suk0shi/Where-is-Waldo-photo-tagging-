const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  level: { type: String, required: true },
  username: { type: String, required: true },
  time: { type: Number, required: true },
});


UserSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/user/${this._id}`;
});

// Export model
module.exports = mongoose.model("User", UserSchema);