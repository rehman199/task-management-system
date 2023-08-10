const mongoose = require("mongoose");

const DB_URI = process.env.DATABASE_URI;

module.exports = async () => {
  return await mongoose.connect(DB_URI);
};
