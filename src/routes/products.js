const express = require("express");

const productsRouter = express.Router();

const { get, create, update, drop } = require("../controllers/products");

// const isLogin = require("../middlewares/isLogin");
// const allowedRoles = require("../middlewares/allowedRoles");
const upload = require("../middlewares/uploadImages");

// GET
productsRouter.get("/", get);

// POST
productsRouter.post("/", upload.single("image"), create);

// PATCH
productsRouter.patch("/:id", upload.single("image"), update);

// DELETE
productsRouter.delete("/:id", drop);

module.exports = productsRouter;
