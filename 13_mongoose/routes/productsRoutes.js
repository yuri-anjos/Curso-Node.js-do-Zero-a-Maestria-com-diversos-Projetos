const express = require('express')
const router = express.Router()

const { ProductController } = require('../controllers')

router.get('/', ProductController.showProducts)
router.get('/create', ProductController.createProduct)
router.post('/create/api', ProductController.createProductApi)
router.post('/:id/delete/api', ProductController.deleteProductApi)
router.post('/:id/edit/api', ProductController.editProductApi)
router.get('/:id/edit', ProductController.editProduct)
router.get('/:id', ProductController.getProduct)

module.exports = router