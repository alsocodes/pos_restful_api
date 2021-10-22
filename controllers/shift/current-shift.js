const db = require('../../models');
const helper = require('../../utils/helper');
const response = require('../../utils/response');
const { Op } = require("sequelize");

exports.currentShift = async (req, res) => {
    // res.send(req.body)
    // res.send(req.params)
    try {

        const outlet = await db.outlet.findOne({ where: { public_id: req.params.outlet_id } })
        if (!outlet) {
            return response.invalidInput("Outlet id not available", res);
        }

        const shift = await db.shift.findOne({ where: { outlet_id: outlet.id } })
        if (!shift) {
            return response.invalidInput("No current shift running", res);
        }

        return response.success('Current shift is running', res, shift, 201);
    } catch (err) {
        console.log(err);
        return response.error(err.message || 'Failed get shift', res);
    }
};
