const express = require('express')
const { User } = require('../models/index')

const router = express.Router()

router.post('/', async (req, res) => {
    const { name, occupation, newsletter } = req.body
    const bolNewsletter = newsletter === 'on'
    await User.create({ name, occupation, newsletter: bolNewsletter })
    res.redirect('/')
})

router.post('/edit', async (req, res) => {
    let data = req.body
    data.newsletter = data.newsletter === 'on'
    await User.update(data, { where: { id: data.id } })
    res.redirect('/')
})

router.post('/delete/:id', async (req, res) => {
    const { id } = req.params
    await User.destroy({
        where: { id: id }
    })
    res.redirect('/')
})

module.exports = router