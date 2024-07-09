const mongoose = require("mongoose");
const { connectionUrl } = require("./keys");

mongoose.connect(`${connectionUrl}`);

const connection = mongoose.connection;

// verify connection
connection.on("connected", () => {
  console.log("Mongoose connection established");
});

connection.on("error", () => {
  console.log("Mongoose connection failed");
});
