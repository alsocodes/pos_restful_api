const Role = (sequelize, Sequelize) =>
    sequelize.define(
        'roles',
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

            is_active: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
            },
        },
        {
            sequelize,
            modelName: 'users',
        },
    )

module.exports = Role
