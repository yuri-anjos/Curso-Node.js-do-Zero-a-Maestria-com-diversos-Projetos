const express = require('express')
const { Address } = require('../models/index')

const router = express.Router()

router.post('/', async (req, res) => {
    const { UserId, street, number, city } = req.body
    await Address.create({ UserId, street, number, city })
    res.redirect(`/user/edit/${UserId}`)
})

router.post('/delete', async (req, res) => {
    const { id, UserId } = req.body
    await Address.destroy({ where: { id: id } })
    res.redirect(`/user/edit/${UserId}`)
})

module.exports = router