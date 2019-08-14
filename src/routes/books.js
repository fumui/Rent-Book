const express = require('express')
const route = express.Router()

const bookController = require('../controllers/books')

route
    .post('/', bookController.insertBook)
    .get('/', bookController.getAllBook)
    .get('/:id', bookController.getOneBook)
    .patch('/', bookController.updateBook)
    .delete('/', bookController.deleteBook)
    module.exports = route