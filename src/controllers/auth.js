const { login, logout } = require("../model/auth");
const { success, error } = require("../helpers/response");
// const client = require("../config/redis");

const authController = {
  login: async (req, res) => {
    try {
      const { body } = req;
      const response = await login(body);
      // console.log(response);
      success(res, 200, {
        data: response,
        msg: "Login successfully",
      });
    } catch (objErr) {
      const statusCode = objErr.statusCode || 500;
      error(res, statusCode, { msg: objErr.error.message });
    }
  },

  logout: async (req, res) => {
    try {
      const response = await logout(req.userPayload);
      // console.log(response);
      success(res, 200, {
        msg: "Logout successfully",
      });
    } catch (err) {
      error(res, 400, err.message);
    }
  },
};

module.exports = authController;
