const express = require("express");

const usersRouter = express.Router();

// ▣ New Script
const { gets, get, register, editPassword } = require("../controllers/users");

// GETS
usersRouter.get("/", gets);

// GET
usersRouter.get("/:id", get);

// REGISTER users
usersRouter.post("/", register);

// EDIT password
usersRouter.patch("/edit-password", editPassword);

module.exports = usersRouter;
