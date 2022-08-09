const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mongoDb = process.env.MongoURL;
mongoose.connect(mongoDb, { dbName: 'message_board', useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const User = mongoose.model(
  "User",
  new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true},
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    postCount: {type: Number, default: 0},
    role: { type: String, default: 'customer', required: true },
  })
);

const userModel = User

module.exports = userModel 