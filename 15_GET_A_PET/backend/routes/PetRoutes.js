const { PetController } = require('../controllers')
const { imageUpload } = require('../helpers/image-upload')
const verifyToken = require('../helpers/verify-token')
const router = require('express').Router()

router.post('/', verifyToken, imageUpload.array('images'), PetController.create)
router.get('/', PetController.getAll)
router.get('/mypets', verifyToken, PetController.getAllUserPets)
router.get('/myadoptions', verifyToken, PetController.getAllUserAdoptions)
router.get('/:id', PetController.getPetById)
router.delete('/:id', verifyToken, PetController.deletePetById)
router.put('/:id', verifyToken, imageUpload.array('images'), PetController.edit)
router.patch('/:id/schedule', verifyToken, imageUpload.array('images'), PetController.schedule)
router.patch('/:id/conclude', verifyToken, PetController.concludeAdoption)

module.exports = router