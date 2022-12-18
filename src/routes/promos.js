const express = require("express");

const promosRouter = express.Router();

const { get, create, edit, drop } = require("../controllers/promos");

const isLogin = require("../middlewares/isLogin");
const allowedRoles = require("../middlewares/allowedRoles");
// const validate = require("../middlewares/validate");

// TODO: GET promo
promosRouter.get("/", get);

// TODO: POST promo
promosRouter.post("/", isLogin(), allowedRoles("Admin"), create);

// TODO: PATCH promo
promosRouter.patch("/:id", isLogin(), allowedRoles("Admin"), edit);

// TODO: DELETE promo
promosRouter.delete("/:id", isLogin(), allowedRoles("Admin"), drop);

module.exports = promosRouter;
