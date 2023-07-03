const express = require('express')
const exphbs = require('express-handlebars')
const { pool } = require('./db/conn')

// const conn = mysql.createConnection({
//     port: 3306,
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'node_mysql',
// })

const app = express()
const port = 3000

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/book', (req, res) => {
    const sql = `SELECT * FROM book`
    pool.query(sql, (err, data) => {
        if (err) {
            console.error(err)
            return
        }

        res.render('books', { books: data })
    })
})

app.get('/book/:id', (req, res) => {
    const { id } = req.params
    const sql = `SELECT * FROM book WHERE ?? = ?`
    const data = ['id', id]
    pool.query(sql, data, (err, data) => {
        if (err) {
            console.error(err)
            return
        }

        res.render('book', { book: data[0] })
    })
})

app.get('/book/edit/:id', (req, res) => {
    const { id } = req.params
    const sql = `SELECT * FROM book WHERE ?? = ?`
    const data = ['id', id]
    pool.query(sql, data, (err, data) => {
        if (err) {
            console.error(err)
            return
        }

        res.render('editbook', { book: data[0] })
    })
})

app.post('/api/book', (req, res) => {
    const { title, page_qty } = req.body
    const sql = `INSERT INTO book (??, ??) VALUES (?, ?)`
    const data = ['title', 'page_qty', title, page_qty]
    pool.query(sql, data, (err) => {
        if (err) {
            console.error(err)
            return
        }

        res.redirect('/')
    })
})

app.post('/api/book/update', (req, res) => {
    const { id, title, page_qty } = req.body
    const sql = `UPDATE book SET ?? = ?, ?? = ? WHERE ?? = ?`
    const data = ['title', title, 'page_qty', page_qty, 'id', id]
    pool.query(sql, data, (err) => {
        if (err) {
            console.error(err)
            return
        }

        res.redirect(`/book/${id}`)
    })
})

app.post('/api/book/delete/:id', (req, res) => {
    const { id } = req.params
    const sql = `DELETE FROM book WHERE ?? = ?`
    const data = ['id', id]
    pool.query(sql, data, (err) => {
        if (err) {
            console.error(err)
            return
        }

        res.redirect(`/book`)
    })
})

// conn.connect((err) => {
//     if (err) {
//         console.error(err)
//         return
//     }

//     console.info('App conectado ao MySQL')

//     app.listen(port, () => {
//         console.info(`App rodando na porta ${port}.`)
//     })
// })

app.listen(port, () => {
    console.info(`App rodando na porta ${port}.`)
})
