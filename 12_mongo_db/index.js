const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')

const { productsRoutes } = require('./routes')

const app = express()
const port = 3000

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/products', productsRoutes)

app.listen(port)