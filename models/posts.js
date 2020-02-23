const Sequelize = require('sequelize');
const db = require('./database');

module.exports = db.sequelize.define(
    'posts',
    {
        ID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        category: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        country: {
            type: Sequelize.STRING
        },
        images: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.FLOAT
        },
        postDate: {
            type: Sequelize.DATE
        },
        deliveryType: {
            type: Sequelize.STRING
        },
        sellerName: {
            type: Sequelize.STRING
        },
        mobile: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    }
);