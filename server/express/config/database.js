const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/yoga_center.sqlite'
});

module.exports = sequelize;
