const express = require("express");

const usersRouter = express.Router();

const {
  gets,
  get,
  getProfile,
  register,
  editProfile,
  deleteAccount,
  editPassword,
} = require("../controllers/users");

const isLogin = require("../middlewares/isLogin");
const { diskUpload } = require("../middlewares/uploadImages");
// const allowedRoles = require("../middlewares/allowedRoles");

// GETS users ↴
usersRouter.get("/", gets);

// GET user ↴
usersRouter.get("/id", isLogin(), get);

// GET Profile ↴
usersRouter.get("/profile/id", isLogin(), getProfile);

// REGISTER users
usersRouter.post("/", register);

//DROP account/users ↴
usersRouter.delete("/user/delete", isLogin(), deleteAccount);

// || Under maintenance
// EDIT profiles ↴
usersRouter.patch(
  "/profile/edit",
  diskUpload.single("picture"),
  isLogin(),
  editProfile
);
// || Under maintenance

// EDIT password ↴
usersRouter.patch("/password/edit", isLogin(), editPassword);

module.exports = usersRouter;
