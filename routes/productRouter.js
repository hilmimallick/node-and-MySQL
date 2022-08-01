const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");
const jwt = require("jsonwebtoken");
const middleware = require("../middleware/auth");

router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM products", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.post("/", middleware, (req, res) => {
  if (req.user.user_type === "admin") {
    const user = {
      sku: req.body.sku,
      name: req.body.name,
      price: req.body.price,
      weight: req.body.weight,
      descriptions: req.body.descriptions,
      thumbnail: req.body.thumbnail,
      image: req.body.image,
      category: req.body.category,
      create_date: req.body.create_date,
      stock: req.body.stock,
    };
    try {
      let sql = `insert into products SET ?`;
      con.query(sql, user, (err, result) => {
        if (err) throw err.message;
        res.send(result);
      });
    } catch (error) {
      console.log(error.message);
    }
  } else {
    res.send("You are not an admin");
  }
});

//gets one user
router.get("/:id", (req, res) => {
  try {
    con.query(
      `SELECT * FROM products where product_id = ${req.params.id}`,
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
      `delete from products where product_id = ${req.params.id}`,
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
  const {
    sku,
    name,
    price,
    weight,
    descriptions,
    thumbnail,
    image,
    category,
    create_date,
    stock,
  } = req.body;
  try {
    con.query(
      `update product set sku = "${sku}",  name = "${name}", price = "${price}", weight = "${weight}", descriptions = "${descriptions}", thumbnail = "${thumbnail}" where product_id = "${req.params.id}"`,
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
