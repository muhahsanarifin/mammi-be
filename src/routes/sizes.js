const express = require("express");

const sizesRouter = express.Router();

const { get, getById, create, edit, drop } = require("../controllers/sizes");
const isLogin = require("../middlewares/isLogin");
const allowedRoles = require("../middlewares/allowedRoles");
const validate = require("../middlewares/validate");

// TODO: GET sizes
sizesRouter.get("/", get);

// TODO: GET sizes
sizesRouter.get("/:id", getById);

// TODO: POST sizes
sizesRouter.post(
  "/create",
  isLogin(),
  allowedRoles("Admin"),
  
  create
);

// TODO: PATCH sizes
sizesRouter.patch("/edit/:id", isLogin(), allowedRoles("Admin"), edit);

// TODO: DELETE sizes
sizesRouter.delete("/delete/:id", isLogin(), allowedRoles("Admin"), drop);

module.exports = sizesRouter;
