const Sequelize = require('sequelize');

const sequelize = require('../utils/database');
const Message = sequelize.define('message', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    message: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: {}
    },
    // users: {
    //     type: Sequelize.JSON,
    //     defaultValue: [],
    //     allowNull: false
    // },
    to: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }


});

module.exports = Message;