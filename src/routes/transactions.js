const express = require("express");

const transactionsRouter = express.Router();

const {
  get,
  create,
  history,
  histories,
  edit,
  drop,
} = require("../controllers/transactions");

const isLogin = require("../middlewares/isLogin");
const allowedRoles = require("../middlewares/allowedRoles");

// GET
transactionsRouter.get("/", isLogin(), allowedRoles("Admin"), get);

// GET history
transactionsRouter.get(
  "/history/:id",
  isLogin(),
  allowedRoles("Admin"),
  history
);

// GET histories
transactionsRouter.get("/history", isLogin(), allowedRoles("Admin"), histories);

// POST
transactionsRouter.post("/", isLogin(), allowedRoles("Admin"), create);

// PATCH
transactionsRouter.patch("/:id", isLogin(), allowedRoles("Admin"), edit);

// DELETE
transactionsRouter.delete("/:id", isLogin(), allowedRoles("Admin"), drop);

module.exports = transactionsRouter;
