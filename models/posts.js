const Sequelize = require('sequelize');
const sequelize = require('../database').sequelize;

module.exports = sequelize.define(
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
            type: Sequelize.DECIMAL(10,2)
        },
        postDate: {
            type: Sequelize.DATEONLY
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