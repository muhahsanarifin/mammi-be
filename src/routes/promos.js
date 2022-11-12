const express = require("express");

const promosRouter = express.Router();

const { get, create, edit, drop } = require("../controllers/promos");

const isLogin = require("../middlewares/isLogin");
const allowedRoles = require("../middlewares/allowedRoles");
// const validate = require("../middlewares/validate");

// GET ↴
promosRouter.get("/", get);
// promosRouter.get("/", isLogin(), allowedRoles("Admin", "Customer"), get);

// POST ↴
promosRouter.post("/", create);
promosRouter.post("/", isLogin(), allowedRoles("Admin"), create);

// PATCH ↴
promosRouter.patch("/:id", edit);
promosRouter.patch("/:id", isLogin(), allowedRoles("Admin"), edit);

// DELETE ↴
promosRouter.delete("/:id", drop);
promosRouter.delete("/:id", isLogin(), allowedRoles("Admin"), drop);

module.exports = promosRouter;
