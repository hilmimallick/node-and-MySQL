const express = require("express"); // Used to set up a server
const cors = require("cors"); // Used to prevent errors when working locally

const userRoute = require("./routes/userRouter");

const app = express(); // Initialize express as an app variable
app.set("port", process.env.PORT || 6969); // Set the port
app.use(express.json()); // Enable the server to handle JSON requests
app.use(cors()); // Dont let local development give errors

app.get("/", (req, res) => {
  res.json({ msg: "Welcome" });
});

app.get("/products", (req, res) => {
  res.json({ msg: "Welcome products" });
});

app.use("/users", userRoute);

app.listen(app.get("port"), () => {
  console.log(`Listening for calls on port ${app.get("port")}`);
  console.log("Press Ctrl+C to exit server");
});
