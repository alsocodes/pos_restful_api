const db = require('../models');

const createOutlet = async () => {
    return await db.outlet.create({
        name: "Outlet 01",
        address: "Jl Ir Soekarno-Hatta 17 Surabaya"
    })
}

const createOutletUser = async (outlet_id, user_id) => {
    return await db.outlet_user.create({
        outlet_id: outlet_id,
        user_id: user_id
    })
}

module.exports = { createOutlet, createOutletUser };