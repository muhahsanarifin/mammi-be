const experss = require("express");

const authRouter = experss.Router();

const { login, logout } = require("../controllers/auth");
const isLogin = require("../middlewares/isLogin");

// TODO: Login
authRouter.post("/", login);

// TODO: Logout
authRouter.delete("/logout", isLogin(), logout);

module.exports = authRouter;
