const Sequelize = require('sequelize');
const sequelize = require('../database').sequelize;

module.exports = sequelize.define(
    'users',
    {
        ID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    }
);