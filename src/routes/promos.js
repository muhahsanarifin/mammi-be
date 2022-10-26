const express = require("express");

const promosRouter = express.Router();

const { get, create, edit, drop } = require("../controllers/promos");

// const isLogin = require("../middlewares/isLogin");

// GET
promosRouter.get("/", get);

// POST
promosRouter.post("/", create);

// PATCH
promosRouter.patch("/:id", edit);

// DELETE
promosRouter.delete("/:id", drop);

module.exports = promosRouter;
