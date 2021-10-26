const db = require("../../models");
const response = require("../../utils/response");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require("../../config/auth.config")
const { Op } = require("sequelize");
const { Sequelize } = require("../../models");

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

    let outlets = await db.outlet.findAll({
      attributes: ['public_id', 'name', 'address'],
      include: [{
        model: db.outlet_user,
        attributes: [],
        where: {
          user_id: user.id
        }
      }]
    });

    let role = await db.role.findOne({
      attributes: ['public_id', 'name'],
      where: { id: user.role_id }
    })

    let privileges = await db.access.findAll({
      raw: true,
      attributes: [
        'name',
        [Sequelize.col('sub_menu.menu.public_id'), 'menu_id'],
        [Sequelize.col('sub_menu.menu.name'), 'menu'],
        [Sequelize.col('sub_menu.menu.type'), 'menu_type'],
        [Sequelize.col('sub_menu.public_id'), 'sub_menu_id'],
        [Sequelize.col('sub_menu.name'), 'sub_menu']
      ],
      include: [
        {
          model: db.role_access,
          attributes: [],
          where: { role_id: user.role_id },
          required: true
        },
        {
          model: db.sub_menu,
          as: 'sub_menu',
          attributes: [],
          include: [
            {
              model: db.menu,
              as: 'menu',
              attributes: [],
            }
          ]
        }]
    })

    return response.success("Login is successfull", res, {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: {
        public_id: user.public_id,
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        role_id: role.public_id,
        role: role.name,
        outlets: outlets,
        privileges: privileges
      }
    }, 200);
  } catch (err) {
    console.log(err);
    return response.error(err.message || "Failed to login", res);
  }
};