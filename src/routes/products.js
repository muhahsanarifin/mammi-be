const express = require("express");
const productsRouter = express.Router();
const { gets, get, create, update, drop } = require("../controllers/products");

const { memoryUpload, errorHandler } = require("../middlewares/uploadImages");
const isLogin = require("../middlewares/isLogin");
const allowedRoles = require("../middlewares/allowedRoles");
const productUpload = require("../middlewares/productUpload");
// const validate = require("../middlewares/validate");

// TODO: GET products
productsRouter.get("/", gets);

// TODO: GET product
productsRouter.get("/:id", get);

// TODO: POST product
// TODO: Research multiple files
productsRouter.post(
  "/create",
  isLogin(),
  allowedRoles("Admin"),
  (req, res, next) =>
    memoryUpload.array("image", 5)(req, res, (err) => {
      errorHandler(err, res, next);
    }),
  productUpload,
  create
);

// TODO: PATCH product
productsRouter.patch(
  "/edit/:id",
  isLogin(),
  allowedRoles("Admin"),
  memoryUpload.single("image"),
  productUpload,
  update
);

// TODO: DELETE product
productsRouter.delete("/delete/:id", drop);

module.exports = productsRouter;
