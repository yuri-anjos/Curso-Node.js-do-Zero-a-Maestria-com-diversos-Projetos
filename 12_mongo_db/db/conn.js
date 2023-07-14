const { MongoClient } = require('mongodb')

const url = 'mongodb://127.0.0.1:27017/12_mongo_db';
const client = new MongoClient(url);

async function run() {
    try {
        await client.connect()
        console.log('Conectado ao MongoDB');
    } catch (error) {
        console.error('Error: ' + error)
    }
}

run()

module.exports = client