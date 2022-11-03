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

const isLogin = require("../middlewares/isLogin");
const upload = require("../middlewares/uploadImages");
const allowedRoles = require("../middlewares/allowedRoles");

// GETS
usersRouter.get("/", isLogin(), allowedRoles("Admin"), gets);

// GET
usersRouter.get("/user", isLogin(), allowedRoles("Admin"), get);

// REGISTER users
usersRouter.post("/", isLogin(), allowedRoles("Admin"), register);

//DROP account/users
usersRouter.delete(
  "/:id",
  isLogin(),
  allowedRoles("Admin", "Customer"),
  deleteAccount
);

// EDIT profiles
usersRouter.patch(
  "/profile/:id",
  upload.single("picture"),
  isLogin(),
  allowedRoles("Admin"),
  editProfile
);

// EDIT password
usersRouter.patch(
  "/edit-password",
  isLogin(),
  allowedRoles("Admin"),
  editPassword
);

module.exports = usersRouter;
