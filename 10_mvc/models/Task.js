const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Task = db.define('Task', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    done: {
        type: DataTypes.BOOLEAN,
        allowNull: false,

    },
})

module.exports = Task