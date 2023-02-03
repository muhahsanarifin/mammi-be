const express = require("express");
const transactionsRouter = express.Router();

const {
  get,
  create,
  history,
  edit,
  drop,
  updateStatus,
  dataDashboard,
} = require("../controllers/transactions");

const isLogin = require("../middlewares/isLogin");
const allowedRoles = require("../middlewares/allowedRoles");
// const validate = require("../middlewares/validate");

// TODO: GET transaction
transactionsRouter.get("/", isLogin(), allowedRoles("Admin"), get);

// TODO: GET transaction for data dashboard
transactionsRouter.get(
  "/data/dashboard",
  isLogin(),
  allowedRoles("Admin"),
  dataDashboard
);

// TODO: POST transaction
transactionsRouter.post("/create", isLogin(), create);

// TODO: EDIT transaction
transactionsRouter.patch("/edit/:id", isLogin(), allowedRoles("Admin"), edit);

// TODO: DELETE transaction
transactionsRouter.delete("/delete/:id", isLogin(), drop);

// TODO: GET history transaction
transactionsRouter.get("/history", isLogin(), history);

// TODO: UPDATE status transaction
transactionsRouter.patch(
  "/status/update/:id",
  isLogin(),
  allowedRoles("Admin"),
  updateStatus
);

module.exports = transactionsRouter;
