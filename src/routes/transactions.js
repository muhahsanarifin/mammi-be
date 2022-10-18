const express = require("express");

const transactionsRouter = express.Router();
// const allowedRoles = require("../middlewares/allowedRoles");
// const isLogin = require("../middlewares/isLogin");

const {
  get,
  create,
  history,
  edit,
  drop,
} = require("../controllers/transactions");

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
