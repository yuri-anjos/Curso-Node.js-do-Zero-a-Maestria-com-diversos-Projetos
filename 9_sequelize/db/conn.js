const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('sequelize', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
})

// try {
//     sequelize.authenticate()
//     console.info(`Sequelize conectado ao banco de dados!`)
// } catch (error) {
//     console.error(`Não foi possível conectar: ${error}`)
// }

module.exports = sequelize