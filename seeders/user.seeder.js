const db = require('../models');
const bcrypt = require('bcrypt');

const createRole = async (name) => {
    return await db.role.create({
        name: name
    })
}

const createSuperUser = async () => {
    const role = await createRole("super admin");
    if (role) {
        return await db.user.create({
            name: 'Also codes',
            email: 'alsocodes@gmail.com',
            phone_number: '082245307059',
            password: await bcrypt.hash('123456', 10),
            role_id: role.id,
        });
    }
}

module.exports = { createSuperUser }