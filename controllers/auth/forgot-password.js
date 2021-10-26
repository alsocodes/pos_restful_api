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
          {
            [Op.or]:
              [
                { is_active: true },
                db.sequelize.where(db.sequelize.fn('date', db.sequelize.col('expire_at')), '<', db.sequelize.literal('CURRENT_TIMESTAMP')),
              ]
          }
        ]
      }
    })
    if (!checkToken) {
      let newToken = await db.token.create({

      })
    }
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

    return response.success(
      'Request forgot password success, please check email!',
      res,
      { checkToken },
      200
    );

  } catch (err) {
    console.log(err);
    return response.error(
      err.message || 'Send verification code is failed',
      res
    );
  }
};
