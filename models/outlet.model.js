const Outlet = (sequelize, Sequelize) =>
    sequelize.define(
        'outlets',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            public_id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            address: {
                type: Sequelize.STRING,
            },

            is_active: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
            },
        },
    )

module.exports = Outlet
