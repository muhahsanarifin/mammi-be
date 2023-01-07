const { success, error } = require("../helpers/response");
const {
  registerUsers,
  checkDuplicateEmail,
  checkMaxDuplicatePhoneNumber,
  editPassword,
  editProfile,
  deleteAccount,
  getUsers,
  getProfileDetails,
  getProfileContacts,
} = require("../model/users");

const userController = {
  register: async (req, res) => {
    try {
      let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
      if (regex.test(req.body.email) === false) {
        return res.status(400).json({
          msg: "Format email is wrong",
        });
      }
      const chekcDuplicateEmail = await checkDuplicateEmail(req.body.email);
      if (chekcDuplicateEmail.rows.length > 0) {
        return res.status(400).json({
          msg: "Email has been registered",
        });
      }

      const checkduplicatephonenumber = await checkMaxDuplicatePhoneNumber(
        req.body.phone_number
      );
      if (checkduplicatephonenumber.rows.length >= 3) {
        return res.status(400).json({
          msg: "Phone number has used 3 users, please use new phone number",
        });
      }

      const response = await registerUsers(req.body);
      console.log(response);
      res.status(201).json({
        data: { ...response.rows[0], email: req.body.email },
        msg: "Create user successfully.",
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
        msg: "Password changed successfully",
      });
    } catch (objErr) {
      const statusCode = objErr.statusCode || 500;
      res.status(statusCode).json({
        msg: objErr.error,
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
        msg: "Profile updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        msg: "Internal Server Error",
      });
    }
  },

  deleteAccount: async (req, res) => {
    try {
      const response = await deleteAccount(req.userPayload.id); // ⇦ request userPayload
      console.log(response);
      res.status(200).json({
        msg: "User deleted successfully",
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

  getProfileContacts: async (req, res) => {
    try {
      const response = await getProfileContacts(req.userPayload.id); // ⇦ request userPayload
      success(res, 200, response.rows);
    } catch (err) {
      error(res, 500, err.message);
    }
  },

  getProfileDetails: async (req, res) => {
    try {
      const response = await getProfileDetails(req.userPayload.id); // ⇦ request userPayload
      success(res, 200, response.rows);
    } catch (err) {
      error(res, 500, err.message);
    }
  },
};

module.exports = userController;
