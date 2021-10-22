const GeneralOption = (sequelize, Sequelize) =>
    sequelize.define(
        'generalOption',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },

            key: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            value: {
                type: Sequelize.STRING,
                allowNull: false
            },
            is_active: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
            },

        },
    )

module.exports = GeneralOption
