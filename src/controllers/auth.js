const { login, logout } = require("../model/auth");
const { success, error } = require("../helpers/res");

// const client = require("../config/redis");

const authController = {
  login: async (req, res) => {
    try {
      const { body } = req;
      const response = await login(body);
      // console.log(response);
      success(res, 200, {
        result: response,
        message: "Login was successfully",
      });
    } catch (objErr) {
      const statusCode = objErr.statusCode || 500;
      error(res, statusCode, { message: objErr.error.message });
    }
  },

  logout: async (req, res) => {
    try {
      const response = await logout(req.userPayload);
      // console.log(response);
      success(res, 200, {
        message: "Logout was successfully",
      });
    } catch (err) {
      error(res, 400, err.message);
    }
  },
};

module.exports = authController;
