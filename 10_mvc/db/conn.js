const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('node_mvc', 'root', 'root',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
)

module.exports = sequelize