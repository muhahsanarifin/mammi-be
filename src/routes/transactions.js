const express = require("express");

const transactionsRouter = express.Router();

const {
  get,
  create,
  history,
  edit,
  drop,
} = require("../controllers/transactions");

const isLogin = require("../middlewares/isLogin");
const allowedRoles = require("../middlewares/allowedRoles");
// const validate = require("../middlewares/validate");

// GET transaction ↴
transactionsRouter.get("/", isLogin(), allowedRoles("Admin"), get);

// POST transaction ↴
transactionsRouter.post("/", isLogin(), create);

// EDIT transaction ↴
transactionsRouter.patch("/:id", isLogin(), edit);

// DELETE transaction ↴
transactionsRouter.delete("/:id", isLogin(), drop);

// GET history transaction ↴
transactionsRouter.get("/history", isLogin(), history);

module.exports = transactionsRouter;
