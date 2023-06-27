import fs from 'fs'

fs.rename('arquivo.txt', 'file.txt', (err) => {
    if (err) {
        console.log(err)
        return
    }

    console.log('Arquivo renomeado')
})


