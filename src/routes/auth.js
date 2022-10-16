const experss = require("express");

const authRouter = experss.Router();

const { login } = require("../controllers/auth");

// Login
authRouter.post("/", login);

// Logout

module.exports = authRouter;
