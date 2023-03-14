const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mongoDb = process.env.MongoURL;
mongoose.connect(mongoDb, { dbName: 'fortnite', useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const userModel = mongoose.model(
  "User",
  new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true},
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    orders: {type: Array, default: []},
    credits: {type:Number,default: 100, required: true },
    role: { type: String, default: 'customer', required: true },
  })
);



module.exports = userModel 