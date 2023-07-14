const conn = require('../db/conn')
const { ObjectId } = require('mongodb')

class Product {
    constructor(name, price, description, image) {
        this.name = name
        this.price = price
        this.description = description
        this.image = image
    }

    async save() {
        const data = await conn.db().collection('products').insertOne({
            name: this.name,
            price: this.price,
            description: this.description,
            image: this.image,
        })

        return data
    }

    static async getAll() {
        const data = await conn.db().collection('products').find().toArray()
        return data
    }

    static async getById(id) {
        const data = await conn.db().collection('products').findOne({ _id: new ObjectId(id) })
        return data
    }

    static async deleteById(id) {
        await conn.db().collection('products').deleteOne({ _id: new ObjectId(id) })
    }

    async updateById(id) {
        await conn.db().collection('products').updateOne({ _id: new ObjectId(id) }, { $set: this })
    }
}

module.exports = Product