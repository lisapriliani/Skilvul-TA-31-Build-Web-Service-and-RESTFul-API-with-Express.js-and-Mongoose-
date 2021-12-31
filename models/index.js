const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = `${process.env.DB_URL}`;
db.instructors = require("./instructor")(mongoose);
db.courses = require("./course")(mongoose);
db.participants = require("./participant")(mongoose);

module.exports = db;
