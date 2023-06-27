import fs from 'fs'

if (fs.existsSync('./minhapasta')) {
    console.log('Diretório minhapasta existe')
} else {
    console.log('Diretório minhapasta não existe')
    fs.mkdirSync('minhapasta')
    console.log('Diretório minhapasta criado')

    if (fs.existsSync('./minhapasta')) {
        console.log('Diretório minhapasta existe')
    }
}
