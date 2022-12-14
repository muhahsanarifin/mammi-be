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
const { memoryUpload, errorHandler } = require("../middlewares/uploadImages");
const profileUpload = require("../middlewares/profileUpload");
// const allowedRoles = require("../middlewares/allowedRoles");

// TODO: GETS users
usersRouter.get("/", gets);

// TODO: GET user
usersRouter.get("/id", isLogin(), get);

// TODO: GET Profile
usersRouter.get("/profile/id", isLogin(), getProfile);

// TODO: REGISTER users
usersRouter.post("/", register);

// TODO: DROP account/users
usersRouter.delete("/user/delete", isLogin(), deleteAccount);

// TODO: EDIT profiles
usersRouter.patch(
  "/profile/edit",
  isLogin(),
  (req, res, next) =>
    memoryUpload.single("picture")(req, res, (err) => {
      errorHandler(err, res, next);
    }),
  profileUpload,
  editProfile
);

// TODO: EDIT password
usersRouter.patch("/password/edit", isLogin(), editPassword);

module.exports = usersRouter;
