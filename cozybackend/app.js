const express = require("express");
const comm = require("./utils/connectDb");
const dontenv = require("dotenv").config();
const app = express();
const cors = require("cors");
const router = require("./routes/productRoutes");
const authRouter = require("./routes/authRoutes");
let origin = ["http://localhost:3000"];
const path = require("path");

let { PORT } = process.env;

//! middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //accepts form data from frontend
app.use(cors({ credentials: true, origin: origin }));
app.use("/api/ecommerce", router);
app.use("/api/user", authRouter);

//deployment
app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.send(path.join(__dirname, "/client/build", "index.html"));
});

//! start server
comm(() => {
  app.listen(process.env.PORT || 4000, () => {
    console.log(`listening for request at port ${PORT}`);
  });
});
