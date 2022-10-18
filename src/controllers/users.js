const {
  registerUsers,
  editPassword,
  editProfile,
  deleteAccount,
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
      res.status(401).send({
        message: error.detail,
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

  editProfile: async (req, res) => {
    try {
      const response = await editProfile(req.body, req.params);
      res.status(200).send({
        data: response.rows,
      });
    } catch (error) {
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },

  deleteAccount: async (req, res) => {
    try {
      const response = await deleteAccount(req.params);
      res.status(200).send({
        data: "User was delete successfully",
      });
    } catch (error) {
      res.status(500).send({
        message: "Internal Server Error",
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

module.exports = userController;
