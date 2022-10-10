const express = require("express");

const usersRouter = express.Router();

const { get, create, edit, drop } = require("../controllers/users");

// GET
usersRouter.get("/", get);

// POST
usersRouter.post("/", create);

// PATCH
usersRouter.patch("/:id", edit);

// DELETE
usersRouter.delete("/:id", drop);

module.exports = usersRouter;

// ▨ Syntax is not used
// usersRouter.get("/", async (req, res) => {
//   try {
//     const query = "select id, first_name, last_name, birth, gender from users";
//     const response = await postgreDatabase.query(query);
//     res.status(200).json({
//       data: response.rows,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       msg: "internal Server Error",
//     });
//   }
// });
// module.exports = usersRouter;
