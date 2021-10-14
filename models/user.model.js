const User = (sequelize, Sequelize) =>
    sequelize.define(
        'users',
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
            username: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            pin: {
                type: Sequelize.STRING,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false,
            },
            phone_number: {
                type: Sequelize.STRING,
                allowNull: true,
                unique: true,
            },
            is_active: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
            },
            role_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'roles',
        },
    )

module.exports = User
