const {
  getUsers,
  createUsers,
  editUsers,
  dropUsers,
} = require("../model/users");

const userController = {
  get: async (req, res) => {
    try {
      const response = await getUsers();
      res.status(200).send({
        data: response.rows,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        msg: "Internal Server Error",
      });
    }
  },

  create: async (req, res) => {
    try {
      const response = await createUsers(req.body);
      res.status(201).send({
        data: response,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        msg: "Internal Server Error",
      });
    }
  },

  edit: async (req, res) => {
    try {
      const response = await editUsers(req.body, req.params);
      res.status(200).send({
        data: response,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        msg: "Internal Server Error",
      });
    }
  },

  drop: async (req, res) => {
    try {
      const response = await dropUsers(req.params);
      res.status(200).send({
        data: response,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Internal Server Error",
      });
    }
  },
};

module.exports = userController;
