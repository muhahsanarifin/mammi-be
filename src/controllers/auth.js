const { login } = require("../model/auth");
const { success, error } = require("../helpers/res");

const authController = {
  login: async (req, res) => {
    try {
      const { body } = req;
      const response = await login(body);
      console.log(response);
      success(res, 200, {
        data: response,
        message: "Login was successfully",
      });
    } catch (objErr) {
      const statusCode = objErr.statusCode || 500;
      error(res, statusCode, { message: objErr.error.message });
    }
  },

  logout: async (req, res) => {
    try {
      const response = await logout(req.header("x-access-token"));
      console.log(response);
      success(res, 200, {
        data: response,
        message: " Logout was successfully.",
      });
    } catch (objErr) {
      const statusCode = objErr.statusCode || 500;
      error(res, statusCode, { message: objErr.message });
    }
  },
};

module.exports = authController;
