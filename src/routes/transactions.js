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

// TODO: GET transaction
transactionsRouter.get("/", isLogin(), allowedRoles("Admin"), get);

// TODO: POST transaction
transactionsRouter.post("/create", isLogin(), create);

// TODO: EDIT transaction
transactionsRouter.patch("/edit/:id", isLogin(), allowedRoles("Admin"), edit);

// TODO: DELETE transaction
transactionsRouter.delete("/delete/:id", isLogin(), drop);

// TODO: GET history transaction
transactionsRouter.get("/history", isLogin(), history);

module.exports = transactionsRouter;
