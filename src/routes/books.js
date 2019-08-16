const express = require('express')
const route = express.Router()

const bookController = require('../controllers/books')
const auth = require('../middlewares/auth')

route
  .post('/', auth.verifyTokenMiddleware, auth.verifyAdminPrevilege, bookController.insertBook)
  .get('/', bookController.getAllBook)
  .get('/:id', bookController.getOneBook)
  .patch('/', auth.verifyTokenMiddleware, auth.verifyAdminPrevilege, bookController.updateBook)
  .delete('/', auth.verifyTokenMiddleware, auth.verifyAdminPrevilege, bookController.deleteBook)

module.exports = route
