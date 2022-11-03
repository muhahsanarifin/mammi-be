const { success, error } = require("../helpers/res");
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
      const response = await editPassword(req.body, req.userPayload.id);
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
        const imageURL = `images/${req.file.name}`;
        req.body.picture = imageURL;
      }
      const response = await editProfile(req.body, req.userPayload.id);
      res.status(200).json({
        resutl: response.rows,
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
      console.log(response);
      res.status(200).json({
        message: "User was deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  gets: async (req, res) => {
    try {
      const url = `${req.protocol}://${req.hostname}/api/v1`;
      const response = await getUsers(req.query, url);
      success(res, 200, response);
    } catch (err) {
      error(res, 500, err.message);
    }
  },

  get: async (req, res) => {
    try {
      const response = await getUser(req.userPayload.id);
      success(res, 200, response.rows);
    } catch (err) {
      error(res, 500, err.message);
    }
  },
};

module.exports = userController;
