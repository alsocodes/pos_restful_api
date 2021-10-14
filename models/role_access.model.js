const Role_Access = (sequelize, Sequelize) =>
    sequelize.define(
        'role_accesses',
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
            role_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
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
            modelName: 'roles',
        },
    )

module.exports = Role_Access
