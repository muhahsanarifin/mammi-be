const express = require("express");

const usersRouter = express.Router();

const {
  gets,
  get,
  register,
  editProfile,
  deleteAccount,
  editPassword,
} = require("../controllers/users");

// const isLogin = require("../middlewares/isLogin");
const upload = require("../middlewares/uploadImages");

// GETS
usersRouter.get("/", gets);

// GET
usersRouter.get("/:id", get);

// REGISTER users
usersRouter.post("/", register);

//DROP account/users
usersRouter.delete("/:id", deleteAccount);

// EDIT profiles
usersRouter.patch("/profile/:id", upload.single("picture"), editProfile);

// EDIT password
usersRouter.patch("/edit-password", editPassword);

module.exports = usersRouter;
