const express = require('express')
const exphbs = require('express-handlebars')

const conn = require('./db/conn')
const { Task } = require('./models/index')
const { tasksRoutes } = require('./routes/index')

const app = express()
const port = 3000

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/tasks', tasksRoutes)

app.get('/test', (req, res) => {
    res.send('Sucesso')
})

conn
    .sync()
    .then(() => {
        app.listen(port, () => {
            console.info(`App rodando na porta ${port}.`)
        })
    }).catch((err) => {
        console.error(err)
    })