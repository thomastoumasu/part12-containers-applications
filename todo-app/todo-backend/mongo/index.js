const mongoose = require("mongoose");
const Todo = require("./models/Todo");
const { MONGO_URL } = require("../util/config");

if (MONGO_URL && !mongoose.connection.readyState)
  mongoose
    .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("--app.js connected to MongoDB");
    })
    .catch((error) => {
      console.log("--app.js error connecting to MongoDB:", error.message);
    });

module.exports = {
  Todo,
};
