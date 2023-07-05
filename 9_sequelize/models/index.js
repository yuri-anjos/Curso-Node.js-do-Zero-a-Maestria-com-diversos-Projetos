const User = require('./User')
const Address = require('./Address')

const associate = () => {
    Address.belongsTo(User)
    User.hasMany(Address)
}

associate()

module.exports = { User, Address }