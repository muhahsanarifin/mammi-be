const express = require("express");
const usersRouter = express.Router();
const {
  gets,
  getProfileContacts,
  getProfileDetails,
  register,
  editProfile,
  deleteAccount,
  editPassword,
} = require("../controllers/users");

const isLogin = require("../middlewares/isLogin");
const { memoryUpload, errorHandler } = require("../middlewares/uploadImages");
const profileUpload = require("../middlewares/profileUpload");
const allowedRoles = require("../middlewares/allowedRoles");

// TODO: GET users
usersRouter.get("/", isLogin(), allowedRoles("Admin"), gets);

// TODO: GET Profile Contact
usersRouter.get("/acc/profile/contact/id", isLogin(), getProfileContacts);

// TODO: GET Profile Detail
usersRouter.get("/acc/profile/detail/id", isLogin(), getProfileDetails);

// TODO: POST account
usersRouter.post("/register", register);

// TODO: DELETE account
usersRouter.delete("/acc/delete", isLogin(), deleteAccount);

// TODO: PATCH profile
usersRouter.patch(
  "/acc/profile/edit",
  isLogin(),
  (req, res, next) =>
    memoryUpload.single("picture")(req, res, (err) => {
      errorHandler(err, res, next);
    }),
  profileUpload,
  editProfile
);

// TODO: PATCH password
usersRouter.patch("/password/edit", isLogin(), editPassword);

module.exports = usersRouter;
