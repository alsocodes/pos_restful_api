const bcrypt = require('bcrypt');
const crypto = require('crypto');
const db = require('../../models');
const mailSender = require('../../utils/mailSender');
const response = require('../../utils/response');

exports.forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;

    let user = await db.user.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      user = await db.customer.findOne({
        where: {
          email: email,
        },
      });
      if (!user) {
        return response.error('User does not exist', res);
      }
    }

    const data = await db.sequelize.transaction(async (t) => {
      const token = await db.token.findOne(
        {
          where: { user_id: user.public_id },
        },
        { transaction: t }
      );

      if (token)
        await db.token.destroy({ where: { id: token.id } }, { transaction: t });

      const resetToken = crypto.randomBytes(32).toString('hex');

      const hash = await bcrypt.hash(resetToken, 10);

      const newToken = await db.token.create(
        {
          user_id: user.public_id,
          token: hash,
        },
        { transaction: t }
      );

      return { resetToken, newToken };
    });

    const mail = await mailSender({
      from: 'ne.nekonako@gmail.com',
      to: 'code.yuune@gmail.com',
      subject: 'Request reset password',
      text: `https://nekonako.me/resetPassword?token=${data.resetToken}&userId=${user.public_id}`,
    });

    if (!mail) {
      return response.error('Failed sending email', res);
    }

    return response.success('Send verification code is success', res, {
      user_id: data.newToken.user_id,
      token: data.resetToken,
      link: `https://nekonako.me/resetPassword?token=${data.resetToken}&userId=${user.public_id}`,
    });

  } catch (err) {
    console.log(err);
    return response.error(
      err.message || 'Send verification code is failed',
      res
    );
  }
};
