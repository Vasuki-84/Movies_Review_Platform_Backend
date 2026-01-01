const mongoose = require("mongoose");
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DBPORT, {
      ssl: true,
      tlsAllowInvalidCertificates: false,
    });
    console.log("Database Atlas Connection Success");
  } catch (err) {
    console.log("Database Atlas Connection Failure");
  }
};
module.exports = dbConnection;
