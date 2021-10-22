const db = require('../models');

let general_options = [
    {
        key: "shift_option",
        value: "on"
    },
    {
        key: "default_cash_drawer",
        value: "100000"
    },
]

const initOption = async () => {
    Promise.all(general_options.map(async (item) => {
        await db.general_option.create({
            key: item.key,
            value: item.value
        })

    }))

}

module.exports = { initOption };