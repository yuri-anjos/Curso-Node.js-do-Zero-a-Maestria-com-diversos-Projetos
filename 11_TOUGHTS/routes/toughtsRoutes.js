const express = require('express')
const router = express.Router()
const { ToughtController } = require('../controllers/index')
const { checkAuth } = require('../helpers/auth')

router.get('/dashboard', checkAuth, ToughtController.dashboard)
router.post('/add/api', checkAuth, ToughtController.createToughtApi)
router.get('/add', checkAuth, ToughtController.createTought)
router.post('/edit/api', checkAuth, ToughtController.editToughtApi)
router.get('/:id/edit', checkAuth, ToughtController.editTought)
router.post('/:id/delete/api', checkAuth, ToughtController.deleteToughtApi)

module.exports = router