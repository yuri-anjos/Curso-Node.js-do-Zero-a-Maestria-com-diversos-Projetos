const { Product } = require('../models')

module.exports = class ProductController {
    static async showProducts(req, res) {
        const products = await Product.find().lean()
        res.render('products/all', { products })
    }

    static async createProduct(req, res) {
        res.render('products/create')
    }

    static async createProductApi(req, res) {
        const { name, price, description, image } = req.body

        const product = new Product({ name, price, description, image })
        await product.save()

        res.redirect('/products')
    }

    static async getProduct(req, res) {
        const { id } = req.params
        const product = await Product.findById(id).lean()
        res.render('products/product', { product })
    }

    static async editProduct(req, res) {
        const { id } = req.params
        const product = await Product.findById(id).lean()
        res.render('products/edit', { product })
    }

    static async editProductApi(req, res) {
        const { id } = req.params
        const { name, price, image, description } = req.body

        const product = { name, price, description, image }

        await Product.updateOne({ _id: id }, product)
        res.redirect(`/products/${id}`)
    }

    static async deleteProductApi(req, res) {
        const { id } = req.params
        await Product.deleteOne({ _id: id })
        res.redirect('/products')
    }
}