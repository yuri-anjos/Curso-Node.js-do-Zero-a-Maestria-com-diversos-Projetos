const { Product } = require('../models')

module.exports = class ProductController {
    static async showProducts(req, res) {
        const products = await Product.getAll()
        res.render('products/all', { products })
    }

    static async createProduct(req, res) {
        res.render('products/create')
    }

    static async createProductApi(req, res) {
        const { name, price, description, image } = req.body

        const product = new Product(name, price, description, image)
        await product.save()

        res.redirect('/products')
    }

    static async getProduct(req, res) {
        const { id } = req.params
        const product = await Product.getById(id)
        res.render('products/product', { product })
    }

    static async editProduct(req, res) {
        const { id } = req.params
        const product = await Product.getById(id)
        res.render('products/edit', { product })
    }

    static async editProductApi(req, res) {
        const { id } = req.params
        const { name, price, image, description } = req.body

        const product = new Product(name, price, description, image)

        await product.updateById(id)
        res.redirect(`/products/${id}`)
    }

    static async deleteProductApi(req, res) {
        const { id } = req.params
        await Product.deleteById(id)
        res.redirect('/products')
    }
}