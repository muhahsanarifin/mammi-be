const express = require("express");

const productsRouter = express.Router();

const {
  get,
  findProducts,
  filter,
  sort,
  create,
  edit,
  drop,
} = require("../controllers/products");

// GET
productsRouter.get("/", get);

// FIND Promo
productsRouter.get("/promo-products", findProducts);

// Filter Catagory Products
productsRouter.get("/filt-cat-products", filter);

// Sorting Products
productsRouter.get("/sort-products", sort);

// POST
productsRouter.post("/", create);

// PATCH
productsRouter.patch("/:id", edit);

// DELETE
productsRouter.delete("/:id", drop);

module.exports = productsRouter;
