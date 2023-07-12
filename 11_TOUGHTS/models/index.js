const User = require('./User')
const Tought = require('./Tought')

Tought.belongsTo(User)
User.hasMany(Tought)

module.exports = { User, Tought }