import fs from 'fs'

fs.stat("arquivo.txt", (err, stats) => {
    if (err) {
        console.log(err)
        return
    }

    console.log(stats.isFile())
    console.log(stats.isDirectory())
    console.log(stats.isSymbolicLink())

    console.log(JSON.stringify(stats))
})