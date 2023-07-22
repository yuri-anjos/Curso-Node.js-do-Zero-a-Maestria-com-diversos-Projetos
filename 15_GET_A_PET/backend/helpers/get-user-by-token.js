const jwt = require('jsonwebtoken')
const { User } = require('../models')

const getUserByToken = async (token) => {
    const decoded = jwt.verify(token, 'secret')
    const user = await User.findById(decoded.id)
    return user
}

module.exports = getUserByToken