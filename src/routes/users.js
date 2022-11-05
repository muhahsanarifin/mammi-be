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
// const upload = require("../middlewares/uploadImages");
// const allowedRoles = require("../middlewares/allowedRoles");

// GETS ↴
usersRouter.get("/", gets);
// usersRouter.get("/", isLogin(), allowedRoles("Admin"), gets);

// GET ↴
usersRouter.get("/user", get);
// usersRouter.get("/user", isLogin(), allowedRoles("Admin"), get);

// REGISTER users
usersRouter.post("/", register);
// usersRouter.post("/", isLogin(), allowedRoles("Admin", "Customer"), register);

//DROP account/users ↴
usersRouter.delete("/:id", deleteAccount);
// usersRouter.delete(
//   "/:id",
//   isLogin(),
//   allowedRoles("Admin", "Customer"),
//   deleteAccount
// );

// EDIT profiles ↴
usersRouter.patch("/profile/:id", editProfile);
// usersRouter.patch(
//   "/profile/:id",
//   upload.single("picture"),
//   isLogin(),
//   allowedRoles("Admin"),
//   editProfile
// );

// EDIT password ↴
usersRouter.patch("/edit-password", editPassword);

// usersRouter.patch(
//   "/edit-password",
//   isLogin(),
//   allowedRoles("Admin"),
//   editPassword
// );

module.exports = usersRouter;
