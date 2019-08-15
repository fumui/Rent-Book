const express = require('express')
const route = express.Router()

const borrowingController = require('../controllers/borrowings')
const userController = require('../controllers/users')

route
    .post('/', userController.verifyTokenMiddleware, borrowingController.insertBorrowing)
    .get('/', userController.verifyTokenMiddleware, borrowingController.getAllBorrowing)
    .get('/:id', userController.verifyTokenMiddleware, borrowingController.getOneBorrowing)
    .patch('/', userController.verifyTokenMiddleware, borrowingController.returningBook)
    .delete('/', userController.verifyTokenMiddleware, borrowingController.deleteBorrowing)
    module.exports = route