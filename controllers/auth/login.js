const db = require("../../models");
const response = require("../../utils/response");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require("../../config/auth.config")
const { Op } = require("sequelize");

exports.login = async (req, res) => {
  try {
    const from = req.body.from;
    const email = req.body.email;
    const password = req.body.password;

    if (!from || !email || !password) {
      return response.invalidInput(
        "email, password and from cannot be empty",
        res
      );
    }

    let user, accessToken, refreshToken;
    user = await db.user.findOne({
      where: {
        // email: email
        [Op.or]: [{ email: email }, { phone_number: email }],
      },
      include: {
        model: db.role,
      },
    });

    if (!user) {
      return response.forbidden("Wrong Email/phone or password", res);
    }

    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      return response.forbidden("Wrong username or password", res);
    }

    accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        phone_number: user.phone_number,
        role_id: user.role_id
      },
      config.accessSecret,
      {
        expiresIn: config.jwtExp,
      }
    );

    refreshToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        phone_number: user.phone_number,
        role_id: user.role_id
      },
      config.refreshSecret,
      {
        expiresIn: config.jwtRefreshExp,
      }
    );

    res.cookie("token", refreshToken, { httpOnly: true });
    return response.success("Login is successfull", res, {
      access_token: accessToken,
      refresh_token: refreshToken,
    }, 200);
  } catch (err) {
    console.log(err);
    return response.error(err.message || "Failed to login", res);
  }
};