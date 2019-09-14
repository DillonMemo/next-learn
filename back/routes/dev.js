const express = require("express");
const conn = require("../models");

const router = express.Router();

router.get("/", async (req, res) => {
  const SELECT_EMPLOYEE_QUERY = `SELECT * FROM employee`;
  try {
    console.log("employee : ", conn.isValid());

    conn.query(SELECT_EMPLOYEE_QUERY, (err, rows, meta) => {
      if (err) throw err;
      console.log(rows);

      res.json({
        data: rows
      });
    });
    // res.send("get employee");
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
