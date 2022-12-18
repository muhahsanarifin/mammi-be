const { success, error } = require("../helpers/res");
const {
  registerUsers,
  editPassword,
  editProfile,
  deleteAccount,
  getUsers,
  getProfile,
  getUser,
} = require("../model/users");

const userController = {
  register: async (req, res) => {
    try {
      const { body } = req;
      const response = await registerUsers(body);
      res.status(201).json({
        data: { ...response.rows[0], email: body.email },
        message: "Create user was successfully.",
      });
    } catch (err) {
      error(res, 500, err.message);
    }
  },

  editPassword: async (req, res) => {
    try {
      const response = await editPassword(req.body, req.userPayload.id); // ⇦ request userPayload
      console.log(response);
      res.status(200).json({
        data: null,
        message: "Password was changed successfully",
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
        const imageURL = req.file.secure_url;
        req.body.picture = imageURL;
      }
      const response = await editProfile(req.body, req.userPayload.id); // ⇦ request userPayload
      res.status(200).json({
        result: response.rows,
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
      const response = await deleteAccount(req.userPayload.id); // ⇦ request userPayload
      console.log(response);
      res.status(200).json({
        message: "User was deleted successfully",
      });
    } catch (err) {
      error(res, 500, err.message);
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
      const response = await getUser(req.userPayload.id); // ⇦ request userPayload
      success(res, 200, response.rows);
    } catch (err) {
      error(res, 500, err.message);
    }
  },

  getProfile: async (req, res) => {
    try {
      const response = await getProfile(req.userPayload.id); // ⇦ request userPayload
      success(res, 200, response.rows);
    } catch (err) {
      error(res, 500, err.message);
    }
  },
};

module.exports = userController;
