const experss = require("express");

const authRouter = experss.Router();

const { login, logout } = require("../controllers/auth");

// const isLogin = require("../middlewares/isLogin");
// const allowedRoles = require("../middlewares/allowedRoles");

// Login
authRouter.post("/", login);

// Logout
authRouter.delete("/logout", logout);

module.exports = authRouter;
