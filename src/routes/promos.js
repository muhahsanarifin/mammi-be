const express = require("express");

const promosRouter = express.Router();

const { get, create, edit, drop } = require("../controllers/promos");

const isLogin = require("../middlewares/isLogin");
const allowedRoles = require("../middlewares/allowedRoles");
// const validate = require("../middlewares/validate");

// GET promo ↴
promosRouter.get("/", get);
// promosRouter.get("/", isLogin(), allowedRoles("Admin", "Customer"), get);

// POST promo ↴
promosRouter.post("/", isLogin(), allowedRoles("Admin"), create);
// promosRouter.post("/", create);

// PATCH promo ↴
promosRouter.patch("/:id", isLogin(), allowedRoles("Admin"), edit);
// promosRouter.patch("/:id", edit);

// DELETE promo ↴
promosRouter.delete("/:id", isLogin(), allowedRoles("Admin"), drop);
// promosRouter.delete("/:id", drop);

module.exports = promosRouter;
