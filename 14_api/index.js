const express = require('express')

const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: 'Primeira Rota' })
})

app.post('/product', (req, res) => {
    const { name, price } = req.body

    if (!name || !price) {
        res.status(422).json({ message: 'Os campos Nome e Preço são obrigatórios!' })
        return
    }

    res.status(201).json({ id: 1, name, price })
})

app.listen(port)