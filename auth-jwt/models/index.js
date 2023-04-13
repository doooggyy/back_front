const Sequilize = require('sequelize');

const sequelize = new Sequilize('controlequiposcomputo', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const db = {};
db.Sequilize = Sequilize;
db.sequelize = sequelize;

module.exports = db;
