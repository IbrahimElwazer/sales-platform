const Sequelize = require('sequelize');
const db = require('./database');

module.exports = db.sequelize.define(
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
        }
    }, {
        timestamps: false
    }
);