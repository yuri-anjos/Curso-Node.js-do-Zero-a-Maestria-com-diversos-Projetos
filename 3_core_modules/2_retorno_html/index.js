import http from 'http'

const port = 3000

const server = http.createServer((request, response) => {
    response.statusCode = 200
    response.setHeader("Content-Type", "text/html")
    response.end("<h1>Olá, esté é uma rota que retorna html!</h1>")
})

server.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`)
})