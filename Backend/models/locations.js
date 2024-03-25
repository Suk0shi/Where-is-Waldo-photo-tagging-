const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  level: { type: String, required: true },
  waldo: { type: String, required: true },
  wenda: { type: String, required: true },
  wizard: { type: String, required: true },
  odlaw: { type: String, required: true },
});


LocationSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/location/${this._id}`;
});

// Export model
module.exports = mongoose.model("Location", LocationSchema);