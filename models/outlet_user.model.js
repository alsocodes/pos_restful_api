const OutletUser = (sequelize, Sequelize) =>
    sequelize.define(
        'outlet_users',
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
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            outlet_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },

            is_active: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
            },
        },
        // {
        //     sequelize,
        //     modelName: 'roles',
        // },
    )

module.exports = OutletUser