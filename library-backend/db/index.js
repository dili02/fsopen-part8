const mongoose = require("mongoose");

const MONGODB_URI = "mongodb://localhost/fullstackopen-gaphql-part8";

async function connectDB() {
  mongoose
    .connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("conected to ... MongoDB");
    })
    .catch((error) => {
      console.log("error connection to MongoDB:", error.message);
    });
}

module.exports = {
  connectDB,
};
