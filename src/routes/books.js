const express = require('express')
const route = express.Router()

const bookController = require('../controllers/books')
const userController = require('../controllers/users')

route
    .post('/', userController.verifyTokenMiddleware, bookController.insertBook)
    .get('/', bookController.getAllBook)
    .get('/:id', bookController.getOneBook)
    .patch('/', userController.verifyTokenMiddleware, bookController.updateBook)
    .delete('/', userController.verifyTokenMiddleware, bookController.deleteBook)
    module.exports = route