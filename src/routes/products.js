const express = require("express");

const productsRouter = express.Router();

const { get, find, create, edit, drop } = require("../controllers/products");

// GET
productsRouter.get("/", get);

// FIND
productsRouter.get("/find", find);

// POST
productsRouter.post("/", create);

// PATCH
productsRouter.patch("/:id", edit);

// DELETE
productsRouter.delete("/:id", drop);

module.exports = productsRouter;
