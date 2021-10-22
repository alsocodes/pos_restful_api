const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const response = require('./response.js');

const hashPassword = async (res, password) => {
  if (password == null) {
    return response.error('Password cannot be empty', res, 500);
  }
  return await bcrypt.hash(password, 10);
};

const validatePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

const validateToken = (token, secretKey) =>
  jwt.verify(token, secretKey, (err, decoded) => (err ? err : decoded));

function validateEmail(email) {
  const splitEmail = email.split('@');
  if (splitEmail.length < 2) {
    return false;
  }
  return true;
}

function checkPassword(password) {
  if (password.length < 8) {
    return false;
  }
  return true;
}

module.exports = {
  hashPassword,
  validatePassword,
  validateToken,
  validateEmail,
  checkPassword,
};
