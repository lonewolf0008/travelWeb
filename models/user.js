const db = require("mongoose");
const Schema = db.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    require: true,
  },
});

userSchema.plugin(passportLocalMongoose);

module.exports = db.model("User", userSchema);
