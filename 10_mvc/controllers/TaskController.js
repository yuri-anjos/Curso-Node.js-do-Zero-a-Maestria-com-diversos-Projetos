const { where } = require('sequelize')
const { Task } = require('../models/index')

module.exports = class TaskController {
    static async showTasks(req, res) {

        const tasks = await Task.findAll({ raw: true })
        res.render('tasks/all', { tasks })
    }

    static createTask(req, res) {
        res.render('tasks/create')
    }

    static async createTaskSave(req, res) {
        const { title, description } = req.body
        const task = { title, description, done: false }

        await Task.create(task)

        res.redirect('/tasks')
    }

    static async deleteTask(req, res) {
        const { id } = req.params

        await Task.destroy({ where: { id } })

        res.redirect('/tasks')
    }

    static async updateTask(req, res) {
        const { id } = req.params

        const task = await Task.findOne({ raw: true, where: { id } })

        res.render('tasks/edit', { task })
    }

    static async updateTaskSave(req, res) {
        const { id, title, description } = req.body

        await Task.update({ title, description }, { where: { id } })

        res.redirect('/tasks')
    }

    static async toggleTaskStatus(req, res) {
        const { id } = req.params

        const { done } = await Task.findOne({ raw: true, where: { id } })
        await Task.update(
            { done: !done },
            { where: { id } }
        )

        res.redirect('/tasks')
    }
}