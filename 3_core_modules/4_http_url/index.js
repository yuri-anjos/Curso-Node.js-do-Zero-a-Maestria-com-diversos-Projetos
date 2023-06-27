import url from 'url'
import http from 'http'

const port = 3000

const server = http.createServer((request, response) => {
    const urlInfo = url.parse(request.url, true)
    const name = urlInfo.query.name

    response.statusCode = 200
    response.setHeader("Content-Type", "text/html")

    if (!name) {
        response.end('<h1>Digite seu nome</h1> <form method="GET"> <input type="text" name="name"></input> </form>')

    } else {
        response.end(`<h1>Seja bem-vindo ${name}!</h1>`)
    }
})

server.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`)
})

