const express = require('express')
const route = express.Router()

const bookController = require('../controllers/books')

route
    .post('/', bookController.insertBook)
    .get('/', bookController.getAllBook)
    .patch('/', bookController.updateBook)
    .delete('/', bookController.deleteBook)
    module.exports = route