const Shift = (sequelize, Sequelize) =>
    sequelize.define(
        'shifts',
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

            outlet_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            start_time: {
                type: Sequelize.DATE,
                allowNull: false
            },
            end_time: {
                type: Sequelize.DATE,
                allowNull: true
            },
            init_cash: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            sys_cash: {
                type: Sequelize.FLOAT,
                allowNull: true
            },
            real_cash: {
                type: Sequelize.FLOAT,
                allowNull: true
            },
            diff_cash: {
                type: Sequelize.FLOAT,
                allowNull: true
            },

            is_active: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
            },

        },
    )

module.exports = Shift
