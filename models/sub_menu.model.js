const Sub_Menu = (sequelize, Sequelize) =>
    sequelize.define(
        'sub_menus',
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
            menu_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },

            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            description: {
                type: Sequelize.STRING,
            },

            url: {
                type: Sequelize.STRING,
            },

            order: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            require_pin: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
            },
            is_active: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
            },
        },
        {
            sequelize,
            modelName: 'menus',
        },
    )

module.exports = Sub_Menu
