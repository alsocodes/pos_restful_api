const Menu = (sequelize, Sequelize) =>
    sequelize.define(
        'menus',
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
                unique: true,
            },

            type: {
                type: Sequelize.ENUM("pending", "cancelled", "paid"),
                allowNull: false,
            },

            order: {
                type: Sequelize.INTEGER,
                allowNull: false
            },

            is_active: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
            },
        },
        {
            sequelize,
            modelName: 'sub_menus',
        },
    )

module.exports = Menu
