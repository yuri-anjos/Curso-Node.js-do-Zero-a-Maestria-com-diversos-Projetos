const express = require('express')
const router = express.Router()
const { AuthController } = require('../controllers/index')

router.get('/login', AuthController.login)
router.get('/signup', AuthController.register)
router.post('/login/api', AuthController.loginApi)
router.post('/signup/api', AuthController.registerApi)
router.get('/logout', AuthController.logout)

module.exports = router