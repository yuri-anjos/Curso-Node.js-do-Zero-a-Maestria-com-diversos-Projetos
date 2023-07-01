import express from 'express'
import exphbs from 'express-handlebars'

const app = express()
const port = 3000

const hbs = exphbs.create({
    partialsDir: ['views/partials'],
})
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => {
    const user = {
        name: 'Yuri',
        surname: 'França'
    }

    const auth = true
    const approved = true
    res.render('home', { user, auth, approved })
})

app.get('/blog', (req, res) => {
    const posts = [
        {
            title: 'Aprender NodeJS',
            category: 'Javascript',
            body: 'Este artigo vai te fazer aprender nodejs do básico ao avançado...',
            comments: 10
        },
        {
            title: 'Aprender PHP',
            category: 'PHP',
            body: 'Este artigo vai te fazer aprender php do básico ao avançado...',
            comments: 1
        },
        {
            title: 'Aprender Python',
            category: 'Python3',
            body: 'Este artigo vai te fazer aprender python do básico ao avançado...',
            comments: 5
        }
    ]

    res.render('blog', { posts })
})

app.get('/dashboard', (req, res) => {
    const items = [
        { name: 'Bola', color: 'azul' },
        { name: 'Cachorro', color: 'Caramelo' },
        { name: 'Mesa', color: 'branco' }
    ]
    res.render('dashboard', { items })
})

app.get('/post', (req, res) => {
    const post = {
        title: 'Aprender NodeJS',
        category: 'Javascript',
        body: 'Este artigo vai te fazer aprender nodejs do básico ao avançado...',
        comments: 10
    }
    res.render('blogpost', { post })
})

app.listen(port, () => {
    console.log(`Aplicação rodando na porta ${port}.`)
})