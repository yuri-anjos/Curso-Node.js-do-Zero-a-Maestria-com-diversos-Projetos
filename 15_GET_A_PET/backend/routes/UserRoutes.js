const { UserController } = require('../controllers')
const { imageUpload } = require('../helpers/image-upload')
const verifyToken = require('../helpers/verify-token')
const router = require('express').Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/checkuser', UserController.checkUser)
router.get('/:id', UserController.getUserById)
router.put('/', verifyToken, imageUpload.single('image'), UserController.editUser)

module.exports = router