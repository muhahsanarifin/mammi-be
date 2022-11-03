const express = require("express");

const productsRouter = express.Router();

const { get, create, update, drop } = require("../controllers/products");

const isLogin = require("../middlewares/isLogin");
const allowedRoles = require("../middlewares/allowedRoles");
const upload = require("../middlewares/uploadImages");

// GET
productsRouter.get("/", isLogin(), allowedRoles("Admin", "Customer"), get);

// POST
productsRouter.post(
  "/",
  isLogin(),
  allowedRoles("Admin"),
  upload.single("image"),
  create
);

// PATCH
productsRouter.patch(
  "/:id",
  isLogin(),
  allowedRoles("Admin"),
  upload.single("image"),
  update
);

// DELETE
productsRouter.delete("/:id", isLogin(), allowedRoles("Admin"), drop);

module.exports = productsRouter;
