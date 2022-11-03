const express = require("express");

const promosRouter = express.Router();

const { get, create, edit, drop } = require("../controllers/promos");

const isLogin = require("../middlewares/isLogin");
const allowedRoles = require("../middlewares/allowedRoles");

// GET
promosRouter.get("/", isLogin(), allowedRoles("Admin", "Customer"), get);

// POST
promosRouter.post("/", isLogin(), allowedRoles("Admin"), create);

// PATCH
promosRouter.patch("/:id", isLogin(), allowedRoles("Admin"), edit);

// DELETE
promosRouter.delete("/:id", isLogin(), allowedRoles(), drop);

module.exports = promosRouter;
