const express = require("express");

const promosRouter = express.Router();

const { get, getById, create, edit, drop } = require("../controllers/promos");

const isLogin = require("../middlewares/isLogin");
const allowedRoles = require("../middlewares/allowedRoles");
// const validate = require("../middlewares/validate");

// TODO: GET promos
promosRouter.get("/", get);

// TODO: GET promo
promosRouter.get("/:id", isLogin(), getById);

// TODO: POST promo
promosRouter.post("/create", isLogin(), allowedRoles("Admin"), create);

// TODO: PATCH promo
promosRouter.patch("/edit/:id", isLogin(), allowedRoles("Admin"), edit);

// TODO: DELETE promo
promosRouter.delete("/delete/:id", isLogin(), allowedRoles("Admin"), drop);

module.exports = promosRouter;
