const express = require('express')
const exphbs = require('express-handlebars')

const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const conn = require('./db/conn')
const { toughtsRoutes, authRoutes } = require('./routes/index')
const { ToughtController } = require('./controllers/index')

const app = express()
const port = 3000

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// session middleware
app.use(session({
    name: 'session',
    secret: 'nosso_secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
        logFn: () => { },
        path: require('path').join(require('os').tmpdir(), 'sessions')
    }),
    cookie: {
        secure: false,
        maxAge: 3600000,
        httpOnly: true,
    }
}))

// flash messages
app.use(flash())

// set session to res
app.use((req, res, next) => {
    if (req.session.userid) {
        res.locals.session = req.session
    }

    next()
})

app.use('/toughts', toughtsRoutes)
app.use('/', authRoutes)

app.get('/', ToughtController.showToughts)

conn
    .sync()
    .then(() => {
        app.listen(port, () => {
            console.info(`App rodando na porta ${port}.`)
        })
    }).catch((error) => {
        console.error('Error: ' + error)
    })