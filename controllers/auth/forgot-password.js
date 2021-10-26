const bcrypt = require('bcrypt');
const crypto = require('crypto');
const db = require('../../models');
const mailSender = require('../../utils/mailSender');
const response = require('../../utils/response');
const { Op } = require("sequelize");
const { devNull } = require('os');

exports.forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;

    let user = await db.user.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      return response.invalidInput('User does not exist', res);
    }

    // const token = crypto.randomBytes(32).toString('hex');

    let checkToken = await db.token.findOne({
      where: {
        [Op.and]: [
          { user_id: user.id },
          { is_active: true },
          {
            expire_at: {
              [Op.gt]: new Date((new Date()).getTime())
            }
          }
          //db.sequelize.where(db.sequelize.fn('date', db.sequelize.col('expire_at')), '>', db.sequelize.literal('CURRENT_TIMESTAMP')),
          // {
          //   [Op.and]:
          //     [

          //     ]
          // }
        ]
      }
    })
    let tempToken;
    if (!checkToken) {
      let token = await bcrypt.hash(crypto.randomBytes(32).toString('hex'), 10)
      tempToken = await db.token.create({
        user_id: user.id,
        type: 'forgot-password',
        token: token,
        expire_at: new Date((new Date()).getTime() + 3600000)
      })
    } else {
      tempToken = await db.token.update(
        {
          expire_at: new Date((new Date()).getTime() + 3600000),
        },
        {
          where: { id: checkToken.id },
          returning: true,
        }
      )
    }

    return response.success(
      'Request forgot password success, please check email!',
      res,
      { checkToken, time: db.sequelize.literal('CURRENT_TIMESTAMP') },
      200
    );
    //console.log(checkToken)

    // const hash = await bcrypt.hash(resetToken, 10);

    // const data = await db.sequelize.transaction(async (t) => {
    //   const token = await db.token.findOne(
    //     {
    //       where: { user_id: user.public_id },
    //     },
    //     { transaction: t }
    //   );

    //   if (token)
    //     await db.token.destroy({ where: { id: token.id } }, { transaction: t });

    //   const resetToken = crypto.randomBytes(32).toString('hex');

    //   const hash = await bcrypt.hash(resetToken, 10);

    //   const newToken = await db.token.create(
    //     {
    //       user_id: user.public_id,
    //       token: hash,
    //     },
    //     { transaction: t }
    //   );

    //   return { resetToken, newToken };
    // });

    // proses send email
    // const mail = await mailSender({
    //   from: 'ne.nekonako@gmail.com',
    //   to: 'code.yuune@gmail.com',
    //   subject: 'Request reset password',
    //   text: `https://nekonako.me/resetPassword?token=${data.resetToken}&userId=${user.public_id}`,
    // });

    // if (!mail) {
    //   return response.error('Failed sending email', res);
    // }



  } catch (err) {
    console.log(err);
    return response.error(
      err.message || 'Send verification code is failed',
      res
    );
  }
};
