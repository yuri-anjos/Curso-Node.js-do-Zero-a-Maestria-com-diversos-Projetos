import express from 'express'
import userRouter from './routes/user.js'
import path from 'path'
import { fileURLToPath } from 'url';
const pathTemplate = path.join(path.dirname(fileURLToPath(import.meta.url)), 'templates')

const port = 3000
const app = express()

const checkAuth = (req, res, next) => {
    req.authStatus = true

    if (req.authStatus) {
        console.log('Está logado')
    } else {
        console.log('Não está logado')
    }

    next()
}

// application middleware
app.use(checkAuth)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.use('/user', userRouter)

app.get('/', (req, res) => {
    res.sendFile(`${pathTemplate}/home.html`)
})

app.use((req, res, next) => {
    res.status(404).sendFile(`${pathTemplate}/404.html`)
})

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})
