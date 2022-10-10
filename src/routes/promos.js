const express = require("express");

const promosRouter = express.Router();

const { get, create, edit, drop } = require("../controllers/promos");

// GET
promosRouter.get("/", get);

// POST
promosRouter.post("/", create);

// PATCH
promosRouter.patch("/:id", edit);

// DELETE
promosRouter.delete("/:id", drop);

module.exports = promosRouter;

// ▨ Syntax is not used

// promosRouter.get("/", async (req, res) => {
//   try {
//     const query =
//       "select id, code, promo_name, discount, maximum_uses from promos";
//     const response = await postgreDatabase.query(query);
//     res.status(200).json({
//       data: response.rows,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       msg: "Internal service error",
//     });
//   }
// });

// module.exports = promosRouter;
