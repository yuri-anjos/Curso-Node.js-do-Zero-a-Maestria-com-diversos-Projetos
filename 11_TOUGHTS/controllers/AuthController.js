const { User } = require('../models/index')
const bcrypt = require('bcryptjs')

module.exports = class AuthController {
    static login(req, res) {
        res.render('auth/login')
    }

    static register(req, res) {
        res.render('auth/register')
    }

    static async loginApi(req, res) {
        const { email, password } = req.body

        const user = await User.findOne({ raw: true, where: { email } })
        if (!user) {
            req.flash('message', 'Email ou senha incorretos!')
            res.render('auth/login')
            return
        }

        const isPasswordMatch = bcrypt.compareSync(password, user.password)

        if (!isPasswordMatch) {
            req.flash('message', 'Email ou senha incorretos!')
            res.render('auth/login')
            return
        }

        req.session.userid = user.id
        req.session.save(() => {
            res.redirect('/')
        })
    }

    static async registerApi(req, res) {
        const { username, email, password, confirmPassword } = req.body

        if (password != confirmPassword) {
            req.flash('message', "As senhas não conferem, tente novamente!")
            res.render('auth/register')
            return
        }

        const checkIfUserExists = await User.findOne({ where: { email } })

        if (checkIfUserExists) {
            req.flash('message', "Email já está em uso!")
            res.render('auth/register')
            return
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const user = { username, email, password: hash }

        try {
            const createdUser = await User.create(user)

            req.flash('message', 'Cadastro realizado com sucesso!')

            req.session.userid = createdUser.id
            req.session.save(() => {
                res.redirect('/')
            })
        } catch (error) {
            console.error('Error: ' + error)
        }
    }

    static async logout(req, res) {
        req.session.destroy()
        res.redirect('/')
    }
}