const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://namastedev:1F1KcR73os2gzkfc@namastenode.6rseqag.mongodb.net/devtinder",
  );
};

module.exports = connectDB;
