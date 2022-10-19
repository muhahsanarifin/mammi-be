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

// const uploads = require("../middlewares/uploadImages");

// GETS
usersRouter.get("/", gets);

// GET
usersRouter.get("/:id", get);

// REGISTER users
usersRouter.post("/", register);

//DROP account/users
usersRouter.delete("/:id", deleteAccount);

// EDIT profiles
usersRouter.patch("/profile/:id", editProfile);

// EDIT password
usersRouter.patch("/edit-password", editPassword);

module.exports = usersRouter;
