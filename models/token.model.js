const Token = (sequelize, Sequelize) =>
    sequelize.define(
        'tokens',
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
            token: {
                type: Sequelize.STRING,
                allowNull: false
            },
            type: {
                type: Sequelize.ENUM("forgot-password", "authorization"),
            },
            expire_at: {
                type: Sequelize.DATE,
                allowNull: false,
                // defaultValue: sequelize.literal('NOW() + INTERVAL 1 hour'),
                //defaultValue: new Date((new Date()).getTime() + 3600000)
            },

            is_active: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
            },

        },
    )

module.exports = Token
