const express = require("express");

const transactionsRouter = express.Router();
// const allowedRoles = require("../middlewares/allowedRoles");
const isLogin = require("../middlewares/isLogin");

const {
  get,
  create,
  history,
  edit,
  drop,
} = require("../controllers/transactions");

// GET
transactionsRouter.get("/", isLogin(), get);

// GET history
transactionsRouter.get("/history/:id", isLogin(), history);

// POST
transactionsRouter.post("/", isLogin(), create);

// PATCH
transactionsRouter.patch("/:id", isLogin(), edit);

// DELETE
transactionsRouter.delete("/:id", isLogin(), drop);

module.exports = transactionsRouter;
