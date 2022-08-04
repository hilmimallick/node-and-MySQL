const express = require("express"); // Used to set up a server
const cors = require("cors"); // Used to prevent errors when working locally

const app = express(); // Initialize express as an app variable
app.set("port", process.env.PORT || 6969); // Set the port
app.use(express.json()); // Enable the server to handle JSON requests
app.use(cors()); // Dont let local development give errors

app.get("/", (req, res) => {
  res.json({ msg: "Welcome" });
});

//for user
const userRoute = require("./routes/userRouter");
app.use("/users", userRoute);

//for product
const productRoute = require("./routes/productRouter");
app.use("/products", productRoute);

//for categories
const categoriesRoute = require("./routes/categoriesRouter");
app.use("/categories", categoriesRoute);

//for orders
const ordersRoute = require("./routes/ordersRouter");
app.use("/orders", ordersRoute);

//for order_details
const order_detailsRoute = require("./routes/order_detailsRouter");
app.use("/order_details", order_detailsRoute);

//for product_categories
const product_categoriesRoute = require("./routes/product_categoriesRouter");
app.use("/product_categories", product_categoriesRoute);

app.listen(app.get("port"), () => {
  console.log(`Listening for calls on port ${app.get("port")}`);
  console.log("Press Ctrl+C to exit server");
});

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(_dirname + "/" + "index.html");
});

app.get("/login", function (req, res) {
  res.sendFile(_dirname + "/" + "login.html");
});

app.get("/products", function (req, res) {
  res.sendFile(_dirname + "/" + "Products.html");
});
