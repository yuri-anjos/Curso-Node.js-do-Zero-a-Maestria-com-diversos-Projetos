const { DataTypes } = require('sequelize')
const { User } = require('./index')
const db = require('../db/conn')

const Address = db.define('Address', {
    street: {
        type: DataTypes.STRING,
        required: true,
    },
    number: {
        type: DataTypes.STRING,
        required: true,
    },
    city: {
        type: DataTypes.STRING,
        required: true,
    },
})

module.exports = Address