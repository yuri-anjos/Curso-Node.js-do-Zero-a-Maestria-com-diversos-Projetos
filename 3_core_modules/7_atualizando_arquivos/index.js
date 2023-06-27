import fs from 'fs'
import http from 'http'
import url from 'url'

const port = 3000

const server = http.createServer((request, response) => {
    const urlInfo = url.parse(request.url, true)
    const { name } = urlInfo.query

    if (name) {
        fs.appendFile('arquivo.txt', `${name},\r\n`, (err, data) => {
            response.writeHead(302, { Location: '/' })
            return response.end()
        })
    } else {
        fs.readFile('index.html', (err, data) => {
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.write(data)
            return response.end()

        })
    }
})

server.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`)
})

