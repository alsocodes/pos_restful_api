const Access = (sequelize, Sequelize) =>
    sequelize.define(
        'access',
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
            sub_menu_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
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
        {
            sequelize,
            modelName: 'role_accesses',
        },
    )

module.exports = Access
