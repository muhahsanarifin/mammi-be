const {
  registerUsers,
  editPassword,
  editProfile,
  deleteAccount,
  getUsers,
  getUser,
} = require("../model/users");

const userController = {
  register: async (req, res) => {
    try {
      const { body } = req;
      const response = await registerUsers(body);
      res.status(201).json({
        message: "Create user was successfully.",
        data: { ...response.rows[0], email: body.email },
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Erorr", // ◬ Issues
      });
    }
  },

  editPassword: async (req, res) => {
    try {
      const { body } = req;
      const response = await editPassword(body);
      console.log(response);
      res.status(200).json({
        message: "Password was changed successfully",
        data: null,
      });
    } catch (objErr) {
      const statusCode = objErr.statusCode || 500;
      res.status(statusCode).json({
        message: objErr.error,
      });
    }
  },

  editProfile: async (req, res) => {
    try {
      if (req.file) {
        req.body.picture = req.file.path;
      }
      const response = await editProfile(req.body, req.params);
      response.rows[0].picture = `images/${req.file.filename}`;
      res.status(200).json({
        data: response.rows,
        message: "Profile was updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  deleteAccount: async (req, res) => {
    try {
      const response = await deleteAccount(req.params);
      res.status(200).json({
        data: "User was deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  gets: async (req, res) => {
    try {
      const response = await getUsers(req.query);
      res.status(200).json({
        data: response.rows,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  get: async (req, res) => {
    try {
      const response = await getUser(req.params);
      res.status(200).json({
        data: response.rows,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
};

module.exports = userController;
