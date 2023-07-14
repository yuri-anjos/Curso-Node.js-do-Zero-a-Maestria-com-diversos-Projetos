const mongoose = require('mongoose')

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/13_mongoose')
    console.log('Conectado ao MongoDB')
}

main().catch((err) => {
    console.error('Error: ' + err)
})

module.exports = mongoose