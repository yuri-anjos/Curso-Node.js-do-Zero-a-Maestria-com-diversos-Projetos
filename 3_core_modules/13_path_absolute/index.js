import path from 'path'

console.log(path.resolve('teste.txt'))

const midFolder = 'relatorios'
const fileName = 'yuri.txt'
const finalPath = path.join('/', 'arquivos', midFolder, fileName)

console.log(finalPath)