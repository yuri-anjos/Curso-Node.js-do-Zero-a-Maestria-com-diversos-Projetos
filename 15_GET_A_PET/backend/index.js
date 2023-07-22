const express = require('express')
const cors = require('cors')
const { UserRoutes, PetRoutes } = require('./routes')

const port = 5000
const app = express()

app.use(express.json())
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.static('public'))

app.use('/user', UserRoutes)
app.use('/pet', PetRoutes)

app.get('/', (req, res) => {
    res.json('Teste')
})

app.listen(port)