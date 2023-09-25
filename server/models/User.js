const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  _id:String,
  name: String,
  body: String,
  image: String,
  posts:[String],
  lastCreatedAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("User", UserSchema);
