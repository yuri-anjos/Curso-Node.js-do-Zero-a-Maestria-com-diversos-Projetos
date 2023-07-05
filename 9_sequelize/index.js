const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')

const { userRouter, addressRouter } = require('./routes/index')
const { User, Address } = require('./models/index')

const app = express()
const port = 3000

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api/user', userRouter)
app.use('/api/address', addressRouter)

app.get('/', async (req, res) => {
    const users = await User.findAll({ raw: true })
    res.render('home', { users })
})

app.get('/user/create', (req, res) => {
    res.render('adduser')
})

app.get('/user/:id', async (req, res) => {
    const { id } = req.params
    const user = await User.findOne({
        raw: true,
        where: { id: id }
    })

    res.render('userview', { user })
})

app.get('/user/edit/:id', async (req, res) => {
    const { id } = req.params

    const user = await User.findOne({
        include: Address,
        where: { id: id }
    })

    res.render('edituser', { user: user.get({ plain: true }) })
})

conn
    .sync()
    // .sync({ alter: true })
    .then(() => {
        app.listen(port, () => {
            console.info(`App rodando na porta ${port}.`)
        })
    }).catch((err) => {
        console.error(err)
    })