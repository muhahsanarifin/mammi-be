const express = require("express");

const transactionsRouter = express.Router();

const {
  get,
  create,
  history,
  edit,
  drop,
} = require("../controllers/transactions");

// const isLogin = require("../middlewares/isLogin");
// const allowedRoles = require("../middlewares/allowedRoles");

// GET
transactionsRouter.get("/", get);

// GET history
transactionsRouter.get("/history/:id", history);

// POST
transactionsRouter.post("/", create);

// PATCH
transactionsRouter.patch("/:id", edit);

// DELETE
transactionsRouter.delete("/:id", drop);

module.exports = transactionsRouter;
