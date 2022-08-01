const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");

router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM categories", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.post("/", (req, res) => {
  const { name, description, thumbnail } = req.body;
  try {
    con.query(
      `insert into categories (name,description,thumbnail) values ('${name}', '${description}', '${thumbnail}')`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

//gets one category
router.get("/:id", (req, res) => {
  try {
    con.query(
      `SELECT * FROM categories where category_id = ${req.params.id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//delete
router.delete("/:id", (req, res) => {
  try {
    con.query(
      `delete from categories where category_id = ${req.params.id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//edit
router.patch("/:id", (req, res) => {
  const { name, description, thumbnail } = req.body;
  try {
    con.query(
      `update categories set name = "${name}", description = "${description}", thumbnail = "${thumbnail}" where category_id = "${req.params.id}"`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
