const express = require('express')
const router = express.Router()

const { ProductController } = require('../controllers')

router.get('/:id', ProductController.getProduct)
router.get('/:id/edit', ProductController.editProduct)
router.post('/:id/edit/api', ProductController.editProductApi)
router.get('/create', ProductController.createProduct)
router.post('/create/api', ProductController.createProductApi)
router.post('/:id/delete/api', ProductController.deleteProductApi)
router.get('/', ProductController.showProducts)

module.exports = router