const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");

router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM orders", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.post("/", (req, res) => {
  const {
    user_id,
    amount,
    shipping_address,
    order_email,
    order_date,
    order_status,
  } = req.body;
  try {
    con.query(
      `insert into orders (user_id,amount,shipping_address,order_email,order_date,order_status) values ('${user_id}', '${amount}', '${shipping_address}', '${order_email}', '${order_date}', '${order_status}')`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

//gets one order
router.get("/:id", (req, res) => {
  try {
    con.query(
      `SELECT * FROM orders where order_id = ${req.params.id}`,
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
      `delete from orders where order_id = ${req.params.id}`,
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
    user_id,
    amount,
    shipping_address,
    order_email,
    order_date,
    order_status,
  } = req.body;
  try {
    con.query(
      `update orders set user_id = "${user_id}", amount = "${amount}", shipping_address = "${shipping_address}", order_email = "${order_email}", order_date = "${order_date}", order_status = "${order_status}" where order_id = "${req.params.id}"`,
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
