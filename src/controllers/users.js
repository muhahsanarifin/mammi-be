const {
  registerUsers,
  editPassword,
  getUsers,
  getUser,
} = require("../model/users");

// ▣ New Script
const userController = {
  register: async (req, res) => {
    try {
      const { body } = req;
      const response = await registerUsers(body);
      res.status(201).send({
        message: "Created was successfully.",
        data: { ...response.rows[0], email: body.email },
      });
    } catch (error) {
      res.status(500).send({
        message: "Inter Server Error",
      });
    }
  },

  editPassword: async (req, res) => {
    try {
      const { body } = req;
      const response = await editPassword(body);
      res.status(200).send({
        message: "Password has been changed",
        data: null,
      });
    } catch (objErr) {
      const statusCode = objErr.statusCode || 500;
      res.status(statusCode).send({
        message: objErr.error.message,
      });
    }
  },

  gets: async (req, res) => {
    try {
      const response = await getUsers();
      res.status(200).send({
        data: response.rows,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },

  get: async (req, res) => {
    try {
      const response = await getUser(req.params);
      res.status(200).send({
        data: response.rows,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },
};

// ▢ Old Script
// const userController = {
//   get: async (req, res) => {
//     try {
//       const response = await getUsers();
//       res.status(200).send({
//         data: response.rows,
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({
//         msg: "Internal Server Error",
//       });
//     }
//   },

//   create: async (req, res) => {
//     try {
//       const response = await createUsers(req.body);
//       res.status(201).send({
//         data: response,
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({
//         msg: "Internal Server Error",
//       });
//     }
//   },

//   edit: async (req, res) => {
//     try {
//       const response = await editUsers(req.body, req.params);
//       res.status(200).send({
//         data: response,
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({
//         msg: "Internal Server Error",
//       });
//     }
//   },

//   drop: async (req, res) => {
//     try {
//       const response = await dropUsers(req.params);
//       res.status(200).send({
//         data: response,
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({
//         msg: "Internal Server Error",
//       });
//     }
//   },
// };

module.exports = userController;
