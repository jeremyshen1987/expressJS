const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = require('./user-model')

const mongoDb = process.env.MongoURL;
mongoose.connect(mongoDb, { dbName: 'message_board', useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));


const messageSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    post_title: { type: String, required: true},
    post_body: { type: String, required: true},
    date: { type: String, default: (new Date).toDateString(), required: true },
  }
)

const messageModel = mongoose.model('msgs', messageSchema)


module.exports = messageModel