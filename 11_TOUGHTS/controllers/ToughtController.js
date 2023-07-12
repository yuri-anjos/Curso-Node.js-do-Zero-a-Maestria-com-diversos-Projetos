const { User, Tought } = require('../models/index')
const { Op } = require('sequelize')

module.exports = class ToughtsController {
    static async showToughts(req, res) {
        const search = req.query.search || ''
        const order = req.query.order || 'desc'
        const page = req.query.page || 1

        const data = await Tought.findAll({
            include: User,
            where: {
                title: { [Op.like]: `%${search}%` }
            },
            order: [['createdAt', order]],
            limit: 3,
            offset: 3 * (page - 1),
        })

        const toughts = data.map((value) => value.get({ plain: true }))
        const count = toughts.length

        res.render('toughts/home', { toughts, search, count })
    }

    static async dashboard(req, res) {
        const UserId = req.session.userid

        const user = await User.findOne({ where: { id: UserId }, include: Tought, plain: true })
        if (!user) {
            res.redirect('/login')
            return
        }

        const toughts = user.Toughts.map((value) => value.dataValues);
        const emptyToughts = toughts.length === 0
        res.render('toughts/dashboard', { toughts, emptyToughts })
    }

    static createTought(req, res) {
        res.render('toughts/create')
    }

    static async createToughtApi(req, res) {
        const tought = {
            title: req.body.title,
            UserId: req.session.userid
        }

        try {
            await Tought.create(tought)
            req.flash('message', 'Pensamento criado com sucesso!')
            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        } catch (error) {
            console.error('Error: ' + error)
        }
    }

    static async editTought(req, res) {
        const { id } = req.params
        const UserId = req.session.userid

        const tought = await Tought.findOne({ raw: true, where: { id, UserId } })
        res.render('toughts/edit', { tought })
    }

    static async editToughtApi(req, res) {
        const { id, title } = req.body
        const UserId = req.session.userid

        try {
            await Tought.update({ title }, { where: { id, UserId } })
            req.flash('message', 'Pensamento alterado com sucesso!')
            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        } catch (error) {
            console.error('Error: ' + error)
        }
    }


    static async deleteToughtApi(req, res) {
        const { id } = req.params
        const UserId = req.session.userid

        try {
            await Tought.destroy({ where: { id, UserId } })
            req.flash('message', 'Pensamento deletado com sucesso!')
            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        } catch (error) {
            console.error('Error: ' + error)
        }
    }
}