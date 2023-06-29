import express from "express"
import path from 'path'
import { fileURLToPath } from 'url';
const pathTemplate = path.join(path.dirname(fileURLToPath(import.meta.url)), '../templates')

const router = express.Router()

router.get('/', (req, res) => {
    const { page, limit } = req.query
    res.send(`Busca de usuários na página ${page} com ${limit} itens`)
})

router.get('/add', (req, res) => {
    res.sendFile(`${pathTemplate}/userform.html`)
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    res.send(`Usuário ${id}`)
})

router.post('/', (req, res) => {
    const { name, age } = req.body
    console.log(`O nome do usuário é ${name} e tem ${age} anos!`)
    res.sendFile(`${pathTemplate}/userform.html`)
})

export default router