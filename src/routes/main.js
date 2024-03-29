const express = require("express");

// TODO: Import sub-routers
const usersRouter = require("./users");
const productsRouter = require("./products");
const promosRouter = require("./promos");
const transactionsRouter = require("./transactions");
const authRouter = require("./auth");
const deliveriesRouter = require("./deliveries");
const sizesRouter = require("./sizes");

const mainRouter = express.Router();

const prefix = "/api/v1";

// TODO: Connecting sub-routers with mainRouter
mainRouter.use(`${prefix}/users`, usersRouter); // ⇦ users endpoint handled by userRouter
mainRouter.use(`${prefix}/products`, productsRouter); // ⇦ products endpoint handled by productsRouter
mainRouter.use(`${prefix}/promos`, promosRouter); // ⇦ promos endpoint handled by promoRouter
mainRouter.use(`${prefix}/transactions`, transactionsRouter); // ⇦ transactions endpoint handled by transactionsRouter
mainRouter.use(`${prefix}/auth`, authRouter); // ⇦ auth endpoint handled by authRouter

// Research
mainRouter.use(`${prefix}/deliveries`, deliveriesRouter); // ⇦ deliveries endpoint handled by deliveriesRouter
mainRouter.use(`${prefix}/sizes`, sizesRouter); // ⇦ sizes endpoint handled by sizesRouter

// http:localhost:8080/ ⇦ http route access
mainRouter.get("/", (req, res) => {
  res.json({
    message: "Welcome to MAMMI API",
  });
});

module.exports = mainRouter;
