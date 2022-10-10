const express = require("express");

const transactionsRouter = express.Router();

const { get, create, edit, drop } = require("../controllers/transactions");

// GET
transactionsRouter.get("/", get);

// POST
transactionsRouter.post("/", create);

// PATCH
transactionsRouter.patch("/:id", edit);

// DELETE
transactionsRouter.delete("/:id", drop);

module.exports = transactionsRouter;

// ▨ Syntax is not used

// transactions.get("/", async (req, res) => {
//   try {
//     const query =
//       "select id, transaction_date, approval_status from transactions";
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

// module.exports = transactions;
