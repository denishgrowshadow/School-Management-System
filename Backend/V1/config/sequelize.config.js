const { Sequelize } = require('sequelize');
const ENV = require('./env.Config');

const sequelize = new Sequelize(ENV.DB_NAME, ENV.DB_USER, ENV.DB_PASS, {
    host: ENV.DB_HOST,
    dialect: 'mysql',
});

const db = {};
db.Sequelize = Sequelize;       
db.sequelize = sequelize;

module.exports = db;

