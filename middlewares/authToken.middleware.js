const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const response = require('../utils/response');

const authAccessToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return response.forbidden('Headers authorization is empty', res);
  }
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, config.accessSecret, (err, _) => {
    if (err) {
      console.log(err);
      return response.unauthorized(err.message, res);
    } else {
      next();
    }
  });
};

const authRefreshToken = (req, res, next) => {
  const refreshToken = req.headers.cookie.split('=');
  console.log(refreshToken.length)
  if (refreshToken.length != 2) {
    return response.unauthorized('Unauthorized', res);
  }
  jwt.verify(refreshToken[1], config.refreshSecret, (err, _) => {
    if (err) {
      console.log(err);
      return response.unauthorized(err.message || 'Unauthorized', res);
    } else {
      next();
    }
  });
};

module.exports = {
  authAccessToken,
  authRefreshToken,
};
