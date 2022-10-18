const express = require("express");

const promosRouter = express.Router();

const { get, create, edit, drop } = require("../controllers/promos");

const isLogin = require("../middlewares/isLogin");

// GET
promosRouter.get("/", isLogin(), get);

// POST
promosRouter.post("/", isLogin(), create);

// PATCH
promosRouter.patch("/:id", isLogin(), edit);

// DELETE
promosRouter.delete("/:id", isLogin(), drop);

module.exports = promosRouter;
