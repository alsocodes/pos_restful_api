const dbConfig = require('../config/db.config.js');
const Sequelize = require('sequelize');

const ssl = () => {
    if (process.env.NODE_ENV === 'production') {
        return {
            dialectOptions: {
                ssl: {
                    require: true,
                },
            },
        };
    }
    return {}
};

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,
    dialectOptions: ssl().dialectOptions,
    operatorsAlises: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
    define: {
        underscoredAll: true,
        underscored: true,
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.model.js')(sequelize, Sequelize);
db.role = require('./role.model.js')(sequelize, Sequelize);
db.menu = require('./menu.model.js')(sequelize, Sequelize);
db.sub_menu = require('./sub_menu.model.js')(sequelize, Sequelize);
db.role_access = require('./role_access.model.js')(sequelize, Sequelize);
db.outlet = require('./outlet.model.js')(sequelize, Sequelize);
db.outlet_user = require('./outlet_user.model.js')(sequelize, Sequelize);
db.general_option = require('./general_option.model.js')(sequelize, Sequelize);
db.shift = require('./shift.model.js')(sequelize, Sequelize);

db.user.belongsTo(db.role, { foreignKey: 'role_id' });
db.menu.hasMany(db.sub_menu, { foreignKey: 'menu_id' });
db.sub_menu.hasMany(db.role_access, { foreignKey: 'sub_menu_id' });
db.role.hasMany(db.role_access, { foreignKey: 'role_id' });

db.user.hasMany(db.outlet_user, { foreignKey: 'user_id' });
db.outlet.hasMany(db.outlet_user, { foreignKey: 'outlet_id' });
db.outlet.hasMany(db.shift, { foreignKey: 'outlet_id' });
db.user.hasMany(db.shift, { foreignKey: 'user_id' });

module.exports = db;
