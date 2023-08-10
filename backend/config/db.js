const mongoose = require("mongoose");

const DB_URI = process.env.DATABASE_URI;

module.exports = async (app, port) => {
  await mongoose.connect(DB_URI);
  app.listen(port, () => console.log("Server Connected to port " + port));
};
