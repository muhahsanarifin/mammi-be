const express = require("express");

const deliveriesRouter = express.Router();

const {
  get,
  getById,
  create,
  edit,
  drop,
} = require("../controllers/deliveries");
const isLogin = require("../middlewares/isLogin");
const allowedRoles = require("../middlewares/allowedRoles");
const validate = require("../middlewares/validate");

// TODO: GET delivery
deliveriesRouter.get("/", get);

// TODO: GET delivery
deliveriesRouter.get("/:id", getById);

// TODO: POST delivery
deliveriesRouter.post(
  "/create",
  isLogin(),
  allowedRoles("Admin"),
  validate.body("method", "shipping", "cost"),
  create
);

// TODO: PATCH delivery
deliveriesRouter.patch("/edit/:id", isLogin(), allowedRoles("Admin"), edit);

// TODO: DELETE delivery
deliveriesRouter.delete("/delete/:id", isLogin(), allowedRoles("Admin"), drop);

module.exports = deliveriesRouter;
