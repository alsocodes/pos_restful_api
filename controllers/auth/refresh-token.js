const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config");
const response = require("../../utils/response");

exports.refreshToken = (req, res) => {
  try {
    const token = req.headers.cookie.split("=")[1];
    const decodedToken = jwt.verify(
      token,
      config.refreshSecret,
      (_, decoded) => decoded
    );
    const accessToken = jwt.sign(
      {
        email: decodedToken.email,
        id: decodedToken.id,
        role_name: decodedToken.role_name,
        role_access: decodedToken.role_access,
      },
      config.accessSecret,
      {
        expiresIn: config.jwtExp,
      }
    );
    const refreshToken = jwt.sign(
      {
        email: decodedToken.email,
        id: decodedToken.id,
        role_name: decodedToken.role_name,
        role_access: decodedToken.role_access,
      },
      config.refreshSecret,
      { expiresIn: config.jwtRefreshExp }
    );
    res.cookie("token", refreshToken, { httpOnly: true });
    return response.success("refresh token is success", res, {
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  } catch (err) {
    console.log(err);
    return response.error(err.message || "Get access token is failed", res);
  }
};
