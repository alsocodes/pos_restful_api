const bcrypt = require("bcrypt");
const db = require("../../models");
const helper = require("../../utils/helper");
const mailSender = require("../../utils/mailSender");
const response = require("../../utils/response");

exports.resetPassword = async (req, res) => {
  try {
    const user_id = req.body.user_id;
    const token = req.body.token;
    const password = req.body.password;
    const resetToken = await db.token.findOne({ where: { user_id: user_id } });

    if (!resetToken) {
      return response.forbidden(
        "Invalid or expired password reeset token",
        res
      );
    }

    const isValidToken = await bcrypt.compare(token, resetToken.token);
    if (!isValidToken) {
      return response.forbidden(
        "Invalid or expired password reeset token",
        res
      );
    }
    const isvalidPassword = helper.checkPassword(password);
    if (!isvalidPassword) {
      return response.error(
        "Invalid password, passwor must at lest 8 character",
        res
      );
    }
    const passHashed = await helper.hashPassword(res, password);
    let updatePassword = await db.user.update(
      { password: passHashed },
      { where: { public_id: resetToken.user_id } }
    );
    const sendMail = await mailSender({
      from: "ne.nekonako@gmail.com",
      to: "code.yuune@gmail.com",
      subject: "Request reset password successfully",
      text: `Reset password successfully`,
    });
    const deleteToken = await resetToken.destroy();
    if (updatePassword && sendMail && deleteToken) {
      return response.success("Reset password was successfull", res);
    } else {
      return response.error("Reset password is failed", res);
    }
  } catch (err) {
    console.log(err);
    return response.error("Reset password is failed", res);
  }
};
