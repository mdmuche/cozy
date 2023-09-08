const express = require("express");

// controller functions
const { loginUser, signupUser } = require("../controllers/authControllers");
const authRouter = express.Router();

// login route
authRouter.post("/login", loginUser);

// signup route
authRouter.post("/signup", signupUser);

module.exports = authRouter;
