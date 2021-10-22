const { login } = require("./login");
const { forgotPassword } = require("./forgot-password");
const { refreshToken } = require("./refresh-token");
const { resetPassword } = require("./reset-password");

module.exports = {
  login,
  refreshToken,
  forgotPassword,
  resetPassword,
};
