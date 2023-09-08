const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
let { MONGODB_URL } = process.env;

const comm = async (cb) => {
  try {
    let db = await mongoose.connect(MONGODB_URL);
    //   console.log(db);
    //   console.log(db.STATES.connected);
    if (db.STATES.connected === 1) {
      console.log("connection to db was successful");
      cb();
    } else {
      console.log("connection to db wasn't successful");
      // cb();
    }
  } catch (error) {
    // console.log(err.message);
    console.log("connection to db wasn't successful");
  }
};

module.exports = comm;
