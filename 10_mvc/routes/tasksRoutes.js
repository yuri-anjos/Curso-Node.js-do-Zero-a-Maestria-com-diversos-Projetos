const express = require('express')
const router = express.Router()

const { TaskController } = require('../controllers/index')

router.get('/', TaskController.showTasks)
router.get('/add', TaskController.createTask)
router.post('/add', TaskController.createTaskSave)
router.post('/:id/delete', TaskController.deleteTask)
router.get('/:id/edit', TaskController.updateTask)
router.post('/edit', TaskController.updateTaskSave)
router.post('/:id/updatestatus', TaskController.toggleTaskStatus)

module.exports = router