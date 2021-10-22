const db = require('../../models');
const helper = require('../../utils/helper');
const response = require('../../utils/response');
const { Op } = require("sequelize");

exports.create = async (req, res) => {
    // res.send(req.body)

    try {

        const outlet = await db.outlet.findOne({ where: { public_id: req.body.outlet_id } })
        if (!outlet) {
            return response.invalidInput("Outlet id not available", res);
        }
        const user = await db.user.findOne({ where: { public_id: req.body.user_id } })
        if (!user) {
            return response.invalidInput("User id not available", res);
        }

        const adashift = await db.shift.findOne({
            where: {
                [Op.and]: [{ outlet_id: outlet.id }, { end_time: null }],
            }
        })

        if (adashift) {
            return response.invalidInput("You can not create shift while current shift is still running", res);
        }

        await db.shift.create({
            outlet_id: outlet.id,
            user_id: user.id,
            start_time: new Date(),
            init_cash: req.body.init_cash
        });

        return response.success('Create shift success', res, {}, 201);
    } catch (err) {
        console.log(err);
        return response.error(err.message || 'Failed create shift', res);
    }
};
