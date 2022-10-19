const express = require("express");

const productsRouter = express.Router();

const { get, create, update, drop } = require("../controllers/products");

const isLogin = require("../middlewares/isLogin");
const allowedRoles = require("../middlewares/allowedRoles");
const uploads = require("../middlewares/uploadImages");

// GET
productsRouter.get("/", isLogin(), get);

// POST
productsRouter.post("/", isLogin(), uploads.single("image"), create);

// PATCH
productsRouter.patch("/:id", isLogin(), allowedRoles("Admin"), update);

// DELETE
productsRouter.delete("/:id", isLogin(), drop);

module.exports = productsRouter;
