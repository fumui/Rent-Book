const express = require('express')
const route = express.Router()

const bookController = require('../controllers/books')
const userController = require('../controllers/users')

route
    .post('/', userController.verifyTokenMiddleware, userController.verifyAdminPrevilege, bookController.insertBook)
    .get('/', bookController.getAllBook)
    .get('/:id', bookController.getOneBook)
    .patch('/', userController.verifyTokenMiddleware, userController.verifyAdminPrevilege, bookController.updateBook)
    .delete('/', userController.verifyTokenMiddleware, userController.verifyAdminPrevilege, bookController.deleteBook)
    module.exports = route