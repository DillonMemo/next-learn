const env = process.env.NODE_ENV || "development";
const dev = "test";
const config = require("../config/config")[dev];
const db = require("mariadb/callback");

const conn = db.createConnection(config);
conn.connect(err => {
  if (err) {
    console.log("not connected due to error: " + err);
  } else {
    console.log("connected! connection id is " + conn.threadId);
  }
});

module.exports = conn;
